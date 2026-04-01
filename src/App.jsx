import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <div className="min-h-screen flex flex-col">
          <Navbar theme={theme} onToggleTheme={cycleTheme} shift={shift} onShiftChange={setShift} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard shift={shift} examDate={selectedShift.examDate} />} />
              <Route
                path="/materia/arquitetura"
                element={<ArquiteturaPage shift={shift} shiftLabel={selectedShift.label} examDate={selectedShift.examDate} />}
              />
            </Routes>
          </div>
          <SystemNotice compact />
        </div>
      </BrowserRouter>
    </div>
  );
}
