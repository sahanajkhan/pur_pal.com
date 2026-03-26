import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageStyles.css';

const Connection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myConnections, setMyConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const getToken = () => {
    const storedStudent = localStorage.getItem('student');
    let token = localStorage.getItem('token');
    if (!token && storedStudent && storedStudent !== 'undefined') {
      try { token = JSON.parse(storedStudent).token; } catch (e) {}
    }
    return token;
  };

  const fetchConnections = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/users/connections', config);
      setMyConnections(data.data || []);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`/api/users/search?query=${searchQuery}`, config);
      setSearchResults(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId) => {
    try {
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/users/connect/${userId}`, {}, config);
      setSuccessMsg('Connected successfully!');
      
      // Remove from search results
      setSearchResults(searchResults.filter(user => user._id !== userId));
      
      // Refresh my connections
      fetchConnections();
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Your <span className="highlight">Connections</span></h1>
      <p className="page-subtitle">Build your network and find exactly who you need to succeed.</p>
      
      <div className="search-section" style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#1e293b' }}>Find Connections</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search by email or phone number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '12px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', background: '#f8fafc' }}
          />
          <button type="submit" className="primary-btn" disabled={loading} style={{ margin: 0 }}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <p style={{ color: '#e74c3c', marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>}
        {successMsg && <p style={{ color: '#16a34a', marginTop: '10px', fontSize: '0.9rem' }}>{successMsg}</p>}
      </div>

      {searchResults.length > 0 && (
        <div className="results-section" style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: '#1e293b' }}>Search Results</h3>
          <div className="people-list">
            {searchResults.map(user => (
              <div key={user._id} className="person-row">
                <div className="person-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="person-info">
                  <h4>{user?.name || 'Unknown'}</h4>
                  <p>{user?.email || 'No email'}</p>
                  {user?.phoneNumber && <p style={{ marginTop: '0.25rem' }}>📞 {user.phoneNumber}</p>}
                </div>
                {myConnections.some(c => c._id === user._id) ? (
                  <button className="connect-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed', background: '#e2e8f0', color: '#64748b', border: 'none' }}>Connected</button>
                ) : (
                  <button className="connect-btn" onClick={() => handleConnect(user._id)}>Connect</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="my-connections-section">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: '#1e293b' }}>My Network ({myConnections.length})</h3>
        {myConnections.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🤝</div>
            <h2>No connections yet!</h2>
            <p>Start searching above to find people from their email or phone number.</p>
          </div>
        ) : (
          <div className="people-list">
            {myConnections.map(user => (
              <div key={user._id} className="person-row">
                <div className="person-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="person-info">
                  <h4>{user?.name || 'Unknown'}</h4>
                  <p>{user?.email || 'No email'}</p>
                  {user?.phoneNumber && <p style={{ marginTop: '0.25rem' }}>📞 {user.phoneNumber}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connection;
