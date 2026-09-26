import { useState, useEffect } from 'react';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Profile from './Profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      {currentView === 'profile' ? (
        <Profile onBack={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard
          onLogout={handleLogout}
          onOpenProfile={() => setCurrentView('profile')}
        />
      )}
    </div>
  );
}