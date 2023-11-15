import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen, } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "./LoginPage";

// Mock the useAuth hook
jest.mock("../../contexts/AuthContext.tsx", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

test("renders LoginPage component", () => {
  render(
    <ChakraProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </ChakraProvider>,
  );
  expect(screen.getByText("Email Address")).toBeInTheDocument();
  expect(screen.getByText("Password")).toBeInTheDocument();
  expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  expect(screen.getByText("Sign Up")).toBeInTheDocument();
});

