import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { io, Socket } from 'socket.io-client';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LANGUAGE } from "../utils/enums";
import { useMatching } from "../contexts/MatchingContext";
import { useAuth } from "../contexts/AuthContext";

const CodeEditor = ({
  language,
  editorRef,
  height,
  editorContent
}: CodeEditorProps) => {
  const { roomId } = useMatching();
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();

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
    const url = import.meta.env.VITE_COLLABORATION_SERVICE_URL;
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

  return (
    <div>
      <Editor
        language={(language ?? user.language).toLowerCase()}
        defaultLanguage={(language ?? user.language).toLowerCase()}
        onChange={handleChange}
        height={`${height}dvh`}
        options={options}
        defaultValue={editorContent}
        onMount={handleOnMount}
      />
    </div>
  );
};

interface CodeEditorProps {
  language?: LANGUAGE;
  editorContent?: string;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
  readOnly?: boolean;
  height: number;
}

export default CodeEditor;
