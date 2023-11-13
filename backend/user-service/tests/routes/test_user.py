import pytest
from httpx import AsyncClient
from tests.util import auth_tokens


@pytest.mark.asyncio
async def test_user_get(client: AsyncClient) -> None:
    """Test user endpoint returns authorized user."""
    user = await client.post("/api/users/create", data={
        "email": "johnny@example.com",
        "password": "secret"
    })
    print("user", user)

    # tokens = await auth_tokens(user.email, user.password)

    # print("tokens", tokens)

    # resp = await client.get("/api/users/me", )
    # assert resp.status_code == 200
    # data = resp.json()
    # assert data["email"] == email

