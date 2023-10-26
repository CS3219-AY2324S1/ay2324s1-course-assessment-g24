from pydantic import BaseModel

class Match(BaseModel):
  user_one: str
  user_two: str | None
  socket_one: str
  socket_two: str | None
  difficulty: str

  class Config:
    from_attributes = True
