"""Pytest fixtures."""

from collections.abc import AsyncIterator

import pytest_asyncio
from asgi_lifespan import LifespanManager
from decouple import config
from fastapi import FastAPI
from httpx import AsyncClient

from core.config import settings
from main import app


# Override config settings before loading the app
settings.MONGODB_CONNECTION_STRING = config(
    "TEST_MONGO_URI", default="mongodb://localhost:27017"
)


async def clear_database(server: FastAPI) -> None:
    """Empty the test database."""
    async for collection in await server.db.list_collections():
        await server.db[collection["name"]].delete_many({})  # type: ignore[attr-defined]


@pytest_asyncio.fixture()
async def client() -> AsyncIterator[AsyncClient]:
    """Async server client that handles lifespan and teardown."""
    async with LifespanManager(app):
        async with AsyncClient(app=app, base_url="http://test") as _client:
            try:
                yield _client
            except Exception as exc:
                print(exc)
            finally:
                await clear_database(app)
