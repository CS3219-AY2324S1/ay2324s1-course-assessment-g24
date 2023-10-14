from pydantic import BaseModel

class CodeEditorContentSchema(BaseModel):
    user_id: str
    content: str
