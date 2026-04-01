import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NamePromptModal from './components/NamePromptModal';
import Navbar from './components/Navbar';
import SystemNotice from './components/SystemNotice';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ArquiteturaPage from './pages/ArquiteturaPage';
import { auth } from './firebase';

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
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [userName, setUserName] = useState('');
  const isBlockingOverlayActive = isAuthLoading || currentView === 'login' || currentView === 'name';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);

        const firstName = String(user.displayName || '').trim().split(/\s+/)[0] || '';
        if (firstName) {
          setUserName(firstName);
          setCurrentView('hero');
        } else {
          setUserName('');
          setCurrentView('name');
        }
      } else {
        setIsAuthenticated(false);
        setUserName('');
        setCurrentView('login');
      }

      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogin = (viewDestino = 'hero') => {
    setIsAuthenticated(true);
    setCurrentView(viewDestino);
    setIsAuthLoading(false);
    if (viewDestino === 'dashboard') {
      navigate('/dashboard', { replace: true });
      return;
    }
    navigate('/', { replace: true });
  };

  const handleNameSubmit = (firstName) => {
    setUserName(firstName);
    setCurrentView('hero');
    navigate('/', { replace: true });
  };

  const handleNavigate = (view) => {
    if (!isAuthenticated) return;
    setCurrentView(view);

    if (view === 'dashboard') {
      navigate('/dashboard');
      return;
    }

    navigate('/', { replace: true });
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
          onNavigate={handleNavigate}
        />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Landing onNavigate={handleNavigate} userName={userName} />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated
                  ? <Dashboard shift={shift} examDate={selectedShift.examDate} userName={userName} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/materia/arquitetura"
              element={
                isAuthenticated
                  ? <ArquiteturaPage shift={shift} shiftLabel={selectedShift.label} examDate={selectedShift.examDate} />
                  : <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <SystemNotice compact />
      </div>

      {isAuthLoading ? (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-[#08080f]/85 backdrop-blur-xl">
          <div className="h-12 w-12 rounded-full border-2 border-[#00e8ff]/30 border-t-[#ff3ea5] animate-spin" />
        </div>
      ) : null}

      {!isAuthLoading && !isAuthenticated ? (
        <LoginModal
          open
          onLogin={handleLogin}
          closeOnBackdrop={false}
          showCloseButton={false}
          ctaLabel="Acessar Terminal"
        />
      ) : null}

      {!isAuthLoading && isAuthenticated && currentView === 'name' ? (
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
