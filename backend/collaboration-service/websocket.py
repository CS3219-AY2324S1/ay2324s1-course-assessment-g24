# import socketio
# from fastapi import FastAPI, WebSocket, Depends

# sio = socketio.AsyncServer(cors_allowed_origins="*")
# app = FastAPI()

# app.add_websocket_route("/ws", WebSocketEndpoint)

# class WebSocketEndpoint(WebSocket):
#     async def on_connect(self):
#         await self.accept()

#     async def on_disconnect(self, close_code):
#         pass

#     async def on_receive(self, message):
#         await sio.emit("code_change", message)

# @sio.event
# async def update_code(sid, data):
#     await sio.emit("update_code", data, room=data["user_id"])

# @sio.event
# async def code_change(sid, data):
#     await sio.emit("code_change", data, room=data["user_id"])

# import socketio

# sio = socketio.AsyncServer(cors_allowed_origins="*")

# class WebSocketNamespace(socketio.AsyncNamespace):
#     async def on_connect(self, sid, environ):
#         print(f"Client {sid} connected")

#     async def on_disconnect(self, sid):
#         print(f"Client {sid} disconnected")

#     async def on_code_change(self, sid, data):
#         await self.emit("code_change", data)

# sio.register_namespace(WebSocketNamespace('/ws'))

from socketio import AsyncServer, ASGIApp

sio = AsyncServer(async_mode='asgi', cors_allowed_origins='*')

app = ASGIApp(sio)

# Create a dictionary to store room states
room_states = {}

@sio.event
async def connect(sid, environ):
    room_states[sid] = ""

@sio.event
async def disconnect(sid):
    del room_states[sid]

@sio.event
async def content_change(sid, data):
    room_states[sid] = data
    await sio.emit('content-change', data, room=sid)


