import { Box, Flex } from "@chakra-ui/react";

import CodeEditor from "../components/CodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";

const WorkspacePage = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={false} repeat={2}>
          <Box w={"100%"} h={"10%"} p={2}>
            NavBar
          </Box>
          <Box w={"100%"} h={"10%"} p={2}>
            Question Title
          </Box>
          <Box h={"80%"} p={2}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>Question Panel</Box>
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
