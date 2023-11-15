// import { ChakraProvider } from "@chakra-ui/react";
// import "@testing-library/jest-dom";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter } from "react-router-dom";

// // Import userEvent for simulating user interactions
// import SignUpPage from "./SignUpPage";

// jest.mock("@chakra-ui/react", () => ({
//   ...jest.requireActual("@chakra-ui/react"),
//   useToast: jest.fn(() => ({
//     // Mock the useToast hook
//     toast: jest.fn(),
//   })),
// }));

// test("renders SignUpPage component", () => {
//   render(
//     <ChakraProvider>
//       <MemoryRouter>
//         <SignUpPage />
//       </MemoryRouter>
//     </ChakraProvider>,
//   );
//   expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
//   expect(screen.getByLabelText("Password")).toBeInTheDocument();
//   expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
//   expect(screen.getByText("Sign Up")).toBeInTheDocument();
// });

// test("submits form and shows success message on successful signup", async () => {
//   render(
//     <ChakraProvider>
//       <MemoryRouter>
//         <SignUpPage />
//       </MemoryRouter>
//     </ChakraProvider>,
//   );

//   // Simulate user input
//   userEvent.type(screen.getByLabelText("Email Address"), "test@example.com");
//   userEvent.type(screen.getByLabelText("Password"), "password");
//   userEvent.type(screen.getByLabelText("Confirm Password"), "password");

//   // Submit the form
//   fireEvent.click(screen.getByText("Sign Up"));

//   // Wait for success message
//   await waitFor(() => {
//     expect(
//       screen.getByText("Account Created Successfully! Proceed to Log In!"),
//     ).toBeInTheDocument();
//   });
// });

// // test('shows error message on unsuccessful signup', async () => {
// //   render(
// //     <ChakraProvider>
// //       <MemoryRouter>
// //         <SignUpPage />
// //       </MemoryRouter>
// //     </ChakraProvider>
// //   );

// //   // Simulate user input
// //   userEvent.type(screen.getByLabelText('Email Address'), 'invalid-email'); // Provide an invalid email to trigger an error

// //   // Submit the form
// //   fireEvent.click(screen.getByText('Sign Up'));

// //   // Wait for error message
// //   await waitFor(() => {
// //     expect(screen.getByText('Valid Email Required')).toBeInTheDocument();
// //   });
// // });
