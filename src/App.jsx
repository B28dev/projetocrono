import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ArquiteturaPage from './pages/ArquiteturaPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing has no Navbar */}
        <Route path="/" element={<Landing />} />

        {/* All other routes share the Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/dashboard"            element={<Dashboard />} />
                <Route path="/materia/arquitetura"  element={<ArquiteturaPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
