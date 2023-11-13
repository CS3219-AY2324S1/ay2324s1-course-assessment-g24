import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";

interface MessageItem {
  from: string;
  text: string;
}

const Chat: React.FC<MessageItem> = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is Sumanth Yalamarty" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Shivang Gupta" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
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
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
