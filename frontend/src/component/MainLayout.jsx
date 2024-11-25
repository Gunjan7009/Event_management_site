// src/component/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders the child routes */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
