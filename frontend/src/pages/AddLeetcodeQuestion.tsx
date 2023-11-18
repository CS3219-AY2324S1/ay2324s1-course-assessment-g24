import {
    Box,
    Button,
    Input,
    Text,
    VStack,
    HStack,
    Heading,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import HeadingWithGradient from "../components/HeadingWithGradient";
  import NavBar from "../components/NavBar";
  import QuestionC from "../components/QuestionC";
  import { useAuth } from "../contexts/AuthContext";
  import { DIFFICULTY } from "../utils/enums";
  import { getAllQuestions, addLeetCodeQuestion } from "../services/questionService";
  
  interface QuestionType {
    title: string;
    topic: string;
    upvotes: number;
    downvotes: number;
    difficulty_level: string;
  }
  
  export const difficultyToColorScheme = {
    [DIFFICULTY.EASY]: "green",
    [DIFFICULTY.MEDIUM]: "orange",
    [DIFFICULTY.HARD]: "red",
    [DIFFICULTY.DEFAULT]: "gray",
  };
  
  const UserProfile = () => {
    const { user } = useAuth();
    const [newQuestionTitle, setNewQuestionTitle] = useState("");
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [leetcodeQuestion, setLeetCodeQuestion] = useState("");
    const [addedQuestion, setAddedQuestion] = useState<QuestionType | null>(null);
  
    const handleAddLeetCodeQuestion = async () => {
        try {
          const newQuestion = await addLeetCodeQuestion(leetcodeQuestion);
          console.log('New question added:', newQuestion);
      
          setAddedQuestion(newQuestion);
          setLeetCodeQuestion(""); // Clear input after submitting
      
          // Optionally, refresh the list of questions
          const updatedQuestions = await getAllQuestions();
          setQuestions(updatedQuestions);
        } catch (error) {
          console.error('Error adding LeetCode question:', error);
        }
      };
  
    useEffect(() => {
      // Fetch the initial set of questions when the component mounts
      const fetchQuestions = async () => {
        try {
          const initialQuestions = await getAllQuestions();
          setQuestions(initialQuestions);
        } catch (error) {
          console.error('Error fetching initial questions:', error);
        }
      };
  
      fetchQuestions();
    }, []); // Empty dependency array ensures this runs only once on mount
  
    return (
      <Box w="100vw" h="100vh">
        <NavBar withHomePage={false} whereToGoOnClick="/userprofile" />
  
        <HStack w="60%" display="flex" justifyContent="center" alignItems="center" mx="auto">
          <Box w="100%" py={4} px={2} m={4} rounded="lg" boxShadow="lg">
            <Heading size="lg" p={2} mx={4} mb={4} bg="white">
              Questions Repository
            </Heading>
            <VStack mt={4} spacing={2}>
              <Text>Enter the tag of a leetcode question you would like to add</Text>
              <Input
                placeholder="Enter LeetCode question"
                value={leetcodeQuestion}
                onChange={(e) => setLeetCodeQuestion(e.target.value)}
              />
              <Button onClick={handleAddLeetCodeQuestion} colorScheme="teal">Submit</Button>
            </VStack>
            <Box maxH="400px" p={4} overflowY="auto">
              {questions.map((question: QuestionType) => (
                <QuestionC
                  key={question.title}
                  questionTitle={question.title}
                  questionTopic={question.topic}
                  upVotes={question.upvotes}
                  downVotes={question.downvotes}
                  difficulty={
                    DIFFICULTY[
                      question.difficulty_level.toUpperCase() as keyof typeof DIFFICULTY
                    ]
                  }
                />
              ))}
            </Box>
          </Box>
        </HStack>
      </Box>
    );
  };
  
  export default UserProfile;
  