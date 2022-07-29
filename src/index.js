import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PiCalculatorProvider } from "./context/PiCalculatorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PiCalculatorProvider>
      <App />
    </PiCalculatorProvider>
  </React.StrictMode>
);
