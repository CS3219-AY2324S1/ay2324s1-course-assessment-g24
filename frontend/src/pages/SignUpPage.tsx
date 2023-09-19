import {
  AbsoluteCenter,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { object, ref, string } from "yup";

import LinkButton from "../components/LinkButton";
import PeerPrepLogo from "../components/PeerPrepLogo";

const signUpValidation = object().shape({
  email: string()
    .required("Valid Email Required")
    .email("Valid Email Required")
    .required("Required"),
  password: string()
    .min(8, "Password length cannot be smaller than 8")
    .required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

const SignUpPage = () => {
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
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
              validationSchema={signUpValidation}
            >
              {({ handleSubmit, errors, touched, values }) => (
                <Box as={"form"} onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor={"email"}>Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        size={"lg"}
                        placeholder={"Email"}
                      />
                    </FormControl>
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
                        placeholder={"Password"}
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
                      loadingText={"Logging in..."}
                      width={"full"}
                      variant={"solid"}
                      colorScheme={"orange"}
                      type={"submit"}
                      size={"lg"}
                      mt={4}
                    >
                      Sign Up
                    </Button>
                    <HStack w={"md"}>
                      <Text fontSize={"sm"} whiteSpace={"nowrap"}>
                        Already have an account?
                      </Text>
                      <Spacer />
                      <LinkButton
                        link={"/login"}
                        size={"md"}
                        content={"Login"}
                        variant={"link"}
                      />
                    </HStack>
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

export default SignUpPage;
