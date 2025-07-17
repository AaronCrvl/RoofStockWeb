import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login/Login";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import StockTransaction from "../pages/StockTransaction";
import StockClosure from "../pages/StockClosure";
import Settings from "../pages/Settings";
import CreateAccount from "../pages/Login/CreateAccount";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        {/* Routes for authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<StockTransaction />} />
          <Route path="/closure" element={<StockClosure />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Routes only for admins */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
