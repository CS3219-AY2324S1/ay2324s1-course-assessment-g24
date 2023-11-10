import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface FooterProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const Footer:React.FC<FooterProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;