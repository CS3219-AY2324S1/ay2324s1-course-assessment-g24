from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.code_editor import router as code_editor_router
from models.code_editor_model import CodeEditorContent
from beanie import init_beanie

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(code_editor_router)

@app.on_event("startup")
async def app_init():
    db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING)
    database = db_client[settings.MONGODB_DATABASE]
    await init_beanie(database=database, document_models=[CodeEditorContent])
