import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import CodeEditor from "../components/CodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar/NavBar";
import QuestionPanel from "../components/QuestionPanel";
import { DIFFICULTY, LANGUAGE } from "../utils/enums";

import { useMatching } from "../contexts/MatchingContext";
import { useNavigate, useLocation } from "react-router-dom";
import { editor } from "monaco-editor";
import { useAuth } from "../contexts/AuthContext";

const WorkspacePage = () => {
  const { user } = useAuth();
  const { roomId, questions } = useMatching();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/ww' && roomId === undefined) {
      navigate("/userprofile");
    }
  }, [roomId, navigate]);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const currentQuestion = questions[0];
  const placeholderExamples = ["Placeholder Example 1", "Placeholder Example 2"];

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
                  questionTitle={currentQuestion.title ?? "Placeholder Question Title"}
                  questionDescription={currentQuestion.question_prompt ?? "Placeholder Question Prompt"}
                  difficulty={currentQuestion.difficulty_level ?? DIFFICULTY.EASY}
                  examples={currentQuestion.examples ?? placeholderExamples}
                />
                {/* <Accordion allowToggle>
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
                        <Chat
                          socketObj={socket}
                          sender_id={senderId}
                          receiver_id={receiverId}
                        />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion> */}
              </Box>
              <Box w={"65%"}>
                <CodeEditor
                  height={70}
                  editorRef={editorRef}
                  language={user.language}
                  editorContent={editorRef.current?.getValue()}
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
