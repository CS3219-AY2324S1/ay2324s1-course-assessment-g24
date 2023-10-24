// import React, { useState, useEffect } from 'react';
// import { Textarea, Box } from '@chakra-ui/react';

// interface CodeEditorProps {
//   user_id: string;
// }

// const CodeEditor: React.FC<CodeEditorProps> = ({ user_id }) => {
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     const socket = new WebSocket(`ws://localhost:8000/ws/user1`);

//     socket.addEventListener('open', (event) => {
//       console.log('WebSocket connected');
//     });

//     socket.addEventListener('message', (event) => {
//       setContent(event.data);
//     });

//     return () => {
//       socket.close();
//     };
//   }, [user_id]);

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newContent = e.target.value;
//     setContent(newContent);
//   };

//   return (
//     <Box>
//       <Textarea value={content} onChange={handleChange} />
//     </Box>
//   );
// };

// export default CodeEditor;

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000'); // Replace with your backend URL

const CodeEditor: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.on('content-change', (newContent: string) => {
      setContent(newContent);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('content-change', newContent);
  };

  return (
    <textarea
      value={content}
      onChange={handleInputChange}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default CodeEditor;
