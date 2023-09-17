import { Center, Heading } from "@chakra-ui/react";

import PeerPrepLogo from "../components/PeerPrepLogo";

const LoginPage = () => {
  return (
    <>
      <Center
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
      >
        <PeerPrepLogo />
        <Heading>This is the LoginPage!</Heading>
      </Center>
    </>
  );
};

export default LoginPage;
