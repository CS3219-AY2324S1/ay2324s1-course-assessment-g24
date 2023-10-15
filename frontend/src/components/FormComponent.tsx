import { useState, useEffect } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

const FormComponent = () => {
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId, receiverId, content, timestamp: '' }),
      });

      if (response.ok) {
        setContent('');
      } else {
        alert('Error sending message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReceive = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/get-messages/${senderId}/${receiverId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        alert('Error fetching messages');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
        <Input
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
        <Button onClick={handleReceive}>Receive</Button>
      </Stack>

      <div style={{ marginTop: '20px' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '10px',
              background: message.senderId === senderId ? '#4caf50' : '#2196f3',
              color: '#fff',
              textAlign: message.senderId === senderId ? 'left' : 'right',
              alignContent: message.senderId === senderId ? 'left' : 'right',
              display: 'block',
              width: 'auto', // Limit the box width to 80% of the parent element
            }}
          >
            <span>{message.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormComponent;
