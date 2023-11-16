import {
    Badge,
    Box,
    BoxProps,
    Divider,
    Flex,
    HStack,
    IconButton,
    Spacer,
    Text,
  } from "@chakra-ui/react";
  import { Link } from 'react-router-dom';
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  
  import { DIFFICULTY } from "../utils/enums";
  
  const QuestionAlone = ({
    questionId,
    questionTitle,
    questionTopic,
    difficulty,
    onClick,
    onDelete,
    onUpdate,
    ...props
  }: QuestionProps & BoxProps & { questionId: number; onClick: () => void; onDelete: () => void; onUpdate: () => void }) => {
    const tcolor = difficulty
      ? difficultyToColorScheme[difficulty]
      : DIFFICULTY.DEFAULT;
  
    return (
      <Box
      textAlign={"left"}
      rounded={"lg"}
      p={2}
      my={2}
      borderWidth={2}
      bg={`${tcolor}.50`}
      borderColor={`${tcolor}.200`}
      color={`${tcolor}.500`}
      cursor="pointer" // Add cursor: pointer style
      {...props}
      onClick={onClick} // Call the onClick function when clicked
      >
        <Flex flexDirection={"row"} gap="1.5rem" alignItems={"center"}>
        <Text as="span" mr={2}>{`ID: ${questionId}`}</Text>
          <Badge colorScheme={tcolor} minWidth="100px" textAlign="center">
            {questionTopic}
          </Badge>
            <Text as={"b"}>{questionTitle}</Text>
          <Spacer />
          <Badge colorScheme={tcolor}>{difficulty}</Badge>
          <IconButton
            aria-label="Update Question"
            icon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from propagating to the parent (onClick)
              onUpdate();
            }}
          />
          <IconButton
            aria-label="Delete Question"
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
        </Flex>
      </Box>
    );
  };
  
  interface QuestionProps {
    questionTitle: string;
    questionTopic: string;
    difficulty: DIFFICULTY;
  }
  
  const difficultyToColorScheme = {
    [DIFFICULTY.EASY]: "green",
    [DIFFICULTY.MEDIUM]: "orange",
    [DIFFICULTY.HARD]: "red",
    [DIFFICULTY.DEFAULT]: "grey",
  };
  
  export default QuestionAlone;
  