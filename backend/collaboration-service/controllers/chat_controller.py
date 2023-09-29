from fastapi import APIRouter, Depends, HTTPException
from schemas.chat_schema import ChatMessageSchema
from db import database
from models.chat_model import ChatMessage

router = APIRouter()

@router.post("/send_message", response_model=ChatMessageSchema)
async def send_message(message: ChatMessageSchema):
    # Insert message into database
    message_doc = await database["chat_messages"].insert_one(message.dict())
    message.id = str(message_doc.inserted_id)
    return message
