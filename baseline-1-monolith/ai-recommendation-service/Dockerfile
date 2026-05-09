FROM python:3.12-slim

WORKDIR /app

# Fix SURPRISE lib bug:
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5102

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5102"]