/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  readAnswerAttempts,
  writeAnswerAttempts,
} from '../persistence.js';

const AttemptStoreContext = createContext(null);

export function AttemptStoreProvider({ children }) {
  const [attempts, setAttempts] = useState(() => readAnswerAttempts());

  useEffect(() => {
    writeAnswerAttempts(attempts);
  }, [attempts]);

  const addAttempt = useCallback((attempt) => {
    setAttempts((prev) => [...prev, attempt]);
  }, []);

  const replaceAttempt = useCallback((attemptId, updater) => {
    setAttempts((prev) => prev.map((attempt) => {
      if (attempt.id !== attemptId) return attempt;
      return typeof updater === 'function' ? updater(attempt) : { ...attempt, ...updater };
    }));
  }, []);

  const clearAttempts = useCallback(() => {
    setAttempts([]);
  }, []);

  const value = useMemo(() => ({
    attempts,
    addAttempt,
    replaceAttempt,
    clearAttempts,
  }), [attempts, addAttempt, replaceAttempt, clearAttempts]);

  return (
    <AttemptStoreContext.Provider value={value}>
      {children}
    </AttemptStoreContext.Provider>
  );
}

export function useAttemptStore() {
  const ctx = useContext(AttemptStoreContext);
  if (!ctx) {
    throw new Error('[useAttemptStore] Deve ser usado dentro de <AttemptStoreProvider>.');
  }
  return ctx;
}
