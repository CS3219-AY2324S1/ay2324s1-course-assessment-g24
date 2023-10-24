import React, { useState, useEffect, useRef } from 'react';

interface Props {
  user_id: string;
}

const CodeEditor: React.FC<Props> = ({ user_id }) => {
  const [code, setCode] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${user_id}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = event.data;
      setCode(data);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(() => {
        const newSocket = new WebSocket(`ws://localhost:8000/ws/${user_id}`);
        socketRef.current = newSocket;
      }, 3000);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user_id]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (socketRef.current) {
      socketRef.current.send(newCode);
    }
  };

  return <textarea value={code} onChange={handleCodeChange} />;
};

export default CodeEditor;
