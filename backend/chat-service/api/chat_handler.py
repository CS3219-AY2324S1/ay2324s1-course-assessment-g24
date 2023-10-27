from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from connection_manager import connection_manager
from typing import List
import json

from models.chat_model import ChatModel

chat_router = APIRouter()
manager = connection_manager

@chat_router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            receiver_id = message['receiver_id']
            await manager.send_personal_message(data, receiver_id)
            await save_message(ChatModel(**data))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def save_message(message: ChatModel):
  try:
    ChatModel.insert_one(message)
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error saving message to the db: {str(e)}")
  