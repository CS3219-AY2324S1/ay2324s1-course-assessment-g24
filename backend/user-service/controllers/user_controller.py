from typing import Optional
from uuid import UUID

import pymongo

from core.security import get_password, verify_password
from models.user_model import User
from schemas.user_schema import UserAuth, UserUpdate

from pydantic import EmailStr


class UserController:
    @staticmethod
    async def create_user(user: UserAuth):
        if await UserController.get_user_by_email(user.email):
            raise pymongo.errors.DuplicateKeyError("User Already Exists!")

        user_in = User(
            email=user.email,
            hashed_password=get_password(user.password),
            language=user.language
        )

        await user_in.save()
        return user_in

    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
        user = await UserController.get_user_by_email(email=email)
        if not user:
            return None
        if not verify_password(password=password, hashed_pass=user.hashed_password):
            return None

        return user

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        return user

    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id)
        return user

    @staticmethod
    async def update_user(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")

        await user.update({"$set": data.dict(exclude_unset=True)})
        return user
    
    @staticmethod
    async def delete_user(email: EmailStr) -> None:
        await User.find_one(User.email == email).delete()

