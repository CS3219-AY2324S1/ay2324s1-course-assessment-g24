import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { io, Socket } from 'socket.io-client';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LANGUAGE } from "../utils/enums";
import { useMatching } from "../contexts/MatchingContext";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button, Text } from "@chakra-ui/react";
import { getCodeExecutionOutput } from "../services/codeExecuteService"

const WorkspaceCodeEditor = ({
  language,
  editorRef,
  onExecuteCode,
  height,
  editorContent
}: WorkspaceCodeEditorProps) => {
  const { roomId } = useMatching();
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [output, setOutput] = useState("");
  const [editorValue, setEditorValue] = useState("");

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
    const sock = io(url || '', {
      autoConnect: false,
    });

    if (!roomId) return;

    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('editorChange', (event) => {
      isIncoming.current = true;
      editorRef.current?.getModel()?.applyEdits(event.changes);
    });

    return () => {
      sock.disconnect();
    };
  }, [roomId]);

  const handleChange = (
    _value = '',
    event: editor.IModelContentChangedEvent
  ) => {
    if (isIncoming.current) {
      isIncoming.current = false;
      return;
    }
    socket?.emit('editorChange', event);
  };

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  }

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

  const executeCode = async () => {
    try {
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
    } catch (error) {
      console.error("Error executing code:", error);

      setOutput("Error executing code");

      // Pass the error to the parent component
      onExecuteCode("Error executing code");
    }
  };

  return (
    <Box>
        <Box style={containerStyle}>
            <Editor
                language="javascript"
                defaultLanguage={(language ?? user.language).toLowerCase()} 
                onChange={(value) => setEditorValue(value || "")}
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
  );
};

interface WorkspaceCodeEditorProps {
  language?: LANGUAGE;
  onExecuteCode: (output: string) => void;
  editorContent?: string;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
  readOnly?: boolean;
  height: number;
}

export default WorkspaceCodeEditor;
