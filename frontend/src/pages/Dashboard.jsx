import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const studentData = localStorage.getItem('student');

    if (!token || !studentData) {
      navigate('/login');
    } else {
      setStudent(JSON.parse(studentData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/login');
  };

  if (!student) return null;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">PurPal Portal</div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </nav>
      
      <main className="dashboard-content">
        <h2>Welcome back, {student.name}!</h2>
        <p>Your email is {student.email}</p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'inline-block' }}>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Authentication Successful ✅</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
