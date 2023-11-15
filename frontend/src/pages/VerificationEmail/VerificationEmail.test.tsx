import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// Import userEvent for simulating user interactions
import VerificationEmail from "./VerificationEmail";

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
        <VerificationEmail />
      </MemoryRouter>
    </ChakraProvider>,
  );
  expect(screen.getByText("Email for password reset has been sent to your email, please check your inbox!")).toBeInTheDocument();
});


