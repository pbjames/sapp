from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent


def main(verbose: bool = False):
    """
    Tool to run LLM
    """
    tools = [quit]
    memory = MemorySaver()
    model = ChatAnthropic(model_name=MODEL_NAME, timeout=10, stop=None)
    agent_executor = create_react_agent(model, tools, checkpointer=memory)
    config = RunnableConfig(
        configurable={"thread_id": "37b1696c-e279-4769-822b-e246b40aa2f7"}
    )
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


if __name__ == "__main__":
    main()
