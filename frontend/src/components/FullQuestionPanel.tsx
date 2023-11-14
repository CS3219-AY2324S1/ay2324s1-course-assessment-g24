import { Badge, Box, Code, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

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
  // Map difficulty to color
  const difficultyColor = () => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "green";
      case "medium":
        return "yellow";
      case "hard":
        return "red";
      default:
        return "gray"; // Default color if difficulty is not one of the specified values
    }
  };

  return (
    <>
      <Box
        p={4}
        textAlign={"left"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading size={"lg"} mb={2}>
          {questionTitle}
        </Heading>
        <Flex align="center" mb={2}>
          <Badge colorScheme={difficultyColor()} mr={2}>
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
          <Box mr={4} display="flex" alignItems="center">
            <FaThumbsUp style={{ color: "green", marginRight: "4px" }} />
            <Text>
              Upvotes: <strong style={{ color: "green" }}>{upvotes}</strong>
            </Text>
          </Box>
          <Box mr={4} display="flex" alignItems="center">
            <FaThumbsDown style={{ color: "red", marginRight: "4px" }} />
            <Text>
              Downvotes: <strong style={{ color: "red" }}>{downvotes}</strong>
            </Text>
          </Box>
          <Text>
            Popularity: <strong style={{ color: "blue" }}>{popularity}%</strong>
          </Text>
        </Flex>
        {examples.map((example, i) => (
          <Box key={i} mt={4}>
            <Text fontWeight="bold">Example {i + 1}</Text>
            {example.split("\n").map((line, j) => (
              <Text key={j} mt={j > 0 ? 2 : 0}>
                {line}
              </Text>
            ))}
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
