import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";

type EditorValue = string | undefined;

interface CodeEditorProps {
  height: number;
  socketObj: WebSocket | null;
  collabId: number | undefined;
  sender_id: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  height,
  socketObj,
  collabId,
  sender_id
}) => {
  const [editorValue, setEditorValue] = useState<EditorValue>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<number>(); // roomId
  const [senderId, setSenderId] = useState("") 
  
  useEffect(() => {
    if (socketObj && collabId && sender_id) {
      setSocket(socketObj);
      setRoomId(collabId);
      setSenderId(sender_id);
    }
  }, [collabId, socketObj, sender_id])

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", (evt: MessageEvent) => {
        const newMessage = JSON.parse(evt.data);
        // replace senderId with user.email
        if (!newMessage.chat && newMessage.senderId != senderId) {
          setEditorValue(newMessage.content);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    async function updateMatchedUser() {
      if (socket) {
        await socket.send(
          JSON.stringify({
            content: editorValue,
            roomId: roomId,
            senderId: senderId, // user.email
            chat: false,
          }),
        );
      }
    }

    updateMatchedUser();
  }, [editorValue]);

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
