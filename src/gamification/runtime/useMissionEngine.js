import { useCallback, useMemo } from 'react';
import { useSessionStore } from '../stores/SessionStoreContext.jsx';
import { useStudyStore } from '../stores/StudyStoreContext.jsx';
import { useProgressStore } from '../stores/ProgressStoreContext.jsx';
import { useAttemptStore } from '../stores/AttemptStoreContext.jsx';
import { startMissionItem } from '../plan/missionItems.js';
import { validateMissionItem } from '../execution/missionValidationEngine.js';
import { completeAlgorithmMissionLayer } from '../pilots/algorithmPilot.js';

export function useMissionEngine() {
  const session = useSessionStore();
  const { missionItems, contentItems, patchMissionItem, syncMissionFromPilot } = useStudyStore();
  const { addAttempt } = useAttemptStore();
  const { applyResolvedMissionAttempt } = useProgressStore();

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

    const resolution = applyResolvedMissionAttempt({
      rawAttempt,
      missionItem: activeMissionItem,
      contentItem: activeContentItem,
    });

    if (!resolution) return null;

    addAttempt(resolution.attempt);
    patchMissionItem(activeMissionItem.id, resolution.missionItemPatch);

    if (resolution.missionItemPatch.status === 'completed' && activeMissionItem.layerId && activeMissionItem.isOfficial) {
      completeAlgorithmMissionLayer(activeMissionItem.layerId);
      syncMissionFromPilot();
    }

    return resolution.feedback;
  }, [
    activeMissionItem,
    activeContentItem,
    session,
    applyResolvedMissionAttempt,
    addAttempt,
    patchMissionItem,
    syncMissionFromPilot,
  ]);

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
