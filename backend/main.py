from typing import Any
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage
from pydantic import BaseModel
from typer import Typer
import logging
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from ai import coin_summary, general_coin_summary, bio_summary, summary_summary
from coins import (
    Zora20Token,
    explore,
    get_profile,
    get_profile_balances,
)
from database import SessionLocal, engine, Base, get_db
from models import User  # Import your models
from routers.users import router as user_router
from routers.users import get_current_user
from routers.reports import router as report_router
from routers.analyze import router as analyze_router
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
cli = Typer()

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(report_router, prefix="/reports", tags=["reports"])
app.include_router(analyze_router, prefix="/analyze", tags=["analyze"])

# Allow all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for specific frontend
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Authorization, Content-Type, etc.
)


@app.on_event("startup")
async def startup_db_client():
    try:
        # Try to connect to the database
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        logger.info("Successfully connected to the PostgreSQL database!")
    except SQLAlchemyError as e:
        logger.error(f"Error connecting to the PostgreSQL database: {e}")
        raise


@cli.command()
def say_hello():
    print("hello from backend")


def coin_time_series(address: str): ...


class TokenInfo(BaseModel):
    id: str
    name: str
    symbol: str
    preview: str | None
    marketCap: float
    marketCapDelta24h: float
    timeseries: list[dict[str, int]]
    image: str


@app.get("/trending_tokens")
def trending_coins(count: int = 5):
    def extract_image(coin: Zora20Token) -> str:
        if (content := coin.mediaContent) is not None:
            if (preview := content.previewImage) is not None:
                return preview.medium
        return ""

    coin = explore(count=count)
    coins = [e.node for e in coin.exploreList.edges]
    return [
        TokenInfo(
            id=coin.address,
            name=coin.name,
            symbol=coin.symbol,
            preview=None,
            marketCap=float(coin.marketCap),
            marketCapDelta24h=float(coin.marketCapDelta24h),
            timeseries=[],
            image=extract_image(coin),
        )
        for coin in coins
    ]


class ProfileHolding(BaseModel):
    id: str
    symbol: str
    name: str
    preview: str | None
    amount: float
    value: float
    timeseries: list[dict[str, int]]


class ProfileResponse(BaseModel):
    username: str
    wallet: str

    displayName: str
    handle: str | None
    bio: str
    avatar: str | None
    holdings: list[ProfileHolding]


def _profile_details(profile_id: str) -> ProfileResponse:
    def extract_image_token(coin: Zora20Token) -> str:
        if (content := coin.mediaContent) is not None:
            if (preview := content.previewImage) is not None:
                return preview.medium
        return ""

    def extract_image_profile(profile) -> str:
        if (avatar := profile.avatar) is not None:
            return avatar.medium
        return ""

    def value_from_coin(amount: float, coin: Zora20Token) -> float:
        return (amount / float(coin.totalSupply)) * float(coin.marketCap)

    profile = get_profile(profile_id)
    profile_balances = get_profile_balances(profile_id)
    balances = [e.node for e in profile_balances.coinBalances.edges]
    holdings = [
        ProfileHolding(
            id=balance.coin.id,
            symbol=balance.coin.symbol,
            name=balance.coin.name,
            preview=extract_image_token(balance.coin),
            amount=float(balance.balance) / (10**18),
            value=value_from_coin(float(balance.balance) / (10**18), balance.coin),
            timeseries=[],
        )
        for balance in balances
    ]
    return ProfileResponse(
        username=profile.username,
        wallet=profile.publicWallet.walletAddress,
        displayName=profile.displayName or "",
        handle=profile.handle,
        bio=profile.bio,
        avatar=extract_image_profile(profile),
        holdings=holdings,
    )


@app.get("/profile/{profile_id}")
def profile_details(profile_id):
    return _profile_details(profile_id)


@app.get("/profile")
def profile_details_me(user: User = Depends(get_current_user)):
    return _profile_details(user.wallet_address)


@app.get("/analyze-profile")
def analyze_profile_kms(user: User = Depends(get_current_user)):
    return _analyze_profile(user.wallet_address)


@app.get("/analyze-profile/{wallet_id}")
def analyze_profile(wallet_id: str) -> dict[str, Any]:
    return _analyze_profile(wallet_id)


def _analyze_profile(wallet_id: str) -> dict[str, Any]:
    def try_summary(address):
        try:
            return coin_summary(address)
        except:
            return ("", 0.0)

    profile = get_profile(wallet_id)
    balances = get_profile_balances(wallet_id)
    coins = [e.node.coin for e in balances.coinBalances.edges]
    summaries = [try_summary(coin.address) for coin in coins]
    total_coin_summary = general_coin_summary([s for (s, e) in summaries])
    bio = bio_summary(profile)
    super_summary = summary_summary()
    return {
        "bio_analysis": bio,
        "coins_summaries": [],
        "all_coin_summary": total_coin_summary,
        "prompt_summary": super_summary,
    }


# def get_reports_by_wallet(current_user: User = Depends(get_current_user)):

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    cli()
