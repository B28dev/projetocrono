import {
  applyAttemptToMissionItem,
  completeMissionItem,
  markRevealedOnly,
} from '../plan/missionItems.js';
import {
  classifyMissionEvent,
  finalizeAttempt,
  getAttemptOutcomeSummary,
} from '../execution/answerAttempts.js';
import {
  finalizeAttemptWithXp,
  getShouldCompleteMissionItem,
  getShouldMarkRevealedOnly,
} from '../progression/xpEngine.js';
import {
  canCompleteMissionItem,
  validateMissionItem,
} from '../execution/missionValidationEngine.js';
import { updateStreak, getStreakStatus } from '../progression/streakEngine.js';
import { rebuildBacklogState } from '../progression/backlogEngine.js';
import { getBonusTriggers } from '../progression/bonusEngine.js';
import {
  getDailyProgress,
  getOfficialProgressSummary,
  getTodayState,
  shouldMaintainStreak,
} from '../progression/dayStateEngine.js';
import { getLocalDateString } from '../plan/dailyMissions.js';

function getDifficultyRating(selfAssessment) {
  if (selfAssessment === 'easy' || selfAssessment === 'good' || selfAssessment === 'theory_done') return 'easy';
  if (selfAssessment === 'partial' || selfAssessment === 'hard') return 'medium';
  return 'hard';
}

function getMissionFeedbackEvent({
  attempt,
  previousStreakState,
  nextStreakState,
  previousBacklogState,
  nextBacklogState,
  previousTodayState,
  nextTodayState,
  bonusTriggers,
}) {
  const baseEvent = classifyMissionEvent(attempt);

  if (bonusTriggers.some((trigger) => trigger.sourceType === 'clean_day_bonus')) return 'mission_clean';
  if (bonusTriggers.some((trigger) => trigger.sourceType === 'backlog_clear_bonus')) return 'backlog_cleared';
  if ((previousBacklogState?.totalDebtItems ?? 0) === 0 && (nextBacklogState?.totalDebtItems ?? 0) > 0) return 'debt_opened';
  if (shouldMaintainStreak(1) && nextStreakState?.lastActiveDate === getLocalDateString()) return 'streak_saved';
  if (previousStreakState && getStreakStatus(nextStreakState, getLocalDateString()) === 'at_risk') return 'streak_at_risk';
  if (previousTodayState !== nextTodayState && nextTodayState === 'clean') return 'mission_clean';

  return baseEvent;
}

function getVisualState({ todayState, tone, backlogState }) {
  if (todayState === 'clean') return 'clean';
  if (todayState === 'debt') return 'debt';
  if (todayState === 'reinforcement_pending') return 'reinforcement_pending';
  if ((backlogState?.totalDebtItems ?? 0) > 0) return 'debt';
  if (tone === 'success') return 'validated';
  if (tone === 'warning') return 'warning';
  if (tone === 'danger') return 'blocked';
  return 'neutral';
}

function patchMissionItem({
  missionItem,
  contentItem,
  attempt,
  validationState,
}) {
  const baseMissionItem = applyAttemptToMissionItem(missionItem, attempt, {
    needsSameDayReinforcement: validationState.needsReinforcement || attempt.needsReinforcement,
    difficultyRating: getDifficultyRating(attempt.selfAssessment),
    reviewBucket: validationState.needsReinforcement ? 'same_day' : missionItem.reviewBucket,
    nextReviewAt: validationState.needsReinforcement ? attempt.attemptedAt : missionItem.nextReviewAt,
  });

  let nextMissionItem = {
    ...baseMissionItem,
    validationStatus: validationState.validationStatus,
    validationAttemptId: attempt.id,
    isValidated: validationState.countsAsOfficialValidation,
    validatedAt: validationState.countsAsOfficialValidation ? attempt.attemptedAt : null,
    lastResultTier: attempt.resultTier,
    needsSameDayReinforcement: validationState.needsReinforcement || attempt.needsReinforcement,
    nextReviewAt: validationState.needsReinforcement ? attempt.attemptedAt : baseMissionItem.nextReviewAt,
    reviewBucket: validationState.needsReinforcement ? 'same_day' : baseMissionItem.reviewBucket,
  };

  if (getShouldMarkRevealedOnly(attempt)) {
    nextMissionItem = {
      ...markRevealedOnly(nextMissionItem),
      validationStatus: validationState.validationStatus,
    };
  } else if (getShouldCompleteMissionItem(attempt) && canCompleteMissionItem(contentItem, attempt)) {
    nextMissionItem = {
      ...completeMissionItem(nextMissionItem),
      needsSameDayReinforcement: validationState.needsReinforcement,
    };
  } else {
    nextMissionItem = {
      ...nextMissionItem,
      status: 'pending',
    };
  }

  return nextMissionItem;
}

