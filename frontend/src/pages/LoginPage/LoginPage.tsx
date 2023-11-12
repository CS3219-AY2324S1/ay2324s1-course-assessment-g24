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
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useAuth } from "../../contexts/AuthContext";

import LinkButton from "../../components/LinkButton";
import PeerPrepLogo from "../../components/PeerPrepLogo";

const loginValidation = object().shape({
  email: string()
    .required("Valid Email Required")
    .email("Valid Email Required"),
  password: string()
    .min(8, "Password length cannot be smaller than 8")
    .required("Required"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

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
              }}
              onSubmit={async (values) => {
                try {
                  await login(values.email, values.password);
                  toast({
                    title: "Log In Successful!",
                    status: "success",
                    isClosable: true,
                    duration: 1500,
                  });
                  navigate("/userprofile");
                } catch (error) {
                  toast({
                    title: "Invalid Email or Password!",
                    status: "error",
                    isClosable: true,
                    duration: 1500,
                  });
                }
              }}
              validationSchema={loginValidation}
            >
              {({ handleSubmit, errors, touched }) => (
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

                    <Link to={"/forgotpassword"} style={{ marginLeft: "auto" }}>
                      <Button colorScheme="orange" variant="link" size={"md"}>
                        Forgot Password?
                      </Button>
                    </Link>

                    <Button
                      loadingText={"Logging in..."}
                      width={"full"}
                      variant={"solid"}
                      colorScheme={"orange"}
                      type={"submit"}
                      size={"lg"}
                    >
                      Login
                    </Button>
                    <HStack w={"md"}>
                      <Text fontSize={"sm"} whiteSpace={"nowrap"}>
                        Don't have an account?
                      </Text>
                      <Spacer />
                      <LinkButton
                        link={"/signup"}
                        size={"md"}
                        content={"Sign Up"}
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

export default LoginPage;
