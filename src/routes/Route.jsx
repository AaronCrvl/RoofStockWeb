import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';
import AdminRoute from './AdminRoute';
import { useUser } from '../contexts/UserContext';

export default function Route() {
  const { logged, userId, admin } = useUser();
  console.log({ logged, userId });

  // Lógica de renderização condicional
  return (
    <Router> {/* Only one Router here */}
      <div className="min-h-screen flex flex-col">
        {/* Your routes */}
        <AuthRoute />
        {/* <AdminRoute />
        <MainRoute /> */}
      </div>
    </Router>
  );
}
