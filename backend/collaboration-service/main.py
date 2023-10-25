from fastapi import FastAPI, HTTPException, Path, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List
from bson import ObjectId
from dotenv import load_dotenv
import os
import asyncio
import websockets
from websocket_server import start_server

class User(BaseModel):
    username: str

class Message(BaseModel):
    senderId: str
    receiverId: str
    content: str
    timestamp: str

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONNECTION_STRING = os.getenv('MONGODB_CONNECTION_STRING')

@app.on_event("startup")
async def on_startup():
    client = AsyncIOMotorClient(os.getenv('MONGODB_CONNECTION_STRING'))
    app.mongodb = client.get_database("test")

    loop = asyncio.get_event_loop()
    loop.create_task(start_server())  # Start WebSocket server as a separate task


@app.post("/api/send-message")
async def send_message(message: Message):
    try:
        message.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        await app.mongodb.messages.insert_one(message.dict())
        return {"message": "Message sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.get("/api/get-messages/{sender_id}/{receiver_id}")
# async def get_messages(sender_id: str, receiver_id: str):
#     try:
#         cursor = app.mongodb.messages.find({
#             "$or": [
#                 {"senderId": sender_id, "receiverId": receiver_id},
#                 {"senderId": receiver_id, "receiverId": sender_id}
#             ]
#         })
        
#         messages = [message async for message in cursor]
#         # Convert ObjectId to string
#         for message in messages:
#             message['_id'] = str(message['_id'])
#         return messages
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


class WebSocketManager:
    def __init__(self):
        self.connections = {}

    async def connect(self, websocket, user_id):
        await websocket.accept()
        self.connections[user_id] = websocket

    def disconnect(self, user_id):
        del self.connections[user_id]

    async def send_message(self, receiver_id, message):
        await self.connections[receiver_id].send_text(message)

manager = WebSocketManager()

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            receiver_id = message['receiverId']
            await manager.send_message(receiver_id, data)
    except WebSocketDisconnect:
        manager.disconnect(user_id)
        await manager.broadcast(f"User {user_id} left the chat")

