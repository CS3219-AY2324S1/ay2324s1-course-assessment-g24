from sqlalchemy import Column, String, PrimaryKeyConstraint

from database import Base

class Match(Base):
  __tablename__ = "matches"

  user_one = Column(String, nullable=False)
  user_two = Column(String, nullable=True)
  socket_one = Column(String, nullable=False)
  socket_two = Column(String, nullable=True)
  difficulty = Column(String, nullable=False)

  match_pk = PrimaryKeyConstraint(user_one, user_two, difficulty)
