import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LinkButton = ({
  link,
  size,
  content,
  width = "full",
  variant = "solid",
  colorScheme = "orange",
}: {
  link: string;
  size: string;
  content: string;
  width?: string;
  variant?: string;
  colorScheme?: string;
}) => {
  return (
    <Box width={width}>
      <Link to={link}>
        <Button size={size} colorScheme={colorScheme} variant={variant}>
          {content}
        </Button>
      </Link>
    </Box>
  );
};

export default LinkButton;
