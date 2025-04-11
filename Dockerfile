FROM python:3-slim-buster

RUN mkdir /code

WORKDIR /code

COPY /backend/requirements.txt /code/

COPY /backend/pyproject.toml /code/

#TODO IS THIS GOING TO WORK? WE NEED TO GIVE IT A TRY AND ENSURE THAT IT WORKS AS INTENDED!
RUN pip install uv

RUN uv sync

COPY /backend /code/

EXPOSE 8000

CMD ["uv", "run", "fastapi", "dev", "main.py"]