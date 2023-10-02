from typing import List

from decouple import config
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]
  PROJECT_NAME: str = "COLLABORATION_SERVICE"
  
  MONGODB_CONNECTION_STRING: str = config("MONGODB_CONNECTION_STRING", cast=str)

  class Config:
    case_sensitive = True

settings = Settings()