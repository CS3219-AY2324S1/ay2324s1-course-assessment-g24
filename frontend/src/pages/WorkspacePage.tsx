// import { Box, Flex } from "@chakra-ui/react";

// import CodeEditor from "../components/CodeEditor";
// import LoadingWrapper from "../components/LoadingWrapper";
// import NavBar from "../components/NavBar";
// import QuestionPanel from "../components/QuestionPanel";
// import { DIFFICULTY } from "../utils/enums";

// const WorkspacePage = () => {
//   return (
//     <>
//       <Box w={"100dvw"} h={"100dvh"}>
//         <LoadingWrapper isLoading={false} repeat={2}>
//           <NavBar withoutAnything activeLink={false} />
//           <Box h={"80%"} p={2} mt={6}>
//             <Flex flexDirection={"row"}>
//               <Box w={"35%"}>
//                 <QuestionPanel
//                   questionTitle={"Two Sum"}
//                   questionDescription={
//                     "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
//                   }
//                   difficulty={DIFFICULTY.EASY}
//                   examples={[
//                     "Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
//                   ]}
//                 />
//               </Box>
//               <Box w={"65%"}>
//                 <CodeEditor height={70} />
//               </Box>
//             </Flex>
//           </Box>
//         </LoadingWrapper>
//       </Box>
//     </>
//   );
// };

// export default WorkspacePage;


import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Select, Text } from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import NavBar from "../components/NavBar";
import QuestionPanel from "../components/QuestionPanel";
import { DIFFICULTY } from "../utils/enums";

interface Question {
  title: string;
  topic: string;
  difficulty_level: string;
  question_prompt: [string];
  examples: [string];
  popularity: number;
  upvotes: number;
  downvotes: number;
}

const WorkspacePage = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("python"); // Default language is set to Python


  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/questions/test/easy/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email1: "user1@example.com",
          email2: "user2@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const handleExecuteCode = (output: string) => {
    setExecutionOutput(output);
  };

  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={!question} repeat={2}>
          <NavBar withoutAnything activeLink={false} />
          <Box h={"80%"} p={2} mt={6}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>
                {/* Add language dropdown */}
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="cpp">C++</option>
                </Select>

                {question && (
                  <QuestionPanel
                    questionTitle={question.title}
                    questionDescription={question.question_prompt}
                    difficulty={question.difficulty_level}
                    examples={question.examples}
                  />
                )}
              </Box>
              <Box w={"65%"}>
                {/* Pass the selected language to CodeEditor */}
                <CodeEditor
                  height={70}
                  onExecuteCode={handleExecuteCode}
                  selectedLanguage={selectedLanguage}
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
