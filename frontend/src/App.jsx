import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Connection from './pages/Connection';
import Announcement from './pages/Announcement';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Unauthenticated Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Layout Wrapped Routes */}
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/connection" element={<MainLayout><Connection /></MainLayout>} />
        <Route path="/announcement" element={<MainLayout><Announcement /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
