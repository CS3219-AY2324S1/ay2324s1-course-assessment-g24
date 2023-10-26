import { useState, useEffect } from 'react';
import { Button, Input, Stack, Box } from '@chakra-ui/react';

const FormComponent = () => {
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = async () => {
    const socket = new WebSocket('ws://localhost:8001/' + senderId);

    // socket.onmessage = (event) => {
    //   const newMessage = JSON.parse(event.data);
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    // };

    socket.addEventListener('message', (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(socket);
    setChatStarted(true);
  };

  const handleSend = async () => {
    try {
        if (!socket) return;

        const newMessage = { senderId, receiverId, content, timestamp: '' };

        // Manually update messages state after sending message on sender's side
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        socket.send(JSON.stringify(newMessage));

        const response = await fetch('http://localhost:8000/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
            alert('Error sending message');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.senderId === senderId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, senderId]);

  return (
    <Box p={4}>
      {!chatStarted ? (
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
      ) : (
        <Stack spacing={4}>
          <Box>
            <strong>Sender:</strong> {senderId}
          </Box>
          <Box>
            <strong>Receiver:</strong> {receiverId}
          </Box>
          <Box p={2} border="1px solid #ccc" borderRadius="md">
            {messages.map((message, index) => (
              <Box
                key={index}
                textAlign={message.senderId === senderId ? 'right' : 'left'}
                p={2}
                bg={message.senderId === senderId ? 'teal.200' : 'gray.200'}
                borderRadius="md"
                mb={2}
              >
                {message.content}
              </Box>
            ))}
          </Box>
          <Stack spacing={4}>
            <Input
              placeholder="Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSend} colorScheme="teal">Send</Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default FormComponent;
