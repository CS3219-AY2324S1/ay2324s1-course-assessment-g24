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
import { createCrudQuestion, getCrudQuestions, updateCrudQuestion, deleteCrudQuestion } from "../services/questionService";

interface QuestionType {
  qid: number,
  title: string;
  topic: string;
  difficulty_level: string;
  question_description: string;
}

export const difficultyToColorScheme = {
  [DIFFICULTY.EASY]: "green",
  [DIFFICULTY.MEDIUM]: "orange",
  [DIFFICULTY.HARD]: "red",
  [DIFFICULTY.DEFAULT]: "gray",
};

const CrudQuestions = () => {
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [newQuestion, setNewQuestion] = useState({
    qid: 1,
    title: "",
    topic: "",
    difficulty_level: "",
    question_description: "",
  });
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState<QuestionType | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function retrieveQuestions() {
      const initialQuestions: QuestionType[] = await getCrudQuestions();
      return initialQuestions;
    }

    retrieveQuestions().then(questions => {
      setQuestions(questions)
    });
    
  }, [update]);

  useEffect(() => {
    localStorage.setItem("inputId", JSON.stringify(newQuestion.qid));
  }, [newQuestion.qid]);

  const isAddQuestionDisabled =
    !newQuestion.title ||
    !newQuestion.topic ||
    !newQuestion.difficulty_level ||
    !newQuestion.question_description;

  const handleInputChange = (key: string, value: string) => {
    setNewQuestion((prevQuestion) => ({ ...prevQuestion, [key]: value }));
  };

  const handleDeleteQuestion = (qid: number) => {
    deleteCrudQuestion(qid)
    handleQuestionChange()
  };

  function handleQuestionChange() {
    setUpdate(prevState => !prevState);
  }

  const handleUpdateQuestionClick = (question: QuestionType) => {
    setUpdatedQuestion(question);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateQuestion = () => {
    if (updatedQuestion?.qid !== undefined) {
      updateCrudQuestion(updatedQuestion.qid, updatedQuestion);
      setIsUpdateModalOpen(false);
      handleQuestionChange();
    }
  };

  // Opens question
  const handleQuestionClick = (question: QuestionType) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.title || !newQuestion.topic || !newQuestion.difficulty_level || !newQuestion.question_description) {
      setErrorMessage("All fields are required");
      setErrorModal(true);
      return;
    }
    // Check if a question with the same title already exists
    const isQuestionExists = questions?.some(
      (existingQuestion) => existingQuestion.title === newQuestion.title
    );

    if (isQuestionExists) {
      // Display a message to the user and do not add the question
      setErrorMessage("Question already exists");
      setErrorModal(true);
    } else {
      // Add the new question to the UI
      createCrudQuestion(newQuestion)

      // Clear the input fields
      setNewQuestion({
        qid: newQuestion.qid + 1,
        title: "",
        topic: "",
        difficulty_level: "",
        question_description: "",
      });
      handleQuestionChange()
    }
  };

  return (
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
                  value={newQuestion.qid.toString()}
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
                  value={newQuestion.question_description}
                  onChange={(e) => handleInputChange("question_description", e.target.value)}
                  rows={2.5} // Set an appropriate number of rows
                  resize="vertical" // Allow vertical resizing
                />
              </Flex>
            </FormControl>
            <Button onClick={handleAddQuestion} disabled={isAddQuestionDisabled} colorScheme="teal" maxW="250px" mx="auto">Add Question</Button>
          </VStack>

          <Divider />

          <Box maxH={"400px"} p={4} overflowY="auto">
            {questions?.map((question: QuestionType) => (
              <QuestionAlone
                key={question.title}
                questionId={question.qid}
                questionTitle={question.title}
                questionTopic={question.topic}
                difficulty={
                  DIFFICULTY[
                  question.difficulty_level.toUpperCase() as keyof typeof DIFFICULTY
                  ]
                }
                onClick={() => handleQuestionClick(question)}
                onDelete={() => handleDeleteQuestion(question.qid)}
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
                  value={selectedQuestion?.question_description}
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
                value={updatedQuestion?.qid?.toString() || ''}
                isReadOnly
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Title:</FormLabel>
              <Input
                placeholder="Question Title"
                value={updatedQuestion?.title || ''}
                onChange={(e) => setUpdatedQuestion((prev) => prev ? ({ ...prev, title: e.target.value }) : prev)}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Topic:</FormLabel>
              <Input
                placeholder="Question Topic"
                value={updatedQuestion?.topic || ''}
                onChange={(e) => setUpdatedQuestion((prev) => prev ? ({ ...prev, topic: e.target.value }) : prev)}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Difficulty:</FormLabel>
              <Input
                placeholder="Difficulty Level"
                value={updatedQuestion?.difficulty_level || ''}
                onChange={(e) => setUpdatedQuestion((prev) => prev ? ({ ...prev, difficulty_level: e.target.value }) : prev)}
              />
              </Flex>
              <Flex>
              <FormLabel minW="100px" my="auto">Description:</FormLabel>
              <Textarea
                  placeholder="Question Description"
                  value={updatedQuestion?.question_description || ''}
                  onChange={(e) => setUpdatedQuestion((prev) => prev ? ({ ...prev, description: e.target.value }) : prev)}
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
  );
};

export default CrudQuestions;