// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" toastOptions={{
      style: {
        background: "#0f172a",
        color: "#fff",
      },
    }}
  />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);