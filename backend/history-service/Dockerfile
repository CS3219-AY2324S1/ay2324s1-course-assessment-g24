# Use the official Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /history-service

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 8001

# Run the FastAPI application using uvicorn server
CMD ["nohup", "uvicorn", "main:app", "--reload", "--port", "8001"]