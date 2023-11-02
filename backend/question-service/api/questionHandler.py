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

def getElement(driver, filterBy, name):
  element = WebDriverWait(driver, 10).until(
      EC.presence_of_element_located((filterBy, name))
  )
  return element

@questionRouter.get('/', response_model=List[QuestionRepo])
async def get_questions():
  questions = await QuestionRepo.find_all().to_list()
  return questions

# get questions by leetcode tag
@questionRouter.get("/title/{leet_question_tag}")
async def get_question_by_tag(leet_question_tag: str):
  item = await QuestionRepo.find_one(QuestionRepo.leet_tag == leet_question_tag)
  return item

# get questions by difficulty level
@questionRouter.get("/difficulty/{difficulty}")
async def get_question_by_difficulty(difficulty: str):
  item = await QuestionRepo.find(QuestionRepo.difficulty_level == difficulty).to_list()
  return item

# get questions by topic
@questionRouter.get("/topic/{topic}")
async def get_question_by_topic(topic: str):
  item = await QuestionRepo.find(QuestionRepo.topic == topic).to_list()
  return item

@questionRouter.delete("/delete/{leet_question_tag}")
async def delete_question(leet_question_tag: str):
  item = await QuestionRepo.find_one(QuestionRepo.leet_tag == leet_question_tag)
  if item is None:
    raise HTTPException(status_code=404, detail="Item not found")
  await QuestionRepo.delete(item)
  return item

@questionRouter.post('/', response_model=QuestionRepo)
async def create_question(question: QuestionRepo):
  item = await QuestionRepo.find_one(QuestionRepo.leet_tag == question.leet_tag)
  if (item):
    raise HTTPException(status_code=500, detail=f"Question already exists")
  try:
    await question.insert()
    return question
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error creating question: {str(e)}")

@questionRouter.post('/add/{leet_question_tag}', response_model=QuestionRepo)
async def add_leetcode_question(leet_question_tag: str):
  item = await QuestionRepo.find(QuestionRepo.leet_tag == leet_question_tag).to_list()
  if (item):
    raise HTTPException(status_code=500, detail=f"Question already exists")

  driver = webdriver.Chrome()
  driver.get("https://leetcode.com/problems/%s/" % (leet_question_tag))

  try:
    # Title
    titleElement = getElement(driver, By.CSS_SELECTOR, 'a.text-label-1')
    titleText = titleElement.text.split(".")[-1].strip()

    # Difficulty level
    difficultyLevelElement = getElement(driver, By.CLASS_NAME, 'w-full')
    difficultyLevelElement = difficultyLevelElement.find_element(By.CLASS_NAME, 'mt-3')
    difficultyLevelText = difficultyLevelElement.find_element(By.CLASS_NAME, 'inline-block').text.lower()

    # Topic
    topicElement = driver.find_elements(By.CSS_SELECTOR, 'a.rounded-xl')
    topicElementText = topicElement[0].get_attribute('href').split("/")[-2]
    
    # Question and Test Case prompt
    promptElement = getElement(driver, By.CLASS_NAME, 'xFUwe')
    promptElement = promptElement.find_elements(By.XPATH, '//*[self::p or self::pre]')
    promptElement = [element.text for element in promptElement]
    testCaseIndex = promptElement.index("Example 1:")
    questionText = ' '.join(promptElement[:testCaseIndex])
    testCaseText = ' '.join(promptElement[testCaseIndex:])

    new_question = QuestionRepo(leet_tag=leet_question_tag, topic=topicElementText, difficulty_level=difficultyLevelText, title=titleText, question_prompt=questionText, examples=testCaseText)
    await new_question.insert()

    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     raise HTTPException(status_code=400, detail=e)
  finally:
    driver.quit()
