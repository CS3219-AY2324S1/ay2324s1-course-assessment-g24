from pydantic import BaseModel


class QuestionTitle(BaseModel):
    title: str
