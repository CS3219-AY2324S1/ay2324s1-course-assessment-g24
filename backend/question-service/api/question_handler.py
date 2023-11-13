from fastapi import APIRouter, HTTPException, Form
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from typing import List
import random
import re
import requests
import httpx
import uuid
from beanie import PydanticObjectId

from models.question_model import QuestionRepo
from schemas.question_schema import QuestionTitle

question_router = APIRouter()

# get all questions stored in the question repository
@question_router.get("/", response_model=List[QuestionRepo])
async def get_questions():
  try:
    questions = await QuestionRepo.find_all().to_list()
    return questions
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving all questions: {str(e)}")

# get all questions of a particular difficulty level
@question_router.get("/{difficulty_level}", response_model=List[QuestionRepo])
async def get_questions_by_difficulty(difficulty_level: str):
  try:
    questions = await QuestionRepo.find({
        "difficulty_level": {
            "$regex": difficulty_level,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()
    return questions
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving questions by difficulty: {str(e)}")

@question_router.post("/add/{leetcode_question}", response_model=QuestionRepo)
async def add_leetcode_question(leetcode_question: str):
  driver = webdriver.Chrome()
  driver.get(f"https://leetcode.com/problems/{leetcode_question}/")

  try:
    # Title
    title_element = get_element(driver, By.CSS_SELECTOR, 'a.text-label-1')
    title_text = title_element.text.split(".")[-1].strip()

    # Difficulty level
    difficulty_level_element = get_element(driver, By.CLASS_NAME, 'w-full')
    difficulty_level_element = difficulty_level_element.find_element(By.CLASS_NAME, 'mt-3')
    difficulty_level_text = difficulty_level_element.find_element(By.CLASS_NAME, 'inline-block').text

    # Topic
    topic_element = driver.find_elements(By.CSS_SELECTOR, 'a.rounded-xl')
    topic_element_text = topic_element[0].get_attribute('href').split("/")[-2].capitalize()
    
    # Question and Test Case Prompt
    prompt_element = get_element(driver, By.CLASS_NAME, 'xFUwe')
    prompt_element = prompt_element.find_elements(By.XPATH, '//*[self::p or self::pre or self::ul]')
    prompt_element = [element.text for element in prompt_element]

    test_case_index = prompt_element.index("Example 1:")
    
    test_case_text = " ".join(prompt_element[test_case_index:])
    test_case_text = test_case_text.split("Constraints")[0].strip()
    examples_list = test_case_text.split("Example ")
    examples_list = [example.strip() for example in examples_list if example.strip()]

    formatted_examples = []

    for i, example in enumerate(examples_list):
        formatted_example = f"Example {example}"
        formatted_examples.append(formatted_example)

    q_if_exists = await QuestionRepo.find(QuestionRepo.title == title_text).first_or_none()
    exists = q_if_exists is not None

    if exists:
      return q_if_exists

    new_question = QuestionRepo(
      topic=topic_element_text, 
      difficulty_level=difficulty_level_text,
      title=title_text,
      question_prompt=prompt_element[:test_case_index],
      examples=formatted_examples,
      popularity=100.0,
      upvotes=0,
      downvotes=0
    )
    
    await new_question.save()
    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     print(f"An error occurred: {e}")
  finally:
    driver.quit()

async def create_history_record(email1: str, email2: str, difficulty_level: str, question_title: str, question_id: PydanticObjectId):
    history_data = {
        "email": email1,
        "matched_email": email2,
        "difficulty_level": difficulty_level,
        "question_title": question_title,
        "question_id": str(question_id)  # Convert question_id to a string
    }

    async with httpx.AsyncClient() as client:
        try:
            historyServiceURL = "http://localhost:8001/history/"
            response = await client.post(historyServiceURL,
                json=history_data,
                headers={"Content-Type": "application/json"}
            )

            response.raise_for_status()

            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error creating history record: {str(e)}")

@question_router.post("/test/{difficulty_level}/random")
async def get_random_question_by_difficulty(difficulty_level: str, request_data: dict):
    email1 = request_data.get("email1")
    email2 = request_data.get("email2")

    questions = await QuestionRepo.find({
        "difficulty_level": {
            "$regex": difficulty_level,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()

    if questions:
        random_question = random.choice(questions)

        question_title = random_question.title
        question_id = random_question.id  # Assuming the question has an ID field

        #await create_history_record(email1, email2, difficulty_level, question_title, question_id)  # Pass question_id

        return random_question
    else:
        raise HTTPException(status_code=500, detail="No questions found for this difficulty level")

@question_router.post("/{difficulty_level}/{n}")
async def get_n_question_by_difficulty(difficulty_level: str, n: int, request_data: dict):
    email1 = request_data.get("email1")
    email2 = request_data.get("email2")

    questions = await QuestionRepo.find({
        "difficulty_level": {
            "$regex": difficulty_level,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()

    if questions:
        n = min(n, len(questions))
        
        random_questions = random.sample(questions, n)  # Select n random questions

        history_records = []  # List to store history records

        for random_question in random_questions:
            question_title = random_question.title
            question_id = random_question.id  # Assuming the question has an ID field

            await create_history_record(email1, email2, difficulty_level, question_title, question_id)  # Pass question_id

            history_records.append(random_question)

        return history_records
    else:
        raise HTTPException(status_code=500, detail="No questions found for this difficulty level")


@question_router.post("/{difficulty_level}/{n}/popular")
async def get_n_question_by_difficulty(difficulty_level: str, n: int, request_data: dict):
    email1 = request_data.get("email1")
    email2 = request_data.get("email2")

    questions = await QuestionRepo.find({
        "difficulty_level": {
            "$regex": difficulty_level,
            "$options": "i"  # Enable case-insensitive search
        }
    }).sort([("popularity", -1)]).to_list()

    if questions:
        questions = questions[:10]
        n = min(n, len(questions))
        
        random_questions = random.sample(questions, n)  # Select n random questions

        history_records = []  # List to store history records

        for random_question in random_questions:
            question_title = random_question.title
            question_id = random_question.id  # Assuming the question has an ID field

            await create_history_record(email1, email2, difficulty_level, question_title, question_id)  # Pass question_id

            history_records.append(random_question)

        return history_records
    else:
        raise HTTPException(status_code=500, detail="No questions found for this difficulty level")

# get most popular question for a particular difficulty level
@question_router.get("/{difficulty}/popular")
async def get_most_popular_question_by_topic(difficulty: str):
    questions = await QuestionRepo.find({
        "difficulty_level": {
            "$regex": difficulty,
            "$options": "i"  # Enable case-insensitive search
        }
    }).sort([("popularity", -1)]).to_list()

    if questions:
        return questions[0]
    else:
        raise HTTPException(status_code=500, detail="No questions found for this difficulty level")

# get particular question based on title
@question_router.get("/title/{q_title}")
async def get_question_by_title(q_title: str):
  q_title = q_title.replace("_", " ")
  try:
    question = await QuestionRepo.find({
        "title": {
            "$regex": q_title,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()
    return question
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving question by title: {str(e)}")

# get questions by topic
@question_router.get("/topic/{topic}")
async def get_question_by_topic(topic: str):
      questions = await QuestionRepo.find({
        "topic": {
            "$regex": topic,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()
      if not questions:
          raise HTTPException(status_code=500, detail="No questions found for this topic")
      return questions

# get one random question for a particular topic
@question_router.get("/topic/{topic}/random")
async def get_random_question_by_topic(topic: str):
    questions = await QuestionRepo.find({
        "topic": {
            "$regex": topic,
            "$options": "i"  # Enable case-insensitive search
        }
    }).to_list()

    if questions:
        random_question = random.choice(questions)
        return random_question
    else:
        raise HTTPException(status_code=500, detail="No questions found for this topic")

# get most popular question for a particular topic
@question_router.get("/topic/{topic}/popular")
async def get_most_popular_question_by_topic(topic: str):
    questions = await QuestionRepo.find({
        "topic": {
            "$regex": topic,
            "$options": "i"  # Enable case-insensitive search
        }
    }).sort([("popularity", -1)]).to_list()

    if questions:
        return questions[0]
    else:
        raise HTTPException(status_code=500, detail="No questions found for this topic")

# get n random questions for a particular topic and difficulty level
@question_router.get("/random_questions/{topic}/{difficulty}/{n}")
async def get_random_questions(topic: str, difficulty: str, n: int):
    matching_questions = await QuestionRepo.find({
            "topic": {
                "$regex": topic,
                "$options": "i"  # Enable case-insensitive search
            },
            "difficulty_level": {
                "$regex": difficulty,
                "$options": "i"  # Enable case-insensitive search
            }
        }).to_list()
    
    if len(matching_questions) == 0:
        raise HTTPException(status_code=404, detail=f"No questions found for topic: {topic}, difficulty: {difficulty}")
    
    if len(matching_questions) <= n:
        return matching_questions
    
    return random.sample(matching_questions, n)

#upvote a particular question
@question_router.post("/upvote/{title}", response_model=QuestionRepo)
async def upvote_question(title: str):
    title = title.replace("_", " ")
    question = await QuestionRepo.find_one({
        "title": {
            "$regex": title,
            "$options": "i"  # Enable case-insensitive search
        }
    })
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question.upvotes += 1
    question.popularity = (question.upvotes / (question.upvotes + question.downvotes)) * 100
    await question.save()
    return question

# downvote a particular question
@question_router.post("/downvote/{title}", response_model=QuestionRepo)
async def downvote_question(title: str):
    title = title.replace("_", " ")
    question = await QuestionRepo.find_one({
        "title": {
            "$regex": title,
            "$options": "i"  # Enable case-insensitive search
        }
    })
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question.downvotes += 1
    question.popularity = (question.upvotes / (question.upvotes + question.downvotes)) * 100
    await question.save()
    return question

@question_router.post("/", response_model=QuestionRepo)
async def create_question(question: QuestionRepo):
  try:
    await question.insert()
    return question
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error creating question: {str(e)}")

def get_element(driver, filter_by, name):
  element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((filter_by, name)))
  return element

@question_router.delete("/title")
async def delete_question_by_title(q_title: QuestionTitle):
  try:
    await QuestionRepo.find(QuestionRepo.title == q_title.title).delete()
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error deleting question by title: {str(e)}")  
