import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";

interface MessageItem {
  from: string;
  text: string;
}

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  messageId: number;
};

const Chat: React.FC<MessageItem> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  // Fetch senderId and receiverId from API
  useEffect(() => {
    fetch("http://localhost:5000/chat/getSenderReceiver")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSenderId(data[0]);
        setReceiverId(data[1]);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (senderId && receiverId) {
      console.log("Reached")
      const wsUrl = `ws://localhost:5000/chat/ws/${senderId}`;
      const socket = new WebSocket(wsUrl);
      setSocket(socket);
      setConnected(true);

      if (socket) {
        socket.onopen = () => {
          console.log(
            "Websocket connection for user " + senderId + " is established!",
          );
        };

        socket.onmessage = (evt: MessageEvent) => {
          const newMessage = JSON.parse(evt.data);
          if (newMessage.senderId === receiverId) {
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

        socket.onclose = (evt: CloseEvent) => {
          console.log(evt.reason);
          setConnected(false);
          // Try to reconnect
          // setSocket(new WebSocket(wsUrl))
        };
      }
    }
  }, [senderId, receiverId]);

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
          }),
        );
      }

      setInputValue("");
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      align="center"
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
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
    </Flex>
  );
};

export default Chat;
