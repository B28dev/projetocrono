/**
 * @fileoverview Gamification Provider — Root Wrapper
 *
 * Combina os 3 stores em hierarquia correta:
 * ProgressStore precisa dos attempts e missionItems que vêm do StudyStore.
 * Por isso, StudyStore é pai de ProgressStore aqui.
 *
 * Hierarquia:
 *   SessionStore (externo, sem deps)
 *     └─ StudyStore (carrega missão e items)
 *          └─ ProgressStore (recebe attempts + items do StudyStore, expõe derivados)
 *
 * Uso: envolver o <AppShell> no App.jsx com <GamificationProvider userId={uid} />
 *
 * @backend-ready: O userId virá do Firebase Auth ou da API de autenticação.
 * Quando o userId for null (logout), os stores resetam automaticamente.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import { StudyStoreProvider, useStudyStore } from './StudyStoreContext.jsx';
import { ProgressStoreProvider } from './ProgressStoreContext.jsx';
import { SessionStoreProvider } from './SessionStoreContext.jsx';
import { readAnswerAttempts, writeAnswerAttempts } from '../persistence.js';

// ─── ANSWERS BRIDGE ──────────────────────────────────────────────────────────

/**
 * Componente interno que lê missionItems do StudyStore e passa ao ProgressStore.
 * Mantém os attempts em memória + localStorage.
 *
 * @param {{ userId: string | null, children: React.ReactNode }} props
 */
function ProgressBridge({ userId, children }) {
  const { missions, missionItems } = useStudyStore();

  // Attempts vivem aqui — são partilhados entre StudyStore e ProgressStore
  const [attempts, setAttempts] = useState(() => readAnswerAttempts());
  const isMountedRef = useRef(true);

  const addAttempt = useCallback((attempt) => {
    setAttempts((prev) => {
      const updated = [...prev, attempt];
      writeAnswerAttempts(updated);
      return updated;
    });
  }, []);

  // todayMission = primeira missão cujo date é hoje
  const todayMission = useMemo(() => missions[0] ?? null, [missions]);

  return (
    <ProgressStoreProvider
      userId={userId}
      attempts={attempts}
      missionItems={missionItems}
      todayMission={todayMission}
    >
      {/* Injecta addAttempt no children através do contexto — mas a Fase 1
          não precisa desta ligação direta pois o CronoLab usa ProgressStore direto.
          Na Fase 2, o componente de Missão chamará addAttempt via SessionStore. */}
      {children}
    </ProgressStoreProvider>
  );
}

// ─── ROOT PROVIDER ────────────────────────────────────────────────────────────

/**
 * Provider raiz da gamificação. Deve envolver o shell da app.
 *
 * @param {{ userId: string | null, children: React.ReactNode }} props
 */
export function GamificationProvider({ userId, children }) {
  return (
    <SessionStoreProvider>
      <StudyStoreProvider userId={userId}>
        <ProgressBridge userId={userId}>
          {children}
        </ProgressBridge>
      </StudyStoreProvider>
    </SessionStoreProvider>
  );
}
