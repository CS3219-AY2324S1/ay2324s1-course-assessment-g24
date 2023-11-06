import { PropsWithChildren, ReactElement } from 'react';
import { Box, Container } from '@chakra-ui/react';

export const Page = ({
  children,
}: PropsWithChildren<unknown>): ReactElement<typeof Box> => (
  <Box as="section" height="100vh" overflowY="auto">
    <Container maxW="8xl" pb={{ base: 12, lg: 24 }} pt={{ base: 8, lg: 12 }}>
      {children}
    </Container>
  </Box>
);
