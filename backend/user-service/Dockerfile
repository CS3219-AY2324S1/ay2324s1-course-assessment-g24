# Use the official Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /user-service

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the application code to the working directory
COPY . .

ARG JWT_SECRET
ARG DB_URI
ARG JWT_REFRESH_SECRET_KEY="08b7d5a146b83a57d9e59339ba3b5ade"
ARG HASHING_ALGORITHM="HS256"

ENV JWT_SECRET=${JWT_SECRET}
ENV DB_URI=${DB_URI}
ENV JWT_REFRESH_SECRET_KEY=${JWT_REFRESH_SECRET_KEY}
ENV HASHING_ALGORITHM=${HASHING_ALGORITHM}
# Expose the port on which the application will run
EXPOSE 8000

# Run the FastAPI application using uvicorn server
CMD  ["echo", "Hello, Docker!"]