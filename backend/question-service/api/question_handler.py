from fastapi import APIRouter, HTTPException
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from typing import List

from models.question_model import QuestionRepo
from schemas.question_schema import QuestionTitle

question_router = APIRouter()

@question_router.get("/", response_model=List[QuestionRepo])
async def get_questions():
  try:
    questions = await QuestionRepo.find_all().to_list()
    return questions
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving all questions: {str(e)}")

@question_router.get("/{difficulty_level}", response_model=List[QuestionRepo])
async def get_questions_by_difficulty(difficulty_level: str):
  try:
    questions = await QuestionRepo.find(QuestionRepo.difficulty_level == difficulty_level).to_list()
    return questions
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving questions by difficulty: {str(e)}")

@question_router.get("/title", response_model=QuestionRepo)
async def get_question_by_title(q_title: QuestionTitle):
  try:
    question = await QuestionRepo.find(QuestionRepo.title == q_title.title)
    return question
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error retrieving question by title: {str(e)}")

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
    prompt_element = prompt_element.find_elements(By.XPATH, '//*[self::p or self::pre]')
    prompt_element = [element.text for element in prompt_element]

    test_case_index = prompt_element.index("Example 1:")
    
    question_text = " ".join(prompt_element[:test_case_index])
    test_case_text = " ".join(prompt_element[test_case_index:])

    q_if_exists = await QuestionRepo.find(QuestionRepo.title == title_text).first_or_none()
    exists = q_if_exists is not None

    if exists:
      return q_if_exists

    new_question = QuestionRepo(
      topic=topic_element_text, 
      difficulty_level=difficulty_level_text,
      title=title_text,
      question_prompt=question_text,
      examples=test_case_text
    )
    
    await new_question.save()
    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     print(f"An error occurred: {e}")
  finally:
    driver.quit()

@question_router.delete("/title")
async def delete_question_by_title(q_title: QuestionTitle):
  try:
    await QuestionRepo.find(QuestionRepo.title == q_title.title).delete()
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error deleting question by title: {str(e)}")
  
