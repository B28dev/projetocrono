/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
/**
 * @fileoverview Store — Progress Store (Context API)
 *
 * Responsabilidade: XP, nível, streak, backlog e métricas derivadas.
 * Esta é a store mais crítica — persistida no localStorage a cada mudança.
 *
 * Estados gerenciados:
 * - userProgress   — nível, XP, validações de hoje
 * - streakState    — ofensiva atual e histórica
 * - backlogState   — acumulado e severidade
 * - xpLedger[]     — histórico de XP
 *
 * Derivados pré-calculados (memoizados):
 * - levelProgress  — { level, percent, xpInLevel, xpForNextLevel }
 * - isActiveDayNow — boolean
 * - isCleanDayNow  — boolean
 * - momentumState  — 'idle' | 'warming' | 'momentum' | 'locked'
 *
 * @backend-ready: Os writers de localStorage viram chamadas REST.
 * Os readers viram fetches na inicialização.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  readUserProgress, writeUserProgress,
  readStreakState, writeStreakState,
  readBacklogState, writeBacklogState,
  readXpLedger, writeXpLedger,
} from '../persistence.js';
import {
  createInitialStreakState,
  updateStreak,
} from '../progression/streakEngine.js';
import {
  createInitialBacklogState,
  rebuildBacklogState,
} from '../progression/backlogEngine.js';
import {
  calculateXp,
  createXpEntry,
  createMissionBonusEntry,
  getBonusXp,
} from '../progression/xpEngine.js';
import {
  getIsActiveDay,
  getIsCleanDay,
  getMomentumState,
  getTodayProgress,
  getCurrentLevelProgress,
} from '../selectors.js';
import { getLocalDateString } from '../plan/dailyMissions.js';
import { isRealValidation } from '../execution/answerAttempts.js';

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const ProgressStoreContext = createContext(null);

// ─── INITIAL STATE ───────────────────────────────────────────────────────────

/**
 * @param {string} userId
 * @returns {{ userProgress, streakState, backlogState, xpLedger }}
 */
function hydrateFromStorage(userId) {
  // Lê do localStorage com fallback seguro para todos os campos
  const savedProgress = readUserProgress();
  const savedStreak = readStreakState();
  const savedBacklog = readBacklogState();
  const savedLedger = readXpLedger();

  const userProgress = savedProgress ?? {
    userId,
    level: 1,
    totalXp: 0,
    xpToday: 0,
    xpThisWeek: 0,
    completedValidationsToday: 0,
    completedBlocksToday: 0,
    lastActiveAt: null,
  };

  const streakState = savedStreak ?? createInitialStreakState(userId);
  const backlogState = savedBacklog ?? createInitialBacklogState(userId);
  const xpLedger = Array.isArray(savedLedger) ? savedLedger : [];

  return { userProgress, streakState, backlogState, xpLedger };
}

// ─── PROVIDER ────────────────────────────────────────────────────────────────

/**
 * @param {{ userId: string | null, answers: import('../types').AnswerAttempt[], missionItems: import('../types').MissionItem[], todayMission: import('../types').DailyMission | null, children: React.ReactNode }} props
 */
