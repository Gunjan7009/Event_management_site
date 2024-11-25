// src/component/SimpleLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Head from './Head';

const SimpleLayout = () => {
  return (
    <>
    <Head />
    <main>
      <Outlet /> {/* Renders the child routes */}
    </main>
    </>
  );
};

export default SimpleLayout;
