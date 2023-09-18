import { Box, Button, Link } from "@chakra-ui/react";

const LinkButton = ({
  link,
  size,
  content,
  width = "full",
  variant = "solid",
}: {
  link: string;
  size: string;
  content: string;
  width?: string,
  variant?: string;
}) => {
  return (
    <Box width={width}>
      <Link
        href={link}
        textDecoration={"none"}
        _hover={{ textDecoration: "none" }}
      >
        <Button size={size} colorScheme={"orange"} variant={variant}>
          {content}
        </Button>
      </Link>
    </Box>
    
  );
};

export default LinkButton;
