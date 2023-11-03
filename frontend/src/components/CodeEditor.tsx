import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const CodeEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [clientChanges, setClientChanges] = useState([]);
  const editorRef = useRef();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("sync changes", (data) => {
      setClientChanges((prevChanges) => [...prevChanges, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    clientChanges.forEach((change) => {
      editorRef.current.executeEdits(change.id, [
        {
          range: change.range,
          text: change.text,
        },
      ]);
    });
  }, [clientChanges]);

  const handleEditorChange = (value, event) => {
    setEditorValue(value);

    // Emit change event to server
    const change = {
      id: event.changes[0].id,
      range: event.changes[0].range,
      text: event.changes[0].text,
    };
    const socket = socketIOClient("http://localhost:3001");
    socket.emit("send changes", change);
  };

  return (
    <div>
      <Editor
        height="80vh"
        language="javascript"
        value={editorValue}
        onChange={handleEditorChange}
        ref={editorRef}
      />
    </div>
  );
};

export default CodeEditor;
