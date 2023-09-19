import {
  AbsoluteCenter,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";

import PeerPrepLogo from "../components/PeerPrepLogo";

const ForgotPassword = () => {
  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <AbsoluteCenter>
          <Box
            w={"2xl"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <VStack spacing={5}>
              <PeerPrepLogo />
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
                      <Link to={"/verificationEmailSent"}>
                        <div style={{ margin: "auto" }}>
                          <Button
                            loadingText={"Sending email..."}
                            variant={"solid"}
                            colorScheme={"orange"}
                            type={"submit"}
                            size={"md"}
                            ml={"20%"}
                          >
                            Send Reset Email
                          </Button>
                        </div>
                      </Link>
                    </VStack>
                  </Box>
                )}
              </Formik>
            </VStack>
          </Box>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default ForgotPassword;
