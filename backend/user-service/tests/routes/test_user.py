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
    """
    Test authenticating a user and getting authorization token.
    """
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
    """
    Test getting details of the currently logged-in user.
    """
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


@pytest.mark.asyncio
async def test_update_user(client: AsyncClient) -> None:
    """
    Test updating user information.
    """
    user_data = {"email": "johnny@example.com", "password": "secret"}
    await client.post("/api/users/create", json=user_data)

    auth_response = await auth_tokens(client, user_data["email"], user_data["password"])
    assert auth_response.status_code == 200
    token = auth_response.json()["access_token"]

    update_data = {"password": "new_secret"}
    update_response = await client.post(
        "/api/users/update",
        json=update_data,
        headers={"Authorization": f"Bearer {token}"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["email"] == user_data["email"]


@pytest.mark.asyncio
async def test_duplicate_user_creation(client: AsyncClient) -> None:
    """
    Test creating a user with a duplicate email should fail.
    """
    user_data = {"email": "pranav@example.com", "password": "secret"}
    # Create the user for the first time
    response = await client.post("/api/users/create", json=user_data)
    assert response.status_code == 200

    # Attempt to create the same user again (should fail)
    duplicate_response = await client.post("/api/users/create", json=user_data)
    assert duplicate_response.status_code == 400


@pytest.mark.asyncio
async def test_unauthorized_access_me(client: AsyncClient) -> None:
    """
    Test accessing /api/users/me without authentication should fail.
    """
    response = await client.get("/api/users/me")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_update_unauthorized_user(client: AsyncClient) -> None:
    """
    Test updating user information without authentication should fail.
    """
    update_data = {"password": "new_secret"}
    update_response = await client.post("/api/users/update", json=update_data)
    assert update_response.status_code == 401


@pytest.mark.asyncio
async def test_update_nonexistent_user(client: AsyncClient) -> None:
    """
    Test updating information for a nonexistent user should fail.
    """
    user_data = {"email": "nonexistent@example.com", "password": "secret"}

    auth_response = await auth_tokens(client, user_data["email"], user_data["password"])
    assert auth_response.status_code == 400
