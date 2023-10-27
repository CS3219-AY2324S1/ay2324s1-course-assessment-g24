import React, { useState } from 'react';
import { Box, Input, VStack, Text, Flex, Heading, Stack, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  messageId: number;
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  // const [content, setContent] = useState('');
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = async () => {
    const socket = new WebSocket('ws://localhost:8001/' + senderId);

    // setSocket(socket);
    // setChatStarted(true);

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setMessages([...messages, { messageId: messages.length, senderId: senderId, receiverId: receiverId, content: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <VStack spacing={4} width="1000px" padding={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Box height="680px" width="600px" overflowY="auto" borderRadius="lg" backgroundColor={'cyan'}>
        <Heading>Chat Box</Heading>
        {messages.map((message) => (
          <Flex key={message.messageId} justifyContent={message.senderId === 'User' ? 'flex-end' : 'flex-start'}>
            <Box p="2" bg={message.senderId === 'User' ? 'blue.500' : 'gray.300'} color={message.senderId === 'User' ? 'white' : 'black'} borderRadius="md" marginBottom={4}>
              <Text fontSize="sm">{message.content}</Text>
            </Box>
            {message.senderId === 'User' && <CheckCircleIcon boxSize={4} color="green.500" />}
          </Flex>
        ))}
      </Box>
      <Stack spacing={4}>
          <Input
            placeholder="Sender's ID"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
          />
          <Input
            placeholder="Receiver's ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
        </Stack>
      <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleInputKeyPress} placeholder="Type a message..." />
    </VStack>
  );
};

export default ChatBox;
