import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Divider from "../../components/Divider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Messages from "../../components/Messages";

type Message = {
  roomId: number | undefined;
  content: string;
  messageId: number;
  senderId: string;
};

interface ChatProps {
  collabId: number | undefined;
  userId: string;
}

const Chat: React.FC<ChatProps> = ({ collabId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [senderId, setSenderId] = useState("");
  const [roomId, setRoomId] = useState<number>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (roomId) { 
      const wsUrl = `${import.meta.env.VITE_COMMUNICATION_SERVICE_URL}/${roomId}`;
      const socket = new WebSocket(wsUrl);
      setSocket(socket);

      if (socket) {
        socket.onopen = () => {
          console.log(
            "Websocket connection for room " + roomId + " is established!",
          );
        };

        socket.onclose = (evt: CloseEvent) => {
          console.log(
            "Websocket connection for room " + roomId + " is disconnected!",
          );
          console.log(evt.reason);
        };
      }
    }
  }, [roomId]);

  useEffect(() => {
    if (collabId && userId) {
      setRoomId(collabId);
      setSenderId(userId);
    }
  }, [collabId, userId]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", (evt: MessageEvent) => {
        const newMessage = JSON.parse(evt.data);
        if (newMessage.chat && newMessage.senderId != senderId) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              messageId: prevMessages.length,
              roomId: newMessage.roomId,
              content: newMessage.content,
              senderId: newMessage.senderId
            },
          ]);
        }
      });
    }
  }, [socket]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
  };

  const handleInputKeyPress = async () => {
    if (inputValue.trim().length > 0) {
      setMessages([
        ...messages,
        {
          messageId: messages.length,
          roomId: roomId,
          content: inputValue,
          senderId: senderId // user.email
        },
      ]);

      if (socket) {
        await socket.send(
          JSON.stringify({
            content: inputValue,
            roomId: roomId,
            chat: true,
            senderId: senderId // senderId is basically user.email
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
      <Header roomId={roomId} />
      <Divider />
      <Messages messages={messages} senderId={senderId} />
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
