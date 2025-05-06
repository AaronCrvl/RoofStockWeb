import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home';

const AuthRoute = () => {
  return (
    <Routes> {/* Only Routes here */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthRoute;
