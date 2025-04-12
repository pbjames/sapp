from typing import Final


MODEL_NAME: Final[str] = "gpt-4o"
BASE_URL: Final[str] = "https://api-sdk.zora.engineering/"
GT_BASE_URL: Final[str] = "https://api.geckoterminal.com/api/v2"
BASE_NET_NAME: Final[str] = "Base"
IMAGE_PROMPT: Final[
    str
] = """
Provide only a list of keywords or phrases formatted like urban-landscape or surrealist
that accurately describe the given image with no extra text or newlines seperated by
spaces:
"""
COIN_SUMMARY: Final[
    str
] = """
This coin has:
- creator earnings {creatorEarnings} where anything greater than $200 is noteworthy
- volume in 24 hours {volume24h} versus the total volume {totalVolume}
- name {name}
- description {description}
- commentary:
{comments}
What makes it stand out and what inspiration can we draw from it?
Don't give too much of a boilerplate answer.
"""