export function ProgressStoreProvider({
  userId,
  attempts,
  missionItems,
  todayMission,
  children,
}) {
  const [state, setState] = useState(() => {
    if (!userId) {
      return {
        userProgress: null,
        streakState: null,
        backlogState: null,
        xpLedger: [],
      };
    }
    return hydrateFromStorage(userId);
  });

  // Re-hidrata quando userId muda (login/logout)
  useEffect(() => {
    if (!userId) {
      setState({ userProgress: null, streakState: null, backlogState: null, xpLedger: [] });
      return;
    }
    setState(hydrateFromStorage(userId));
  }, [userId]);

  // ── ACTIONS ──────────────────────────────────────────────────────────────

  /**
   * Registra uma tentativa no progresso.
   * Calcula XP, atualiza streak e persiste.
   *
   * @param {import('../types').AnswerAttempt} attempt
   * @param {import('../types').ContentItem} contentItem
   */
  const recordAttempt = useCallback((attempt, contentItem) => {
    setState((prev) => {
      if (!prev.userProgress || !prev.streakState) return prev;

      const streakMultiplier = prev.streakState.streakMultiplier;
      const xpGranted = calculateXp(attempt, contentItem, streakMultiplier);
      const today = getLocalDateString();

      // Atualiza userProgress
      const isValidation = isRealValidation(attempt);
      const newProgress = {
        ...prev.userProgress,
        totalXp: prev.userProgress.totalXp + xpGranted,
        xpToday: prev.userProgress.xpToday + xpGranted,
        completedValidationsToday:
          prev.userProgress.completedValidationsToday + (isValidation ? 1 : 0),
        lastActiveAt: new Date().toISOString(),
      };

      // Atualiza streak (verifica se hoje virou dia ativo)
      const allAttempts = [...(attempts ?? []), attempt];
      const newStreak = updateStreak(prev.streakState, allAttempts, today);

      // Cria entrada no ledger (somente se XP > 0)
      const newLedger = [...prev.xpLedger];
      if (xpGranted > 0) {
        newLedger.push(
          createXpEntry({
            userId: prev.userProgress.userId,
            reason: `${contentItem.title} — ${attempt.feedbackKey ?? attempt.selfAssessment}`,
            amount: xpGranted,
            sourceType: 'validation',
            sourceId: attempt.id,
          }),
        );
      }

      // Persiste
      writeUserProgress(newProgress);
      writeStreakState(newStreak);
      writeXpLedger(newLedger);

      return {
        ...prev,
        userProgress: newProgress,
        streakState: newStreak,
        xpLedger: newLedger,
      };
    });
  }, [attempts]);

  /**
   * Recalcula o backlog com base no estado atual dos MissionItems.
   */
  const refreshBacklog = useCallback(() => {
    setState((prev) => {
      if (!prev.userProgress || !userId) return prev;
      const newBacklog = rebuildBacklogState(userId, missionItems ?? [], attempts ?? []);
      writeBacklogState(newBacklog);
      return { ...prev, backlogState: newBacklog };
    });
  }, [userId, missionItems, attempts]);

  /**
   * Concede bônus de XP (dia completo / dia limpo).
   * @param {import('../types').XpSourceType} sourceType
   * @param {string} sourceId
   */
  const grantBonus = useCallback((sourceType, sourceId) => {
    setState((prev) => {
      if (!prev.userProgress) return prev;

      const alreadyGranted = prev.xpLedger.some(
        (entry) => entry.sourceType === sourceType && entry.sourceId === sourceId,
      );
      if (alreadyGranted) return prev;

      const amount = getBonusXp(sourceType);
      if (amount === 0) return prev;

      const newProgress = {
        ...prev.userProgress,
        totalXp: prev.userProgress.totalXp + amount,
        xpToday: prev.userProgress.xpToday + amount,
      };
      const newLedger = [
        ...prev.xpLedger,
        createMissionBonusEntry({
          userId: prev.userProgress.userId,
          sourceType,
          sourceId,
        }),
      ];

      writeUserProgress(newProgress);
      writeXpLedger(newLedger);

      return { ...prev, userProgress: newProgress, xpLedger: newLedger };
    });
  }, []);

  // ── DERIVED STATE (memoized) ──────────────────────────────────────────────

  const today = getLocalDateString();
  const todayItems = useMemo(
    () =>
      todayMission
        ? (missionItems ?? []).filter((i) => i.dailyMissionId === todayMission.id)
        : [],
    [todayMission, missionItems],
  );

  const todayProgress = useMemo(
    () => getTodayProgress(todayMission, todayItems, attempts ?? []),
    [todayMission, todayItems, attempts],
  );

  const isActiveDayNow = useMemo(
    () => getIsActiveDay(attempts ?? [], today),
    [attempts, today],
  );

  const isCleanDayNow = useMemo(
    () => getIsCleanDay(todayMission, todayItems, attempts ?? [], missionItems ?? []),
    [todayMission, todayItems, attempts, missionItems],
  );

  const momentumState = useMemo(
    () =>
      state.streakState
        ? getMomentumState(state.streakState, todayProgress, today)
        : 'idle',
    [state.streakState, todayProgress, today],
  );

  const levelProgress = useMemo(
    () => (state.userProgress ? getCurrentLevelProgress(state.userProgress) : null),
    [state.userProgress],
  );

  const value = useMemo(
    () => ({
      // State
      userProgress: state.userProgress,
      streakState: state.streakState,
      backlogState: state.backlogState,
      xpLedger: state.xpLedger,
      // Derived
      levelProgress,
      todayProgress,
      isActiveDayNow,
      isCleanDayNow,
      momentumState,
      // Actions
      recordAttempt,
      refreshBacklog,
      grantBonus,
    }),
    [
      state,
      levelProgress,
      todayProgress,
      isActiveDayNow,
      isCleanDayNow,
      momentumState,
      recordAttempt,
      refreshBacklog,
      grantBonus,
    ],
  );

  return (
    <ProgressStoreContext.Provider value={value}>
      {children}
    </ProgressStoreContext.Provider>
  );
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

export function useProgressStore() {
  const ctx = useContext(ProgressStoreContext);
  if (!ctx) {
    throw new Error('[useProgressStore] Deve ser usado dentro de <ProgressStoreProvider>.');
  }
  return ctx;
}
