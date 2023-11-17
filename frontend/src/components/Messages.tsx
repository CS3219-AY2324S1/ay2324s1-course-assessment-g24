import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

interface MessageProps {
  messages: {
    senderId: string;
    roomId: number | undefined;
    content: string;
    messageId: number;
  }[];
  senderId: string;
  // receiverId: string,
  // hasReceiverDisconnected: () => boolean | null
}

const Messages: React.FC<MessageProps> = ({ messages, senderId }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView();
      }
    });
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (senderId !== "" && item.senderId === senderId) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="green"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="blue"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
