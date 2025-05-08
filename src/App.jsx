import React from "react";
import "./index.css"; 
import AppProvider from "./providers/AppProvider"; 
import RouteConfig from "./routes/Route"; 
import Layout from "./layout/Layout"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <RouteConfig />
      </Layout>
      <ToastContainer position="top-right" autoClose={3000} />
    </AppProvider>
  );
}