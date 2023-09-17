import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

import hero from "../assets/hero.svg";
import PeerPrepLogo from "../components/PeerPrepLogo";

const HomePage = () => {
  return (
    <>
      <Center
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
      >
        <Box w={"xl"} mt={6}>
          <Image src={hero} alt={"Person coding happily!"} />
        </Box>

        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          textAlign={{ base: "left", md: "center" }}
          margin={"5"}
        >
          <PeerPrepLogo />
          <Heading
            mb={6}
            fontSize={{
              base: "3xl",
              md: "5xl",
            }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{
              base: "normal",
              md: "tight",
            }}
            color="gray.900"
            _dark={{
              color: "gray.100",
            }}
          >
            The only{" "}
            <Text
              display={{
                base: "block",
                lg: "inline",
              }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, orange.400, red.500)"
              fontWeight="extrabold"
            >
              tech interview
            </Text>{" "}
            preparation tool you will ever need!
          </Heading>
          <Text
            px={{
              base: 0,
              lg: 24,
            }}
            fontSize={{
              base: "lg",
              md: "xl",
            }}
            color="gray.600"
            _dark={{
              color: "gray.300",
            }}
          >
            PeerPrep is a tool where students can find peers to practice
            whiteboard-style inteview questions together.
          </Text>
        </Box>
        <Box>
          <ButtonGroup>
            <Link
              href={"/signup"}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Button size={"lg"} colorScheme={"orange"}>
                Sign Up
              </Button>
            </Link>
            <Link
              href={"/login"}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Button size={"lg"} colorScheme={"orange"} variant={"outline"}>
                Login
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Center>
    </>
  );
};

export default HomePage;
