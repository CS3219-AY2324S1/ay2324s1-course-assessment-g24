from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.question_handler import question_router
from core.config import settings
from models.question_model import QuestionRepo
import certifi

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    db_client = AsyncIOMotorClient(
        settings.MONGODB_CONNECTION_STRING, tlsCAFile=certifi.where()
    ).test
    await init_beanie(database=db_client, document_models=[QuestionRepo])


app.include_router(question_router, prefix="/questions", tags=["questions"])
