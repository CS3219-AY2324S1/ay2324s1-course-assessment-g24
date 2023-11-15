import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";

const TestEnvironmentWrapper = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <AuthProvider>
      <ChakraProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default TestEnvironmentWrapper;
