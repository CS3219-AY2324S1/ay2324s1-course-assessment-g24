import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
};

const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <Box>
        {children}
    </Box>
  );
};

export default PageWrapper;