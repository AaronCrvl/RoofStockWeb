import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Home from '../pages/Home';
import Stock from '../pages/Stock/Stock';

const AdminRoute = () => {
  return (
    <Routes> {/* Only Routes here */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stock" element={<Stock />} />
    </Routes>
  );
};

export default AdminRoute;
