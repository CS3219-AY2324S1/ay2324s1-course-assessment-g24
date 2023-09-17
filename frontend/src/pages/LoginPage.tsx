import { 
  AbsoluteCenter, 
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";

import PeerPrepLogo from "../components/PeerPrepLogo";

import { useState } from "react";

interface IUser {
  username: string;
  email: string;
  password: string;
};

const LoginPage = () => {
  // const [user, setUser] = useState<IUser|null>(null);

  // const handleChange = ({ name, value }: { name: string, value: string }) => {
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box mb={5}>
            <PeerPrepLogo />
          </Box>
          <Box px={5} py={1} borderRadius={5}>
          <Box as={"form"} mt={2} w={"md"} onSubmit={handleSubmit}>
            <FormControl isRequired m={3}>
              <FormLabel>Email</FormLabel>
              <Input
                backgroundColor={"white"}
                placeholder={"Email"}
                type={"email"}
                size={"lg"}
                // onChange={(e) => handleChange(e.target)}
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
