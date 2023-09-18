from fastapi import APIRouter

from api.auth.jwt import auth_router
from api.handlers import todo, user

router = APIRouter()

router.include_router(user.user_router, prefix="/users", tags=["users"])
router.include_router(todo.todo_router, prefix="/todo", tags=["todo"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
