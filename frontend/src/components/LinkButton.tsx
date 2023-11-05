import { Box, Button, Link } from "@chakra-ui/react";

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
      <Link href={link} textDecoration={""} _hover={{ textDecoration: "none" }}>
        <Button size={size} colorScheme={colorScheme} variant={variant}>
          {content}
        </Button>
      </Link>
    </Box>
  );
};

export default LinkButton;
