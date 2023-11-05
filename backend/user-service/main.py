from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.router import router
from core.config import settings
from models.user_model import User

app = FastAPI(
  title=settings.PROJECT_NAME, openapi_url=f"{settings.API_STR}/openapi.json"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
  db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
  await init_beanie(database=db_client, document_models=[User])


app.include_router(router, prefix=settings.API_STR)
