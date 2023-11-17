import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {
  roomId: number | undefined;
}

const Header: React.FC<HeaderProps> = ({ roomId }) => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold" color="black">
          Room {roomId}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
