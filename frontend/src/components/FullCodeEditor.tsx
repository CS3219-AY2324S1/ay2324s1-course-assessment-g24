import { Box, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState } from "react";
import { getCodeExecutionOutput } from "../services/codeExecuteService"

import { LANGUAGE } from "../utils/enums";

// You may need to adjust imports based on your Chakra UI setup

const mmap = {
  [LANGUAGE.PYTHON]: "python",
  [LANGUAGE.CPP]: "cpp",
  [LANGUAGE.JAVASCRIPT]: "javascript"
}

interface FullCodeEditorProps {
  height: number;
  onExecuteCode: (output: string) => void;
  selectedLanguage: string;
}

const FullCodeEditor = ({
  height,
  onExecuteCode,
  selectedLanguage,
}: FullCodeEditorProps) => {
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
      const response = await getCodeExecutionOutput(editorValue, selectedLanguage);

      // Use the error_detail field if present, otherwise use the regular error or output
      const resultOutput =
        response.data.error_detail ||
        response.data.error ||
        response.data.output;

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
          language={mmap[selectedLanguage]} // Use the selected language
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
        <Text fontWeight="bold" mt={2}>
          Output:
        </Text>
        <Box
          p={4}
          border="1px solid #ddd"
          borderRadius="8px"
          bg="white"
          boxShadow="md"
          mt={2}
          overflow="auto"
        >
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              margin: "0",
              fontSize: "14px",
              color: "#333",
            }}
          >
            {output}
          </pre>
        </Box>
      </Box>
    </Box>
  );
};

export default FullCodeEditor;
