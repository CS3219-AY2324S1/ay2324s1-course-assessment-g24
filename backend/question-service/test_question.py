import pytest
from httpx import AsyncClient
from beanie import init_beanie
from pydantic import BaseModel

from main import app
from core.config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from models.question_model import QuestionRepo

class Question(BaseModel):
    title: str
    topic: str
    difficulty_level: str
    question_prompt: str
    examples: str

@pytest.fixture
async def init_db():
    db_client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_STRING).test
    await init_beanie(database=db_client, document_models=[QuestionRepo])

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        yield client

async def test_get_questions(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get("/questions")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response[0]["title"] == title
    assert json_response[0]["topic"] == topic
    assert json_response[0]["difficulty_level"] == difficulty_level
    assert json_response[0]["question_prompt"] == question_prompt
    assert json_response[0]["examples"] == examples

async def test_create_question(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"

    # Act
    response = await client.post(
        "/questions",
        json={
            "title": title,
            "topic": topic,
            "difficulty_level": difficulty_level,
            "question_prompt": question_prompt,
            "examples": examples,
        },
    )

    # Assert
    assert response.status_code == 201
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == question_prompt
    assert json_response["examples"] == examples

async def test_get_question_by_title(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get(f"/questions/{title}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == question_prompt
    assert json_response["examples"] == examples

async def test_update_question(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.put(
        f"/questions/{title}",
        json={
            "title": title,
            "topic": topic,
            "difficulty_level": difficulty_level,
            "question_prompt": "Updated Question Prompt",
            "examples": examples,
        },
    )

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == "Updated Question Prompt"
    assert json_response["examples"] == examples

async def test_delete_question(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.delete(f"/questions/{title}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["message"] == "Successfully deleted question"

async def test_get_question_by_topic(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get(f"/questions/topic/{topic}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response[0]["title"] == title
    assert json_response[0]["topic"] == topic
    assert json_response[0]["difficulty_level"] == difficulty_level
    assert json_response[0]["question_prompt"] == question_prompt
    assert json_response[0]["examples"] == examples

async def test_get_question_by_difficulty_level(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get(f"/questions/difficulty_level/{difficulty_level}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response[0]["title"] == title
    assert json_response[0]["topic"] == topic
    assert json_response[0]["difficulty_level"] == difficulty_level
    assert json_response[0]["question_prompt"] == question_prompt
    assert json_response[0]["examples"] == examples

async def test_get_all_questions(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get("/questions")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response[0]["title"] == title
    assert json_response[0]["topic"] == topic
    assert json_response[0]["difficulty_level"] == difficulty_level
    assert json_response[0]["question_prompt"] == question_prompt
    assert json_response[0]["examples"] == examples

async def test_get_question_by_id(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.get(f"/questions/{title}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == question_prompt
    assert json_response["examples"] == examples

async def test_delete_question_by_id(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    # Act
    response = await client.delete(f"/questions/{title}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == question_prompt
    assert json_response["examples"] == examples

async def test_create_question(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"

    # Act
    response = await client.post(
        "/questions",
        json={
            "title": title,
            "topic": topic,
            "difficulty_level": difficulty_level,
            "question_prompt": question_prompt,
            "examples": examples,
        },
    )

    # Assert
    assert response.status_code == 201
    json_response = response.json()
    assert json_response["title"] == title
    assert json_response["topic"] == topic
    assert json_response["difficulty_level"] == difficulty_level
    assert json_response["question_prompt"] == question_prompt
    assert json_response["examples"] == examples

async def test_update_question_by_id(client: AsyncClient, init_db):
    # Arrange
    title = "Example Title"
    topic = "Example Topic"
    difficulty_level = "Easy"
    question_prompt = "Example Question Prompt"
    examples = "Example Test Cases"
    await QuestionRepo.insert_one(
        QuestionRepo(
            title=title,
            topic=topic,
            difficulty_level=difficulty_level,
            question_prompt=question_prompt,
            examples=examples,
        )
    )

    new_title = "New Example Title"
    new_topic = "New Example Topic"
    new_difficulty_level = "Medium"
    new_question_prompt = "New Example Question Prompt"
    new_examples = "New Example Test Cases"

    # Act
    response = await client.put(
        f"/questions/{title}",
        json={
            "title": new_title,
            "topic": new_topic,
            "difficulty_level": new_difficulty_level,
            "question_prompt": new_question_prompt,
            "examples": new_examples,
        },
    )

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["title"] == new_title
    assert json_response["topic"] == new_topic
    assert json_response["difficulty_level"] == new_difficulty_level
    assert json_response["question_prompt"] == new_question_prompt
    assert json_response["examples"] == new_examples