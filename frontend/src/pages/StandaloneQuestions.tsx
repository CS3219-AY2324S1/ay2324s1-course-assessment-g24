import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Divider,
    HStack,
    Heading,
    Input,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  import HeadingWithGradient from "../components/HeadingWithGradient";
  import NavBar from "../components/NavBar";
  import QuestionC from "../components/QuestionC";
  import QuestionAlone from "../components/QuestionAlone";
  import { useAuth } from "../contexts/AuthContext";
  import { DIFFICULTY } from "../utils/enums";
  import { useMatching } from "../contexts/MatchingContext";
  import { getHistoriesByUser } from "../services/historyService";
  import { getAllQuestions } from "../services/questionService";
  import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

  
  // Gets all questions from the question service
  //const questionRepo = await getAllQuestions();
  const questionRepo: QuestionType[] = [];
  
  interface QuestionType {
    id: number,
    title: string;
    topic: string;
    difficulty_level: string;
    description: string;
  }
  
  export const difficultyToColorScheme = {
    [DIFFICULTY.EASY]: "green",
    [DIFFICULTY.MEDIUM]: "orange",
    [DIFFICULTY.HARD]: "red",
    [DIFFICULTY.DEFAULT]: "gray",
  };
  
  const StandaloneQuestions = () => {
    const [difficultySearchedFor, setDifficultySearchedFor] = useState<DIFFICULTY>(
      DIFFICULTY.EASY
    );
    const { user } = useAuth();
    const [numberOfQuestionsSolved, setNumberQuestionsSolved] = useState<number>(
      0
    );
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
      null
    );
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [questions, setQuestions] = useState<QuestionType[]>(questionRepo);
    const [newQuestion, setNewQuestion] = useState({
        id: 1,
      title: "",
      topic: "",
      difficulty_level: "",
      description: "",
    });
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState<Partial<QuestionType> | null>(null);


  

    const isAddQuestionDisabled =
    !newQuestion.title ||
    !newQuestion.topic ||
    !newQuestion.difficulty_level ||
    !newQuestion.description;

  
    const handleInputChange = (key: string, value: string) => {
      setNewQuestion((prevQuestion) => ({ ...prevQuestion, [key]: value }));
    };

    const handleDeleteQuestion = (id: number) => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
      
        // Find the maximum ID from the remaining questions
        const maxID = Math.max(...updatedQuestions.map((q) => q.id), 0);
      
        // Update the IDs for the remaining questions
        const updatedQuestionsWithIDs = updatedQuestions.map((q, index) => ({
          ...q,
          id: index + 1,
        }));
      
        setQuestions(updatedQuestionsWithIDs);
      
        // Set the new ID for the input box
        setNewQuestion((prevQuestion) => ({ ...prevQuestion, id: maxID + 1 }));
      };

      const handleUpdateQuestionClick = (question: QuestionType) => {
        setUpdatedQuestion(question);
        setIsUpdateModalOpen(true);
      };

      const handleUpdateQuestion = () => {
        // Ensure that id is always a number
        if (updatedQuestion?.id !== undefined) {
          const updatedQuestions = questions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion as QuestionType : q
          );
          setQuestions(updatedQuestions);
    
          // Close the update modal
          setIsUpdateModalOpen(false);
        }
      };

    const handleQuestionClick = (question: QuestionType) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
      };
  
      const handleAddQuestion = () => {
        if (!newQuestion.title || !newQuestion.topic || !newQuestion.difficulty_level || !newQuestion.description) {
            setErrorMessage("All fields are required");
            setErrorModal(true);
            return;
          }
        // Check if a question with the same title already exists
        const isQuestionExists = questions.some(
          (existingQuestion) => existingQuestion.title === newQuestion.title
        );
    
        if (isQuestionExists) {
          // Display a message to the user and do not add the question
          setErrorMessage("Question already exists");
          setErrorModal(true);
        } else {
          // Add the new question to the UI
          const updatedQuestions = [...questions, newQuestion];
          setQuestions(updatedQuestions);
          setNewQuestion((prevQuestion) => ({
            ...prevQuestion,
            id: prevQuestion.id + 1,
          }));

          // Clear the input fields
          setNewQuestion({
            id: newQuestion.id + 1,
            title: "",
            topic: "",
            difficulty_level: "",
            description: "",
          });
        }
      };

    return (
        <Box w="100vw" h="100vh" mx="auto">
        <NavBar withHomePage={false} whereToGoOnClick={"/questionslist"} />
        <VStack
          w={"100%"}
          h={"80%"}
          spacing={5}
          mt={4}
          justifyContent={"space-around"}
        >
          <HeadingWithGradient
            preText={"The"}
            gradientText={"Playground"}
            postText={""}
            bgGradient={"linear(to-r, orange.400, red.500)"}
          />
          <HStack w={"100%"} h={"80%"}>
            <Box
              w={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box w={"100%"} py={4} px={2} m={4} rounded={"lg"} boxShadow={"lg"}>
                <Heading size={"lg"} p={2} mx={4} mb={4} bg={"white"}>
                  Questions Repository
                </Heading>
                {/* Add Question Form */}
                <VStack align="stretch" spacing={4} mb={4}>
                <Input
                    placeholder="ID"
                    value={newQuestion.id.toString()}
                    isReadOnly
                />
                  <Input
                    placeholder="Question Title"
                    value={newQuestion.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  <Input
                    placeholder="Question Topic"
                    value={newQuestion.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                  />
                  <Input
                    placeholder="Difficulty Level"
                    value={newQuestion.difficulty_level}
                    onChange={(e) =>
                      handleInputChange("difficulty_level", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Question Description"
                    value={newQuestion.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
              <Button onClick={handleAddQuestion} disabled={isAddQuestionDisabled}>Add Question</Button>
            </VStack>
    
            <Divider />
    
            <Box maxH={"400px"} p={4} overflowY="auto">
              {questions.map((question: QuestionType) => (
                <QuestionAlone
                key={question.title}
                questionId={question.id}
                questionTitle={question.title}
                questionTopic={question.topic}
                difficulty={
                  DIFFICULTY[
                    question.difficulty_level.toUpperCase() as keyof typeof DIFFICULTY
                  ]
                }
                onClick={() => handleQuestionClick(question)}
                onDelete={() => handleDeleteQuestion(question.id)}
                onUpdate={() => handleUpdateQuestionClick(question)}
              />
              ))}
            </Box>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedQuestion?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedQuestion?.description}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
              </Box>
            </Box>
          </HStack>
        </VStack>
        <Modal isOpen={errorModal} onClose={() => setErrorModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setErrorModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Update Question Form */}
            <VStack align="stretch" spacing={4}>
              <Input
                placeholder="ID"
                value={updatedQuestion?.id?.toString() || ''}
                isReadOnly
              />
              <Input
                placeholder="Question Title"
                value={updatedQuestion?.title || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="Question Topic"
                value={updatedQuestion?.topic || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, topic: e.target.value }))}
              />
              <Input
                placeholder="Difficulty Level"
                value={updatedQuestion?.difficulty_level || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, difficulty_level: e.target.value }))}
              />
              <Input
                placeholder="Question Description"
                value={updatedQuestion?.description || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, description: e.target.value }))}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateQuestion}>
              Update Question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
      );
    };
  
  export default StandaloneQuestions;
  