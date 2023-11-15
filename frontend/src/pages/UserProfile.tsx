import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Input,
  HStack,
  Heading,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import HeadingWithGradient from "../components/HeadingWithGradient";
import NavBar from "../components/NavBar/NavBar";
import Question from "../components/Question";
import { useAuth } from "../contexts/AuthContext";
import { getAllQuestions } from "../services/questionService"
import React, { useState } from "react";
import { DIFFICULTY } from "../utils/enums";

const questionRepo = await getAllQuestions();

const difficultyToColorScheme = {
  [DIFFICULTY.EASY]: "green",
  [DIFFICULTY.MEDIUM]: "orange",
  [DIFFICULTY.HARD]: "red",
  [DIFFICULTY.DEFAULT]: "grey",
};

interface QuestionType {
  title: string;
  topic: string;
  upvotes: number;
  downvotes: number;
  difficulty_level: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const mapDifficultyToEnum = (difficultyString: string) => {
    const upperCaseDifficulty = difficultyString.toUpperCase();

    switch (upperCaseDifficulty) {
      case 'EASY':
        return DIFFICULTY.EASY;
      case 'MEDIUM':
        return DIFFICULTY.MEDIUM;
      case 'HARD':
        return DIFFICULTY.HARD;
      default:
        return DIFFICULTY.DEFAULT;
    }
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
  };

  // Filter questions based on selected difficulty and topic
  const filteredQuestions = questionRepo.filter((question: QuestionType) => {
    const matchesDifficulty = selectedDifficulty ? question.difficulty_level.toLowerCase().includes(selectedDifficulty.toLowerCase()) : true;

    const lowerCaseTopic = question.topic.toLowerCase();
    const lowerCaseSelectedTopic = selectedTopic ? selectedTopic.toLowerCase() : "";

    const matchesTopic = selectedTopic ? lowerCaseTopic.includes(lowerCaseSelectedTopic) : true;

    return matchesDifficulty && matchesTopic;
  });


  return (
    <Box w="100vw" h="100vh">
      <NavBar withHomePage={false} />
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
            w={"40%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            pl={4}
          >
            <VStack
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              w={"100%"}
              h={"100%"}
              spacing={2}
            >
              <Box
                w={"100%"}
                h={"20%"}
                py={4}
                px={2}
                m={4}
                rounded={"lg"}
                boxShadow={"lg"}
              >
                <Heading size={"lg"} p={2} mx={4} bg={"white"}>
                  Get A Match!
                </Heading>
                <ButtonGroup isAttached>
                  {Object.values(DIFFICULTY).map((d, i) => {
                    const tcolor = difficultyToColorScheme[d];
                    return (
                      <Button
                        key={`badge-${i}`}
                        variant={"outline"}
                        colorScheme={tcolor}
                      >
                        <Badge colorScheme={tcolor}>{d}</Badge>
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <Divider my={3} />
                You're
                <Text as={"b"}> {user.email}</Text>
              </Box>
              <Box
                w={"100%"}
                h={"80%"}
                py={4}
                px={2}
                m={4}
                rounded={"lg"}
                boxShadow={"lg"}
              >
                <Heading size={"lg"} p={2} mx={4} bg={"white"}>
                  Statistics
                </Heading>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Box>
            </VStack>
          </Box>
          <Box
            w={"60%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box w={"100%"} py={4} px={2} m={4} rounded={"lg"} boxShadow={"lg"}>
              <Box display="flex" justifyContent="space-between">
                <Box w="48%" py={4} px={2} m={4} rounded="lg" boxShadow="lg" display="flex" flexDirection="row" alignItems="center">
                  <Text mr={2} fontWeight="bold" minW="160px">
                    Filter by Topic:
                  </Text>
                  <Input
                    placeholder="Enter topic..."
                    value={selectedTopic || ""}
                    onChange={(e) => handleTopicChange(e.target.value)}
                  />
                </Box>
                <Box w="48%" py={4} px={2} m={4} rounded="lg" boxShadow="lg" display="flex" flexDirection="row" alignItems="center">
                  <Text mr={2} fontWeight="bold" minW="160px">
                    Filter by Difficulty:
                  </Text>
                  <Input
                    placeholder="Enter difficulty..."
                    value={selectedDifficulty !== null ? selectedDifficulty.toString() : ""}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                  />
                </Box>
              </Box>
              <Heading size={"lg"} p={2} mx={4} mb={4} bg={"white"}>
                Questions Repository
              </Heading>
              <Box maxH={"400px"} p={4} overflowY="auto">
                {filteredQuestions.map((question: QuestionType, index: number) => (
                  <Question
                    key={index}
                    questionTitle={question.title}
                    questionTopic={question.topic}
                    upVotes={question.upvotes}
                    downVotes={question.downvotes}
                    difficulty={mapDifficultyToEnum(question.difficulty_level)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default UserProfile;
