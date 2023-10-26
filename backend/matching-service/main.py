from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import match_model
from database import engine
from socketapp import sio_app

from dotenv import load_dotenv
load_dotenv()

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


