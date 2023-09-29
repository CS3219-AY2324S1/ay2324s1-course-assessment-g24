from fastapi import APIRouter, HTTPException
from typing import List
from models.model import QuestionRepo

questionRouter = APIRouter()

@questionRouter.get('/', response_model=List[QuestionRepo])
async def get_questions():
  questions = await QuestionRepo.find_all().to_list()
  return questions

@questionRouter.post('/', response_model=QuestionRepo)
async def create_question(question: QuestionRepo):
  try:
      await question.insert()
      return question
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error creating question: {str(e)}")
