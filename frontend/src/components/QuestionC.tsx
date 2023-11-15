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
import { useState } from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { updateUpvote } from "../services/questionService";
import { updateDownvote } from "../services/questionService"
import { Link } from 'react-router-dom';

import { DIFFICULTY } from "../utils/enums";

const QuestionC = ({
  questionTitle,
  questionTopic,
  upVotes,
  downVotes,
  difficulty,
  ...props
}: QuestionProps & BoxProps) => {
  const tcolor = difficultyToColorScheme[difficulty];
  const [uvs, setUvs] = useState<number>(upVotes);
  const [dvs, setDvs] = useState<number>(downVotes);

  const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.NOVOTE);

  const handleVoteStatusChange = (vs: VoteStatus) => {
    if (vs == voteStatus) {
      setUvs(upVotes);
      setDvs(downVotes);
      setVoteStatus(VoteStatus.NOVOTE);
      return;
    }

    switch (vs) {
      case VoteStatus.UPVOTE:
        updateUpvote(questionTitle);
        setUvs(uvs+1);
        break;
      case VoteStatus.DOWNVOTE:
        updateDownvote(questionTitle);
        setDvs(dvs+1);
        break;
      default:
        setVoteStatus(VoteStatus.NOVOTE);
    }
  };

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
        {...props}
      >
        <Flex flexDirection={"row"} gap="1.5rem" alignItems={"center"}>
          <Badge colorScheme={tcolor} minWidth="100px" textAlign="center">{questionTopic}</Badge> 
          <Link to={`/question/${questionTitle}`} style={{ textDecoration: 'none' }}>
          <Text as={"b"}>{questionTitle}</Text>
          </Link>
          <Spacer />
              
          <Badge colorScheme={tcolor}>{difficulty}</Badge>
          <HStack flexDirection={"row"} alignItems={"center"}>
            <IconButton
              mr={-6}
              aria-label={"Upvote"}
              variant={"unstyled"}
              onClick={() => handleVoteStatusChange(VoteStatus.UPVOTE)}
              icon={
                voteStatus == VoteStatus.UPVOTE ? <BiSolidUpvote /> : <BiUpvote />
              }
            />
            <Text as={"b"}>{uvs}</Text>
            <Divider colorScheme={tcolor} orientation={"vertical"} />
            <Text as={"b"}>{dvs}</Text>
            <IconButton
              mr={-6}
              aria-label={"Downvote"}
              variant={"unstyled"}
              onClick={() => handleVoteStatusChange(VoteStatus.DOWNVOTE)}
              icon={
                voteStatus == VoteStatus.DOWNVOTE ? (
                  <BiSolidDownvote />
                ) : (
                  <BiDownvote />
                )
              }
            />
            <Spacer />
          </HStack>
        </Flex>
      </Box>
  );
};

interface QuestionProps {
  questionTitle: string;
  questionTopic: string;
  upVotes: number;
  downVotes: number;
  difficulty: DIFFICULTY;
}

const difficultyToColorScheme = {
  [DIFFICULTY.EASY]: "green",
  [DIFFICULTY.MEDIUM]: "orange",
  [DIFFICULTY.HARD]: "red",
  [DIFFICULTY.DEFAULT]: "grey",
};

enum VoteStatus {
  UPVOTE = 1,
  NOVOTE = 0,
  DOWNVOTE = -1,
}

export default QuestionC;
