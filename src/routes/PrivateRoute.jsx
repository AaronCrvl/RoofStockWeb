import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; 

const PrivateRoute = () => {
  const { logged } = useUser();
  return logged ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
