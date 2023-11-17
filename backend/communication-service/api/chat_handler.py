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
            roomId = message["roomId"]
            content = message["content"]
            isChat = message["chat"] # if the request is abt sending a chat msg, then true
            
            # Send message to relevant client
            dataToSend = json.dumps({ "senderId": senderId, "content": content, "chat": isChat })
            await manager.send_personal_message(dataToSend, roomId)

            # Update database
            if (isChat):
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

# Mock API for returning matched ID (will remove once matching service is done)
counter = 0

@chat_router.get("/getSenderReceiver")
async def get_sender_receiver():
    global counter
    counter += 1
    val = counter % 4

    # Check the current count of requests
    if val == 1 or val == 2:
        return ["user_a", "user_b"]
    else:
        return ["user_b", "user_a"]
