import { useCallback, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

const INSTITUTIONAL_DOMAIN = '@somosicev.com';

function getFirebaseErrorMessage(error) {
  const code = String(error?.code || '');

  if (code === 'auth/invalid-credential') {
    return 'E-mail ou senha incorretos.';
  }

  if (code === 'auth/user-not-found') {
    return 'E-mail nao encontrado.';
  }

  if (code === 'auth/email-already-in-use') {
    return 'Este e-mail ja possui uma conta.';
  }

  if (code === 'auth/weak-password') {
    return 'A senha deve ter no minimo 6 caracteres.';
  }

  if (code === 'auth/user-disabled') {
    return 'Esta conta foi desativada.';
  }

  if (code === 'auth/invalid-email') {
    return 'E-mail invalido.';
  }

  if (code === 'auth/too-many-requests') {
    return 'Muitas tentativas. Tente novamente em instantes.';
  }

  if (code === 'auth/network-request-failed') {
    return 'Falha de rede. Verifique sua conexao e tente novamente.';
  }

  return 'Falha na autenticacao. Tente novamente.';
}

export default function useLoginAuth(onLogin) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const clearMessages = useCallback(() => {
    setErrorMessage('');
    setSuccessMsg('');
  }, []);

  const enterResetMode = useCallback(() => {
    clearMessages();
    setIsRegistering(false);
    setIsResetting(true);
  }, [clearMessages]);

  const backToLoginMode = useCallback(() => {
    clearMessages();
    setIsRegistering(false);
    setIsResetting(false);
  }, [clearMessages]);

  const toggleRegisterMode = useCallback(() => {
    clearMessages();
    setIsRegistering((current) => !current);
  }, [clearMessages]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (isLoading) return;

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get('email') || '').trim().toLowerCase();
      const password = String(formData.get('password') || '');

      clearMessages();

      if (!email || !password) {
        setErrorMessage('Informe e-mail e senha para continuar.');
        return;
      }

      if (!email.endsWith(INSTITUTIONAL_DOMAIN)) {
        setErrorMessage(`Acesso restrito a e-mails ${INSTITUTIONAL_DOMAIN}`);
        return;
      }

      if (password.length < 6) {
        setErrorMessage('A senha deve ter no minimo 6 caracteres.');
        return;
      }

      setIsLoading(true);
      try {
        const userCredential = isRegistering
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const nextView = user?.displayName ? 'hero' : 'name';
        onLogin?.(nextView);
      } catch (error) {
        setErrorMessage(getFirebaseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [clearMessages, isLoading, isRegistering, onLogin],
  );

  const handlePasswordReset = useCallback(
    async (event) => {
      event.preventDefault();
      if (isLoading) return;

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get('email') || '').trim().toLowerCase();

      clearMessages();

      if (!email) {
        setErrorMessage('Informe seu e-mail institucional.');
        return;
      }

      if (!email.endsWith(INSTITUTIONAL_DOMAIN)) {
        setErrorMessage(`Acesso restrito a e-mails ${INSTITUTIONAL_DOMAIN}`);
        return;
      }

      setIsLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMsg('Link de recuperacao enviado para seu e-mail institucional.');
      } catch (error) {
        setErrorMessage(getFirebaseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [clearMessages, isLoading],
  );

  const handleGoogleLogin = useCallback(async () => {
    if (isLoading) return;

    clearMessages();
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ hd: 'somosicev.com' });

      const result = await signInWithPopup(auth, provider);
      const user = result?.user;
      const userEmail = String(user?.email || '').toLowerCase();

      if (!userEmail.endsWith(INSTITUTIONAL_DOMAIN)) {
        await signOut(auth);
        setErrorMessage(`Acesso restrito a e-mails ${INSTITUTIONAL_DOMAIN}`);
        return;
      }

      const nextView = user?.displayName ? 'hero' : 'name';
      onLogin?.(nextView);
    } catch (error) {
      const code = String(error?.code || '');
      if (code === 'auth/popup-closed-by-user') {
        setErrorMessage('Autenticacao cancelada.');
      } else {
        setErrorMessage(getFirebaseErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages, isLoading, onLogin]);

  return {
    isRegistering,
    isResetting,
    isLoading,
    errorMessage,
    successMsg,
    handleSubmit,
    handlePasswordReset,
    handleGoogleLogin,
    enterResetMode,
    backToLoginMode,
    toggleRegisterMode,
  };
}
