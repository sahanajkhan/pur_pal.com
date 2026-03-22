import React from 'react';
import './PageStyles.css';

const Announcement = () => {
  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Latest <span className="highlight">Announcements</span></h1>
      <p className="page-subtitle">Don't miss out on important updates, events, and news.</p>
      
      <div className="announcement-list">
        <div className="announcement-card new">
          <span className="badge">New</span>
          <h2>Welcome to PurrPal 1.0</h2>
          <span className="date">March 22, 2026</span>
          <p>We are incredibly excited to launch the new features including our new Home, Connections, and Announcement pages! Start exploring today.</p>
        </div>
        
        <div className="announcement-card">
          <h2>Scheduled Maintenance</h2>
          <span className="date">March 15, 2026</span>
          <p>We will be performing scheduled maintenance this weekend to upgrade our database systems for better performance.</p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
