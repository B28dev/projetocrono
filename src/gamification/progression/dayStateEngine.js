export const DAY_STATE = {
  IDLE: 'idle',
  IN_PROGRESS: 'in_progress',
  PARTIAL: 'partial',
  CLEAN: 'clean',
  DEBT: 'debt',
  REINFORCEMENT_PENDING: 'reinforcement_pending',
};

export function getMissionDebtState(backlogState = null) {
  const totalDebtItems = backlogState?.totalDebtItems ?? 0;
  const reinforcementPendingCount = backlogState?.reinforcementPendingCount ?? 0;

  return {
    pendingMissionItems: backlogState?.pendingMissionItems ?? totalDebtItems,
    accumulatedDebtCount: totalDebtItems,
    reinforcementPendingCount,
    hasDebt: totalDebtItems > 0,
    hasReinforcement: reinforcementPendingCount > 0,
    severity: backlogState?.debtSeverity ?? 'none',
  };
}

export function shouldMaintainStreak(realValidationCount = 0) {
  return realValidationCount >= 1;
}

export function getDailyProgress({
  done = 0,
  total = 0,
  validationsToday = 0,
  officialCompletedToday = 0,
  reinforcementPendingCount = 0,
  accumulatedDebtCount = 0,
} = {}) {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return {
    done,
    total,
    percent,
    validationsToday,
    officialCompletedToday,
    reinforcementPendingCount,
    accumulatedDebtCount,
  };
}

export function getTodayState({
  done = 0,
  total = 0,
  validationsToday = 0,
  reinforcementPendingCount = 0,
  accumulatedDebtCount = 0,
} = {}) {
  if (accumulatedDebtCount > 0) return DAY_STATE.DEBT;
  if (validationsToday === 0) return DAY_STATE.IDLE;
  if (reinforcementPendingCount > 0) return DAY_STATE.REINFORCEMENT_PENDING;
  if (total > 0 && done >= total) return DAY_STATE.CLEAN;
  if (done > 0) return DAY_STATE.PARTIAL;
  return DAY_STATE.IN_PROGRESS;
}

export function getOfficialProgressSummary({
  officialCompletedToday = 0,
  totalOfficialToday = 0,
  validationsToday = 0,
  accumulatedDebtCount = 0,
  reinforcementPendingCount = 0,
} = {}) {
  const todayState = getTodayState({
    done: officialCompletedToday,
    total: totalOfficialToday,
    validationsToday,
    reinforcementPendingCount,
    accumulatedDebtCount,
  });

  return {
    officialCompletedToday,
    totalOfficialToday,
    validationsToday,
    accumulatedDebtCount,
    reinforcementPendingCount,
    todayState,
  };
}
