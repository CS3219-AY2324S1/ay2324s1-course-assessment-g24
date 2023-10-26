from fastapi import APIRouter, HTTPException
from typing import List
from models.model import QuestionRepo

# Selenium related
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

question_router = APIRouter()

@question_router.get('/', response_model=List[QuestionRepo])
async def get_questions():
  questions = await QuestionRepo.find_all().to_list()
  return questions

@question_router.post('/', response_model=QuestionRepo)
async def create_question(question: QuestionRepo):
  try:
      await question.insert()
      return question
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error creating question: {str(e)}")

def getElement(driver, filterBy, name):
  element = WebDriverWait(driver, 10).until(
      EC.presence_of_element_located((filterBy, name))
  )
  return element

@question_router.post('/add/{leetcode_question}', response_model=QuestionRepo)
async def add_leetcode_question(leetcode_question: str):
  driver = webdriver.Chrome()
  driver.get(f"https://leetcode.com/problems/{leetcode_question}/")

  try:
    # Title
    title_element = getElement(driver, By.CSS_SELECTOR, 'a.text-label-1')
    title_text = title_element.text.split(".")[-1].strip()

    # Difficulty level
    difficulty_level_element = getElement(driver, By.CLASS_NAME, 'w-full')
    difficulty_level_element = difficulty_level_element.find_element(By.CLASS_NAME, 'mt-3')
    difficulty_level_text = difficulty_level_element.find_element(By.CLASS_NAME, 'inline-block').text

    # Topic
    topic_element = driver.find_elements(By.CSS_SELECTOR, 'a.rounded-xl')
    topic_element_text = topic_element[0].get_attribute('href').split("/")[-2].capitalize()
    
    # Question and Test Case prompt
    prompt_element = getElement(driver, By.CLASS_NAME, 'xFUwe')
    prompt_element = prompt_element.find_elements(By.XPATH, '//*[self::p or self::pre]')
    prompt_element = [element.text for element in prompt_element]
    testCaseIndex = prompt_element.index("Example 1:")
    question_text = ' '.join(prompt_element[:testCaseIndex])
    test_case_text = ' '.join(prompt_element[testCaseIndex:])

    new_question = QuestionRepo(topic=topic_element_text, 
                                difficulty_level=difficulty_level_text, 
                                title=title_text, 
                                question_prompt=question_text, 
                                examples=test_case_text)
    await new_question.insert()

    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     print(f"An error occurred: {e}")
  finally:
    driver.quit()


