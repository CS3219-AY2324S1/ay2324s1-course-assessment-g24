import asyncio
import websockets
import json
from typing import Dict, List

# # Store active connections
# connections: Dict[str, websockets.WebSocketServerProtocol] = {}

# async def chat_handler(websocket: websockets.WebSocketServerProtocol, path: str):
#     user_id = path.strip("/")
#     connections[user_id] = websocket

#     try:
#         async for message in websocket:
#             # Broadcast message to all connected clients
#             await asyncio.gather(
#                 *[connection.send(message) for connection in connections.values()]
#             )
#     except websockets.exceptions.ConnectionClosedError:
#         pass
#     finally:
#         del connections[user_id]

# async def start_server():
#     server = await websockets.serve(chat_handler, "localhost", 8001)
#     await server.wait_closed()

# asyncio.get_event_loop().run_until_complete(start_server())

# Store active connections
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

asyncio.get_event_loop().run_until_complete(start_server())

