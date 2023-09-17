import { 
  AbsoluteCenter, 
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";

import PeerPrepLogo from "../components/PeerPrepLogo";

const LoginPage = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box mb={5}>
            <PeerPrepLogo />
          </Box>
          <Box px={5} py={1} borderRadius={5}>
          <Box as={"form"} mt={2} w={"md"}>
            <FormControl isRequired m={3}>
              <FormLabel>Email</FormLabel>
              <Input
                backgroundColor={"white"}
                placeholder={"Email"}
                type={"email"}
                size={"lg"}
              />
            </FormControl>
            <FormControl isRequired m={3}>
              <FormLabel>Password</FormLabel>
              <Input
                backgroundColor={"white"}
                placeholder={"Password"}
                type={"password"}
                size={"lg"}
              />
            </FormControl>
            <Button
              loadingText={"Logging in..."}
              width={"100%"}
              variant={"solid"}
              colorScheme={"orange"}
              m={2}
              type={"submit"}
            >
              Login
            </Button>
          </Box>
          </Box>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

// form box
// form 

export default LoginPage;
