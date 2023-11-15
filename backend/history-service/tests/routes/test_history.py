from models.history_model import History
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_history(client: AsyncClient):
    test_history_payload = {
        "email": "hardik@example.com",
        "matched_email": "shivang@parametriks.com",
        "difficulty_level": "Hard",
        "question_title": "Life",
        "question_id": "653b730e2580dc3c38b27e6d",
    }

    response = await client.post("/api/history", json=test_history_payload)

    assert response.status_code == 200
    assert response.json()["email"] == test_history_payload["email"]


@pytest.mark.asyncio
async def test_get_histories_by_user(client: AsyncClient):
    test_history_payload = {
        "email": "hardik@example.com",
        "matched_email": "shivang@parametriks.com",
        "difficulty_level": "Hard",
        "question_title": "Life",
        "question_id": "653b730e2580dc3c38b27e6d",
    }

    response = await client.post("/api/history", json=test_history_payload)
    test_user_email = "hardik@example.com"
    # Assuming there is a history record for the test user in the database
    response = await client.get(f"/api/history?email={test_user_email}")
    print(response)

    assert response.status_code == 200


@pytest.mark.asyncio
async def test_delete_histories_by_user(client: AsyncClient):
    test_history_payload = {
        "email": "hardik@example.com",
        "matched_email": "shivang@parametriks.com",
        "difficulty_level": "Hard",
        "question_title": "Life",
        "question_id": "653b730e2580dc3c38b27e6d",
    }

    response = await client.post("/api/history", json=test_history_payload)
    test_user_email = "hardik@example.com"
    # Assuming there is a history record for the test user in the database
    response = await client.delete(f"/api/history?email={test_user_email}")
    print(response)

    assert response.status_code == 200


@pytest.mark.asyncio
async def test_create_history_error(client: AsyncClient, monkeypatch):
    test_history_payload = {
        "email": "hardik@example.com",
        "matched_email": "shivang@parametriks.com",
        "difficulty_level": "Hard",
        "question_title": "Life",
        "question_id": "653b730e2580dc3c38b27e6d",
    }

    def mock_insert(*args, **kwargs):
        raise Exception("Mocked error during insert operation")

    monkeypatch.setattr(History, "insert", mock_insert)

    response = await client.post("/api/history", json=test_history_payload)

    assert response.status_code == 500
    assert "Error creating history" in response.text


@pytest.mark.asyncio
async def test_get_histories_by_user_nonexistent_user(client: AsyncClient):
    test_nonexistent_user_email = "nonexistent@example.com"

    response = await client.get(f"/api/history?email={test_nonexistent_user_email}")

    assert response.status_code == 200
    assert response.json()["histories"] == []


@pytest.mark.asyncio
async def test_get_histories_by_user_empty_history(client: AsyncClient):
    test_user_email = "test@example.com"

    response = await client.get(f"/api/history?email={test_user_email}")

    assert response.status_code == 200
    assert response.json()["histories"] == []


@pytest.mark.asyncio
async def test_delete_histories_by_user_nonexistent_user(client: AsyncClient):
    test_nonexistent_user_email = "nonexistent@example.com"

    response = await client.delete(f"/api/history?email={test_nonexistent_user_email}")

    assert response.status_code == 200


@pytest.mark.asyncio
async def test_delete_histories_by_user_multiple_histories(client: AsyncClient):
    test_user_email = "test@example.com"

    response = await client.delete(f"/api/history?email={test_user_email}")

    assert response.status_code == 200
