import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SearchContextProvider } from "./contexts/SearchContext";


// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </ProSidebarProvider>
    </div>
  </React.StrictMode>
);
