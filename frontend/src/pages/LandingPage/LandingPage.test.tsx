import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

test('renders LandingPage component correctly', () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  // Check if the PeerPrepLogo is rendered
  expect(screen.getByAltText('PeerPrep Logo')).toBeInTheDocument();

  // Check if the heading is rendered
  expect(screen.getByText('The only')).toBeInTheDocument();
  expect(screen.getByText('tech interview')).toBeInTheDocument();
  expect(screen.getByText('preparation tool you will ever need!')).toBeInTheDocument();

  // Check if the Sign Up and Login buttons are rendered
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

// Add more tests as needed, such as testing the functionality of Sign Up and Login buttons
