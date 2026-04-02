import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NamePromptModal from './components/NamePromptModal';
import SystemNotice from './components/SystemNotice';
import Landing from './pages/Landing';
import useAuth from './hooks/useAuth';

const Navbar = lazy(() => import('./components/Navbar'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ArquiteturaPage = lazy(() => import('./pages/ArquiteturaPage'));
const EngenhariaSoftwarePage = lazy(() => import('./pages/EngenhariaSoftwarePage'));

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

const SuspenseLoader = memo(function SuspenseLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05050a]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 border-opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
    </div>
  );
});

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

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      if (current === 'dark') return 'light';
      if (current === 'light') return 'cyberpunk';
      return 'dark';
    });
  }, []);

  const themeClass = useMemo(
    () => (theme === 'light' ? 'dark' : theme === 'cyberpunk' ? 'theme-cyberpunk' : ''),
    [theme],
  );
  const selectedShift = useMemo(
    () => SHIFT_CONFIG[shift] || SHIFT_CONFIG['noturno-adele'],
    [shift],
  );

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
  const {
    isAuthLoading,
    isAuthenticated,
    currentView,
    userName,
    isBlockingOverlayActive,
    handleLogin,
    handleNameSubmit,
    handleNavigate,
  } = useAuth();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<SuspenseLoader />}>
        <div
          className={`min-h-screen flex flex-col ${isBlockingOverlayActive ? 'pointer-events-none select-none' : ''}`}
          aria-hidden={isBlockingOverlayActive}
          inert={isBlockingOverlayActive ? '' : undefined}
        >
          {!isAuthLoading && isAuthenticated ? (
            <Navbar
              theme={theme}
              onToggleTheme={onToggleTheme}
              shift={shift}
              onShiftChange={onShiftChange}
              onNavigate={handleNavigate}
            />
          ) : null}
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthLoading
                    ? null
                    : isAuthenticated
                    ? <Landing onNavigate={handleNavigate} userName={userName} />
                    : null
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthLoading
                    ? null
                    : isAuthenticated
                    ? <Dashboard shift={shift} examDate={selectedShift.examDate} userName={userName} />
                    : <Navigate to="/" replace />
                }
              />
              <Route
                path="/materia/arquitetura"
                element={
                  isAuthLoading
                    ? null
                    : isAuthenticated
                    ? <ArquiteturaPage theme={theme} shift={shift} shiftLabel={selectedShift.label} examDate={selectedShift.examDate} />
                    : <Navigate to="/" replace />
                }
              />
              <Route
                path="/materia/engenharia-software"
                element={
                  isAuthLoading
                    ? null
                    : isAuthenticated
                    ? <EngenhariaSoftwarePage theme={theme} shift={shift} shiftLabel={selectedShift.label} examDate={selectedShift.examDate} userName={userName} />
                    : <Navigate to="/" replace />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          {!isAuthLoading && isAuthenticated ? <SystemNotice compact /> : null}
        </div>
      </Suspense>

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
