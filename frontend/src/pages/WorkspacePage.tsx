import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar";
import QuestionPanel from "../components/QuestionPanel";
import { DIFFICULTY } from "../utils/enums";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import Chat from "./Chat";
import { useMatching } from "../contexts/MatchingContext";
import { useAuth } from "../contexts/AuthContext";

const WorkspacePage = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [collabId, setCollabId] = useState<number | undefined>(); // roomId
  const { roomId } = useMatching();
  const { user } = useAuth();
  // const [senderId, setSenderId] = useState("") // mock variable - use instead of user for testing if needed

  // Use this for getting sample sender id if user.email doesn't work but this is for test purpose only
  // Mock API is implemented in communication service
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/chat/getSenderReceiver");
  //       const data = await response.json();
  //       setSenderId(data[0]);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  useEffect(() => {
    setCollabId(roomId);
  }, [roomId]);

  useEffect(() => {
    if (collabId) {
      const wsUrl = `ws://localhost:5000/chat/ws/${collabId}`;
      const socket = new WebSocket(wsUrl);
      setSocket(socket);
      // setConnected(true);

      if (socket) {
        socket.onopen = () => {
          console.log(
            "Websocket connection for room " + collabId + " is established!",
          );
        };

        socket.onclose = (evt: CloseEvent) => {
          console.log(
            "Websocket connection for room " + collabId + " is disconnected!",
          );
          console.log(evt.reason);
          // setConnected(false);
        };
      }
    }
  }, [collabId]);

  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={false} repeat={2}>
          <NavBar withoutAnything activeLink={false} whereToGoOnClick={"/workspace"} />
          <Box h={"80%"} p={2} mt={6}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>
                <QuestionPanel
                  questionTitle={"Two Sum"}
                  questionDescription={
                    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
                  }
                  difficulty={DIFFICULTY.EASY}
                  examples={[
                    "Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
                  ]}
                />
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Chat
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <Box maxHeight="80vh" overflowY="auto">
                        <Chat socketObj={socket} collabId={collabId} sender_id={user.email} />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
              </Accordion>
              </Box>
              <Box w={"65%"}>
                <CodeEditor socketObj={socket} collabId={collabId} sender_id={user.email} height={70} />
              </Box>
            </Flex>
          </Box>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default WorkspacePage;
