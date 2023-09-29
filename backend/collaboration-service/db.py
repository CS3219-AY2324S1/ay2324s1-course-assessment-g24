from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from models.chat_model import ChatMessage  # Add any other models you have
from models.code_editor_model import CodeEditorContent

database_url = "mongodb://localhost:27017"  # Update with your MongoDB URL
database_name = "your_database_name"  # Replace with your database name

client = AsyncIOMotorClient(database_url)
database = client[database_name]

# Specify your document models here
init_beanie(database, document_models=[ChatMessage, CodeEditorContent])
