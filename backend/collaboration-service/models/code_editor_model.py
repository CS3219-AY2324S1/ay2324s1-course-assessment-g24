from pydantic import BaseModel
from beanie import init_beanie
from beanie import Document
from beanie.odm.models import init_document

class CodeEditorContent(Document):
    user_id: str
    content: str

    class Settings:
        name = "code-editor"