# from fastapi import APIRouter
# from controllers.code_editor_controller import router as code_editor_router

# router = APIRouter()
# router.include_router(code_editor_router, prefix="/code_editor", tags=["code_editor"])

from fastapi import APIRouter, WebSocket
from backend.collaboration-service.websocket import socketio

router = APIRouter()

@router.websocket("/editor/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await socketio.handle_request(websocket, room_id)
