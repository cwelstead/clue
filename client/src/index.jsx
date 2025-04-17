import React from "react";
import { createRoot } from "react-dom/client";
import "./components/styles/tailwind.css";
import "./components/styles/index.css";
import "./components/styles/font.css";
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  
  // Only create a root if one doesn't already exist
  if (!rootElement._reactRootContainer) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
});