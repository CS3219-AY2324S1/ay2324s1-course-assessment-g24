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

import random

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

@questionRouter.get("/difficulty/{difficulty}/random")
async def get_random_question_by_difficulty(difficulty: str):
    questions = await QuestionRepo.find(
        QuestionRepo.difficulty_level == difficulty
    ).to_list()

    if questions:
        random_question = random.choice(questions)
        return random_question
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No questions found for this difficulty level")

# get most popular question for a particular difficulty level
@questionRouter.get("/difficulty/{difficulty}/popular")
async def get_most_popular_question_by_topic(difficulty: str):
    questions = await QuestionRepo.find(
      (QuestionRepo.difficulty_level == difficulty)
    ).sort([("popularity", -1)]).to_list()

    if questions:
        return questions[0]
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No questions found for this difficulty level")

# get questions by topic
@questionRouter.get("/topic/{topic}")
async def get_question_by_topic(topic: str):
  item = await QuestionRepo.find(QuestionRepo.topic == topic).to_list()
  return item

@questionRouter.get("/topic/{topic}/random")
async def get_random_question_by_topic(topic: str):
    questions = await QuestionRepo.find(
        QuestionRepo.topic == topic
    ).to_list()

    if questions:
        random_question = random.choice(questions)
        return random_question
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No questions found for this topic")


# get most popular question for a particular topic
@questionRouter.get("/topic/{topic}/popular")
async def get_most_popular_question_by_topic(topic: str):
    questions = await QuestionRepo.find(
      (QuestionRepo.topic == topic)
    ).sort([("popularity", -1)]).to_list()

    if questions:
        return questions[0]
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No questions found for this topic")

@questionRouter.get("/random_questions/{topics}/{difficulty}/{n}")
async def get_random_questions(topics: str, difficulty: str, n: int):
    matching_questions = await QuestionRepo.find(QuestionRepo.topic == topics, QuestionRepo.difficulty_level == difficulty).to_list()
    
    if len(matching_questions) == 0:
        raise HTTPException(status_code=404, detail=f"No questions found for topics: {topics}, difficulty: {difficulty}")
    
    if len(matching_questions) <= n:
        return matching_questions
    
    return random.sample(matching_questions, n)


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

@questionRouter.post("/upvote/{leet_question_tag}", response_model=QuestionRepo)
async def upvote_question(leet_question_tag: str):
    question = await QuestionRepo.find_one(QuestionRepo.leet_tag == leet_question_tag)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question.upvotes += 1
    question.popularity = (question.upvotes / (question.upvotes + question.downvotes)) * 100
    await question.save()
    return question

@questionRouter.post("/downvote/{leet_question_tag}", response_model=QuestionRepo)
async def downvote_question(leet_question_tag: str):
    question = await QuestionRepo.find_one(QuestionRepo.leet_tag == leet_question_tag)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question.downvotes += 1
    question.popularity = (question.upvotes / (question.upvotes + question.downvotes)) * 100
    await question.save()
    return question

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
    testCaseText = testCaseText.split("Constraints")[0].strip()
    examples_list = testCaseText.split("Example ")
    examples_list = [example.strip() for example in examples_list if example.strip()]

    formatted_examples = []

    for i, example in enumerate(examples_list):
        formatted_example = f"Example {example}"
        formatted_examples.append(formatted_example)

    formatted_examples = [example.replace("\n", " ") for example in formatted_examples]
    formatted_examples = [example.replace("\"", "'") for example in formatted_examples]

    new_question = QuestionRepo(leet_tag=leet_question_tag, topic=topicElementText, difficulty_level=difficultyLevelText, title=titleText, question_prompt=questionText, examples=formatted_examples,
    popularity=100.0, upvotes=0, downvotes=0)
    await new_question.insert()

    return new_question
  
  except TimeoutException:
     raise HTTPException(status_code=404, detail="Element not found within the given time frame.")
  except Exception as e:
     raise HTTPException(status_code=400, detail=e)
  finally:
    driver.quit()
