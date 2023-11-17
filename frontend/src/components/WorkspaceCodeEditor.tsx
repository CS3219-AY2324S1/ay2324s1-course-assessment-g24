import { Box, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

import { useAuth } from "../contexts/AuthContext";
import { useMatching } from "../contexts/MatchingContext";
import { getCodeExecutionOutput } from "../services/codeExecuteService";
import { LANGUAGE } from "../utils/enums";

const WorkspaceCodeEditor = ({
  language,
  editorRef,
  height,
  editorContent,
  onExecuteCode,
}: WorkspaceCodeEditorProps) => {
  const { roomId } = useMatching();
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [output, setOutput] = useState("");
  const [editorValue, setEditorValue] = useState<string | undefined>("");

  const { user } = useAuth();

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

  useEffect(() => {
    const url = "http://localhost:8004";
    const sock = io(url || "", {
      autoConnect: false,
    });

    if (!roomId) return;

    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on("editorChange", (event) => {
      isIncoming.current = true;
      editorRef.current?.getModel()?.applyEdits(event.changes);
      setEditorValue(editorRef.current?.getValue());
    });

    return () => {
      sock.disconnect();
    };
  }, [roomId]);

  const handleChange = (
    _value = "",
    event: editor.IModelContentChangedEvent,
  ) => {
    if (isIncoming.current) {
      isIncoming.current = false;
      return;
    }
    setEditorValue(editorRef.current?.getValue());
    socket?.emit("editorChange", event);
  };

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const executeCode = async () => {
    try {
      if (editorValue) {
        // Make API call to execute code on the server
        const response = await getCodeExecutionOutput(editorValue, language);

        // Use the error_detail field if present, otherwise use the regular error or output
        const resultOutput =
          response.data.error_detail ||
          response.data.error ||
          response.data.output;

        // Update the output state with the response error or regular error/output
        setOutput(resultOutput);

        // Pass the output to the parent component
        onExecuteCode(resultOutput);
      }
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
    <div>
      <Box>
        <Box style={containerStyle}>
          <Editor
            language={(language ?? user.language).toLowerCase()}
            defaultLanguage={(language ?? user.language).toLowerCase()}
            onChange={handleChange}
            height={`${height}dvh`}
            options={options}
            defaultValue={editorContent}
            onMount={handleOnMount}
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
    </div>
  );
};

interface WorkspaceCodeEditorProps {
  language?: LANGUAGE;
  editorContent?: string;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
  readOnly?: boolean;
  height: number;
  onExecuteCode: (output: string) => void;
}

export default WorkspaceCodeEditor;
