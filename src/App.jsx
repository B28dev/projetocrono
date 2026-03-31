import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ArquiteturaPage from './pages/ArquiteturaPage';

const THEME_STORAGE_KEY = 'site-theme';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, isLightTheme ? 'light' : 'default');
  }, [isLightTheme]);

  return (
    <div className={isLightTheme ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* Landing has no Navbar */}
          <Route path="/" element={<Landing />} />

          {/* All other routes share the Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar
                  isLightTheme={isLightTheme}
                  onToggleTheme={() => setIsLightTheme((current) => !current)}
                />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/materia/arquitetura" element={<ArquiteturaPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
