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
import QuestionC from "../components/QuestionC"
import { useAuth } from "../contexts/AuthContext";
import { DIFFICULTY } from "../utils/enums";
import { useMatching } from "../contexts/MatchingContext";
import { getHistoriesByUser } from "../services/historyService";
import { getAllQuestions } from "../services/questionService"

// Gets all questions from question service
const questionRepo = await getAllQuestions();

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
  [DIFFICULTY.DEFAULT]: "gray"
};

const UserProfile = () => {
  const [diffcultySearchedFor, setDifficultySearchedFor] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  const { user } = useAuth();
  const { startMatch, isMatching, count, stopQueuing } = useMatching();
  const [numberOfQuestionsSolved, setNumberQuestionsSolved] = useState<number>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const questionsSolved = async () => {
      return await getHistoriesByUser({ email: user.email });
    }
    questionsSolved().then(
      response => setNumberQuestionsSolved(response.length)
    )
  }, []);

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

  console.log("User Admin Status: ", user.is_admin);

  return (
    <Box w="100vw" h="100vh">
      <NavBar withHomePage={false} whereToGoOnClick={"/userprofile"} withAdmin={user.is_admin} />
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
                {!isMatching ? (
                  <>
                  <Heading size={"lg"} p={2} mx={4} bg={"white"}>
                    Get A Match!
                  </Heading>
                  <ButtonGroup isAttached>
                    {Object.values(DIFFICULTY).map((d, i) => {
                      const tcolor = difficultyToColorScheme[d];
                      return d !== DIFFICULTY.DEFAULT && (
                        <Button
                          key={`badge-${i}`}
                          variant={"outline"}
                          colorScheme={tcolor}
                          onClick={() => {
                            startMatch(d);
                            setDifficultySearchedFor(d);
                          }}
                        >
                          <Badge colorScheme={tcolor}>{d}</Badge>
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                  </>
                ): (
                  <>
                  <VStack spacing={2}>
                    <Text>Let's wait for</Text>
                    <Heading>{count}s</Heading>
                    <Divider my={2} />
                    <Badge colorScheme={difficultyToColorScheme[diffcultySearchedFor]}>{diffcultySearchedFor}</Badge>
                    <Divider my={2} />
                    <Button colorScheme={"red"} onClick={stopQueuing}>
                      Cancel
                    </Button>
                  </VStack>
                  </>
                )}
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
                <Text>Number of Questions Solved: {numberOfQuestionsSolved}</Text>
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
                {filteredQuestions.map((question: QuestionType) => (
                  <QuestionC
                    key={question.title}
                    questionTitle={question.title}
                    questionTopic={question.topic}
                    upVotes={question.upvotes}
                    downVotes={question.downvotes}
                    difficulty={DIFFICULTY[question.difficulty_level.toUpperCase() as keyof typeof DIFFICULTY]} // mapDifficultyToEnum(question.difficulty_level)
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