import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { lightTheme, darkTheme } from './styles/themes';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import InfoPage from './pages/InfoPage';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const [theme, setTheme] = useState<'light' | 'dark'>(savedTheme || 'light');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken'));

  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = () => {
    if (!isAuthenticated) {
      toast.error('Please log in first');
      return;
    }
    setSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogin = (accessToken: string, refreshToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    toast.success('Logged in successfully');
    navigate('/profile');
  };

  const hideHeader = location.pathname === '/' || location.pathname === '/register';

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {!hideHeader && (
        <Header
          onToggleTheme={toggleTheme}
          onMenuToggle={toggleSidebar}
          currentTheme={theme}
          isAuthenticated={isAuthenticated}
          isSidebarOpen={isSidebarOpen}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/info" element={isAuthenticated ? <InfoPage /> : <Navigate to="/" />} />
      </Routes>
      
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
