import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </DataProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
