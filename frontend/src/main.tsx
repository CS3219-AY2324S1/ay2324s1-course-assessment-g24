import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import AppContext from "./contexts/AppContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AppContext>
    </Router>
  </React.StrictMode>,
);
