from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]

  class Config:
    case_sensitive = True

settings = Settings()
