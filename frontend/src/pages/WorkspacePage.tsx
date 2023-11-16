import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import WorkspaceCodeEditor from "../components/WorkspaceCodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar/NavBar";
import QuestionPanel from "../components/QuestionPanel";
import { DIFFICULTY, LANGUAGE } from "../utils/enums";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';

import Chat from "./Chat/Chat";

import { useMatching } from "../contexts/MatchingContext";
import { useNavigate, useLocation } from "react-router-dom";
import { editor } from "monaco-editor";
import { useAuth } from "../contexts/AuthContext";

const WorkspacePage = () => {
  const { user } = useAuth();
  const { roomId, questions } = useMatching();
  const navigate = useNavigate();
  const location = useLocation();
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname === '/ww' && roomId === undefined) {
      navigate("/userprofile");
    }
  }, [roomId, navigate]);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const currentQuestion = questions[0];
  const placeholderExamples = ["Placeholder Example 1", "Placeholder Example 2"];

  const handleExecuteCode = (output: string) => {
    setExecutionOutput(output);
  };

  // const [senderId, setSenderId] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5002/chat/getSenderReceiver");
  //       const data = await response.json();
  //       setSenderId(data[0]);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={false} repeat={2}>
          <NavBar
            withoutAnything
            activeLink={false}
            whereToGoOnClick={"/ww"}
          />
          <Box h={"80%"} p={2} mt={6}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>
                <QuestionPanel
                  questionTitle={currentQuestion.title ?? "Two Sum"}
                  questionDescription={currentQuestion.question_prompt ?? "Placeholder Question Prompt"}
                  difficulty={currentQuestion.difficulty_level ?? DIFFICULTY.EASY}
                  examples={currentQuestion.examples ?? placeholderExamples}
                />
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Chat
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <Box maxHeight="80vh" overflowY="auto">
                        <Chat collabId={roomId} userId={user.email} />
                        {/* <Chat collabId={10} userId={senderId} /> (For testing)*/}
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
              <Box w={"65%"}>
                <WorkspaceCodeEditor
                  height={70}
                  editorRef={editorRef}
                  language={user.language}
                  editorContent={editorRef.current?.getValue()}
                  onExecuteCode={handleExecuteCode}
                />
              </Box>
            </Flex>
          </Box>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default WorkspacePage;
