import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardHeader, Heading, Select, Text, useDisclosure } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HeadingWithGradient from "../components/HeadingWithGradient";
import { Link } from "react-router-dom";
import React from "react";

const EditProfile = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <Box w={"100dvw"} h={"100dvh"}>
      <Navbar></Navbar>
      <HeadingWithGradient
                preText={"Edit"}
                gradientText={"Profile"}
                postText={""}
                bgGradient={"linear(to-r, orange.400, red.500)"}
              />
        
          
  <Card width={"30%"} ml={"35%"} mt={"5%"}>
    <CardHeader>
      <Heading size='md' color={"black"} mt={"2%"}>Change your preferred Language</Heading>
      
      <Text align={"left"} fontSize={"xs"} mt={"10%"} ml={"1%"}>Preferred Language:</Text>
      <Select placeholder='Select option' mt={"1%"}>
  <option value='option1'>Python</option>
  <option value='option2'>C++</option>
  <option value='option3'>Java</option>
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
  <Button mt={"5%"} colorScheme="orange" variant={"outline"}>Change Password</Button></Link>
          <Text></Text>
          <Button mt={"1%"} colorScheme="red" variant={"solid"} onClick={onOpen} >Delete Account</Button>
          <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Box>

      
  );

}

export default EditProfile;