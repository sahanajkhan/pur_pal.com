import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Users, MessageSquare, Megaphone, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Connections', path: '/connection', icon: Users },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Announcements', path: '/announcement', icon: Megaphone }
  ];

  return (
    <div className="navbar-wrapper">
      <header className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">PurrPal</span>
          </Link>
        </div>
        <nav className="navbar-links">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <IconComponent className="nav-icon" size={18} />
                <span className="nav-text">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="navbar-profile">
          <Link to="/login" className="logout-btn">
            <LogOut size={16} />
            <span>Logout</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
