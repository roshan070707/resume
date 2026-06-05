import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DashboardList from './pages/DashboardList';
import TemplateGallery from './pages/TemplateGallery';
import AtsPage from './pages/AtsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';

const ProtectedRoute = ({ children }) => {
  const { user, loading, setIsAuthModalOpen } = useAuth();
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#09090b',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        gap: '1rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.1)',
          borderTopColor: '#6366F1',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Loading ResumeStudio...</span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  if (!user) {
    // If not logged in and trying to access protected route, open modal and go home
    setIsAuthModalOpen(true);
    return <Navigate to="/" replace />;
  }
  return children;
};

const FirstVisitHandler = ({ children }) => {
  const { user, loading, setIsAuthModalOpen } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      const hasPoppedUp = sessionStorage.getItem('authPrompted');
      if (!hasPoppedUp) {
        setIsAuthModalOpen(true);
        sessionStorage.setItem('authPrompted', 'true');
      }
    }
  }, [loading, user, setIsAuthModalOpen]);

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthModal />
        <FirstVisitHandler>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ats" element={<AtsPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/builder/:id" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/builder" element={<Navigate to="/dashboard" replace />} />
            <Route path="/templates" element={<TemplateGallery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FirstVisitHandler>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

