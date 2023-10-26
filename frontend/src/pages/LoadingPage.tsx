import { AbsoluteCenter, Box } from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import PeerPrepLogo from "../components/PeerPrepLogo";



const LoadingPage = () => {
  return (
    <Box w={"100dvw"} h={"100dvh"}>
  <AbsoluteCenter>
    <Box mb={5}>
      <PeerPrepLogo />
    </Box>
    <Box bg="white" p={6} rounded={"md"} w={"sm"}>
      
    </Box>
    <LoadingSpinner></LoadingSpinner>
  </AbsoluteCenter>
</Box>
  );
};

export default LoadingPage