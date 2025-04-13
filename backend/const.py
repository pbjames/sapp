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
- the predicted ROI {predictedROI} is based on multiple factors including the ones above, market cap {marketCap}, market_cap_change_24h {market_cap_change_24h}, days_since_created {days_since_created}, unique_holders {unique_holders}, transfers {transfers}, and comments_sentimental_score {comments_sentimental_score}
- commentary:
{comments}
What makes it stand out and what inspiration can we draw from it?
Don't give too much of a boilerplate answer.
"""

IDEA_GEN: Final[
    str
] = """
Generate a creative idea based on the user's prompt: {prompt}

Consider the following background context from the user's previous reports (if available):
{prev}

The response should be concise, practical, and in a conversational tone. If the user's history contains relevant insights, incorporate them to personalize the response.
Do not include any markdown formatting.
"""
