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

import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
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

  useEffect(() => {
    // Make API call to fetch question - need to change this logic later
    fetch("http://localhost:8000/questions/test/easy/random", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "email1": "user1@example.com",
    "email2": "user2@example.com"
  })
})
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then((data) => setQuestion(data))
.catch((error) => console.error("Error fetching question:", error));
  }, []);

  return (
    <>
      <Box w={"100dvw"} h={"100dvh"}>
        <LoadingWrapper isLoading={!question} repeat={2}>
          <NavBar withoutAnything activeLink={false} />
          <Box h={"80%"} p={2} mt={6}>
            <Flex flexDirection={"row"}>
              <Box w={"35%"}>
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
                <CodeEditor height={70} />
              </Box>
            </Flex>
          </Box>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default WorkspacePage;
