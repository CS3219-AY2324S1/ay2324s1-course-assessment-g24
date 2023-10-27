import {
  AbsoluteCenter,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  theme,
} from "@chakra-ui/react";
import { DIFFICULTY } from "utils/enums";

import HeadingWithGradient from "../components/HeadingWithGradient";
import LinkButton from "../components/LinkButton";
import Navbar from "../components/Navbar";
import PeerPrepLogo from "../components/PeerPrepLogo";

const Matchmaker = () => {
  return (
    <Box w={"100dvw"} h={"100dvh"}>
      <Navbar></Navbar>
      <HeadingWithGradient
        preText={"Select"}
        gradientText={"  Difficulty"}
        postText={""}
        bgGradient={"linear(to-r, orange.400, red.500)"}
      />

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        mt={"10%"}
        ml={"25%"}
      >
        <Card ml={"10%"}>
          <CardHeader>
            <Heading size="md" color={"green"}>
              {" "}
              Easy
            </Heading>
            <hr></hr>
          </CardHeader>
          <CardBody></CardBody>
          <CardFooter>
            <Button>Match</Button>
          </CardFooter>
        </Card>
        <Card ml={"10%"}>
          <CardHeader>
            <Heading size="md" color={"yellow.400"}>
              {" "}
              Medium
            </Heading>
            <hr></hr>
          </CardHeader>
          <CardBody></CardBody>
          <CardFooter>
            <Button bgColor={"yellow.200"}>Match</Button>
          </CardFooter>
        </Card>
        <Card ml={"10%"}>
          <CardHeader>
            <Heading size="md" color={"red.500"}>
              {" "}
              Hard
            </Heading>
            <hr></hr>
          </CardHeader>
          <CardBody></CardBody>
          <CardFooter>
            <Button bgColor={"red.200"}>Match</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Matchmaker;
