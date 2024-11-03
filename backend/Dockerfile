################################
# PYTHON-BASE
################################
FROM python:3.11-slim as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    VIRTUAL_ENV="/venv"

ENV PATH="$POETRY_HOME/bin:$VIRTUAL_ENV/bin:$PATH"

RUN python -m venv $VIRTUAL_ENV

WORKDIR /app
ENV PYTHONPATH="/app:$PYTHONPATH"

################################
# BUILDER-BASE
################################
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    curl \
    build-essential

RUN curl -sSL https://install.python-poetry.org | python -

WORKDIR /app

COPY poetry.lock pyproject.toml ./
RUN poetry install --no-root --only main

################################
# DEVELOPMENT
################################
FROM builder-base as development

RUN poetry install --with=dev

RUN apt-get update && apt-get install -y git

WORKDIR /app
CMD ["python", "-u", "manage.py", "runserver", "0.0.0.0:8000"]

################################
# PRODUCTION
################################
FROM python-base as prod
COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $VIRTUAL_ENV $VIRTUAL_ENV
COPY . /app/
WORKDIR /app
CMD ["uvicorn", "--workers=1", "--port=8000", "--host=0.0.0.0", "weed.asgi:application"]