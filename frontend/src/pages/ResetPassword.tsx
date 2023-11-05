import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { object, ref, string } from "yup";

import LinkButton from "../components/LinkButton";
import PeerPrepLogo from "../components/PeerPrepLogo";

const newPasswordValidation = object().shape({
  password: string()
    .min(8, "Password length cannot be smaller than 8")
    .required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords must match!"),
});

const ResetPassword = () => {
  const successAlert = useDisclosure({ defaultIsOpen: false });

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
              onSubmit={(values, { resetForm }) => {
                alert(JSON.stringify(values, null, 2));
                resetForm();
                successAlert.onOpen();
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
                      <Alert
                        status="success"
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription w={"auto"}>
                            Proceed to log in!
                          </AlertDescription>
                        </Box>

                        <LinkButton
                          link={"/login"}
                          size={"md"}
                          width={"30%"}
                          content={"Login"}
                          variant={"solid"}
                          colorScheme={"green"}
                        />
                      </Alert>
                    ) : (
                      <Button
                        loadingText={"Logging in..."}
                        width={"full"}
                        variant={"solid"}
                        colorScheme={"orange"}
                        type={"submit"}
                        size={"lg"}
                        mt={6}
                      >
                        Reset Password
                      </Button>
                    )}
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
