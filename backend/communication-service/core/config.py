from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from decouple import config

class Settings(BaseSettings):
  BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]

  MONGODB_CONNECTION_STRING: str = config("MONGODB_CONNECTION_STRING", cast=str)

  class Config:
    case_sensitive = True

settings = Settings()
