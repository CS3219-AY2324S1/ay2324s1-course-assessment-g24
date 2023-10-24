# import motor.motor_asyncio
# from fastapi import FastAPI, WebSocket
# from fastapi.responses import HTMLResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import socketio

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware, 
#     allow_origins=['http://localhost:5173'], # frontend origin
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# sio = socketio.AsyncServer(async_mode='asgi')
# sio.attach(app)

# client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
# db = client.code_editor 

# # Model for WebSocket connection parameters
# class ConnectionParams(BaseModel):
#     user_id: str
#     partner_id: str

# # ...

# @sio.event
# async def join_room(sid, data):
#     user_id = data['user_id']
#     partner_id = data['partner_id']
#     await sio.save_session(sid, {'user_id': user_id, 'partner_id': partner_id, 'websocket': None})

# @sio.event
# async def code_change(sid, data):
#     user_id = data['user_id']
#     partner_id = data['partner_id']
#     code = data['code']

#     # Get partner's socket ID
#     partner_sid = await sio.get_session(sid)['partner_sid']

#     if partner_sid:
#         await sio.emit('code_update', {'code': code}, room=partner_sid)


# # Define WebSocket route
# @app.websocket("/ws/{user_id}/{partner_id}")
# async def websocket_endpoint(websocket: WebSocket, params: ConnectionParams):
#     await websocket.accept()
#     user_id = params.user_id
#     partner_id = params.partner_id
    
#     async def forward_code_to_partner(code):
#         partner_socket = await db.sessions.find_one({"user_id": partner_id})
#         if partner_socket:
#             await partner_socket['websocket'].send_json({"code": code})
    
#     try:
#         while True:
#             data = await websocket.receive_json()
#             code = data['code']
            
#             # Forward code to partner
#             await forward_code_to_partner(code)
            
#             # Save code in database
#             await db.sessions.update_one(
#                 {"user_id": user_id},
#                 {"$set": {"code": code}},
#                 upsert=True
#             )
#     except WebSocketDisconnect:
#         # Disconnect handling
#         await db.sessions.delete_one({"user_id": user_id})

import os
import motor.motor_asyncio
from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocketDisconnect
from typing import Dict

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONNECTION_STRING = os.getenv('MONGODB_CONNECTION_STRING')
client = motor.motor_asyncio.AsyncIOMotorClient(CONNECTION_STRING)
app.mongodb = client.get_database("test")

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].close()
            del self.active_connections[user_id]

    async def send_code_update(self, user_id: str, code: str):
        for connection_id, connection in self.active_connections.items():
            if connection_id != user_id:
                await connection.send_text(code)

manager = ConnectionManager()

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_code_update(user_id, data)
    except WebSocketDisconnect:
        await manager.disconnect(user_id)

