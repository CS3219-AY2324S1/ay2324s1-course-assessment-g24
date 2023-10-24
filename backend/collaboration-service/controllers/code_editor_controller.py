# from fastapi import APIRouter, Depends, HTTPException, WebSocket
# from models.code_editor_model import CodeEditorContent
# from schema.code_editor_schema import CodeEditorContentSchema
# from websocket import sio

# router = APIRouter()

# @router.websocket("/ws/{user_id}")
# async def websocket_endpoint(
#     websocket: WebSocket,
#     user_id: str,
# ):
#     await websocket.accept()
#     await sio.emit("join_room", room=user_id)

#     while True:
#         data = await websocket.receive_text()
#         await sio.emit("code_change", data, room=user_id)

# @router.post("/update_content", response_model=CodeEditorContentSchema)
# async def update_content(content: CodeEditorContentSchema):
#     # Update code editor content in database
#     await CodeEditorContent.update_or_create(
#         {"user_id": content.user_id},
#         {"$set": {"content": content.content}},
#         upsert=True
#     )

#     # Emit code change event to WebSocket clients
#     await sio.emit("code_change", content.content, room=content.user_id)

#     return content

from fastapi import WebSocket
from backend.collaborative-service.websocket import socketio

async def emit_content_change(room_id: str, new_content: str):
    await socketio.emit('content-change', new_content, room=room_id)
