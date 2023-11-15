from fastapi import APIRouter, HTTPException

from models.history_model import History
from schemas.history_schema import HistoryOut

history_router = APIRouter()


@history_router.get("/history", response_model=HistoryOut)
async def get_histories_by_user(email: str):
    try:
        histories = await History.find(History.email == email).to_list()
        return {"histories": histories}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving history by user: {str(e)}"
        )


@history_router.post("/history", response_model=History)
async def create_history(history: History):
    try:
        await history.insert()
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating history: {str(e)}")


@history_router.delete("/history")
async def delete_histories_by_user(email: str):
    try:
        await History.find(History.email == email).delete()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error deleting history by user: {str(e)}"
        )
