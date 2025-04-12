from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typer import Typer
import logging
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from coins import MediaContent, Zora20Token, explore, get_profile
from database import SessionLocal, engine, Base, get_db
from models import User  # Import your models
from routers.users import router as user_router
from routers.reports import router as report_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
cli = Typer()

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(report_router, prefix="/reports", tags=["reports"])

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


@app.get("/profile/{profile_id}")
def profile_details(profile_id: str):
    return get_profile(profile_id)


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


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    cli()
