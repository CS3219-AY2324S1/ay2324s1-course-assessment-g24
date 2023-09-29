from pydantic import BaseModel
from beanie import init_beanie
from beanie.odm.models import init_document

class ChatMessage(BaseModel):
    sender_id: str
    receiver_id: str
    message: str

init_document(ChatMessage)
