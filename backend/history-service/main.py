from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from api.history_handler import history_router
from core.config import settings
from models.history_model import History

from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.db = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
    await init_beanie(app.db, document_models=[History])
    print("Startup complete")
    yield
    print("Shutdown complete")


app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix=settings.API_STR, tags=["history"])

@app.get("/")
def test():
    return "Hello from History Service"