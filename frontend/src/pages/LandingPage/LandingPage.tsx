import {
  AbsoluteCenter,
  Box,
  ButtonGroup,
  Center,
  Image,
  VStack,
} from "@chakra-ui/react";

import hero from "../../assets/hero.svg";
import HeadingWithGradient from "../../components/HeadingWithGradient";
import LinkButton from "../../components/LinkButton";
import PeerPrepLogo from "../../components/PeerPrepLogo";

const LandingPage = () => {
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
            <Image src={hero} alt={"Person coding happily!"} mb={2} />
            <VStack spacing={5}>
              <PeerPrepLogo />
              <HeadingWithGradient
                preText={"The only"}
                gradientText={"tech interview"}
                postText={"preparation tool you will ever need!"}
                bgGradient={"linear(to-r, orange.400, red.500)"}
              />

              <ButtonGroup>
                <LinkButton link={"/signup"} size={"lg"} content={"Sign Up"} />
                <LinkButton
                  link={"/login"}
                  size={"lg"}
                  content={"Login"}
                  variant={"outline"}
                />
              </ButtonGroup>
            </VStack>
          </Center>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default LandingPage;
