import { 
  Button, 
  Link,
} from "@chakra-ui/react";

const LinkButton = ({
  link,
  size,
  content,
  variant = "solid",
}: {
  link: string,
  size: string,
  content: string,
  variant?: string,
}) => {
  return (
    <Link
      href={link}
      textDecoration={"none"}
      _hover={{ textDecoration: "none" }}
    >
      <Button size={size} colorScheme={"orange"} variant={variant}>
        {content}
      </Button>
    </Link>
  )
}

export default LinkButton;
