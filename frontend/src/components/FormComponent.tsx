import { useState, useEffect } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

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
      socket.send(JSON.stringify(newMessage));
  
      // Manually update messages state after sending message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
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
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  return (
    <div>
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
          <Button onClick={handleStartChat}>Start Chat</Button>
        </Stack>
      ) : (
        <div>
          <div>Sender: {senderId}</div>
          <div>Receiver: {receiverId}</div>
          <div>
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.senderId === senderId ? 'left' : 'right' }}>
                <span>{message.content}</span>
              </div>
            ))}
          </div>
          <Stack spacing={4}>
            <Input
              placeholder="Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSend}>Send</Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
