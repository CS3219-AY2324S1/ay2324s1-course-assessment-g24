import asyncio
import socketio
import time

sio_client1 = socketio.AsyncClient()
sio_client2 = socketio.AsyncClient()


@sio_client1.event
async def connect():
    print('CLIENT 1: I\'m connected')


@sio_client1.event
async def disconnect():
    print('CLIENT 1: I\'m disconnected')

@sio_client2.event
async def connect():
    print('CLIENT 2: I\'m connected')


@sio_client2.event
async def disconnect():
    print('CLIENT 2: I\'m disconnected')

async def main():
    await sio_client1.connect(url='http://localhost:8000', socketio_path="/sapp")
    await sio_client2.connect(url='http://localhost:8000', socketio_path="/sapp")

    time.sleep(10)

    await sio_client1.disconnect()
    await sio_client2.disconnect()

asyncio.run(main())


