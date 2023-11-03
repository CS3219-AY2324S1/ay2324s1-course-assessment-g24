import {
  AbsoluteCenter,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Heading,
  Select,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import HeadingWithGradient from "../components/HeadingWithGradient";
import NavBar from "../components/NavBar";

const EditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Box w={"100dvw"} h={"100dvh"}>
      <NavBar />
      <Container>
        <AbsoluteCenter>
        <VStack spacing={5}>
            <HeadingWithGradient
              preText={"User"}
              gradientText={"Settings"}
              postText={""}
              bgGradient={"linear(to-r, orange.400, red.500)"}
            />
            <Card>
              <CardHeader>
                <Heading size="md" color={"black"}>
                  Change your preferred Language
                </Heading>

                <Text align={"left"} fontSize={"xs"}>
                  Preferred Language:
                </Text>
                <Select placeholder="Select option" mt={"1%"}>
                  <option value="option1">Python</option>
                  <option value="option2">C++</option>
                  <option value="option3">Java</option>
                </Select>

                <Button
                  loadingText={"Updating..."}
                  width={"50%"}
                  variant={"solid"}
                  colorScheme={"orange"}
                  type={"submit"}
                  size={"lg"}
                  mt={"10%"}
                >
                  Update
                </Button>
              </CardHeader>
            </Card>
            <Link to={"/changepassword"}>
              <Button colorScheme="orange" variant={"outline"}>
                Change Password
              </Button>
            </Link>
            <Text></Text>
            <Button
              colorScheme="red"
              variant={"solid"}
              onClick={onOpen}
            >
              Delete Account
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            </VStack>
        </AbsoluteCenter>
      </Container>
    </Box>
  );
};

export default EditProfile;
