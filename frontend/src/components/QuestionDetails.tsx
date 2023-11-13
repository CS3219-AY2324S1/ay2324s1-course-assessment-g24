// components/QuestionDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define an interface for the question
interface Question {
  title: string;
  topic: string;
  difficulty_level: string;
  question_prompt: string[];
  examples: string[];
  popularity: number;
  upvotes: number;
  downvotes: number;
}

const QuestionDetails = () => {
  const { title } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);

  // Custom function to fetch question details
  const fetchQuestionDetails = async (questionTitle: string) => {
    try {
      const response = await fetch(`http://localhost:8000/questions/title/${questionTitle}`);
      const data = await response.json();
      setQuestion(data); // Assuming the API response contains the question details
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  useEffect(() => {
    // Check if title is defined before fetching
    if (title) {
      fetchQuestionDetails(title);
    }
  }, [title]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{question.title}</h1>
      <p>Topic: {question.topic}</p>
      <p>Difficulty Level: {question.difficulty_level}</p>

      <div>
        <h2>Question Prompt:</h2>
        {question.question_prompt.map((prompt, index) => (
          <p key={index}>{prompt}</p>
        ))}
      </div>

      <div>
        <h2>Examples:</h2>
        {question.examples.map((example, index) => (
          <p key={index}>{example}</p>
        ))}
      </div>

      <p>Popularity: {question.popularity}</p>
      <p>Upvotes: {question.upvotes}</p>
      <p>Downvotes: {question.downvotes}</p>
    </div>
  );
};

export default QuestionDetails;
