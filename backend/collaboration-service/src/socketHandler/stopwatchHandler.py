from fastapi import FastAPI, WebSocket
from typing import Dict
import asyncio

app = FastAPI()


stopwatches: Dict[str, dict] = {}

async def handle_timer(room_id):
    while room_id in stopwatches and stopwatches[room_id]["is_active"] and not stopwatches[room_id]["is_paused"]:
        current_time = stopwatches[room_id]["time"]
        new_time = {
            "hours": current_time["hours"],
            "minutes": current_time["minutes"],
            "seconds": current_time["seconds"] + 1,
        }
        if new_time["seconds"] == 60:
            new_time["seconds"] = 0
            new_time["minutes"] += 1
            if new_time["minutes"] == 60:
                new_time["minutes"] = 0
                new_time["hours"] += 1
        stopwatches[room_id]["time"] = new_time
        await asyncio.sleep(1)


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()

    if room_id not in stopwatches:
        stopwatches[room_id] = {
            "is_active": False,
            "is_paused": False,
            "time": {"hours": 0, "minutes": 0, "seconds": 0},
        }

        await websocket.send_json({"event": "timerLoad", "data": stopwatches[room_id]})

        try:
          while True:
            data = await websocket.receive_text()
            if data == "timerStart":
                stopwatches[room_id]["is_active"] = True
                stopwatches[room_id]["is_paused"] = False
                asyncio.create_task(handle_timer(room_id))
            elif data == "timerStop":
                stopwatches[room_id]["is_active"] = False
            elif data == "timerPause":
                stopwatches[room_id]["is_active"] = False
                stopwatches[room_id]["is_paused"] = True
            elif data == "timerResume":
                stopwatches[room_id]["is_active"] = True
                stopwatches[room_id]["is_paused"] = False
                asyncio.create_task(handle_timer(room_id))
            await websocket.send_json({"event": "timerLoad", "data": stopwatches[room_id]})
        except Exception:
          pass
