FROM python:3.13

RUN mkdir /code

WORKDIR /code

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

ADD https://astral.sh/uv/install.sh /uv-installer.sh

RUN sh /uv-installer.sh && rm /uv-installer.sh

ENV PATH="/root/.local/bin/:$PATH"

COPY backend/ /code/

# Create this virtual environment and use it with uv as needed
RUN python3 -m venv .venv

RUN ls /code/

RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "fastapi", "dev", "main.py", "--host=0.0.0.0", "--port=8000"]