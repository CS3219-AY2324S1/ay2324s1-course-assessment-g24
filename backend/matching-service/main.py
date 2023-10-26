from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from socketapp import sio_app

from models import match_model
from database import engine

match_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(path="/", app=sio_app)

app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def home():
  return {
    "message": "Hello from Matching Service!"
  }


