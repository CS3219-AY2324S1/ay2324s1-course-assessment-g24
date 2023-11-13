import React from "react";
import { Box, Heading, Badge, Text, Code, Flex } from "@chakra-ui/react";

const FullQuestionPanel = ({
    questionTitle,
    questionDescription,
    examples,
    difficulty,
    topic,
    upvotes,
    downvotes,
    popularity,
  }: FullQuestionPanelProps) => {
    return (
      <>
        <Box p={4} textAlign={"left"} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Heading size={"lg"} mb={2}>
            {questionTitle}
          </Heading>
          <Flex align="center" mb={2}>
            <Badge colorScheme="green" mr={2}>
              {difficulty}
            </Badge>
            <Badge colorScheme="blue">{topic}</Badge>
          </Flex>
          {questionDescription.map((paragraph, index) => (
            <Text key={index} mb={2}>
              {paragraph}
            </Text>
          ))}
          <Flex align="center" mt={2}>
            <Text mr={4}>
              Upvotes: <strong>{upvotes}</strong>
            </Text>
            <Text mr={4}>
              Downvotes: <strong>{downvotes}</strong>
            </Text>
            <Text>
              Popularity: <strong>{popularity}%</strong>
            </Text>
          </Flex>
          {examples.map((e, i) => (
            <Box key={i} mt={4}>
              <Text fontWeight="bold">Example {i + 1}</Text>
              <Code>{e}</Code>
            </Box>
          ))}
        </Box>
      </>
    );
  };

interface FullQuestionPanelProps {
  questionTitle: string;
  questionDescription: [string];
  examples: [string];
  difficulty: string;
  topic: string;
  upvotes: number;
  downvotes: number;
  popularity: number;
}

export default FullQuestionPanel;