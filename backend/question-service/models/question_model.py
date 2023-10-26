from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4

class QuestionRepo(Document):
  question_id: UUID = Field(default_factory=uuid4)
  topic: str
  difficulty_level: str
  title: Indexed(str, unique=True)
  question_prompt: str
  examples: str
  
  class Settings:
    name = "questions"
