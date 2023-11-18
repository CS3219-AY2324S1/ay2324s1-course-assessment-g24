import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import QuestionAlone from "../components/QuestionAlone";
import { DIFFICULTY } from "../utils/enums";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

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
  const initialQuestions = JSON.parse(localStorage.getItem("questions") as string) || [];
  const initialInputId = JSON.parse(localStorage.getItem("inputId") as string) || 1;
  const [questions, setQuestions] = useState<QuestionType[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState({
    id: initialInputId,
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

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("inputId", JSON.stringify(newQuestion.id));
  }, [newQuestion.id]);

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

  const { user } = useAuth();

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
    <>
    {user.is_admin ? (
      <Box>
        <Box w="100vw" h="100vh" mx="auto" overflowY="auto">
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        overflowY="auto"
      >
        <Box w={"50%"} py={4} px={2} mt={2} rounded={"lg"} boxShadow={"lg"} overflowY="auto">
          <Heading size={"lg"} p={2} mx={4} mb={4} bg={"white"}>
            Questions List
          </Heading>
          <Text mb={4} mx={4} color="gray.700" fontSize="xl" fontWeight="bold">
            Add a new question using the form below:
          </Text>
          <VStack align="stretch" spacing={4} mb={4}>
            <FormControl>
              <Flex>
                <FormLabel minW="200px" my="auto">Question ID</FormLabel>
                <Input
                  placeholder="ID"
                  value={newQuestion.id.toString()}
                  isReadOnly
                />
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel minW="200px" my="auto">Enter Question Title</FormLabel>
                <Input
                  placeholder="Question Title"
                  value={newQuestion.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel minW="200px" my="auto">Enter Question Topic</FormLabel>
                <Input
                  placeholder="Question Topic"
                  value={newQuestion.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                />
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel minW="200px" my="auto">Enter Question Difficulty</FormLabel>
                <Input
                  type="text"
                  placeholder="Difficulty Level"
                  value={newQuestion.difficulty_level}
                  onChange={(e) => handleInputChange("difficulty_level", e.target.value)}
                />
              </Flex>
            </FormControl>

            <FormControl>
              <Flex>
                <FormLabel minW="200px" my="auto">Enter Question Description</FormLabel>
                <Textarea
                  placeholder="Question Description"
                  value={newQuestion.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={2.5} // Set an appropriate number of rows
                  resize="vertical" // Allow vertical resizing
                />
              </Flex>
            </FormControl>
            <Button onClick={handleAddQuestion} disabled={isAddQuestionDisabled} colorScheme="teal" maxW="250px" mx="auto">Add Question</Button>
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
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="3xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Question title: {selectedQuestion?.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontSize="lg" fontWeight="bold">Question description below: </ModalBody>
              <ModalBody>
                {/* Use Textarea instead of Text */}
                <Textarea
                  value={selectedQuestion?.description}
                  isReadOnly
                  fontSize="md"
                  fontFamily="monospace"
                  rows={12} // Set an appropriate number of rows
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
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
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Update Question Form */}
            <VStack align="stretch" spacing={4}>
              <Flex>
              <FormLabel minW="100px" my="auto">ID:</FormLabel>
              <Input
                placeholder="ID"
                value={updatedQuestion?.id?.toString() || ''}
                isReadOnly
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Title:</FormLabel>
              <Input
                placeholder="Question Title"
                value={updatedQuestion?.title || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, title: e.target.value }))}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Topic:</FormLabel>
              <Input
                placeholder="Question Topic"
                value={updatedQuestion?.topic || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, topic: e.target.value }))}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Difficulty:</FormLabel>
              <Input
                placeholder="Difficulty Level"
                value={updatedQuestion?.difficulty_level || ''}
                onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, difficulty_level: e.target.value }))}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Description:</FormLabel>
              <Textarea
                  placeholder="Question Description"
                  value={updatedQuestion?.description || ''}
                  onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3} // Set an appropriate number of rows
                  resize="vertical" // Allow vertical resizing
                />
              </Flex>
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
      </Box>
    ): (
      <Box w="100vw" h="100vh" mx="auto" overflowY="auto">
        You are not authorized!!
      </Box>
    )}
    </>
  );
};

export default StandaloneQuestions;