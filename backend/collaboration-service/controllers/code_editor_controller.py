from fastapi import APIRouter, Depends, HTTPException, WebSocket
from beanie import init_beanie
from pydantic import BaseModel
from db import database
from models.code_editor_model import CodeEditorContent
from socketio import AsyncClient

router = APIRouter()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str,
    sio: AsyncClient = Depends(get_socketio_client)
):
    await websocket.accept()
    await sio.connect("http://localhost:8000/ws")
    await sio.emit("join_room", room=user_id)

    while True:
        data = await websocket.receive_text()
        await sio.emit("code_change", data, room=user_id)

@router.post("/update_content", response_model=CodeEditorContentSchema)
async def update_content(content: CodeEditorContentSchema):
    # Update code editor content in database
    await database["code_editor_contents"].replace_one({"user_id": content.user_id}, content.dict(), upsert=True)

    # Emit code change event to WebSocket clients
    await sio.emit("code_change", content.content, room=content.user_id)

    return content

def get_socketio_client():
    client = AsyncClient()
    return client
