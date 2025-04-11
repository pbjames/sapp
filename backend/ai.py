import logging
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from typer import Typer

from coins import get_all_comments, get_coin
from const import COIN_SUMMARY, IMAGE_PROMPT, MODEL_NAME

cli = Typer()
tools = []
memory = MemorySaver()
model = ChatOpenAI(model=MODEL_NAME)
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


def coin_summary(address: str) -> str:
    coin_data = get_coin(address)
    content = COIN_SUMMARY.format(
        creatorEarnings=coin_data.creatorEarnings,
        volume24h=coin_data.volume24h,
        totalVolume=coin_data.totalVolume,
        name=coin_data.name,
        description=coin_data.description,
        comments="\n".join([n.comment for n in get_all_comments(address, count=10)]),
    )
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text()


@cli.command()
def coin_summary_test(address: str) -> None:
    coin_summary(address)


@cli.command()
def analyze_image_test(image_url: str):
    analyze_image(image_url)


if __name__ == "__main__":
    cli()
