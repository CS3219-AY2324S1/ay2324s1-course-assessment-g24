import { Box, Flex } from "@chakra-ui/react";

import CodeEditor from "../components/CodeEditor";

const WorkspacePage = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
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
      </Box>
    </>
  );
};

export default WorkspacePage;
