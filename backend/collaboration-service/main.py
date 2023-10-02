from fastapi import FastAPI
from api.chat import router as chat_router
from api.code_editor import router as code_editor_router
from core.config import settings
from db import database

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.BACKEND_CORS_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)
app.include_router(code_editor_router)

@app.on_event("startup")
async def app_init():
  db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
  await init_beanie(database=db_client, document_models=[CodeEditorContent])