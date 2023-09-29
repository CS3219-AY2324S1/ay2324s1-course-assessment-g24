from models.chat_model import ChatMessage

# Pydantic schema for request/response validation
class ChatMessageSchema(ChatMessage):
    class Config:
        orm_mode = True
