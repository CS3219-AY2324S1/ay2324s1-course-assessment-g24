import { Box, Flex } from "@chakra-ui/react";

import CodeEditor from "../components/CodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar";
import QuestionPanel from "../components/QuestionPanel";
import { DIFFICULTY } from "../utils/enums";

const WorkspacePage = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={false} repeat={2}>
          <NavBar withoutAnything activeLink={false} />
          <Box h={"80%"} p={2} mt={6}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>
                <QuestionPanel
                  questionTitle={"Two Sum"}
                  questionDescription={
                    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
                  }
                  difficulty={DIFFICULTY.EASY}
                  examples={[
                    "Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
                  ]}
                />
              </Box>
              <Box w={"65%"}>
                <CodeEditor height={70} />
              </Box>
            </Flex>
          </Box>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default WorkspacePage;

export default WorkspacePage;
