import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit2, Save, X, ExternalLink, MapPin } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    branch: '',
    goal: '',
    futurePlan: '',
    academicResults: '',
    interests: '',
    linkedinProfile: ''
  });

  const getToken = () => {
    const storedStudent = localStorage.getItem('student');
    let token = localStorage.getItem('token');
    if (!token && storedStudent && storedStudent !== 'undefined') {
      try { token = JSON.parse(storedStudent).token; } catch (e) {}
    }
    return token;
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`/api/users/profile/${id}`, config);
      
      const userProfile = data.data;
      setProfile(userProfile);
      
      // Check ownership
      const loggedInStudentStr = localStorage.getItem('student');
      let loggedInId = null;
      if (loggedInStudentStr && loggedInStudentStr !== 'undefined') {
        try { 
          const parsed = JSON.parse(loggedInStudentStr);
          loggedInId = parsed._id || parsed.id; 
        } catch (e) {}
      }
      
      if (id === 'me' || userProfile._id === loggedInId) {
        setIsOwner(true);
      }

      setFormData({
        name: userProfile.name || '',
        phoneNumber: userProfile.phoneNumber || '',
        branch: userProfile.branch || '',
        goal: userProfile.goal || '',
        futurePlan: userProfile.futurePlan || '',
        academicResults: userProfile.academicResults || '',
        interests: userProfile.interests || '',
        linkedinProfile: userProfile.linkedinProfile || ''
      });

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const { data } = await axios.put('/api/users/profile', formData, config);
      
      // Update local state with new data
      setProfile(data.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error && !profile) {
    return (
      <div className="profile-container">
        <div className="profile-error">{error}</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="profile-container">
      {error && <div className="profile-error">{error}</div>}
      
      <div className="profile-header-card">
        <div className="profile-banner"></div>
        <div className="profile-info-section">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {profile.name ? profile.name.charAt(0) : '?'}
            </div>
            
            {isOwner && (
              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button className="btn-outline" onClick={() => setIsEditing(false)}>
                      <X size={18} /> Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSave}>
                      <Save size={18} /> Save
                    </button>
                  </>
                ) : (
                  <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                    <Edit2 size={18} /> Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>
          
          {!isEditing ? (
            <>
              <h1 className="profile-name">{profile.name}</h1>
              {profile.branch && <div className="profile-headline">{profile.branch} Student</div>}
              
              <div className="profile-meta">
                {profile.email && (
                  <div className="meta-item">
                    <MapPin size={16} /> {profile.email}
                  </div>
                )}
                {profile.phoneNumber && (
                   <div className="meta-item">
                     <span>📞</span> {profile.phoneNumber}
                   </div>
                )}
                {profile.linkedinProfile && (
                  <a href={profile.linkedinProfile.startsWith('http') ? profile.linkedinProfile : `https://${profile.linkedinProfile}`} target="_blank" rel="noreferrer" className="meta-item" style={{ color: '#4f46e5', textDecoration: 'none' }}>
                    <ExternalLink size={16} /> LinkedIn Profile
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="edit-form">
               <div className="info-grid" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                     <label>Phone Number</label>
                     <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Branch / Major</label>
                    <input type="text" name="branch" className="form-control" value={formData.branch} onChange={handleInputChange} placeholder="e.g. Computer Science Engineering" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>LinkedIn Profile URL</label>
                    <input type="url" name="linkedinProfile" className="form-control" value={formData.linkedinProfile} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {!isEditing ? (
        <>
          {(profile.goal || profile.futurePlan) && (
            <div className="profile-section-card">
              <h3 className="section-title">🎯 Objectives & Aspirations</h3>
              <div className="info-grid">
                {profile.goal && (
                  <div className="info-item">
                    <h4>Current Goal</h4>
                    <p className="section-content">{profile.goal}</p>
                  </div>
                )}
                {profile.futurePlan && (
                   <div className="info-item">
                     <h4>Future Plan</h4>
                     <p className="section-content">{profile.futurePlan}</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {(profile.academicResults || profile.interests) && (
             <div className="profile-section-card">
               <h3 className="section-title">🎓 Academics & Interests</h3>
               <div className="info-grid">
                 {profile.academicResults && (
                   <div className="info-item">
                     <h4>Academic Results / CGPA</h4>
                     <p className="section-content">{profile.academicResults}</p>
                   </div>
                 )}
                 {profile.interests && (
                    <div className="info-item">
                      <h4>Interests & Hobbies</h4>
                      <p className="section-content">{profile.interests}</p>
                    </div>
                 )}
               </div>
             </div>
          )}
        </>
      ) : (
        <div className="profile-section-card edit-form">
          <h3 className="section-title">Detailed Information</h3>
           <div className="form-group">
              <label>Current Goal</label>
              <textarea name="goal" className="form-control" value={formData.goal} onChange={handleInputChange} placeholder="What are you currently working towards?"></textarea>
           </div>
           <div className="form-group">
              <label>Future Plan</label>
              <textarea name="futurePlan" className="form-control" value={formData.futurePlan} onChange={handleInputChange} placeholder="Where do you see yourself in the future?"></textarea>
           </div>
           <div className="form-group">
              <label>Academic Results / CGPA</label>
              <input type="text" name="academicResults" className="form-control" value={formData.academicResults} onChange={handleInputChange} placeholder="e.g. 8.5 CGPA" />
           </div>
           <div className="form-group">
              <label>Interests & Hobbies</label>
              <textarea name="interests" className="form-control" value={formData.interests} onChange={handleInputChange} placeholder="e.g. Machine Learning, Open Source, Hiking"></textarea>
           </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
