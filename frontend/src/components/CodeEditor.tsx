import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState } from "react";

const CodeEditor = ({ height }: { height: number }) => {
  const [editorValue, setEditorValue] = useState("");

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
        onChange={() => {
          setEditorValue("");
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