export function resolveMissionAttempt({
  rawAttempt,
  missionItem,
  contentItem,
  streakState,
  attempts,
  missionItems,
  todayMission,
  todayProgress,
  backlogState,
}) {
  const streakMultiplier = streakState?.streakMultiplier ?? 1;
  const finalizedAttempt = finalizeAttempt(
    finalizeAttemptWithXp(rawAttempt, contentItem, streakMultiplier),
  );

  const validationState = validateMissionItem(contentItem, finalizedAttempt);
  const nextMissionItem = patchMissionItem({
    missionItem,
    contentItem,
    attempt: finalizedAttempt,
    validationState,
  });

  const nextMissionItems = missionItems.map((item) => (
    item.id === missionItem.id ? nextMissionItem : item
  ));

  const nextAttempts = [...(attempts ?? []), finalizedAttempt];
  const nextStreakState = updateStreak(streakState, nextAttempts, getLocalDateString());
  const nextBacklogState = rebuildBacklogState(streakState?.userId ?? 'local-user', nextMissionItems, nextAttempts);

  const totalOfficialToday = nextMissionItems.filter((item) => item.dailyMissionId === todayMission?.id && item.isOfficial).length;
  const officialCompletedToday = nextMissionItems.filter((item) => item.dailyMissionId === todayMission?.id && item.isOfficial && item.status === 'completed').length;
  const validationsToday = todayProgress?.validationsToday != null
    ? todayProgress.validationsToday + (finalizedAttempt.isValidatedExecution ? 1 : 0)
    : nextAttempts.filter((attempt) => attempt.attemptedAt.startsWith(getLocalDateString()) && attempt.isValidatedExecution).length;

  const dailyProgress = getDailyProgress({
    done: officialCompletedToday,
    total: totalOfficialToday,
    validationsToday,
    officialCompletedToday,
    reinforcementPendingCount: nextBacklogState.reinforcementPendingCount,
    accumulatedDebtCount: nextBacklogState.totalDebtItems,
  });

  const previousTodayState = todayProgress?.todayState ?? null;
  const nextTodayState = getTodayState(dailyProgress);
  const officialProgressSummary = getOfficialProgressSummary({
    officialCompletedToday,
    totalOfficialToday,
    validationsToday,
    accumulatedDebtCount: nextBacklogState.totalDebtItems,
    reinforcementPendingCount: nextBacklogState.reinforcementPendingCount,
  });

  const bonusTriggers = getBonusTriggers({
    missionId: todayMission?.id,
    ledger: [],
    previousTodayProgress: todayProgress,
    nextTodayProgress: dailyProgress,
    previousBacklogState: backlogState,
    nextBacklogState,
  });

  const outcome = getAttemptOutcomeSummary(finalizedAttempt);
  const eventType = getMissionFeedbackEvent({
    attempt: finalizedAttempt,
    previousStreakState: streakState,
    nextStreakState,
    previousBacklogState: backlogState,
    nextBacklogState,
    previousTodayState,
    nextTodayState,
    bonusTriggers,
  });

  const streakImpact = finalizedAttempt.isValidatedExecution
    ? 'maintained'
    : getStreakStatus(nextStreakState, getLocalDateString()) === 'at_risk'
      ? 'at_risk'
      : null;

  const backlogImpact = (backlogState?.totalDebtItems ?? 0) > nextBacklogState.totalDebtItems
    ? 'reduced'
    : (backlogState?.totalDebtItems ?? 0) < nextBacklogState.totalDebtItems
      ? 'increased'
      : null;

  return {
    attempt: finalizedAttempt,
    missionItemPatch: nextMissionItem,
    streakState: nextStreakState,
    backlogState: nextBacklogState,
    officialProgressSummary,
    bonusTriggers,
    feedback: {
      attempt: finalizedAttempt,
      xpGranted: finalizedAttempt.xpGranted,
      countedAsRealValidation: outcome.countedAsRealValidation,
      shouldCompleteItem: outcome.shouldCompleteItem,
      needsReinforcement: finalizedAttempt.needsReinforcement,
      eventType,
      tone: outcome.tone,
      feedbackKey: finalizedAttempt.feedbackKey,
      validationStatus: validationState.validationStatus,
      todayState: nextTodayState,
      streakImpact,
      backlogImpact,
      visualState: getVisualState({
        todayState: nextTodayState,
        tone: outcome.tone,
        backlogState: nextBacklogState,
      }),
    },
  };
}
