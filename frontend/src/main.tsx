import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
    {/* </AuthProvider> */}
  </React.StrictMode>,
);
