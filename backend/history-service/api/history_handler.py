from fastapi import APIRouter, HTTPException
from typing import List

from models.history_model import History
from schemas.history_schema import User

history_router = APIRouter()

@history_router.get("/", response_model=List[History])
async def get_histories_by_user(request: User):
  try:
    email = request["email"]
    histories = await History.find(History.email == email).to_list()
    return histories
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving history by user: {str(e)}")

@history_router.post("/", response_model=History)
async def create_history(history: History):
  try:
    await history.insert()
    return history
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error creating history: {str(e)}")

@history_router.delete("/")
async def delete_histories_by_user(request: User):
  try:
    email = request["email"]
    await History.find(History.email == email).delete()
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error deleting history by user: {str(e)}")

