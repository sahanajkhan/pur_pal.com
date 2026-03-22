import React, { useState } from 'react';
import './PageStyles.css';

const MOCK_PEOPLE = [
  { id: 1, name: 'Alice Johnson', role: 'Frontend Engineer', skills: ['React', 'UI/UX'], avatar: '👩‍💻' },
  { id: 2, name: 'Bob Smith', role: 'Backend Developer', skills: ['Node.js', 'MongoDB'], avatar: '👨‍💻' },
  { id: 3, name: 'Charlie Davis', role: 'Product Manager', skills: ['Strategy', 'Agile'], avatar: '🧑‍💼' },
];

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: 'Welcome to PurrPal 1.0 🚀', date: 'March 22, 2026' },
  { id: 2, title: 'New Mentorship Program Open', date: 'March 20, 2026' },
];

const Home = () => {
  const [requestedConnections, setRequestedConnections] = useState([]);

  const handleConnect = (id) => {
    if (!requestedConnections.includes(id)) {
      setRequestedConnections([...requestedConnections, id]);
    }
  };

  return (
    <div className="page-container fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="page-title">Welcome to <span className="highlight">PurrPal</span></h1>
        <p className="page-subtitle">Your central hub for community, connections, and announcements.</p>
        
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Find Connections</h3>
            <p>Connect with peers, mentors, and experts in your field.</p>
          </div>
          <div className="feature-card">
            <h3>Stay Updated</h3>
            <p>Read the latest announcements and stay ahead of the curve.</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Use your dashboard to manage your learning journey.</p>
          </div>
        </div>
      </div>

      {/* Expanded Sections */}
      <div className="home-sections">
        
        {/* Find Connections Section */}
        <section className="home-section">
          <h2 className="section-title">Find Connections</h2>
          <p className="section-desc">Discover amazing people in the community.</p>
          <div className="people-list">
            {MOCK_PEOPLE.map(person => (
              <div key={person.id} className="person-row">
                <div className="person-avatar">{person.avatar}</div>
                <div className="person-info">
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                </div>
                <div className="person-skills">
                  {person.skills.map(skill => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
                <button 
                  className={`connect-btn ${requestedConnections.includes(person.id) ? 'requested' : ''}`} 
                  onClick={() => handleConnect(person.id)}
                  disabled={requestedConnections.includes(person.id)}
                  style={requestedConnections.includes(person.id) ? { backgroundColor: '#6c757d', cursor: 'not-allowed', opacity: 0.7 } : {}}
                >
                  {requestedConnections.includes(person.id) ? 'Request Sent' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stay Updated Section */}
        <section className="home-section">
          <h2 className="section-title">Stay Updated</h2>
          <p className="section-desc">Latest news from the platform.</p>
          <div className="mini-announcements">
            {MOCK_ANNOUNCEMENTS.map(announcement => (
              <div key={announcement.id} className="mini-announcement-card">
                <div className="announcement-icon">📰</div>
                <div className="announcement-content">
                  <h4>{announcement.title}</h4>
                  <span className="date">{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Track Progress Section */}
        <section className="home-section">
          <h2 className="section-title">Track Progress</h2>
          <p className="section-desc">Your quick stats overview.</p>
          <div className="progress-dashboard-mini">
            <div className="stat-card">
              <div className="stat-value">12</div>
              <div className="stat-label">Connections Made</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5</div>
              <div className="stat-label">Events Attended</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">85%</div>
              <div className="stat-label">Profile Completed</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
