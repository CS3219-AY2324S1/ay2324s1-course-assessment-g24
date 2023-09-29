from typing import List

from decouple import config
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
  API_STR: str = "/api"
  JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
  JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
  ALGORITHM: str = config("HASHING_ALGORITHM", cast=str)

  ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
  REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

  BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]
  PROJECT_NAME: str = "COLLABORATION_SERVICE"

  MONGODB_CONNECTION_STRING: str = config("MONGODB_CONNECTION_STRING", cast=str)

  class Config:
    case_sensitive = True


settings = Settings()
