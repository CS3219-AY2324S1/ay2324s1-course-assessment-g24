from fastapi import APIRouter, HTTPException
from typing import List
from models.model import QuestionRepo

# Selenium related
import time 
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException

questionRouter = APIRouter()

@questionRouter.get('/', response_model=List[QuestionRepo])
async def get_questions():
  questions = await QuestionRepo.find_all().to_list()
  return questions

@questionRouter.post('/', response_model=QuestionRepo)
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

@questionRouter.post('/add/{leetcode_question}', response_model=QuestionRepo)
async def add_leetcode_question(leetcode_question: str):
  driver = webdriver.Chrome()
  driver.get("https://leetcode.com/problems/%s/" % (leetcode_question))

  try:
    # Title
    titleElement = getElement(driver, By.CSS_SELECTOR, 'a.text-label-1')
    titleText = titleElement.text.split(".")[-1].strip()

    # Difficulty level
    difficultyLevelElement = getElement(driver, By.CLASS_NAME, 'w-full')
    difficultyLevelElement = difficultyLevelElement.find_element(By.CLASS_NAME, 'mt-3')
    difficultyLevelText = difficultyLevelElement.find_element(By.CLASS_NAME, 'inline-block').text

    # Topic
    topicElement = driver.find_elements(By.CSS_SELECTOR, 'a.rounded-xl')
    topicElementText = topicElement[0].get_attribute('href').split("/")[-2].capitalize()
    
    # Question and Test Case prompt
    promptElement = getElement(driver, By.CLASS_NAME, 'xFUwe')
    promptElement = promptElement.find_elements(By.XPATH, '//*[self::p or self::pre]')
    promptElement = [element.text for element in promptElement]
    testCaseIndex = promptElement.index("Example 1:")
    questionText = ' '.join(promptElement[:testCaseIndex])
    testCaseText = ' '.join(promptElement[testCaseIndex:])

    new_question = QuestionRepo(topic=topicElementText, difficulty_level=difficultyLevelText, title=titleText, question_prompt=questionText, examples=testCaseText)
    await new_question.insert()

    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     print(f"An error occurred: {e}")
  finally:
    driver.quit()
