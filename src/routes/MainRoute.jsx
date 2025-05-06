import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Stock from '../pages/Stock/Stock';

const MainRoute = () => {
  return (
    <Routes> {/* Only Routes here */}
      <Route path="/home" element={<Home />} />
      <Route path="/stock" element={<Stock />} />
    </Routes>
  );
};

export default MainRoute;
