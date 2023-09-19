import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import PeerPrepLogo from "../components/PeerPrepLogo";

const VerificationEmail = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Center
            w={"2xl"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <VStack spacing={5}>
              <PeerPrepLogo />
              <Text>
                Email for password reset has been sent to your email, please
                check your inbox!
              </Text>
              <Link to={"/login"}>
                <Button
                  width={"full"}
                  variant={"solid"}
                  colorScheme={"orange"}
                  type={"submit"}
                  size={"md"}
                >
                  Login
                </Button>
              </Link>
            </VStack>
          </Center>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default VerificationEmail;
