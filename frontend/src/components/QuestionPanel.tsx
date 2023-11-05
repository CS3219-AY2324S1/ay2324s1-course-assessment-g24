import { Badge, Box, Code, Heading, Text } from "@chakra-ui/react";
import { DIFFICULTY } from "../util/enums";


const QuestionPanel = ({
  questionTitle,
  questionDescription,
  examples,
  difficulty,
}: QuestionPanelProps) => {
  return (
    <>
    <Box p={4} textAlign={"left"}>
      <Heading size={"lg"}>
        {questionTitle}
      </Heading>
      <Badge>
        {difficulty}
      </Badge>
      <Text>
        {questionDescription}
      </Text>
        {examples.map((e, i) => {
          return (
            <>
            <Text>
              Example {i + 1}
            </Text>
            <Code>
              {e}
            </Code>
            </>
          )
        })}
    </Box>
    </>
  )
}

interface QuestionPanelProps {
  questionTitle: string;
  questionDescription: string;
  examples: [string];
  difficulty: DIFFICULTY;
}

export default QuestionPanel;

