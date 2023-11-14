import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import HeadingWithGradient from "../components/HeadingWithGradient";
import NavBar from "../components/NavBar";
import Question from "../components/Question";
import { DIFFICULTY } from "../utils/enums";
import { useAuth } from "../contexts/AuthContext";

const randomQuestions = [
  "What is the capital of France?",
  "How do you reverse a string in Python?",
  "What is the largest planet in our solar system?",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "What is the largest planet in our solar system?",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
];

const difficultyToColorScheme = {
  [DIFFICULTY.EASY]: "green",
  [DIFFICULTY.MEDIUM]: "yellow",
  [DIFFICULTY.HARD]: "red",
};

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Box w="100vw" h="100vh">
      <NavBar withHomePage={false} whereToGoOnClick={"/userprofile"} />
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
                      <Button key={`badge-${i}`} variant={"outline"} colorScheme={tcolor}>
                        <Badge colorScheme={tcolor}>{d}</Badge>
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <Divider my={3} />

                You're
                <Text as={"b"}>
                  {" "} {user.email}
                </Text>
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
              <Heading size={"lg"} p={2} mx={4} mb={4} bg={"white"}>
                Questions Repository
              </Heading>
              <Box maxH={"400px"} p={4} overflowY="auto">
                {randomQuestions.map((question, index) => (
                  <Question
                    key={index}
                    questionTitle={question}
                    upVotes={1}
                    downVotes={2}
                    difficulty={DIFFICULTY.HARD}
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
