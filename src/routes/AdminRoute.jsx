import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AdminRoute = () => {
  const { logged, admin } = useUser();

  if (!logged) return <Navigate to="/login" />;
  if (!admin) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default AdminRoute;
