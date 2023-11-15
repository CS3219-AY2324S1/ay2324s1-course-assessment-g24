import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  messageId: number;
};

interface ChatProps {
  socketObj: WebSocket | null;
  sender_id: string;
  receiver_id: string;
}

const Chat: React.FC<ChatProps> = ({ socketObj, sender_id, receiver_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setSocket(socketObj);
    setSenderId(sender_id);
    setReceiverId(receiver_id);
  }, [socketObj, sender_id, receiver_id])

  useEffect(() => {
    if (socket) {
      socket.onmessage = (evt: MessageEvent) => {
        const newMessage = JSON.parse(evt.data);
        if (newMessage.senderId === receiverId && newMessage.chat) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              messageId: prevMessages.length,
              senderId: receiverId,
              receiverId: senderId,
              content: newMessage.content,
            },
          ]);
        }
      };
    }
  }, [socket])

  const handleInputChange = (val: string) => {
    setInputValue(val);
  };

  const handleInputKeyPress = async () => {
    if (inputValue.trim().length > 0) {
      setMessages([
        ...messages,
        {
          messageId: messages.length,
          senderId: senderId,
          receiverId: receiverId,
          content: inputValue,
        },
      ]);

      if (socket) {
        await socket.send(
          JSON.stringify({
            content: inputValue,
            receiverId: receiverId,
            senderId: senderId,
            chat: true
          }),
        );
      }

      setInputValue("");
    }
  };

  return (
    <Flex
      w="100%"
      h="60vh"
      justify="center"
      align="left"
      style={{ position: "relative" }}
      flexDir="column"
    >
      <Header receiverId={receiverId} />
      <Divider />
      <Messages
        messages={messages}
        senderId={senderId}
      />
      <Divider />
      <Footer
        inputMessage={inputValue}
        setInputMessage={handleInputChange}
        handleSendMessage={handleInputKeyPress}
      />
    </Flex>
  );
};

export default Chat;
