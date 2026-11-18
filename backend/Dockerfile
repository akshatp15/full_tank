# Get Python
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Create virtual environment
RUN python -m venv /opt/venv

# Use virtual environment automatically
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
