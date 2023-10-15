from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List
from bson import ObjectId

class User(BaseModel):
    username: str

class Message(BaseModel):
    senderId: str
    receiverId: str
    content: str
    timestamp: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONNECTION_STRING = "mongodb+srv://saketh:DLB0YM6PU1woIlBO@development.vy7vthu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

@app.on_event("startup")
async def on_startup():
    client = AsyncIOMotorClient(CONNECTION_STRING)
    app.mongodb = client.get_database("test")

@app.post("/api/send-message")
async def send_message(message: Message):
    try:
        message.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        await app.mongodb.messages.insert_one(message.dict())
        return {"message": "Message sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/get-messages/{sender_id}/{receiver_id}")
async def get_messages(sender_id: str, receiver_id: str):
    try:
        cursor = app.mongodb.messages.find({
            "$or": [
                {"senderId": sender_id, "receiverId": receiver_id},
                {"senderId": receiver_id, "receiverId": sender_id}
            ]
        })
        
        messages = [message async for message in cursor]
        # Convert ObjectId to string
        for message in messages:
            message['_id'] = str(message['_id'])
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
