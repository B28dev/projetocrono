import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NamePromptModal from './components/NamePromptModal';
import Navbar from './components/Navbar';
import SystemNotice from './components/SystemNotice';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ArquiteturaPage from './pages/ArquiteturaPage';

const THEME_STORAGE_KEY = 'site-theme';
const SHIFT_STORAGE_KEY = 'site-shift';

const SHIFT_CONFIG = {
  'vespertino-snyder': {
    label: 'Vespertino (Snyder)',
    examDate: new Date('2026-04-07T08:00:00'),
  },
  'noturno-adele': {
    label: 'Noturno (Adele)',
    examDate: new Date('2026-04-13T08:00:00'),
  },
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'cyberpunk';
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'cyberpunk' || saved === 'dark' ? saved : 'cyberpunk';
  });
  const [shift, setShift] = useState(() => {
    if (typeof window === 'undefined') return 'noturno-adele';
    const saved = window.localStorage.getItem(SHIFT_STORAGE_KEY);
    return SHIFT_CONFIG[saved] ? saved : 'noturno-adele';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SHIFT_STORAGE_KEY, shift);
  }, [shift]);

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'dark') return 'light';
      if (current === 'light') return 'cyberpunk';
      return 'dark';
    });
  };

  const themeClass = theme === 'light' ? 'dark' : theme === 'cyberpunk' ? 'theme-cyberpunk' : '';
  const selectedShift = SHIFT_CONFIG[shift] || SHIFT_CONFIG['noturno-adele'];

  return (
    <div className={themeClass} data-theme={theme}>
      <BrowserRouter>
        <AppShell
          theme={theme}
          shift={shift}
          selectedShift={selectedShift}
          onToggleTheme={cycleTheme}
          onShiftChange={setShift}
        />
      </BrowserRouter>
    </div>
  );
}

function AppShell({ theme, shift, selectedShift, onToggleTheme, onShiftChange }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [userName, setUserName] = useState('');
  const isBlockingOverlayActive = currentView === 'login' || currentView === 'name';

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isBlockingOverlayActive) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isBlockingOverlayActive]);

  useEffect(() => {
    if (!isAuthenticated && currentView !== 'login') {
      setCurrentView('login');
    }
  }, [currentView, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('name');
    navigate('/', { replace: true });
  };

  const handleNameSubmit = (inputValue) => {
    const firstName = String(inputValue || '').trim().split(/\s+/)[0] || '';
    if (!firstName) return;

    setUserName(firstName);
    setCurrentView('hero');
    navigate('/', { replace: true });
  };

  const handleOpenDashboard = () => {
    if (!isAuthenticated) return;
    setCurrentView('dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`min-h-screen flex flex-col ${isBlockingOverlayActive ? 'pointer-events-none select-none' : ''}`}
        aria-hidden={isBlockingOverlayActive}
        inert={isBlockingOverlayActive ? '' : undefined}
      >
        <Navbar
          theme={theme}
          onToggleTheme={onToggleTheme}
          shift={shift}
          onShiftChange={onShiftChange}
          onOpenDashboard={handleOpenDashboard}
        />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated || currentView !== 'dashboard'
                  ? <Landing onOpenDashboard={handleOpenDashboard} userName={userName} />
                  : <Navigate to="/dashboard" replace />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated && currentView === 'dashboard'
                  ? <Dashboard shift={shift} examDate={selectedShift.examDate} userName={userName} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/materia/arquitetura"
              element={
                isAuthenticated && currentView === 'dashboard'
                  ? <ArquiteturaPage shift={shift} shiftLabel={selectedShift.label} examDate={selectedShift.examDate} />
                  : <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <SystemNotice compact />
      </div>

      {!isAuthenticated ? (
        <LoginModal
          open
          onLogin={handleLogin}
          closeOnBackdrop={false}
          showCloseButton={false}
          ctaLabel="Acessar Terminal"
        />
      ) : null}

      {currentView === 'name' ? (
        <NamePromptModal
          open
          onSubmitName={handleNameSubmit}
          closeOnBackdrop={false}
          ctaLabel="Prosseguir"
        />
      ) : null}
    </div>
  );
}
