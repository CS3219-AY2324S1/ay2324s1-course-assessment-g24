from fastapi import WebSocket, WebSocketDisconnect
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.connection_mapping: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.connection_mapping[client_id] = websocket

    def disconnect(self, websocket: WebSocket, client_id: str):
        self.active_connections.remove(websocket)
        if client_id in self.connection_mapping:
            del self.connection_mapping[client_id]

    async def send_personal_message(self, message: str, receiver_id: str):
        receiverSocket = self.connection_mapping[receiver_id]
        await receiverSocket.send_text(message) # message is JSON string

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()
