import { useCallback, useMemo } from 'react';
import { useSessionStore } from '../stores/SessionStoreContext.jsx';
import { useStudyStore } from '../stores/StudyStoreContext.jsx';
import { useProgressStore } from '../stores/ProgressStoreContext.jsx';
import { useAttemptStore } from '../stores/AttemptStoreContext.jsx';
import {
  applyAttemptToMissionItem,
  completeMissionItem,
  markRevealedOnly,
  startMissionItem,
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

export function useMissionEngine() {
  const session = useSessionStore();
  const { missionItems, contentItems, patchMissionItem } = useStudyStore();
  const { addAttempt } = useAttemptStore();
  const { recordAttempt, streakState } = useProgressStore();

  const activeMissionItem = useMemo(
    () => missionItems.find((item) => item.id === session.currentItemId) ?? null,
    [missionItems, session.currentItemId],
  );

  const activeContentItem = useMemo(
    () => contentItems.find((item) => item.id === activeMissionItem?.contentItemId) ?? null,
    [contentItems, activeMissionItem],
  );

  const openMissionItem = useCallback((missionItem) => {
    session.startItem(missionItem.id);
    patchMissionItem(missionItem.id, startMissionItem(missionItem));
  }, [patchMissionItem, session]);

  const revealCurrentItem = useCallback(() => {
    if (!activeMissionItem) return;
    session.revealWithoutAttempt();
  }, [activeMissionItem, session]);

  const resolveAttempt = useCallback((params) => {
    if (!activeMissionItem || !activeContentItem) return null;

    const rawAttempt = session.submitAttempt({
      contentItemId: activeContentItem.id,
      attemptType: params.attemptType,
      validationKind: params.validationKind,
      selfAssessment: params.selfAssessment,
      resultTier: params.resultTier,
      feedbackKey: params.feedbackKey,
      answeredBeforeReveal: params.answeredBeforeReveal,
    });

    if (!rawAttempt) return null;

    const streakMultiplier = streakState?.streakMultiplier ?? 1;
    const finalizedAttempt = finalizeAttempt(
      finalizeAttemptWithXp(rawAttempt, activeContentItem, streakMultiplier),
    );

    addAttempt(finalizedAttempt);
    recordAttempt(finalizedAttempt, activeContentItem);

    const outcome = getAttemptOutcomeSummary(finalizedAttempt);
    const baseMissionItem = applyAttemptToMissionItem(activeMissionItem, finalizedAttempt, {
      needsSameDayReinforcement: finalizedAttempt.needsReinforcement,
      difficultyRating: finalizedAttempt.selfAssessment === 'easy' || finalizedAttempt.selfAssessment === 'good'
        ? 'easy'
        : finalizedAttempt.selfAssessment === 'partial' || finalizedAttempt.selfAssessment === 'hard'
          ? 'medium'
          : 'hard',
    });

    let nextMissionItem = baseMissionItem;

    if (getShouldMarkRevealedOnly(finalizedAttempt)) {
      nextMissionItem = markRevealedOnly(baseMissionItem);
    } else if (getShouldCompleteMissionItem(finalizedAttempt)) {
      nextMissionItem = {
        ...completeMissionItem(baseMissionItem),
        needsSameDayReinforcement: finalizedAttempt.needsReinforcement,
      };
    } else {
      nextMissionItem = {
        ...baseMissionItem,
        status: 'pending',
      };
    }

    patchMissionItem(activeMissionItem.id, nextMissionItem);

    return {
      attempt: finalizedAttempt,
      xpGranted: finalizedAttempt.xpGranted,
      countedAsRealValidation: outcome.countedAsRealValidation,
      shouldCompleteItem: outcome.shouldCompleteItem,
      needsReinforcement: finalizedAttempt.needsReinforcement,
      eventType: classifyMissionEvent(finalizedAttempt),
      tone: outcome.tone,
      feedbackKey: finalizedAttempt.feedbackKey,
    };
  }, [activeMissionItem, activeContentItem, addAttempt, patchMissionItem, recordAttempt, session, streakState]);

  const closeMissionItem = useCallback(() => {
    session.advanceItem();
  }, [session]);

  return {
    activeMissionItem,
    activeContentItem,
    isCoolingDown: session.isCoolingDown,
    revealState: session.revealState,
    minThinkMs: session.MIN_THINK_MS,
    openMissionItem,
    revealCurrentItem,
    resolveAttempt,
    closeMissionItem,
  };
}
