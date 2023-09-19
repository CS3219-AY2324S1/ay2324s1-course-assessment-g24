import {
  AbsoluteCenter,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";

import PeerPrepLogo from "../components/PeerPrepLogo";
import LinkButton from "../components/LinkButton";

const VerificationEmail = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box mb={5}>
            <PeerPrepLogo />
          </Box>
          <Box bg="white" p={6} rounded={"md"} w={"sm"}>
            <VStack spacing={3}>
            <Text>
              Email for password reset has been sent to your email, please
              check your inbox!
            </Text>
            <LinkButton
              link={"/login"}
              size={"md"}
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
