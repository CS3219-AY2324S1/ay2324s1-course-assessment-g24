from contextlib import asynccontextmanager

from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.router import router
from core.config import settings
from models.user_model import User


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.db = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
    await init_beanie(app.db, document_models=[User])
    print("Startup complete")
    yield
    print("Shutdown complete")


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_STR}/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.API_STR)
