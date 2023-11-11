import { Badge, Box, Code, Heading, Text } from "@chakra-ui/react";

import { DIFFICULTY } from "../utils/enums";

const QuestionPanel = ({
  questionTitle,
  questionDescription,
  examples,
  difficulty,
}: QuestionPanelProps) => {
  return (
    <Box p={4} textAlign={"left"}>
      <Heading size={"lg"}>{questionTitle}</Heading>
      <Badge>{difficulty}</Badge>
      {questionDescription.map((line, index) => (
        <Box key={index} whiteSpace="pre-line">
          {line}
        </Box>
      ))}
      {examples.map((e, i) => {
        return (
          <div key={i}>
            <Text>Example {i + 1}</Text>
            <Code whiteSpace="pre-line">{e}</Code>
          </div>
        );
      })}
    </Box>
  );
};

interface QuestionPanelProps {
  questionTitle: string;
  questionDescription: [string];
  examples: [string];
  difficulty: string;
}

export default QuestionPanel;
