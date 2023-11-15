import { Badge, Box, Button, Code, Divider, Heading, Text, VStack } from "@chakra-ui/react";

import { DIFFICULTY } from "../utils/enums";

import { difficultyToColorScheme } from "../pages/UserProfile";
import { useMatching } from "../contexts/MatchingContext";

const QuestionPanel = ({
  questionTitle,
  questionDescription,
  examples,
  difficulty,
}: QuestionPanelProps) => {
  const { endSession } = useMatching();

  return (
    <>
      <VStack spacing={2} p={2}>
        <Box textAlign={"left"}>
        <Heading size={"lg"} mb={2}>{questionTitle}</Heading>
        <Badge colorScheme={difficultyToColorScheme[difficulty]}>{difficulty}</Badge>
        <Divider my={2}/>
        <Text mb={2}>{questionDescription}</Text>
        {examples.map((e, i) => {
          return (
            <Box key={`questionexample-${i}`}>
              <Text>Example {i + 1}</Text>
              <Code>{e}</Code>
              <Divider my={2}/>
            </Box>
          );
        })}
        </Box>
        <Button colorScheme={"red"} onClick={() => endSession()}>
          Close Session
        </Button>
      </VStack>
    </>
  );
};

interface QuestionPanelProps {
  questionTitle: string;
  questionDescription: string;
  examples: string[];
  difficulty: DIFFICULTY;
}

export default QuestionPanel;
