import React from 'react';
import './PageStyles.css';

const Connection = () => {
  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Your <span className="highlight">Connections</span></h1>
      <p className="page-subtitle">Build your network and find exactly who you need to succeed.</p>
      
      <div className="empty-state">
        <div className="empty-state-icon">🤝</div>
        <h2>No connections yet!</h2>
        <p>Start exploring the community to find people with similar interests.</p>
        <button className="primary-btn">Explore Community</button>
      </div>
    </div>
  );
};

export default Connection;
