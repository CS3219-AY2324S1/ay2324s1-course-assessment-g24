from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.chat_handler import chat_router
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models.chat_model import ChatModel
from pymongo import MongoClient
import certifi

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.BACKEND_CORS_ORIGINS + ["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Communication Service"}

@app.on_event("startup")
async def app_init():
  db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING, tlsCAFile=certifi.where()).test
  await init_beanie(database=db_client, document_models=[ChatModel])

app.include_router(chat_router, prefix="/chat", tags=["chat"])
