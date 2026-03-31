import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SystemNotice from './components/SystemNotice';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ArquiteturaPage from './pages/ArquiteturaPage';

const THEME_STORAGE_KEY = 'site-theme';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'cyberpunk' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'dark') return 'light';
      if (current === 'light') return 'cyberpunk';
      return 'dark';
    });
  };

  const themeClass = theme === 'light' ? 'dark' : theme === 'cyberpunk' ? 'theme-cyberpunk' : '';

  return (
    <div className={themeClass} data-theme={theme}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/*"
                element={
                  <>
                    <Navbar theme={theme} onToggleTheme={cycleTheme} />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/materia/arquitetura" element={<ArquiteturaPage />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </div>
          <SystemNotice compact />
        </div>
      </BrowserRouter>
    </div>
  );
}
