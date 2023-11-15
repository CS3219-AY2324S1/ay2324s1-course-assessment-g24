import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import HeadingWithGradient from "../components/HeadingWithGradient";
import NavBar from "../components/NavBar/NavBar";

const MatchMaker = () => {
  return (
    <Box w={"100dvw"} h={"100dvh"}>
      <NavBar />
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

export default MatchMaker;
