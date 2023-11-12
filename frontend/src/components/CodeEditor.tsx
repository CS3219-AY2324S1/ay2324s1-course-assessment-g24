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

// CodeEditor.tsx
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useState } from "react";
import axios from "axios";

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
        language: selectedLanguage, // Use the selected language
      });

      // Update the output state with the response
      setOutput(response.data.output);

      // Pass the output to the parent component
      onExecuteCode(response.data.output);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code");

      // Pass the error to the parent component
      onExecuteCode("Error executing code");
    }
  };

  return (
    <div>
      <Editor
        language={selectedLanguage} // Use the selected language
        value={editorValue}
        onChange={(value) => setEditorValue(value || "")}
        height={`${height}dvh`}
        options={options}
      />
      <button onClick={executeCode}>Execute</button>
      <div>
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
