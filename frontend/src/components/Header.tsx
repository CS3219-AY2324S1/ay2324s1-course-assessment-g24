import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {
  receiverId: string;
}

const Header:React.FC<HeaderProps> = ({ receiverId }) => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold" color="black">
          {receiverId}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
