import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack, useDisclosure } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HeadingWithGradient from "../components/HeadingWithGradient";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import { object, ref, string } from "yup";
import React from "react";

const changePasswordValidation = object().shape({
  password: string()
    .min(8, "Password length cannot be smaller than 8")
    .required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

const ChangePassword = () => {
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
      <Heading size='md' color={"black"} mt={"2%"}>Change Password</Heading>
      
      <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
              validationSchema={changePasswordValidation}
            >
              {({ handleSubmit, errors, touched, values }) => (
                <Box as={"form"} onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor={"password"}>Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        size={"lg"}
                        placeholder={"New Password"}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                      isDisabled={
                        values.password == "" || values.password.length < 8
                      }
                    >
                      <FormLabel htmlFor={"password"}>
                        Confirm Password
                      </FormLabel>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        variant="filled"
                        size={"lg"}
                        placeholder={"Confirm Password"}
                      />
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      loadingText={"Updating..."}
                      width={"50%"}
                      variant={"solid"}
                      colorScheme={"orange"}
                      type={"submit"}
                      size={"lg"}
                      mt={"10%"}
                      ml={"25%"}
                    >
                      Update
                    </Button>
                  </VStack>
                </Box>
              )}
            </Formik>


    </CardHeader>
    
  </Card>
  <Link to={"/editprofile"}>
  <Button mt={"5%"} colorScheme="orange" variant={"outline"}>Change Language</Button></Link>
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

export default ChangePassword;