from typing import Final


MODEL_NAME: Final[str] = "gpt-4o"
BASE_URL: Final[str] = "https://api-sdk.zora.engineering/"
IMAGE_PROMPT: Final[
    str
] = """
Provide only a list of keywords or phrases formatted like
\"urban-landscape\" or \"surrealist\" that accurately describe
the given image with no extra text or newlines seperated by 
spaces:
"""
