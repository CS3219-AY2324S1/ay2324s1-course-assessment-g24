from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    password: str = Field(..., min_length=5, max_length=50, description="user password")
    language: str = "PYTHON"
    is_admin: bool = False

class UserOut(BaseModel):
    user_id: UUID
    email: EmailStr
    disabled: Optional[bool] = False
    language: str
    is_admin: bool

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    language: Optional[str] = None

class UserDelete(BaseModel):
    email: EmailStr
