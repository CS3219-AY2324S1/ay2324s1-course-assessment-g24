from pydantic import BaseModel


class HistoryOut(BaseModel):
    histories: list

class HistoryIn(BaseModel):
    email: str
    matched_email: str
    difficulty_level: str
    question_title: str
    question_id: str
