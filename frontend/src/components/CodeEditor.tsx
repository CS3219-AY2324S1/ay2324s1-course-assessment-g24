import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState, useEffect } from "react";

type EditorValue = string | undefined;

interface CodeEditorProps {
  height: number;
  socketObj: WebSocket | null;
  sender_id: string;
  receiver_id: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ height, socketObj, sender_id, receiver_id  }) => {
  const [editorValue, setEditorValue] = useState<EditorValue>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    setSocket(socketObj);
    setSenderId(sender_id);
    setReceiverId(receiver_id);
  }, [socketObj, sender_id, receiver_id])

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', (evt: MessageEvent) => {
        const newMessage = JSON.parse(evt.data);
        if (newMessage.senderId === receiverId && !newMessage.chat) {
          setEditorValue(newMessage.content)
        }
      });
    }
  }, [socket])

  useEffect(() => {
    async function updateMatchedUser() {
      if (socket) {
        await socket.send(
          JSON.stringify({
            content: editorValue,
            receiverId: receiverId,
            senderId: senderId,
            chat: false
          }),
        );
      }
    }

    updateMatchedUser();
    }, [editorValue])

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

  return (
    <div>
      <Editor
        language="javascript"
        value={editorValue}
        onChange={(newValue: string | undefined) => {
          setEditorValue(newValue);
        }}
        height={`${height}dvh`}
        options={options}
      />
    </div>
  );
};

// interface Props {
//   language?: LANGUAGE;
//   questionNumber: number;
//   editorContent?: string;
//   editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
//   userSelect: string;
//   pointerEvents: string;
//   shouldDisplay: boolean;
//   readOnly?: boolean;
//   isLoading: boolean;
// }

export default CodeEditor;
