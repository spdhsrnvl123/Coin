import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  //   <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
  //   </React.StrictMode>
);
