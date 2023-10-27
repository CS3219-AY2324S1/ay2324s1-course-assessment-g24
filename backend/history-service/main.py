from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.history_handler import history_router
from core.config import settings
from models.history_model import History

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.BACKEND_CORS_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.on_event("startup")
async def app_init():
  db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
  await init_beanie(database=db_client, document_models=[History])

app.include_router(history_router, prefix="/history", tags=["history"])


