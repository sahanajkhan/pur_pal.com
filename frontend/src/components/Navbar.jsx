import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Connections', path: '/connection' },
    { name: 'Messages', path: '/messages' },
    { name: 'Announcements', path: '/announcement' }
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <Link to="/home">PurrPal</Link>
      </div>
      <nav className="navbar-links">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="navbar-profile">
        <Link to="/login" className="logout-btn">Logout</Link>
      </div>
    </header>
  );
};

export default Navbar;
