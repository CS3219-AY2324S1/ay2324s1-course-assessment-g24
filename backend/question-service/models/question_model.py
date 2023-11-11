from beanie import Document, Indexed
from typing import List

class QuestionRepo(Document):
  title: Indexed(str, unique=True)
  topic: str
  difficulty_level: str
  question_prompt: List[str]
  examples: List[str]
  popularity: float
  upvotes: int
  downvotes: int 
  
  class Settings:
    name = "questionsDB"
