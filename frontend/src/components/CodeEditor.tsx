// import { Editor } from "@monaco-editor/react";
// import { editor } from "monaco-editor";
// import { useState } from "react";

// const CodeEditor = ({ height }: { height: number }) => {
//   const [editorValue, setEditorValue] = useState("");

//   const options: editor.IStandaloneEditorConstructionOptions = {
//     fontSize: 14,
//     scrollBeyondLastLine: false,
//     minimap: {
//       enabled: false,
//     },
//     lineNumbersMinChars: 3,
//     readOnly: false,
//     scrollbar: {
//       useShadows: false,
//       verticalHasArrows: false,
//       horizontalHasArrows: false,
//       vertical: "visible",
//       horizontal: "visible",
//       verticalScrollbarSize: 10,
//       horizontalScrollbarSize: 10,
//     },
//   };

//   return (
//     <div>
//       <Editor
//         language="javascript"
//         value={editorValue}
//         onChange={() => {
//           setEditorValue("");
//         }}
//         height={`${height}dvh`}
//         options={options}
//       />
//     </div>
//   );
// };

// // interface Props {
// //   language?: LANGUAGE;
// //   questionNumber: number;
// //   editorContent?: string;
// //   editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
// //   userSelect: string;
// //   pointerEvents: string;
// //   shouldDisplay: boolean;
// //   readOnly?: boolean;
// //   isLoading: boolean;
// // }

// export default CodeEditor;

import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState } from "react";
import axios from "axios";
import { Button, Box, Text } from "@chakra-ui/react"; // You may need to adjust imports based on your Chakra UI setup

interface CodeEditorProps {
  height: number;
  onExecuteCode: (output: string) => void;
  selectedLanguage: string;
}

const CodeEditor = ({ height, onExecuteCode, selectedLanguage }: CodeEditorProps) => {
  const [editorValue, setEditorValue] = useState("");
  const [output, setOutput] = useState("");

  const options: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    lineNumbersMinChars: 3,
    readOnly: false,
    scrollbar: {
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      vertical: "visible",
      horizontal: "visible",
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
  };

  const executeCode = async () => {
    try {
      // Make API call to execute code on the server
      const response = await axios.post("http://localhost:8002/execute", {
        code: editorValue,
        language: selectedLanguage,
      });

      console.log(response);
  
      // Use the error_detail field if present, otherwise use the regular error or output
      const resultOutput = response.data.error_detail || response.data.error || response.data.output;
  
      // Update the output state with the response error or regular error/output
      setOutput(resultOutput);
  
      // Pass the output to the parent component
      onExecuteCode(resultOutput);
    } catch (error) {
      console.error("Error executing code:", error);
  
      setOutput("Error executing code");
  
      // Pass the error to the parent component
      onExecuteCode("Error executing code");
    }
  };

  const containerStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px",
    marginRight: "10px",
  };

  return (
    <Box>
      <Box style={containerStyle}>
        <Editor
          language={selectedLanguage} // Use the selected language
          value={editorValue}
          onChange={(value) => setEditorValue(value || "")}
          height={`${height}dvh`}
          options={options}
        />
      </Box>
      <Box mt={4}>
        <Button style={buttonStyle} colorScheme="teal" onClick={executeCode}>
          Execute
        </Button>
        <Text fontWeight="bold">Output:</Text>
        <Box p={2} border="1px solid #ccc" borderRadius="5px">
          <pre>{output}</pre>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditor;

