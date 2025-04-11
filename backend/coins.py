from __future__ import annotations

from typing import Final, Literal
from pydantic import BaseModel
import requests

from const import BASE_URL


class Amount(BaseModel):
    currencyAddress: str
    amountRaw: str
    amountDecimal: float


class CreatorEarning(BaseModel):
    amount: Amount
    amountUsd: str | None


class PreviewImage(BaseModel):
    blurhash: str | None
    medium: str
    small: str


class CreatorProfile(BaseModel):
    id: str
    handle: str
    avatar: Avatar | None


class MediaPreviewImage(BaseModel):
    small: str
    medium: str
    blurhash: str | None


class MediaContent(BaseModel):
    mimeType: str | None
    originalUri: str
    previewImage: MediaPreviewImage | None


class Transfers(BaseModel):
    count: int


class PageInfo(BaseModel):
    endCursor: str | None
    hasNextPage: bool


class UserProfile(BaseModel):
    id: str
    handle: str
    avatar: Avatar | None


class ZoraCommentNode(BaseModel):
    txHash: str
    comment: str
    userAddress: str
    timestamp: int
    userProfile: UserProfile | None


class ZoraCommentEdge(BaseModel):
    node: ZoraCommentNode


class ZoraComments(BaseModel):
    pageInfo: PageInfo
    count: int
    edges: list[ZoraCommentEdge]


class Zora20Token(BaseModel):
    id: str
    name: str
    description: str
    address: str
    symbol: str
    totalSupply: str
    totalVolume: str
    volume24h: str
    createdAt: str | None
    creatorAddress: str | None
    creatorEarnings: list[CreatorEarning]
    marketCap: str
    marketCapDelta24h: str
    chainId: int
    creatorProfile: CreatorProfile | None
    mediaContent: MediaContent | None
    transfers: Transfers
    uniqueHolders: int
    zoraComments: ZoraComments | None = None


class Edge(BaseModel):
    node: Zora20Token
    cursor: str


class ExploreList(BaseModel):
    edges: list[Edge]
    pageInfo: PageInfo


class ExploreResponse(BaseModel):
    exploreList: ExploreList


class Avatar(BaseModel):
    small: PreviewImage | None = None
    medium: PreviewImage | None = None


class PublicWallet(BaseModel):
    walletAddress: str


class SocialPlatform(BaseModel):
    displayName: str | None = None


class SocialAccounts(BaseModel):
    instagram: SocialPlatform | None = None
    tiktok: SocialPlatform | None = None
    twitter: SocialPlatform | None = None


class LinkedWalletNode(BaseModel):
    walletType: Literal["PRIVY", "EXTERNAL", "SMART_WALLET"]
    walletAddress: str


class LinkedWalletEdge(BaseModel):
    node: LinkedWalletNode


class LinkedWallets(BaseModel):
    edges: list[LinkedWalletEdge]


class Profile(BaseModel):
    id: str
    handle: str
    avatar: Avatar | None = None
    username: str
    displayName: str | None = None
    bio: str
    website: str | None = None
    publicWallet: PublicWallet
    socialAccounts: SocialAccounts
    linkedWallets: LinkedWallets


class BasicProfile(BaseModel):
    id: str
    handle: str
    avatar: Avatar | None = None
    displayName: str | None = None
    website: str | None = None
    coinBalances: CoinBalances


class CoinBalanceNode(BaseModel):
    balance: str
    id: str
    coin: Zora20Token


class CoinBalanceEdge(BaseModel):
    node: CoinBalanceNode


class CoinBalances(BaseModel):
    count: int
    edges: list[CoinBalanceEdge]


ExploreListType = Literal[
    "TOP_GAINERS",
    "TOP_VOLUME_24H",
    "MOST_VALUABLE",
    "NEW",
    "LAST_TRADED",
    "LAST_TRADED_UNIQUE",
]


def explore(
    count: int = 10, list_type: ExploreListType = "TOP_GAINERS"
) -> ExploreResponse:
    response = requests.get(
        f"{BASE_URL}/explore", params={"listType": list_type, "count": count}
    )
    return ExploreResponse(**response.json())


def get_coin(address: str) -> Zora20Token:
    response = requests.get(f"{BASE_URL}/coin", params={"address": address})
    return Zora20Token(**response.json()["zora20Token"])


def get_all_comments(address: str, count: int) -> list[ZoraCommentNode]:
    response = requests.get(
        f"{BASE_URL}/coinComments", params={"address": address, "count": count}
    )
    comments = ZoraComments(**response.json()["zora20Token"]["zoraComments"])
    return [e.node for e in comments.edges]


def get_profile(address: str) -> BasicProfile:
    response = requests.get(
        f"{BASE_URL}/profileBalances", params={"identifier": address}
    )
    return BasicProfile(**response.json()["profile"])
