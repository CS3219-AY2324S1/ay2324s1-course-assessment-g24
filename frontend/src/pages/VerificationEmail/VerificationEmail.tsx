import { AbsoluteCenter, Box, Text, VStack } from "@chakra-ui/react";

import LinkButton from "../../components/LinkButton";
import PeerPrepLogo from "../../components/PeerPrepLogo";

const VerificationEmail = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box mb={5}>
            <PeerPrepLogo />
          </Box>
          <Box bg="white" p={6} rounded={"md"} w={"lg"}>
            <VStack spacing={3}>
              <Text fontSize={20} as={"b"} mb={3}>
                Email for password reset has been sent to your email, please
                check your inbox!
              </Text>
              <LinkButton
                link={"/login"}
                size={"lg"}
                width={"full"}
                content={"Login"}
              />
            </VStack>
          </Box>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default VerificationEmail;
