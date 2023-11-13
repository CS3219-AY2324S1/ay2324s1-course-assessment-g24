import pymongo
from fastapi import APIRouter, Depends, HTTPException, status

from api.deps.user_deps import get_current_user
from controllers.user_controller import UserController
from models.user_model import User
from schemas.user_schema import UserAuth, UserOut, UserUpdate

user_router = APIRouter()


@user_router.post("/create", summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    try:
        return await UserController.create_user(data)
    except pymongo.errors.DuplicateKeyError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@user_router.get(
    "/me", summary="Get details of currently logged in user", response_model=UserOut
)
async def get_me(user: User = Depends(get_current_user)):
    return user


@user_router.post("/update", summary="Update User", response_model=UserOut)
async def update_user(data: UserUpdate, user: User = Depends(get_current_user)):
    try:
        return await UserController.update_user(user.user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User does not exist"
        )
