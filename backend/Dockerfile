FROM nvidia/cuda:10.2-cudnn7-devel-ubuntu18.04 as base
FROM python:3.10.4-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    sudo \
    git \
    bzip2 \
    libx11-6 \
    vim \
    build-essential \
    screen \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN sudo -H pip install -U pipenv

WORKDIR /app

COPY . /app

RUN pipenv install
ENTRYPOINT [ "pipenv", "run", "python" ]
CMD ["app.py"]