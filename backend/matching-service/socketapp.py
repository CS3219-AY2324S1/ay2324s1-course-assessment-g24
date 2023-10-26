import os
import requests
import socketio

from fastapi import Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import match_model
from schemas import match_schema


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

sio_server = socketio.AsyncServer(
  async_mode="asgi",
  cors_allowed_origin=[]
)

users = list()

@sio_server.event
async def connect(sid, _environ, _auth):
  user = { "sid": sid }
  users.append(user)

  print("Current users", users)
  print("Connection established with", sid)

@sio_server.event 
async def get(db: Session = Depends(get_db)):
  try:
    matches = await db.query(match_model.Match).all() 
    return matches
  except Exception as err:
    sio_server.emit("error-server", { "message": "ERROR: Internal server error when retrieving all matches" })
    print(f"ERROR: Could not retrieve matches: {err}")
    return
  
async def fetch_questions(difficulty: str):
  questions = await requests.get(f"{os.getenv('QUESTION_SERVICE_URL')}/questions/{difficulty}")
  return questions

@sio_server.event
async def match(params, db: Session = Depends(get_db)):
  try:
    user_one, difficulty, socket_id_one = params

    if not user_one or not difficulty or not socket_id_one:
      sio_server.emit("missing-arguments", { "message": "ERROR: Arguments not found" })
      return
    
    print(f"Creating match for: {user_one}")
    new_match = match_model.Match(
      user_one=user_one,
      user_two=None,
      difficulty=difficulty,
      socket_id_one=socket_id_one,
      socket_id_two=None
    )

    await db.add(new_match)
    await db.commit()

    if not new_match:
      sio_server.emit("error-match", { "message": "ERROR: Couldnt create a match" })
      return
    
    joinable_match = await db.query(match_model.Match).filter(match_model.Match.user_one != user_one, match_model.Match.difficulty == difficulty, match_model.Match.user_two == None, match_model.Match.socket_two == None).first()

    if not joinable_match:
      print(f"No valid pending match for {user_one}")
      return
    
    user_two = joinable_match.user_one
    socket_id_two = joinable_match.socket_id_one

    questions = await fetch_questions(difficulty)
    room_name = user_one + "_" + user_two

    sio_server.enter_room(socket_id_one, room=room_name)
    sio_server.enter_room(socket_id_two, room=room_name)

    sio_server.emit("match-success", to=socket_id_one, data={ "room_id": room_name, "questions": questions })
    sio_server.emit("match-success", to=socket_id_two, data={ "room_id": room_name, "questions": questions })

    return len(sio_server.manager.get_participants(namespace="", room=room_name)) == 2
  except Exception as err:
    sio_server.emit("error-server", { "message": "ERROR: Internal server error when creating match" })
    print(f"ERROR: Could not create new match: {err}")
    return

@sio_server.event 
async def kill_match(params, db: Session = Depends(get_db)):
  user = params
  try:
    db.query(match_model.Match).filter(match_model.Match.user_one == user).delete()
    db.commit()
  except Exception as err:
    sio_server.emit("error-server", { "message": "ERROR: Internal server error when deleting match" })
    print(f"ERROR: Could not delete new match: {err}")
    return

@sio_server.event
async def start_room(params, db: Session = Depends(get_db)):
  sio_server.emit("partner-start", room=params["room_id"])

@sio_server.event
async def disconnect(sid):
  print("Disconnected", sid)

sio_app = socketio.ASGIApp(
  socketio_server=sio_server,
  socketio_path="sapp"
)
