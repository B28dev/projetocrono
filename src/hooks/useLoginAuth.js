import { useCallback, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { ALLOWED_EMAIL_DOMAINS_LABEL, hasAllowedEmailDomain } from '../constants/authDomains';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clearMessages = useCallback(() => {
    setErrorMessage('');
  }, []);

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

      if (!hasAllowedEmailDomain(email)) {
        setErrorMessage(`Use um e-mail ${ALLOWED_EMAIL_DOMAINS_LABEL}.`);
        return;
      }

      if (password.length < 6) {
        setErrorMessage('A senha deve ter no minimo 6 caracteres.');
        return;
      }

      setIsLoading(true);
      try {
        let userCredential;

        if (isRegistering) {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Novo usuário sempre segue para onboarding de nome.
          onLogin?.('name');
          return;
        }

        userCredential = await signInWithEmailAndPassword(auth, email, password);
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

  return {
    isRegistering,
    isLoading,
    errorMessage,
    handleSubmit,
    toggleRegisterMode,
  };
}
