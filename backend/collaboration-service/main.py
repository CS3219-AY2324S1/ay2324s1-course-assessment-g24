# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from core.config import settings
# from api.code_editor import router as code_editor_router
# from models.code_editor_model import CodeEditorContent
# from beanie import init_beanie

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.BACKEND_CORS_ORIGINS,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers
# app.include_router(code_editor_router)

# @app.on_event("startup")
# async def app_init():
#     db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING)
#     database = db_client[settings.MONGODB_DATABASE]
#     await init_beanie(database=database, document_models=[CodeEditorContent])

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from core.config import settings
# from api.code_editor import router as code_editor_router
# from models.code_editor_model import CodeEditorContent
# from beanie import init_beanie

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.BACKEND_CORS_ORIGINS,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers
# app.include_router(code_editor_router)

# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI
from api import code_editor
from websocket import app

app = FastAPI()

# Include the router
app.include_router(code_editor.router, tags=["code_editor"])
app.mount("/", app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
