import {
  AbsoluteCenter,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";
import { object, ref, string } from "yup";

import PeerPrepLogo from "../components/PeerPrepLogo";

const newPasswordValidation = object().shape({
  password: string()
    .min(8, "Password length cannot be smaller than 8")
    .required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

const ResetPassword = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box mb={5}>
            <PeerPrepLogo />
          </Box>
          <Box bg="white" p={6} rounded={"md"} w={"sm"}>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
              validationSchema={newPasswordValidation}
            >
              {({ handleSubmit, errors, touched }) => (
                <Box as={"form"} onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor={"password"}>Password</FormLabel>
                      <Field
                        as={Input}
                        id="new password"
                        name="new password"
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
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          loadingText={"Logging in..."}
                          width={"full"}
                          variant={"solid"}
                          colorScheme={"orange"}
                          type={"submit"}
                          size={"lg"}
                        >
                          Reset Password
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>
                            Your password has been successfully changed! Proceed to log in.
                          </PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Link to={"/login"}>
                              <Button
                                loadingText={"Logging in..."}
                                width={"full"}
                                variant={"solid"}
                                colorScheme={"orange"}
                                type={"submit"}
                                size={"lg"}
                              >
                                Log In
                              </Button>
                            </Link>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </VStack>
                </Box>
              )}
            </Formik>
          </Box>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default ResetPassword;
