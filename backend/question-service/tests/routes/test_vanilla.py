import pytest 
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_question_by_difficulty(client: AsyncClient):
  question = {
    "_id": "5eb7cf5a86d9755df3a6c593",
    "title": "Two Sum",
    "topic": "HashMap",
    "difficulty_level": "EASY",
    "question_prompt": [
      "Give me Two Sum of Two Numbers"
    ],
    "examples": [
      "Example 1",
      "Example 2"
    ],
    "popularity": 0,
    "upvotes": 0,
    "downvotes": 0
  }

  await client.post("/questions", json=question)

  difficulty = "EASY"
  multiplicity = 1
  response = await client.post(f"/questions/{difficulty}/{multiplicity}")
  questions = response.json()
  assert len(questions) == multiplicity


@pytest.mark.asyncio
async def test_upvote_and_downvote_question(client: AsyncClient):
    question = {
    "_id": "5eb7cf5a86d9755df3a6c593",
    "title": "Two Sum",
    "topic": "HashMap",
    "difficulty_level": "EASY",
    "question_prompt": [
      "Give me Two Sum of Two Numbers"
    ],
    "examples": [
      "Example 1",
      "Example 2"
    ],
    "popularity": 0,
    "upvotes": 0,
    "downvotes": 0
  }

    await client.post("/questions", data=question)
    difficulty = "EASY"
    multiplicity = 1
    response = questions = await client.post(f"/questions/{difficulty}/{multiplicity}")
    title = "Two Sum"
    upvote_response = await client.post(f"/questions/popular/upvote/{title}")
    downvote_response = await client.post(f"/questions/popular/downvote/{title}")
    upvoted_popularity = upvote_response.json().get("popularity")
    downvoted_popularity = downvote_response.json().get("popularity")

@pytest.mark.asyncio
async def test_upvote_and_downvote_nonexistent_question(client: AsyncClient):
    title = "Nonexistent Question"
    upvote_response = await client.post(f"/questions/popular/upvote/{title}")
    downvote_response = await client.post(f"/questions/popular/downvote/{title}")
    assert upvote_response.status_code == 404
    assert downvote_response.status_code == 404

async def test_get_multiple_questions(client: AsyncClient):
    questions_data = [
        {
          "_id": "5eb7cf5a86d9755df3a6c593",
          "title": "Two Sum",
          "topic": "HashMap",
          "difficulty_level": "EASY",
          "question_prompt": [
            "Give me Two Sum of Two Numbers"
          ],
          "examples": [
            "Example 1",
            "Example 2"
          ],
          "popularity": 0,
          "upvotes": 0,
          "downvotes": 0
        },  # Question 1
        {
          "_id": "5eb7cf5a86d9755df3a6c593",
          "title": "Two Sum",
          "topic": "HashMap",
          "difficulty_level": "EASY",
          "question_prompt": [
            "Give me Two Sum of Two Numbers"
          ],
          "examples": [
            "Example 1",
            "Example 2"
          ],
          "popularity": 0,
          "upvotes": 0,
          "downvotes": 0
        },  # Question 2
    ]

    for question_data in questions_data:
        await client.post("/questions", json=question_data)

    difficulty = "EASY"
    multiplicity = 1
    response = await client.post(f"/questions/{difficulty}/{multiplicity}")
    questions = response.json()
    assert len(questions) == multiplicity

@pytest.mark.asyncio
async def test_delete_question(client: AsyncClient):
    question_data = {
      "_id": "5eb7cf5a86d9755df3a6c593",
      "title": "Two Sum",
      "topic": "HashMap",
      "difficulty_level": "EASY",
      "question_prompt": [
        "Give me Two Sum of Two Numbers"
      ],
      "examples": [
        "Example 1",
        "Example 2"
      ],
      "popularity": 0,
      "upvotes": 0,
      "downvotes": 0
    }  
    title = question_data["title"]

    # Add the question
    await client.post("/questions", json=question_data)

    # Delete the question
    delete_response = await client.delete(f"/questions/title?q_title={title}")

    # Attempt to retrieve the deleted question
    get_response = await client.get(f"/questions/title/{title}")
    assert get_response.status_code == 500

@pytest.mark.asyncio
async def test_get_nonexistent_question_by_title(client: AsyncClient):
    nonexistent_title = "Nonexistent Question Title"
    response = await client.get(f"/questions/title/{nonexistent_title}")
    assert response.status_code == 500

@pytest.mark.asyncio
async def test_get_questions_by_nonexistent_difficulty(client: AsyncClient):
    nonexistent_difficulty = "UNKNOWN_DIFFICULTY"
    response = await client.post(f"/questions/{nonexistent_difficulty}/1")
    assert response.status_code == 500

@pytest.mark.asyncio
async def test_get_popular_questions_by_nonexistent_difficulty(client: AsyncClient):
    nonexistent_difficulty = "UNKNOWN_DIFFICULTY"
    n = 1
    response = await client.post(f"/questions/{nonexistent_difficulty}/{n}/popular")
    assert response.status_code == 422



