// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import EditProfile from './EditProfile';
// import { MemoryRouter } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';

// jest.mock('@chakra-ui/react', () => ({
//   ...jest.requireActual('@chakra-ui/react'),
//   useDisclosure: jest.fn(() => ({ isOpen: false, onOpen: jest.fn(), onClose: jest.fn() })),
// }));

// test('renders EditProfile component', async () => {
//   render(<ChakraProvider><MemoryRouter><EditProfile /></MemoryRouter></ChakraProvider>);
//   await waitFor(() => {
//     expect(screen.getByText('Preferred Programming Language')).toBeInTheDocument();
//   });
// });

// test('updates preferred language on form submission', async () => {
//   render(<ChakraProvider><MemoryRouter><EditProfile /></MemoryRouter></ChakraProvider>);
  
//   // Wait for initial render and interaction
//   await waitFor(() => {
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'C++' } });
//     fireEvent.click(screen.getByText('Update'));
//   });

//   // Introduce a short delay
//   await new Promise(resolve => setTimeout(resolve, 500));


//   // Wait for success alert
//   await waitFor(() => {
//     expect(screen.getByText('Preferred language changed!')).toBeInTheDocument();
//   });
// });

// test('displays info alert for same language on form submission', async () => {
//   render(<ChakraProvider><MemoryRouter><EditProfile /></MemoryRouter></ChakraProvider>);
  
//   // Wait for initial render and interaction
//   await waitFor(() => {
//     fireEvent.click(screen.getByText('Update'));
//   });

//   // Wait for info alert
//   await waitFor(() => {
//     expect(screen.getByText('Same language identified, no need to change!')).toBeInTheDocument();
//   });
// });
