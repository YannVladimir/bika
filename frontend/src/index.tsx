import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "context/Theme";
import App from "App";
import "index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
