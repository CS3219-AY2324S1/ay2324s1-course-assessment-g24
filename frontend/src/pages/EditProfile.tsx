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
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Select,
  Spacer,
  Stack,
  StackDivider,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import { useRef, useState } from "react";
import { object, string } from "yup";

import HeadingWithGradient from "../components/HeadingWithGradient";
import LinkButton from "../components/LinkButton";
import NavBar from "../components/NavBar";
import { LANGUAGE } from "../util/enums";
import { NameFormControl } from "../components/NameFormControl";
import { PhotoFormControl } from "../components/PhotoFormControl";
import { Page } from "../components/Page";

const EditProfile = () => {
  const deleteModalDisclosure = useDisclosure();
  const successAlert = useDisclosure({ defaultIsOpen: false });
  const sameValueAlert = useDisclosure({ defaultIsOpen: false });
  // const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    LANGUAGE.PYTHON,
  );

  const languageValidation = object().shape({
    language: string().required("Valid Language Required"),
  });

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
           <div>Customise your experience here at PeerPrep!</div>
           <NameFormControl 
              name={"Hardik Narang"}
              onChange={(name: string): void => setState({ name })}
            />
            <PhotoFormControl
              name={"Hardik Narang"}
              onChange={(photoUrl: string): void => setState({ photoUrl })}
              photoUrl={"https//s7manth.me"}
            />
            <Card minW={"lg"} variant={"outline"} px={6} pb={6}>
              <CardHeader>
                <Heading size="md" color={"black"}>
                  Preferred Programming Language
                </Heading>
              </CardHeader>
              <Formik
                initialValues={{
                  language: currentLanguage,
                }}
                onSubmit={(values) => {
                  if (values.language != currentLanguage) {
                    setCurrentLanguage(values.language);
                    successAlert.onOpen();
                  } else {
                    sameValueAlert.onOpen();
                  }
                }}
                validationSchema={languageValidation}
              >
                {({ handleSubmit, errors }) => (
                  <Box as={"form"} onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      <FormControl>
                        <Field>
                          {({ field }: FieldProps) => (
                            <Select
                              id="language"
                              onChange={field.onChange}
                              defaultValue={currentLanguage}
                            >
                              <Box as={"option"} value={LANGUAGE.PYTHON}>
                                Python
                              </Box>
                              <Box as={"option"} value={LANGUAGE.CPP}>
                                C++
                              </Box>
                              <Box as={"option"} value={LANGUAGE.JAVASCRIPT}>
                                JavaScript
                              </Box>
                            </Select>
                          )}
                        </Field>
                        <FormErrorMessage>{errors.language}</FormErrorMessage>
                      </FormControl>

                      {successAlert.isOpen ? (
                        <Alert status="success">
                          <AlertIcon />
                          <Spacer />
                          <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                              Preferred language changed!
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
                      ) : sameValueAlert.isOpen ? (
                        <Alert status="info">
                          <AlertIcon />
                          <Spacer />
                          <Box>
                            <AlertTitle>Info!</AlertTitle>
                            <AlertDescription>
                              Same language identified, no need to change!
                            </AlertDescription>
                          </Box>
                          <Spacer />
                          <Box>
                            <CloseButton
                              onClick={() => {
                                sameValueAlert.onClose();
                              }}
                            />
                          </Box>
                        </Alert>
                      ) : (
                        <Button
                          loadingText={"Updating..."}
                          variant={"solid"}
                          colorScheme={"orange"}
                          type={"submit"}
                          size={"lg"}
                          mb={6}
                        >
                          Update
                        </Button>
                      )}
                    </VStack>
                  </Box>
                )}
              </Formik>
            </Card>

            <VStack spacing={2}>
              <LinkButton
                link={"/changepassword"}
                size={"lg"}
                content={"Change Password"}
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

export default EditProfile;
