/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  readUserProgress,
  writeUserProgress,
  readStreakState,
  writeStreakState,
  readBacklogState,
  writeBacklogState,
  readXpLedger,
  writeXpLedger,
} from '../persistence.js';
import { createInitialStreakState } from '../progression/streakEngine.js';
import {
  createInitialBacklogState,
  rebuildBacklogState,
} from '../progression/backlogEngine.js';
import {
  createXpEntry,
  createMissionBonusEntry,
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
import { hasLedgerEntry } from '../progression/bonusEngine.js';
import { resolveMissionAttempt } from '../runtime/resolveMissionAttempt.js';

const ProgressStoreContext = createContext(null);

function hydrateFromStorage(userId) {
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
    officialCompletedToday: 0,
    lastValidatedDate: null,
    todayState: 'idle',
    todayProgressPercent: 0,
    lastActiveAt: null,
  };

  const streakState = savedStreak ?? createInitialStreakState(userId);
  const backlogState = savedBacklog ?? createInitialBacklogState(userId);
  const xpLedger = Array.isArray(savedLedger) ? savedLedger : [];

  return { userProgress, streakState, backlogState, xpLedger };
}

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

  useEffect(() => {
    if (!userId) {
      setState({ userProgress: null, streakState: null, backlogState: null, xpLedger: [] });
      return;
    }
    setState(hydrateFromStorage(userId));
  }, [userId]);

  const today = getLocalDateString();
  const todayItems = useMemo(
    () =>
      todayMission
        ? (missionItems ?? []).filter((item) => item.dailyMissionId === todayMission.id)
        : [],
    [todayMission, missionItems],
  );

  const todayProgress = useMemo(
    () => getTodayProgress(todayMission, todayItems, attempts ?? []),
    [todayMission, todayItems, attempts],
  );

  const applyBonusEntries = useCallback((prevLedger, currentUserId, bonusTriggers = []) => {
    const ledger = [...prevLedger];
    let xpBonus = 0;

    bonusTriggers.forEach((trigger) => {
      if (hasLedgerEntry(ledger, trigger.sourceType, trigger.sourceId)) return;
      const entry = createMissionBonusEntry({
        userId: currentUserId,
        sourceType: trigger.sourceType,
        sourceId: trigger.sourceId,
      });
      xpBonus += entry.amount;
      ledger.push(entry);
    });

    return { ledger, xpBonus };
  }, []);

  const applyResolvedMissionAttempt = useCallback((params) => {
    if (!params?.rawAttempt || !params?.missionItem || !params?.contentItem) return null;

    let resolutionResult = null;

    setState((prev) => {
      if (!prev.userProgress || !prev.streakState) return prev;

      const resolution = resolveMissionAttempt({
        rawAttempt: params.rawAttempt,
        missionItem: params.missionItem,
        contentItem: params.contentItem,
        streakState: prev.streakState,
        attempts: attempts ?? [],
        missionItems: missionItems ?? [],
        todayMission,
        todayProgress,
        backlogState: prev.backlogState,
      });

      const { ledger, xpBonus } = applyBonusEntries(
        prev.xpLedger,
        prev.userProgress.userId,
        resolution.bonusTriggers,
      );

      const xpFromAttempt = resolution.attempt.xpGranted ?? 0;
      if (xpFromAttempt > 0) {
        ledger.push(
          createXpEntry({
            userId: prev.userProgress.userId,
            reason: `${params.contentItem.title} — ${resolution.feedback.feedbackKey ?? resolution.attempt.selfAssessment}`,
            amount: xpFromAttempt,
            sourceType: 'validation',
            sourceId: resolution.attempt.id,
          }),
        );
      }

      const totalXpGain = xpFromAttempt + xpBonus;
      const officialProgressPercent = resolution.officialProgressSummary.totalOfficialToday > 0
        ? Math.round((resolution.officialProgressSummary.officialCompletedToday / resolution.officialProgressSummary.totalOfficialToday) * 100)
        : 0;

      const isValidation = isRealValidation(resolution.attempt);
      const newProgress = {
        ...prev.userProgress,
        totalXp: prev.userProgress.totalXp + totalXpGain,
        xpToday: prev.userProgress.xpToday + totalXpGain,
        completedValidationsToday: prev.userProgress.completedValidationsToday + (isValidation ? 1 : 0),
        completedBlocksToday: resolution.officialProgressSummary.officialCompletedToday,
        officialCompletedToday: resolution.officialProgressSummary.officialCompletedToday,
        lastValidatedDate: isValidation ? today : prev.userProgress.lastValidatedDate,
        todayState: resolution.feedback.todayState,
        todayProgressPercent: officialProgressPercent,
        lastActiveAt: new Date().toISOString(),
      };

      writeUserProgress(newProgress);
      writeStreakState(resolution.streakState);
      writeBacklogState(resolution.backlogState);
      writeXpLedger(ledger);

      resolutionResult = resolution;

      return {
        ...prev,
        userProgress: newProgress,
        streakState: resolution.streakState,
        backlogState: resolution.backlogState,
        xpLedger: ledger,
      };
    });

    return resolutionResult;
  }, [applyBonusEntries, attempts, missionItems, today, todayMission, todayProgress]);

  const refreshBacklog = useCallback(() => {
    setState((prev) => {
      if (!prev.userProgress || !userId) return prev;
      const newBacklog = rebuildBacklogState(userId, missionItems ?? [], attempts ?? []);
      writeBacklogState(newBacklog);
      return { ...prev, backlogState: newBacklog };
    });
  }, [userId, missionItems, attempts]);

  const isActiveDayNow = useMemo(
    () => getIsActiveDay(attempts ?? [], today),
    [attempts, today],
  );

  const isCleanDayNow = useMemo(
    () => getIsCleanDay(todayMission, todayItems, attempts ?? [], missionItems ?? []),
    [todayMission, todayItems, attempts, missionItems],
  );

  const momentumState = useMemo(
    () => (
      state.streakState
        ? getMomentumState(state.streakState, todayProgress, today)
        : 'idle'
    ),
    [state.streakState, todayProgress, today],
  );

  const levelProgress = useMemo(
    () => (state.userProgress ? getCurrentLevelProgress(state.userProgress) : null),
    [state.userProgress],
  );

  const value = useMemo(
    () => ({
      userProgress: state.userProgress,
      streakState: state.streakState,
      backlogState: state.backlogState,
      xpLedger: state.xpLedger,
      levelProgress,
      todayProgress,
      isActiveDayNow,
      isCleanDayNow,
      momentumState,
      applyResolvedMissionAttempt,
      refreshBacklog,
    }),
    [
      state,
      levelProgress,
      todayProgress,
      isActiveDayNow,
      isCleanDayNow,
      momentumState,
      applyResolvedMissionAttempt,
      refreshBacklog,
    ],
  );

  return (
    <ProgressStoreContext.Provider value={value}>
      {children}
    </ProgressStoreContext.Provider>
  );
}

export function useProgressStore() {
  const ctx = useContext(ProgressStoreContext);
  if (!ctx) {
    throw new Error('[useProgressStore] Deve ser usado dentro de <ProgressStoreProvider>.');
  }
  return ctx;
}
