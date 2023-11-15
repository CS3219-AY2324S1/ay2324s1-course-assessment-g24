import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  CloseButton,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spacer,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { object, ref, string } from "yup";

import HeadingWithGradient from "../../components/HeadingWithGradient";
import LinkButton from "../../components/LinkButton";
import NavBar from "../../components/NavBar/NavBar";

const ChangePassword = () => {
  const deleteModalDisclosure = useDisclosure();
  const successAlert = useDisclosure({ defaultIsOpen: false });
  const cancelRef = useRef<HTMLButtonElement>(null);

  const newPasswordValidation = object().shape({
    password: string()
      .min(8, "Password length cannot be smaller than 8")
      .required("Required"),
    confirmPassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords must match!"),
  });

  return (
    <Box w={"100dvw"} h={"100dvh"}>
      <NavBar />
      <Container>
        <AbsoluteCenter>
          <VStack spacing={5}>
            <HeadingWithGradient
              preText={"Change"}
              gradientText={"Password"}
              postText={""}
              bgGradient={"linear(to-r, orange.400, red.500)"}
            />
            <Card minW={"lg"} variant={"outline"} px={6} pb={6}>
              <CardHeader>
                <Heading size="md" color={"black"}>
                  Password
                </Heading>
              </CardHeader>

              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  alert(JSON.stringify(values, null, 2));
                  successAlert.onOpen();
                  resetForm();
                }}
                validationSchema={newPasswordValidation}
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

                      {successAlert.isOpen ? (
                        <Alert status="success">
                          <AlertIcon />
                          <Spacer />
                          <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                              Password Changed!
                            </AlertDescription>
                          </Box>
                          <Spacer />
                          <Box>
                            <CloseButton
                              onClick={() => {
                                successAlert.onClose();
                              }}
                            />
                          </Box>
                        </Alert>
                      ) : (
                        <Button
                          loadingText={"Logging in..."}
                          width={"full"}
                          variant={"solid"}
                          colorScheme={"orange"}
                          type={"submit"}
                          size={"lg"}
                          mb={6}
                        >
                          Reset Password
                        </Button>
                      )}
                    </VStack>
                  </Box>
                )}
              </Formik>
            </Card>

            <VStack spacing={2}>
              <LinkButton
                link={"/editprofile"}
                size={"lg"}
                content={"Change Language"}
                variant={"outline"}
              />
              <Button
                colorScheme={"red"}
                variant={"solid"}
                size={"lg"}
                onClick={deleteModalDisclosure.onOpen}
              >
                Delete Account
              </Button>
            </VStack>

            <AlertDialog
              isOpen={deleteModalDisclosure.isOpen}
              leastDestructiveRef={cancelRef}
              onClose={deleteModalDisclosure.onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <HStack spacing={2}>
                      <Button
                        ref={cancelRef}
                        onClick={deleteModalDisclosure.onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onClick={deleteModalDisclosure.onClose}
                      >
                        Delete
                      </Button>
                    </HStack>
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

export default ChangePassword;
