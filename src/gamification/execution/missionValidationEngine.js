export function validateMissionItem(contentItem, attempt) {
  const interactionType = contentItem?.interactionType ?? 'flashcard';

  if (!attempt) {
    return {
      validationStatus: 'idle',
      countsAsOfficialValidation: false,
      canComplete: false,
      needsReinforcement: false,
      nextReviewHint: null,
    };
  }

  if (!attempt.answeredBeforeReveal || attempt.selfAssessment === 'revealed') {
    return {
      validationStatus: 'revealed_without_attempt',
      countsAsOfficialValidation: false,
      canComplete: false,
      needsReinforcement: false,
      nextReviewHint: 'Voltar e tentar sem revelar para transformar intenção em execução validada.',
    };
  }

  if (interactionType === 'theory') {
    return {
      validationStatus: 'validated_theory',
      countsAsOfficialValidation: true,
      canComplete: true,
      needsReinforcement: false,
      nextReviewHint: null,
    };
  }

  if (attempt.resultTier === 'validated') {
    return {
      validationStatus: 'validated_correct',
      countsAsOfficialValidation: true,
      canComplete: true,
      needsReinforcement: false,
      nextReviewHint: null,
    };
  }

  if (attempt.resultTier === 'partial') {
    return {
      validationStatus: attempt.selfAssessment === 'failed' ? 'validated_wrong' : 'validated_partial',
      countsAsOfficialValidation: false,
      canComplete: false,
      needsReinforcement: true,
      nextReviewHint: 'Reforçar este ponto antes de promovê-lo como domínio oficial.',
    };
  }

  return {
    validationStatus: 'explored_only',
    countsAsOfficialValidation: false,
    canComplete: false,
    needsReinforcement: false,
    nextReviewHint: null,
  };
}

export function getMissionItemValidationState(missionItem) {
  return missionItem?.validationStatus ?? 'idle';
}

export function canCompleteMissionItem(contentItem, attempt) {
  return validateMissionItem(contentItem, attempt).canComplete;
}

export function getMissionCompletionProgress(items) {
  const officialItems = items.filter((item) => item.isOfficial);
  const validatedItems = officialItems.filter((item) => item.isValidated);
  const total = officialItems.length;
  const done = validatedItems.length;

  return {
    done,
    total,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export function getValidationSummaryByMission(items) {
  return items.reduce((acc, item) => {
    const key = item.validationStatus ?? 'idle';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

export function getItemsNeedingReinforcement(items) {
  return items.filter((item) => item.needsSameDayReinforcement || item.validationStatus === 'validated_partial' || item.validationStatus === 'validated_wrong');
}
