from pydantic import BaseModel
from beanie import init_beanie
from beanie.odm.models import init_document

class CodeEditorContent(BaseModel):
    user_id: str
    content: str

init_document(CodeEditorContent)
