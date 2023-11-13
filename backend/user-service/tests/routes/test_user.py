import pytest
from httpx import AsyncClient
from tests.util import auth_tokens


@pytest.mark.asyncio
async def test_create_user(client: AsyncClient):
    user_data = {"email": "johnny@example.com", "password": "secret"}
    response = await client.post("/api/users/create", json=user_data)
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_authenticate_user(client: AsyncClient) -> None:
    """Test authenticating a user and getting authorization token."""
    user_data = {"email": "johnnysins@example.com", "password": "secret"}
    response = await client.post("/api/users/create", json=user_data)

    assert response.status_code == 200
    assert "user_id" in response.json()
    assert "email" in response.json()
    assert response.json()["email"] == user_data["email"]

    response = await auth_tokens(client, user_data["email"], user_data["password"])
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "refresh_token" in response.json()


@pytest.mark.asyncio
async def test_get_me(client: AsyncClient) -> None:
    """Test getting details of the currently logged-in user."""
    user_data = {"email": "johnnybhai@example.com", "password": "secret"}
    response = await client.post("/api/users/create", json=user_data)

    assert response.status_code == 200
    assert "user_id" in response.json()
    assert "email" in response.json()
    assert response.json()["email"] == user_data["email"]

    response = await auth_tokens(client, user_data["email"], user_data["password"])

    assert response.status_code == 200
    token = response.json()["access_token"]

    me_response = await client.get(
        "/api/users/me", headers={"Authorization": f"Bearer {token}"}
    )
    assert me_response.status_code == 200
    assert me_response.json()["email"] == user_data["email"]
