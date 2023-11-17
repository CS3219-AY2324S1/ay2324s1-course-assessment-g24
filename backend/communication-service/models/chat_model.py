from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4

class ChatModel(Document):
  message_id: UUID = Field(default_factory=uuid4)
  senderId: str
  roomId: str
  content: str
  timestamp: str
  
  class Settings:
    name = "latest-chat"
