from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocket
from fastapi.responses import HTMLResponse
import websockets

app = FastAPI()

# Configure CORS to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    # not sure how to set CORS configuration
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return "<h1>Hello world from collab service</h1>"


app.add_websocket_route("/ws", WebSocket)
async def websocket_handler(websocket: websockets.WebSocketServerProtocol, path: str):
    await websocket.send("<h1>Hello world from collab service via WebSocket</h1>")
