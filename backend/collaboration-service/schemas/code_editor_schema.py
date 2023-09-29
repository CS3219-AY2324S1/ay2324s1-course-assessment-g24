from models.code_editor_model import CodeEditorContent

# Pydantic schema for request/response validation
class CodeEditorContentSchema(CodeEditorContent):
    class Config:
        orm_mode = True
