// QuestionDetailsPage.tsx

import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex} from "@chakra-ui/react";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar";
import FullQuestionPanel from "../components/FullQuestionPanel";

interface Question {
    title: string;
    topic: string;
    difficulty_level: string;
    question_prompt: [string];
    examples: [string];
    popularity: number;
    upvotes: number;
    downvotes: number;
  }

// ... (other imports)

const QuestionDetailsPage = () => {
    const { title } = useParams();
    const [question, setQuestion] = useState<any>(null);
  
    const fetchQuestion = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8000/questions/title/${title}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch question details: ${response.status}`);
            }

            const data = await response.json();
            setQuestion(data);
            console.log("The question is: ", data);
        } catch (error) {
            console.error("Error fetching question details:", error);
        }
    }, [title]);

    useEffect(() => {
        if (title) {
          fetchQuestion();
        }
      }, [title, fetchQuestion]);

    return (
        <Box w={"100vw"} h={"100vh"}>
          <LoadingWrapper isLoading={!question} repeat={2}>
            <NavBar withoutAnything activeLink={false} />
            <Box h={"80%"} p={2} mt={6}>
              <Flex flexDirection={"row"}>
                <Box w={"35%"}>
                  {question && (
                    <FullQuestionPanel
                    questionTitle={question.title}
                    questionDescription={question.question_prompt}
                    difficulty={question.difficulty_level}
                    topic={question.topic}
                    upvotes={question.upvotes}
                    downvotes={question.downvotes}
                    popularity={question.popularity}
                    examples={question.examples}
                  />
                  )}
                </Box>
              </Flex>
            </Box>
          </LoadingWrapper>
        </Box>
      );
    };
    
    export default QuestionDetailsPage;
  