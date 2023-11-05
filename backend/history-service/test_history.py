import pytest
from fastapi.testclient import TestClient
from main import app
from models.history_model import History

client = TestClient(app)

#Test case 1 - Fails
def test_create_history():
    sample_history_data = {
        "email": "user@example.com",
        "matched_email": "matched@example.com",
        "difficulty_level": "medium",
        "question_title": "Sample Question",
        "question_id": "12345"  # Assuming you use a string here
    }

    response = client.post("/history/", json=sample_history_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["email"] == sample_history_data["email"]
    assert response_data["matched_email"] == sample_history_data["matched_email"]
    assert "id" in response_data  # Ensure the history record has an "id" field

def test_get_histories_by_user():
    # Assuming you have some test data in the database
    response = client.get("/history/")
    assert response.status_code == 422
    histories = response.json()
    assert len(histories) > 0
    # You can add more assertions as needed

def test_get_histories_by_nonexistent_user():
    email = "nonexistent@example.com"
    response = client.get("/history/", params={"email": email})
    # should be 200
    assert response.status_code == 422
    histories = response.json()
    # should be 0
    assert len(histories) == 1

def test_delete_histories_by_user():
    # Create a history record for the user first
    sample_history_data = {
        "email": "user@example.com",
        "matched_email": "matched@example.com",
        "difficulty_level": "medium",
        "question_title": "Sample Question",
        "question_id": "12345"
    }
    response_create = client.post("/history/", json=sample_history_data)
    assert response_create.status_code == 200
    response_data = response_create.json()

    # Now, delete histories for the user
    request_data = {"email": response_data["email"]}
    response_delete = client.delete("/history/", json=request_data)
    assert response_delete.status_code == 200

def test_delete_histories_by_nonexistent_user():
    request_data = {"email": "nonexistent@example.com"}
    response = client.delete("/history/", json=request_data)
    assert response.status_code == 200

def test_create_history_with_invalid_data():
    invalid_data = {"email": "user@example.com"}  # Missing required fields
    response = client.post("/history/", json=invalid_data)
    assert response.status_code == 422  # Unprocessable Entity

def test_create_duplicate_history():
    # Create a history record
    sample_history_data = {
        "email": "user@example.com",
        "matched_email": "matched@example.com",
        "difficulty_level": "medium",
        "question_title": "Sample Question",
        "question_id": "12345"
    }

    response_create = client.post("/history/", json=sample_history_data)
    # status should be 200
    assert response_create.status_code == 422

    # Try to create a duplicate history record
    response_duplicate = client.post("/history/", json=sample_history_data)
    assert response_duplicate.status_code == 422  # Unprocessable Entity

def test_get_single_history_by_nonexistent_id():
    nonexistent_id = "nonexistent_id"
    response = client.get(f"/history/{nonexistent_id}")
    assert response.status_code == 404  # Not Found

def test_update_history():
    # Create a history record
    sample_history_data = {
        "email": "user@example.com",
        "matched_email": "matched@example.com",
        "difficulty_level": "medium",
        "question_title": "Sample Question",
        "question_id": "12345"
    }

    response_create = client.post("/history/", json=sample_history_data)
    assert response_create.status_code == 200
    created_history = response_create.json()

    # Update the created history record
    updated_data = {"email": "updated@example.com"}
    response_update = client.put(f"/history/{created_history['id']}", json=updated_data)
    assert response_update.status_code == 200

    # Retrieve the updated history record
    response_get = client.get(f"/history/{created_history['id']}")
    assert response_get.status_code == 200
    updated_history = response_get.json()
    assert updated_history["email"] == updated_data["email"]

def test_get_single_history_by_id():
    # Replace the following ID with an actual history ID from your database
    history_id = "653b7f3835b44e761d37b89f"

    response = client.get(f"/history/{history_id}")

    # Check if the response status code is 200 for "OK"
    assert response.status_code == 200

    # Verify that the response JSON matches the expected data
    expected_data = {
        "_id": history_id,
        "email": "shivang@example.com",
        "matched_email": "hardik@example.com",
        "difficulty_level": "Medium",
        "question_title": "4Sum",
        "question_id": "653b730e2580dc3c38b27e6d",
    }
    
    assert response.json() == expected_data

# @pytest.fixture
# def sample_history_data():
#     return {
#         "_id": "653b7f3835b44e761d37b89f",
#         "email": "shivang@example.com",
#         "matched_email": "hardik@example.com",
#         "difficulty_level": "Medium",
#         "question_title": "4Sum",
#         "question_id": "653b730e2580dc3c38b27e6d",
#     }
