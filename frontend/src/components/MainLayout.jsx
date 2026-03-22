import React from 'react';
import Navbar from './Navbar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content-container">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
