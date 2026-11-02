FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV HF_HOME=/root/.cache/huggingface

COPY backend/requirements.txt ./requirements.txt

# Install CPU-only PyTorch first.
RUN pip install --no-cache-dir --retries 10 --timeout 120 --upgrade pip \
    && pip install --no-cache-dir --retries 10 --timeout 120 \
       --index-url https://download.pytorch.org/whl/cpu \
       torch \
    && pip install --no-cache-dir --retries 10 --timeout 120 \
       -r requirements.txt

COPY backend/ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
