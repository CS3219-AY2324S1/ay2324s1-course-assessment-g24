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

# Set environment variables
ENV STATISTICS_CREATION_URL="your_statistics_creation_url"
ENV HISTORY_URL="your_history_url"
ENV STATISTICS_URL="your_statistics_url"
ENV JWT_SECRET="your_jwt_secret"
ENV DB_URI="your_db_uri"

# Expose the port on which the application will run
EXPOSE 8000

# Run the FastAPI application using uvicorn server
CMD ["nohup", "uvicorn", "main:app", "--reload", "--port", "8000"]