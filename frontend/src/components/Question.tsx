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

import { DIFFICULTY } from "../utils/enums";

const Question = ({
  questionTitle,
  upVotes,
  downVotes,
  difficulty,
  ...props
}: QuestionProps & BoxProps) => {
  const tcolor = difficultyToColorScheme[difficulty];
  const [uvs, setUvs] = useState<number>(upVotes);
  const [dvs, setDvs] = useState<number>(downVotes);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.NOVOTE);

  const handleVoteStatusChange = async (vs: VoteStatus) => {
    try {
      if (vs === voteStatus) {
        setUvs(upVotes);
        setDvs(downVotes);
        setVoteStatus(VoteStatus.NOVOTE);
        return;
      }

      // Make API call based on the vote status
      const endpoint = vs === VoteStatus.UPVOTE ? "upvote" : "downvote";
      const response = await fetch(`http://localhost:8000/questions/popularity/${endpoint}/two_sum`, {
        method: "POST", // You may need to adjust the method based on your API
      });

      if (!response.ok) {
        // Handle error based on your application's logic
        console.error("Error while upvoting/downvoting:", response.statusText);
        return;
      }

      // Update local state
      switch (vs) {
        case VoteStatus.UPVOTE:
          setVoteStatus(VoteStatus.UPVOTE);
          setUvs(uvs + 1);
          if (voteStatus !== VoteStatus.NOVOTE) {
            setDvs(dvs - 1);
          }
          break;
        case VoteStatus.DOWNVOTE:
          setVoteStatus(VoteStatus.DOWNVOTE);
          setDvs(dvs + 1);
          if (voteStatus !== VoteStatus.NOVOTE) {
            setUvs(uvs - 1);
          }
          break;
        default:
          setVoteStatus(VoteStatus.NOVOTE);
      }
    } catch (error) {
      console.error("Error while making the API call:", error);
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
      <Flex flexDirection={"row"} alignItems={"center"}>
        <Text as={"b"}>{questionTitle}</Text>
        <Spacer />
        <HStack flexDirection={"row"} alignItems={"center"}>
          <IconButton
            mr={-6}
            aria-label={"Upvote"}
            variant={"unstyled"}
            onClick={() => handleVoteStatusChange(VoteStatus.UPVOTE)}
            icon={
              voteStatus === VoteStatus.UPVOTE ? <BiSolidUpvote /> : <BiUpvote />
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
              voteStatus === VoteStatus.DOWNVOTE ? (
                <BiSolidDownvote />
              ) : (
                <BiDownvote />
              )
            }
          />
          <Spacer />
          <Badge colorScheme={tcolor}>{difficulty}</Badge>
        </HStack>
      </Flex>
    </Box>
  );
};

interface QuestionProps {
  questionTitle: string;
  upVotes: number;
  downVotes: number;
  difficulty: DIFFICULTY;
}

const difficultyToColorScheme = {
  [DIFFICULTY.EASY]: "green",
  [DIFFICULTY.MEDIUM]: "yellow",
  [DIFFICULTY.HARD]: "red",
};

enum VoteStatus {
  UPVOTE = 1,
  NOVOTE = 0,
  DOWNVOTE = -1,
}

export default Question;
