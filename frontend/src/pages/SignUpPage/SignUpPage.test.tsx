import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// Import userEvent for simulating user interactions
import SignUpPage from "./SignUpPage";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(() => ({
    // Mock the useToast hook
    toast: jest.fn(),
  })),
}));

test("renders SignUpPage component", () => {
  render(
    <ChakraProvider>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    </ChakraProvider>,
  );
  expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  expect(screen.getByText("Sign Up")).toBeInTheDocument();
});


