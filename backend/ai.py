from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from langchain_core.output_parsers import StrOutputParser
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
from pydantic import BaseModel
from typer import Typer

from coins import Profile, explore, get_all_comments, get_coin
from const import COIN_SUMMARY, IMAGE_PROMPT, MODEL_NAME, IDEA_GEN
from models import User

from coin_model import predict, get_input

cli = Typer()
tools = []
memory = MemorySaver()
model = ChatOpenAI(model=MODEL_NAME)
dall_e = DallEAPIWrapper(model="dall-e-3")
agent_executor = create_react_agent(model, tools, checkpointer=memory)
config = RunnableConfig(
    configurable={"thread_id": "c7661282-da44-464d-a8a7-4307a0df56a0"}
)


@cli.command()
def main():
    """
    Tool to run LLM
    """
    while True:
        single_line = input(">>> ")
        for step, metadata in agent_executor.stream(
            {"messages": [HumanMessage(content=single_line)]},
            stream_mode="messages",
            config=config,
        ):
            if metadata["langgraph_node"] == "agent" and (text := step.text()):
                print(text, end="")
        print()


def analyze_image(image_url: str) -> list[str]:
    message = HumanMessage(
        content=[
            {"type": "text", "text": IMAGE_PROMPT},
            {"type": "image_url", "image_url": {"url": image_url}},
        ]
    )
    return model.invoke([message]).text().split(" ")


def coin_summary(address: str) -> tuple[str, float]:
    coin_data = get_coin(address)
    input_df = get_input(address)
    predicted_roi = predict(input_df)
    content = COIN_SUMMARY.format(
        creatorEarnings=coin_data.creatorEarnings,
        volume24h=coin_data.volume24h,
        totalVolume=coin_data.totalVolume,
        name=coin_data.name,
        description=coin_data.description,
        predictedROI=f"{(predicted_roi) * 100}%",
        marketCap=coin_data.marketCap,
        market_cap_change_24h=coin_data.marketCapDelta24h,
        days_since_created=input_df["days_since_created"],
        unique_holders=coin_data.uniqueHolders,
        transfers=coin_data.transfers,
        comments_sentimental_score=input_df["comments_sentimental_score"],
        comments="\n".join([n.comment for n in get_all_comments(address, count=10)]),
    )
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text(), predicted_roi


def get_concatenated_reports(user: User) -> str:
    """
    Get all reports for the user, concatenate their 'content' fields,
    and return the resulting string.
    """
    if not user.reports or len(user.reports) == 0:
        return "No previous reports available."

    # Take the most recent 5 reports to avoid context length issues
    recent_reports = sorted(user.reports, key=lambda r: r.created_at, reverse=True)[:5]
    concatenated_content = "\n\n".join(report.content for report in recent_reports)
    return concatenated_content


def gen_idea(prompt: str, user: User) -> str:
    """
    Generate a creative idea based on the user's prompt and their previous reports.
    """
    previous = get_concatenated_reports(user)

    content = IDEA_GEN.format(prompt=prompt, prev=previous)
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text()


def gen_image(prompt: str) -> str:
    return dall_e.run(prompt)


def general_coin_summary(summaries: list[str]) -> str:
    content = f"""
    Provide a general review of the performance of created coins based on
    the both financial data and energy of the comments:
    {'- \n'.join(summaries)}
    Use plenty of newlines.
    """
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text()


def bio_summary(profile: Profile) -> str:
    content = f"""
    Using what you know about this users created coins, write a brief review of how
    they could improve on the content of their bio, maybe even their name of branding:
    - bio: {profile.bio}
    - website: {profile.website}
    - handle: {profile.handle}
    - display name: {profile.displayName}
    Use plenty of newlines.
    """
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text()


def summary_summary() -> str:
    content = f"""
    Write a summary based on the last 2 summaries about coins and branding that outlines
    actionable items the user can take note of. Keep it brief, use plenty of new lines.
    """
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text()


@cli.command()
def coin_summary_test(address: str) -> None:
    coin_summary(address)


@cli.command()
def analyze_image_test(image_url: str):
    analyze_image(image_url)


@cli.command()
def idea_gen_test(prompt: str, user_id: int = 1):
    """Test idea generation with a mock user"""
    from models import User

    mock_user = User(id=user_id, reports=[])
    result = gen_idea(prompt, mock_user)
    print(result)


if __name__ == "__main__":
    cli()
