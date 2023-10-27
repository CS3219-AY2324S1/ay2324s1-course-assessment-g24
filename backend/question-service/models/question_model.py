from beanie import Document, Indexed

class QuestionRepo(Document):
  title: Indexed(str, unique=True)
  topic: str
  difficulty_level: str
  question_prompt: str
  examples: str
  
  class Settings:
    name = "questions"
