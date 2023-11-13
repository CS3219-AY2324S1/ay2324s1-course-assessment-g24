import React, { useEffect, useState } from 'react';
import { Box, Input, VStack, Text, Flex, Heading, Stack, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  messageId: number;
};

const MockChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false)

  const handleStartChat = () => {
    const wsUrl = `ws://localhost:5000/chat/ws/${senderId}`;
    const socket = new WebSocket(wsUrl)
    setSocket(socket);
    setConnected(true);

    if (socket) {
      socket.onopen = () => {
        console.log("Websocket connection for user " + senderId + " is established!")
      }

      socket.onmessage = (evt: MessageEvent) => {
        const newMessage = JSON.parse(evt.data)
        console.log(newMessage)
        if (newMessage.senderId === receiverId) {
          setMessages(prevMessages => [...prevMessages, { messageId: prevMessages.length, senderId: receiverId, receiverId: senderId, content: newMessage.content }]);
        }
      };

      socket.onclose = (evt: CloseEvent) => {
        console.log(evt.reason);
        setConnected(false);
        // Try to reconnect
        // setSocket(new WebSocket(wsUrl))
      } 
    }
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setMessages([...messages, { messageId: messages.length, senderId: senderId, receiverId: receiverId, content: inputValue }]);
      
      if (socket) {
        await socket.send(JSON.stringify({ content: inputValue, receiverId: receiverId, senderId: senderId, }))
      }

      setInputValue('');
    }
  };
  
  return (
    <VStack spacing={4} width="1000px" padding={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Box height="680px" width="600px" overflowY="auto" borderRadius="lg" backgroundColor={'cyan'}>
        <Heading>Chat Box</Heading>
        {messages.map((message) => (
          <Flex key={message.messageId} justifyContent={message.senderId === senderId ? 'flex-end' : 'flex-start'}>
            <Box p="2" bg={message.senderId === senderId ? 'blue.500' : 'gray.300'} color={message.senderId === senderId ? 'white' : 'black'} borderRadius="md" marginBottom={4}>
              <Text fontSize="sm">{message.content}</Text>
            </Box>
            {message.senderId === senderId && <CheckCircleIcon boxSize={4} color="green.500" />}
          </Flex>
        ))}
        {socket && !connected ? <Text fontSize="sm" color={"red"}> Disconnected from the chat </Text> : null}
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
          <Button onClick={handleStartChat} colorScheme="teal">Start Chat</Button>
        </Stack>
      <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleInputKeyPress} placeholder="Type a message..." />
    </VStack>
  );
};

export default MockChat;