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
import {
  canCompleteMissionItem,
  validateMissionItem,
} from '../execution/missionValidationEngine.js';
import { completeAlgorithmMissionLayer } from '../pilots/algorithmPilot.js';

export function useMissionEngine() {
  const session = useSessionStore();
  const { missionItems, contentItems, patchMissionItem, syncMissionFromPilot } = useStudyStore();
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

    const validationPreview = validateMissionItem(activeContentItem, {
      answeredBeforeReveal: params.answeredBeforeReveal,
      selfAssessment: params.selfAssessment,
      resultTier: params.resultTier,
    });

    const rawAttempt = session.submitAttempt({
      contentItemId: activeContentItem.id,
      attemptType: params.attemptType,
      validationKind: params.validationKind,
      selfAssessment: params.selfAssessment,
      resultTier: params.resultTier,
      feedbackKey: params.feedbackKey,
      answeredBeforeReveal: params.answeredBeforeReveal,
      disciplineId: activeMissionItem.sourceDisciplineId,
      motherSubjectId: activeMissionItem.motherSubjectId,
      layerId: activeMissionItem.layerId,
      responsePayload: params.responsePayload ?? null,
      validationSource: params.validationSource ?? activeContentItem.validationMode ?? null,
      isValidatedExecution: validationPreview.countsAsOfficialValidation,
      objectiveCorrectness: params.objectiveCorrectness ?? null,
      nextReviewHint: validationPreview.nextReviewHint,
    });

    if (!rawAttempt) return null;

    const streakMultiplier = streakState?.streakMultiplier ?? 1;
    const finalizedAttempt = finalizeAttempt(
      finalizeAttemptWithXp(rawAttempt, activeContentItem, streakMultiplier),
    );

    addAttempt(finalizedAttempt);
    recordAttempt(finalizedAttempt, activeContentItem);

    const outcome = getAttemptOutcomeSummary(finalizedAttempt);
    const validationState = validateMissionItem(activeContentItem, finalizedAttempt);
    const baseMissionItem = applyAttemptToMissionItem(activeMissionItem, finalizedAttempt, {
      needsSameDayReinforcement: finalizedAttempt.needsReinforcement,
      difficultyRating: finalizedAttempt.selfAssessment === 'easy' || finalizedAttempt.selfAssessment === 'good' || finalizedAttempt.selfAssessment === 'theory_done'
        ? 'easy'
        : finalizedAttempt.selfAssessment === 'partial' || finalizedAttempt.selfAssessment === 'hard'
          ? 'medium'
          : 'hard',
    });

    let nextMissionItem = {
      ...baseMissionItem,
      validationStatus: validationState.validationStatus,
      validationAttemptId: finalizedAttempt.id,
      isValidated: validationState.countsAsOfficialValidation,
      validatedAt: validationState.countsAsOfficialValidation ? finalizedAttempt.attemptedAt : null,
      lastResultTier: finalizedAttempt.resultTier,
      needsSameDayReinforcement: validationState.needsReinforcement || finalizedAttempt.needsReinforcement,
      nextReviewAt: validationState.needsReinforcement ? finalizedAttempt.attemptedAt : baseMissionItem.nextReviewAt,
      reviewBucket: validationState.needsReinforcement ? 'same_day' : baseMissionItem.reviewBucket,
    };

    if (getShouldMarkRevealedOnly(finalizedAttempt)) {
      nextMissionItem = {
        ...markRevealedOnly(nextMissionItem),
        validationStatus: validationState.validationStatus,
      };
    } else if (getShouldCompleteMissionItem(finalizedAttempt) && canCompleteMissionItem(activeContentItem, finalizedAttempt)) {
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

    patchMissionItem(activeMissionItem.id, nextMissionItem);

    if (nextMissionItem.status === 'completed' && activeMissionItem.layerId && activeMissionItem.isOfficial) {
      completeAlgorithmMissionLayer(activeMissionItem.layerId);
      syncMissionFromPilot();
    }

    return {
      attempt: finalizedAttempt,
      xpGranted: finalizedAttempt.xpGranted,
      countedAsRealValidation: outcome.countedAsRealValidation,
      shouldCompleteItem: outcome.shouldCompleteItem,
      needsReinforcement: finalizedAttempt.needsReinforcement,
      eventType: classifyMissionEvent(finalizedAttempt),
      tone: outcome.tone,
      feedbackKey: finalizedAttempt.feedbackKey,
      validationStatus: validationState.validationStatus,
    };
  }, [activeMissionItem, activeContentItem, addAttempt, patchMissionItem, recordAttempt, session, streakState, syncMissionFromPilot]);

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
