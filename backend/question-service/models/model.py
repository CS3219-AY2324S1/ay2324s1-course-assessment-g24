from fastapi import FastAPI
from pydantic import BaseModel, Field
from beanie import Document
from uuid import UUID, uuid4
from typing import List

class QuestionRepo(Document):
  question_id: UUID = Field(default_factory=uuid4)
  leet_tag: str
  topic: str
  difficulty_level: str
  title: str
  question_prompt: str
  examples: List[str]
  popularity: float
  upvotes: int
  downvotes: int 

  class Settings:
    name = "question-repo"
