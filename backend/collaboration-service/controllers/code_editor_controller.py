from fastapi import APIRouter, Depends, HTTPException
from schemas.code_editor_schema import CodeEditorContentSchema
from db import database
from models.code_editor_model import CodeEditorContent

router = APIRouter()

@router.post("/update_content", response_model=CodeEditorContentSchema)
async def update_content(content: CodeEditorContentSchema):
    # Update code editor content in database
    await database["code_editor_contents"].replace_one({"user_id": content.user_id}, content.dict(), upsert=True)
    return content
