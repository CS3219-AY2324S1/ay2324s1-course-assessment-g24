import pytest
from httpx import AsyncClient
from tests.util import auth_tokens


@pytest.mark.asyncio
async def test_login(client: AsyncClient) -> None:
    """Test the login endpoint."""
    user_data = {"email": "sumanthKing@example.com", "password": "secret"}
    await client.post("/api/users/create", json=user_data)

    login_response = await client.post("/api/auth/login", json=user_data)
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()
    assert "refresh_token" in login_response.json()


@pytest.mark.asyncio
async def test_test_token(client: AsyncClient) -> None:
    """Test the test-token endpoint."""
    user_data = {"email": "johnny@example.com", "password": "secret"}
    response = await client.post("/api/users/create", json=user_data)

    assert response.status_code == 200
    assert "user_id" in response.json()
    assert "email" in response.json()
    assert response.json()["email"] == user_data["email"]

    auth_response = await auth_tokens(client, user_data["email"], user_data["password"])
    assert auth_response.status_code == 200
    token = auth_response.json()["access_token"]

    test_token_response = await client.post(
        "/api/auth/test-token", headers={"Authorization": f"Bearer {token}"}
    )
    assert test_token_response.status_code == 200
    assert "email" in test_token_response.json()
    assert test_token_response.json()["email"] == user_data["email"]


@pytest.mark.asyncio
async def test_refresh_token(client: AsyncClient) -> None:
    """Test the refresh endpoint."""
    user_data = {"email": "sumanthisboss@example.com", "password": "secret"}
    await client.post("/api/users/create", json=user_data)

    login_response = await client.post("/api/auth/login", json=user_data)
    assert login_response.status_code == 200
    refresh_token = login_response.json()["refresh_token"]

    refresh_response = await client.post("/api/auth/refresh", json=refresh_token)
    print(refresh_response.json())
    assert refresh_response.status_code == 200
    assert "access_token" in refresh_response.json()
    assert "refresh_token" in refresh_response.json()
