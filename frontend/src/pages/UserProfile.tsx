import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
  defineStyle,
} from "@chakra-ui/react";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import HeadingWithGradient from "../components/HeadingWithGradient";
import Navbar from "../components/NavBar";
import PeerPrepLogo from "../components/PeerPrepLogo";

const underline = defineStyle({
  color: "orange.500",
  borderBottom: "2px",
  borderRadius: "10",
  fontFamily: "serif",
  // let's also provide dark mode alternatives
});

const randomQuestions = [
  "What is the capital of France?",
  "How do you reverse a string in Python?",
  "What is the largest planet in our solar system?",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
  "Write a function to find the factorial of a number.",
];

const UserProfile = () => {
  

  return (
    <Box w="100vw"h="100vh" overflowY="auto">
      <Box mt={"1%"} display="flex">
        <PeerPrepLogo />
      </Box>{" "}
      {/* Use "m" (margin) to create space */}
      <HeadingWithGradient
        preText={"Your"}
        gradientText={"Profile"}
        postText={""}
        bgGradient={"linear(to-r, orange.400, red.500)"}
      />
      <Flex>
      <Card width={"20%"} ml={"15%"} mt={"1%"}>
        <CardHeader>
          <Link to={"/editprofile"}>
            <Button bgColor={"white"} ml={"85%"} size={"lg"}>
            <Icon as={IoSettingsOutline}/></Button></Link>
          <Heading size="md" color={"black"} mt={"2%"}>
            Particulars
          </Heading>
          <Avatar
            size={"xl"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
            mt={"10%"}
          />
          <Center>
            <p>Username</p> {/*update with the users username*/}
          </Center>
          
          <Text fontSize="md" mt={"10%"} align={"center"} mb={"5%"}>
            Your preferred language: <Text color={"orange"} fontSize="lg"><b>Python</b></Text>
            {/* <Link to={"/editprofile"}>
            <Button bgColor={"white"} >
            <Icon as={MdModeEditOutline}/></Button></Link> */}
          </Text>{" "}
          {/*add the user's preferred lang */}
          <hr ></hr>
        </CardHeader>
      </Card>
      <Card width={"49%"} ml={"1%"} mt={"1%"}>
      <CardHeader>
          <Heading size='md'>Questions History</Heading>
          <Box maxH="300px" overflowY="auto" mt={"2%"}>
            {randomQuestions.map((question, index) => (
              <Box key={index} border="1px" p={2} my={2}>
               Q{index + 1}. {question}
              </Box>
            ))}
          </Box>
        </CardHeader>
      </Card>
      </Flex>
      <Card width={"70%"} ml={"15%"} mt={"1%"} height={"30%"}>
        <Flex>
      <Card width={"20%"} ml={"2%"} mt={"1%"} bgColor={"green.100"}>
        <CardHeader>
          <Heading size='md'>Easy</Heading>
          <Text mt={"25%"}># of questions completed:</Text>
          <Button variant={"outline"} colorScheme="green" mt={"20%"} mr={"80%"}>Match</Button>
        </CardHeader>
      </Card>
      <Card width={"20%"} ml={"2%"} mt={"1%"}  bgColor={"orange.100"}>
        <CardHeader>
          <Heading size='md'>Medium</Heading>
          <Text mt={"25%"}># of questions completed:</Text>
          <Button variant={"outline"} colorScheme="orange" mt={"20%"} mr={"80%"}>Match</Button>
        </CardHeader>
      </Card>
      <Card width={"20%"} ml={"2%"} mt={"1%"} bgColor={"red.100"}>
        <CardHeader>
          <Heading size='md'>Hard</Heading>
          <Text mt={"25%"}># of questions completed:</Text>
          <Button variant={"outline"} colorScheme="red" mt={"20%"} mr={"80%"}>Match</Button>
        </CardHeader>
      </Card>
      <Card width={"30%"} ml={"2%"} mt={"1%"} bgColor={"white"}>
        <CardHeader>
          <Heading size='md'>Statistics</Heading>
          <Text mt={"3%"}>Total # of questions completed:</Text>
          {/* <Button variant={"outline"} colorScheme="" mt={"20%"} mr={"80%"}>Match</Button> */}
        </CardHeader>
      </Card>
      </Flex>
      </Card>
      <Button mt={"2%"} variant={"outline"} colorScheme="red">Log Out</Button>
       
    </Box>
  );
};

export default UserProfile;
