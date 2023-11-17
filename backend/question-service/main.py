from contextlib import asynccontextmanager
from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.question_handler import question_router
from core.config import settings
from models.question_model import QuestionRepo
import certifi

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.db = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING, tlsCAFile=certifi.where()).test
    await init_beanie(database=app.db, document_models=[QuestionRepo])
    print("Startup complete!")
    yield 
    print("Shutdown complete")

app = FastAPI(
    title=settings.PROJECT_NAME, 
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(question_router, prefix="/questions", tags=["questions"])
