from fastapi import APIRouter
from controllers.chat_controller import router as chat_router

router = APIRouter()
router.include_router(chat_router, prefix="/chat", tags=["chat"])
