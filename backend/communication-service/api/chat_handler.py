from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from connection_manager import manager
from typing import List
import json
from datetime import datetime

from models.chat_model import ChatModel

chat_router = APIRouter()

@chat_router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            # Receive and parse data from client
            data = await websocket.receive_text()
            message = json.loads(data)
            senderId = message["senderId"]
            receiverId = message["receiverId"]
            content = message["content"]
            
            # Send message to relevant client
            dataToSend = json.dumps({ "senderId": senderId, "content": content })
            await manager.send_personal_message(dataToSend, receiverId)

            # Update database
            message["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            await save_message(ChatModel(**message))
    except WebSocketDisconnect:
        print("Disconnected :/")
        manager.disconnect(websocket, client_id)

async def save_message(message: ChatModel):
  try:
    print(message)
    await ChatModel.insert_one(message)
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error saving message to the db: {str(e)}")
  