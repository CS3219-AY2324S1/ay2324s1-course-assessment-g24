import {
  AbsoluteCenter,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";

import PeerPrepLogo from "../components/PeerPrepLogo";

const ForgotPassword = () => {
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
              }}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ handleSubmit }) => (
                <Box as={"form"} onSubmit={handleSubmit}>
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
                      width={"full"}
                    />
                  </FormControl>
                  <Link to={"/verification"}>
                    <Button
                      loadingText={"Sending email..."}
                      variant={"solid"}
                      colorScheme={"orange"}
                      type={"submit"}
                      size={"md"}
                      width={"full"}
                      mt={4}
                    >
                      Send Reset Email
                    </Button>
                  </Link>
                </Box>
              )}
            </Formik>
          </Box>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default ForgotPassword;
