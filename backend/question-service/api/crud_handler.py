from fastapi import APIRouter, HTTPException, Form
from models.question_model import QuestionCrudRepo
from typing import List

question_crud_router = APIRouter()

# =============================================
# Additional APIs exclusively for Assignment 2B
# =============================================

# Get all questions
@question_crud_router.get("/", response_model=List[QuestionCrudRepo])
async def get_questions_crud():
  print("hello")
  try:
    questions = await QuestionCrudRepo.find_all().to_list()
    return questions
  except Exception as e:
    raise HTTPException(
      status_code=500, 
      detail=f"Error retrieving all questions: {str(e)}"
    )
    
# Update
@question_crud_router.put("/{qid}", response_model=QuestionCrudRepo)
async def update_question_crud(qid: int, question: QuestionCrudRepo):
    try:
        # Find the document by qid
        original_question = await QuestionCrudRepo.find_one(QuestionCrudRepo.qid == qid)
        if original_question is None:
            raise HTTPException(status_code=404, detail="Question not found")
        
        # Delete the original document
        await original_question.delete()

        # Create a new document with the updated data
        new_question = await QuestionCrudRepo.insert(question)
        return new_question        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error updating question: {str(e)}"
        )

# delete question
@question_crud_router.delete("/{qid}", response_model=QuestionCrudRepo)
async def delete_question_crud(qid: int):
    try:
        # Find the document by qid
        question = await QuestionCrudRepo.find_one(QuestionCrudRepo.qid == qid)
        if question is None:
            raise HTTPException(status_code=404, detail="Question not found")

        # Delete the document
        await question.delete()
        return {"message": f"Question with qid {qid} has been deleted."}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error deleting question: {str(e)}"
        )

# Create a new question
@question_crud_router.post("/", response_model=QuestionCrudRepo)
async def create_question_crud(question: QuestionCrudRepo):
    try:
        new_question = await QuestionCrudRepo.create(question)
        return new_question
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error creating question: {str(e)}"
        )