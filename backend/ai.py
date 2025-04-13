from json import load
import logging
from langchain_openai import ChatOpenAI, OpenAI
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from pydantic import BaseModel
from typer import Typer
from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
from langchain_core.prompts import PromptTemplate
from routers.users import get_current_user
from fastapi import Depends
from models import User  # Import your models


from coins import explore, get_all_comments, get_coin
from const import COIN_SUMMARY, IDEA_GEN, IMAGE_PROMPT, MODEL_NAME

from coin_model import predict, get_input
load_dotenv()



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


def coin_summary(address: str) -> tuple[str,float]:
    coin_data = get_coin(address)
    input_df = get_input(address)
    predicted_roi = predict(input_df)

    content = COIN_SUMMARY.format(
        creatorEarnings=coin_data.creatorEarnings,
        volume24h=coin_data.volume24h,
        totalVolume=coin_data.totalVolume,
        name=coin_data.name,
        description=coin_data.description,
        predictedROI=f"{(predicted_roi)*100}%",
        marketCap=coin_data.marketCap,
        market_cap_change_24h=coin_data.marketCapDelta24h,
        days_since_created=input_df['days_since_created'],
        unique_holders=coin_data.uniqueHolders,
        transfers=coin_data.transfers,
        comments_sentimental_score=input_df['comments_sentimental_score'],
        comments="\n".join([n.comment for n in get_all_comments(address, count=10)]),
    )
    message = HumanMessage(content=[{"type": "text", "text": content}])
    return model.invoke([message]).text(), predicted_roi


# def gen_image(prompt: str) -> str:
#     prompt = PromptTemplate(
#         input_variables=["image_desc"],
#         template="Generate a detailed prompt to generate an image based on the following description: {image_desc}",
#     )
#     chain = LLMChain(llm=llm, prompt=prompt)

#     image_url = DallEAPIWrapper().run(chain.run("prompt"))

def get_concatenated_reports(current_user: User = Depends(get_current_user)):
    """
    Get all reports for the authenticated user, concatenate their 'content' fields,
    and return the resulting string.
    """
    # Concatenate the content of each report using a space as a separator.
    concatenated_content = " ".join(report.content for report in current_user.reports)
    return concatenated_content

def gen_idea(prompt: str, current_user: User = Depends(get_current_user)) -> str:
    previous = get_concatenated_reports(current_user)

    content = IDEA_GEN.format(
        prompt=prompt,
        prev=previous
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
