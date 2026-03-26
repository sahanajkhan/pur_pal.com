import React, { useState } from 'react';
import './PageStyles.css';

const MOCK_PEOPLE = [
  { id: 1, name: 'Alice Johnson', role: 'Frontend Engineer', skills: ['React', 'UI/UX'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 2, name: 'Bob Smith', role: 'Backend Developer', skills: ['Node.js', 'MongoDB'], avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 3, name: 'Charlie Davis', role: 'Product Manager', skills: ['Strategy', 'Agile'], avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
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
      <div className="hero-wrapper">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span className="highlight">PurrPal</span></h1>
          <p className="hero-subtitle">Your vibrant central hub for community, connections, and endless opportunities.</p>
          <div className="hero-actions">
            <button className="primary-btn pulse-hover">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Students collaborating" 
            className="hero-image"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Find Connections</h3>
          <p>Connect with peers, mentors, and experts in your field instantly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📰</div>
          <h3>Stay Updated</h3>
          <p>Read the latest announcements and stay ahead of the curve.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Track Progress</h3>
          <p>Use your dashboard to manage your learning and networking journey.</p>
        </div>
      </div>

      {/* Expanded Sections */}
      <div className="home-sections">
        
        {/* Find Connections Section */}
        <section className="home-section glass-panel">
          <h2 className="section-title">Find Connections</h2>
          <p className="section-desc">Discover amazing people in the community.</p>
          <div className="people-list">
            {MOCK_PEOPLE.map(person => (
              <div key={person.id} className="person-row">
                <img src={person.avatar} alt={person.name} className="person-avatar-img" />
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
                  style={requestedConnections.includes(person.id) ? { backgroundColor: '#6c757d', color: '#fff', cursor: 'not-allowed', opacity: 0.7, border: 'none' } : {}}
                >
                  {requestedConnections.includes(person.id) ? 'Request Sent' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="split-sections">
          {/* Stay Updated Section */}
          <section className="home-section glass-panel">
            <h2 className="section-title">Stay Updated</h2>
            <p className="section-desc">Latest news from the platform.</p>
            <div className="mini-announcements">
              {MOCK_ANNOUNCEMENTS.map(announcement => (
                <div key={announcement.id} className="mini-announcement-card">
                  <div className="announcement-icon-small">📣</div>
                  <div className="announcement-content">
                    <h4>{announcement.title}</h4>
                    <span className="date">{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Track Progress Section */}
          <section className="home-section glass-panel">
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
              <div className="stat-card progress-stat">
                <div className="stat-value highlight">85%</div>
                <div className="stat-label">Profile Completed</div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Home;
