"""Common test utilities."""

from httpx import AsyncClient


def auth_header_token(token: str) -> dict[str, str]:
    """Create authorization headers with a token value."""
    return {"Authorization": f"Bearer {token}"}


async def auth_tokens(
    client: AsyncClient, email: str, password: str | None = None
):

    data = {
      "email": email, 
      "password": password or email
    }
    resp = await client.post("/api/auth/login", json=data)
    return resp


# async def auth_headers(
#     client: AsyncClient, email: str, password: str | None = None
# ) -> dict[str, str]:
#     """Return the authorization headers for an email."""
#     auth = await auth_payload(client, email, password)
#     return auth_header_token(auth.access_token)

