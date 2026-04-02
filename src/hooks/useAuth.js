import { useCallback, useEffect, useRef, useState } from 'react';
import { getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const INSTITUTIONAL_DOMAIN = '@somosicev.com';

function getFirstName(displayName) {
  return String(displayName || '').trim().split(/\s+/)[0] || '';
}

function isInstitutionalUser(user) {
  const email = String(user?.email || '').trim().toLowerCase();
  return email.endsWith(INSTITUTIONAL_DOMAIN);
}

function getViewFromPath(pathname) {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/materia/')
    ? 'dashboard'
    : 'hero';
}

export default function useAuth() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;
    let authResolved = false;
    let redirectResolved = false;

    const finishLoading = () => {
      if (isMounted && authResolved && redirectResolved) {
        setIsAuthLoading(false);
      }
    };

    const syncAuthenticatedUser = async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setUserName('');
        setCurrentView('login');
        return;
      }

      if (!isInstitutionalUser(user)) {
        await signOut(auth);
        setIsAuthenticated(false);
        setUserName('');
        setCurrentView('login');
        navigateRef.current('/', { replace: true });
        return;
      }

      setIsAuthenticated(true);
      const firstName = getFirstName(user.displayName);
      if (firstName) {
        const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
        setUserName(firstName);
        setCurrentView(getViewFromPath(pathname));
        return;
      }

      setUserName('');
      setCurrentView('name');
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        await syncAuthenticatedUser(user);
      } finally {
        authResolved = true;
        finishLoading();
      }
    });

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!isMounted || !result?.user) return;
        await syncAuthenticatedUser(result.user);
      } catch (error) {
        console.error('Erro ao concluir login com redirect:', error);
      } finally {
        redirectResolved = true;
        finishLoading();
      }
    };

    handleRedirectResult();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated && currentView !== 'login') {
      setCurrentView('login');
    }
  }, [currentView, isAuthenticated]);

  const handleLogin = useCallback(
    (viewDestino = 'hero') => {
      setIsAuthenticated(true);
      setCurrentView(viewDestino);
      setIsAuthLoading(false);

      if (viewDestino === 'dashboard') {
        navigate('/dashboard', { replace: true });
        return;
      }

      navigate('/', { replace: true });
    },
    [navigate],
  );

  const handleNameSubmit = useCallback(
    (firstName) => {
      setUserName(firstName);
      setCurrentView('hero');
      navigate('/', { replace: true });
    },
    [navigate],
  );

  const handleNavigate = useCallback(
    (view) => {
      if (!isAuthenticated) return;

      setCurrentView(view);
      if (view === 'dashboard') {
        navigate('/dashboard');
        return;
      }

      navigate('/', { replace: true });
    },
    [isAuthenticated, navigate],
  );

  const isBlockingOverlayActive = isAuthLoading || currentView === 'login' || currentView === 'name';

  return {
    isAuthLoading,
    isAuthenticated,
    currentView,
    userName,
    isBlockingOverlayActive,
    handleLogin,
    handleNameSubmit,
    handleNavigate,
  };
}
