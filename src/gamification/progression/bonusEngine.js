export function hasLedgerEntry(ledger = [], sourceType, sourceId) {
  return ledger.some((entry) => entry.sourceType === sourceType && entry.sourceId === sourceId);
}

export function getBonusTriggers({
  missionId,
  ledger = [],
  previousTodayProgress = null,
  nextTodayProgress = null,
  previousBacklogState = null,
  nextBacklogState = null,
} = {}) {
  if (!missionId) return [];

  const triggers = [];
  const prevPercent = previousTodayProgress?.percent ?? 0;
  const nextPercent = nextTodayProgress?.percent ?? 0;
  const prevDebt = previousBacklogState?.totalDebtItems ?? 0;
  const nextDebt = nextBacklogState?.totalDebtItems ?? 0;

  if (prevPercent < 100 && nextPercent >= 100 && !hasLedgerEntry(ledger, 'daily_complete_bonus', missionId)) {
    triggers.push({ sourceType: 'daily_complete_bonus', sourceId: missionId });
  }

  if (prevPercent < 100 && nextPercent >= 100 && prevDebt > 0 && nextDebt === 0 && !hasLedgerEntry(ledger, 'clean_day_bonus', missionId)) {
    triggers.push({ sourceType: 'clean_day_bonus', sourceId: missionId });
  }

  if (prevDebt > 0 && nextDebt === 0 && !hasLedgerEntry(ledger, 'backlog_clear_bonus', missionId)) {
    triggers.push({ sourceType: 'backlog_clear_bonus', sourceId: missionId });
  }

  return triggers;
}
