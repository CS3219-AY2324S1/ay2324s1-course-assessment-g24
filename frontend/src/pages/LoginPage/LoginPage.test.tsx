// import { ChakraProvider } from "@chakra-ui/react";
// import "@testing-library/jest-dom";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";

// import LoginPage from "./LoginPage";

// // Mock the useAuth hook
// jest.mock("../../contexts/AuthContext.tsx", () => ({
//   useAuth: () => ({
//     login: jest.fn(),
//   }),
// }));

// test("renders LoginPage component", () => {
//   render(
//     <ChakraProvider>
//       <MemoryRouter>
//         <LoginPage />
//       </MemoryRouter>
//     </ChakraProvider>,
//   );
//   expect(screen.getByText("Email Address")).toBeInTheDocument();
//   expect(screen.getByText("Password")).toBeInTheDocument();
//   expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
//   expect(screen.getByText("Login")).toBeInTheDocument();
//   expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
//   expect(screen.getByText("Sign Up")).toBeInTheDocument();
// });

// test("submits login form", async () => {
//   const mockLogin = jest.fn();
//   render(
//     <ChakraProvider>
//       <MemoryRouter>
//         <LoginPage />
//       </MemoryRouter>
//     </ChakraProvider>,
//   );

//   // Simulate user input
//   fireEvent.change(screen.getByLabelText("Email Address"), {
//     target: { value: "test@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText("Password"), {
//     target: { value: "password123" },
//   });

//   // Simulate form submission
//   fireEvent.click(screen.getByText("Login"));

//   // Wait for login function to be called
//   await waitFor(() => expect(mockLogin).toHaveBeenCalled());
// });

// // Add more tests as needed, such as testing error messages and navigation
