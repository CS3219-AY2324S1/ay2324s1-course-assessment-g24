import socketio
from fastapi import FastAPI, WebSocket, Depends

sio = socketio.AsyncServer(cors_allowed_origins="*")
app = FastAPI()

app.add_websocket_route("/ws", WebSocketEndpoint)

class WebSocketEndpoint(WebSocket):
    async def on_connect(self, websocket):
        await websocket.accept()
    
    async def on_disconnect(self, websocket, close_code):
        pass

@sio.event
async def update_code(sid, data):
    await sio.emit("update_code", data, room=data["user_id"])

@sio.event
async def code_change(sid, data):
    await sio.emit("code_change", data, room=data["user_id"])
