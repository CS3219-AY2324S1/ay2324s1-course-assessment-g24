import asyncio
import websockets
import json
from typing import Dict, List

connections = {}

async def chat_handler(websocket, path):
    user_id = path.strip("/")
    connections[user_id] = websocket

    try:
        async for message in websocket:
            data = json.loads(message)
            receiver_id = data['receiverId']
            await connections[receiver_id].send(message)
    except websockets.exceptions.ConnectionClosedError:
        pass
    finally:
        del connections[user_id]

async def start_server():
    server = await websockets.serve(chat_handler, "localhost", 8001)
    await server.wait_closed()
