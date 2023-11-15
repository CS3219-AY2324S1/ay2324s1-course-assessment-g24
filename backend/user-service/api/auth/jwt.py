from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from pydantic import ValidationError
from typing import Any

from api.deps.user_deps import get_current_user
from controllers.user_controller import UserController
from core.config import settings
from core.security import create_access_token, create_refresh_token
from models.user_model import User
from schemas.auth_schema import TokenPayload, TokenSchema
from schemas.user_schema import UserAuth, UserOut

auth_router = APIRouter()


@auth_router.post(
    "/login",
    summary="Create access and refresh tokens for user",
    response_model=TokenSchema,
)
async def login(user_data: UserAuth) -> Any:
    user = await UserController.authenticate(
        email=user_data.email, password=user_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }


@auth_router.post(
    "/test-token", summary="Test if the access token is valid", response_model=UserOut
)
async def test_token(user: User = Depends(get_current_user)):
    return user


@auth_router.post("/refresh", summary="Refresh token", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(
            refresh_token,
            settings.JWT_REFRESH_SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await UserController.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }
