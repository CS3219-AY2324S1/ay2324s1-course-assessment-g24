from pydantic import BaseModel


class HistoryOut(BaseModel):
    histories: list
