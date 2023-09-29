from fastapi import FastAPI
from api.chat import router as chat_router
from api.code_editor import router as code_editor_router
from db import database

app = FastAPI()

# Include routers
app.include_router(chat_router)
app.include_router(code_editor_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
