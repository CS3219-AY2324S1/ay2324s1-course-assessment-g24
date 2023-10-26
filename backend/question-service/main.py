from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings
from models.model import QuestionRepo
from fastapi import APIRouter
from api.questionHandler import questionRouter

app = FastAPI()
# router = APIRouter()

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
  await init_beanie(database=db_client, document_models=[QuestionRepo])

# Routing
app.include_router(questionRouter, prefix="/questions", tags=["questions"])
