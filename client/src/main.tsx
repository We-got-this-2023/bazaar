import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MiscProvider } from "./context/MiscContext";
import "./index.css";
import { initSettings } from "./utils/settings";
initSettings();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MiscProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </MiscProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
