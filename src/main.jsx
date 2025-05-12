import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import AppProvider from "./providers/AppProvider";
import RouteConfig from "./routes/Route";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouteConfig />          
    <ToastContainer position="top-right" autoClose={3000} />
  </AppProvider>
);
