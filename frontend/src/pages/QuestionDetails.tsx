// QuestionDetailsPage.tsx
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FullCodeEditor from "../components/FullCodeEditor";
import FullQuestionPanel from "../components/FullQuestionPanel";
import LoadingWrapper from "../components/LoadingWrapper";
import { fetchQuestion } from "../services/questionService";
import NavBar from "../components/NavBar/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { LANGUAGE } from "../utils/enums";

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

const QuestionDetailsPage = () => {
  const { user } = useAuth();
  const { title } = useParams();
  const [question, setQuestion] = useState<Question>();
  const [_executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("python"); // Default language is set to Python

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        if (title) {
          const questionData = await fetchQuestion(title);
          setQuestion(questionData);
          console.log("The question is: ", questionData);
        }
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    loadQuestion();
  }, [title]); // This will re-run when the title prop changes

  const handleExecuteCode = (output: string) => {
    setExecutionOutput(output);
  };

  return (
    <Box w={"100vw"} h={"100vh"}>
      <LoadingWrapper isLoading={!question} repeat={2}>
        <NavBar withoutAnything activeLink={true} whereToGoOnClick={"/userprofile"} />
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
            <Box w={"65%"} ml={4}>
              {/* Add a label for the dropdown */}
              <Flex alignItems="center" mb={2}>
                <Text
                  mr={2}
                  width="250px"
                  fontSize="16px"
                  fontWeight="bold"
                  color="gray.700"
                  letterSpacing="0.5px"
                >
                  Choose your language:
                </Text>
                {/* Style the Select component */}
                <Select
                  defaultValue={user.language}
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <Box as={"option"} data-testid={"language-option"} value={LANGUAGE.PYTHON}>
                    Python
                  </Box>
                  <Box as={"option"} data-testid={"language-option"} value={LANGUAGE.CPP}>
                    C++
                  </Box>
                  <Box as={"option"} data-testid={"language-option"} value={LANGUAGE.JAVASCRIPT}>
                    JavaScript
                  </Box>
                </Select>
              </Flex>
              {/* Pass the selected language to CodeEditor */}
              <FullCodeEditor
                height={50}
                onExecuteCode={handleExecuteCode}
                selectedLanguage={selectedLanguage}
              />
            </Box>
          </Flex>
        </Box>
      </LoadingWrapper>
    </Box>
  );
};

export default QuestionDetailsPage;
