from fastapi import FastAPI
from pydantic import BaseModel, Field
from beanie import Document
from uuid import UUID, uuid4

class QuestionRepo(Document):
  question_id: UUID = Field(default_factory=uuid4)
  topic: str
  difficulty_level: str
  title: str
  prompt: str
  
  class Settings:
    name = "question-repo"
