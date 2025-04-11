from fastapi import FastAPI
from typer import Typer

app = FastAPI()
cli = Typer()


@cli.command()
def say_hello():
    print("hello from backend")


@app.get("/")
def read_root():
    return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    cli()
