/**
 * @fileoverview Execution Layer — Answer Attempts
 *
 * Registra o que o aluno REALMENTE fez — a camada de fatos.
 * Interpretações derivadas (XP ganho, progresso, etc.) são calculadas
 * em outras camadas a partir destes fatos.
 *
 * FÍSICA DO CRONO:
 * - Validação Real = answeredBeforeReveal: true + selfAssessment útil + !detectedAsSpeedClick
 * - Revelar sem tentar não conta (revealed_only, answeredBeforeReveal: false)
 * - Erro tentando ainda pode gerar progresso parcial
 * - Anti-exploit: detectedAsSpeedClick = true se tempo < MIN_THINK_MS
 * - Tentativas carregam classificação operacional (validated | partial | invalid)
 *
 * @backend-ready: Trocar `createAttempt` por `api.post('/attempts', payload)`.
 */

// ─── ANTI-EXPLOIT CONFIG ─────────────────────────────────────────────────────

/** Tempo mínimo (ms) entre abrir um item e responder para não ser detectado como speed-click */
export const MIN_THINK_MS = 3000;

// ─── ID GENERATOR ────────────────────────────────────────────────────────────

let _attemptCounter = 1;

function generateAttemptId() {
  return `attempt-${Date.now()}-${_attemptCounter++}`;
}

// ─── FACTORY ─────────────────────────────────────────────────────────────────

/**
 * Cria um AnswerAttempt.
 *
 * @param {object} params
 * @param {string} params.missionItemId
 * @param {string} params.contentItemId
 * @param {import('../types').AttemptType} params.attemptType
 * @param {boolean} params.answeredBeforeReveal - O aluno tentou antes de revelar?
 * @param {import('../types').SelfAssessment} params.selfAssessment
 * @param {number} [params.thinkTimeMs] - Tempo que o aluno levou para responder (ms)
 * @param {number} [params.xpGranted] - XP concedido (calculado externamente por xpEngine)
 * @param {boolean} [params.needsReinforcement] - Deve aparecer como reforço?
 * @returns {import('../types').AnswerAttempt}
 */
export function createAttempt({
  missionItemId,
  contentItemId,
  attemptType,
  validationKind = attemptType === 'assisted_question' ? 'assisted_question' : 'flashcard',
  answeredBeforeReveal,
  selfAssessment,
  thinkTimeMs = 0,
  xpGranted = 0,
  needsReinforcement = false,
  resultTier,
  feedbackKey,
}) {
  const detectedAsSpeedClick =
    answeredBeforeReveal && thinkTimeMs < MIN_THINK_MS;

  const computedResultTier = resultTier ?? getResultTier({
    answeredBeforeReveal,
    selfAssessment,
    detectedAsSpeedClick,
  });

  return {
    id: generateAttemptId(),
    missionItemId,
    contentItemId,
    attemptType,
    validationKind,
    answeredBeforeReveal,
    selfAssessment,
    detectedAsSpeedClick,
    thinkTimeMs,
    xpGranted,
    needsReinforcement,
    resultTier: computedResultTier,
    feedbackKey: feedbackKey ?? getDefaultFeedbackKey(computedResultTier, answeredBeforeReveal, detectedAsSpeedClick),
    attemptedAt: new Date().toISOString(),
  };
}

export function getResultTier({ answeredBeforeReveal, selfAssessment, detectedAsSpeedClick }) {
  if (!answeredBeforeReveal || detectedAsSpeedClick || selfAssessment === 'revealed') return 'invalid';
  if (selfAssessment === 'failed' || selfAssessment === 'hard' || selfAssessment === 'partial') return 'partial';
  return 'validated';
}

export function getDefaultFeedbackKey(resultTier, answeredBeforeReveal, detectedAsSpeedClick) {
  if (detectedAsSpeedClick) return 'speed_click';
  if (!answeredBeforeReveal) return 'revealed_without_attempt';
  if (resultTier === 'validated') return 'validated';
  if (resultTier === 'partial') return 'partial';
  return 'invalid';
}

// ─── CLASSIFICATION HELPERS ──────────────────────────────────────────────────

/**
 * Uma "Validação Real" é a menor unidade válida de progresso.
 * Requisitos:
 * 1. O aluno tentou antes de revelar
 * 2. A autoavaliação não é 'failed' (nem 'hard' sem reforço obrigatório)
 * 3. Não foi detectado como speed-click
 *
 * @param {import('../types').AnswerAttempt} attempt
 * @returns {boolean}
 */
export function isRealValidation(attempt) {
  if (!attempt.answeredBeforeReveal) return false;
  if (attempt.detectedAsSpeedClick) return false;
  if (attempt.selfAssessment === 'revealed') return false;
  if (attempt.resultTier === 'invalid') return false;
  return true;
}

export function isExecutableAttempt(attempt) {
  return Boolean(attempt?.answeredBeforeReveal) && !attempt?.detectedAsSpeedClick;
}

export function isRevealWithoutAttempt(attempt) {
  return !attempt?.answeredBeforeReveal || attempt?.selfAssessment === 'revealed';
}

export function isSpeedClickAttempt(attempt) {
  return Boolean(attempt?.detectedAsSpeedClick);
}

export function shouldCompleteFromAttempt(attempt) {
  return isExecutableAttempt(attempt);
}

export function shouldMarkReinforcement(attempt) {
  return attempt?.selfAssessment === 'hard' || attempt?.selfAssessment === 'failed' || attempt?.selfAssessment === 'partial';
}

export function classifyMissionEvent(attempt) {
  if (isSpeedClickAttempt(attempt)) return 'speed_click';
  if (isRevealWithoutAttempt(attempt)) return 'revealed_without_attempt';
  if (attempt?.resultTier === 'validated') return 'validation_success';
  if (attempt?.resultTier === 'partial') return 'validation_partial';
  return 'mission_progress';
}

export function resolveFeedbackTone(attempt) {
  if (isSpeedClickAttempt(attempt)) return 'warning';
  if (isRevealWithoutAttempt(attempt)) return 'danger';
  if (attempt?.resultTier === 'validated') return 'success';
  if (attempt?.resultTier === 'partial') return 'warning';
  return 'info';
}

export function finalizeAttempt(attempt) {
  return {
    ...attempt,
    needsReinforcement: shouldMarkReinforcement(attempt),
    feedbackKey: attempt.feedbackKey ?? getDefaultFeedbackKey(attempt.resultTier, attempt.answeredBeforeReveal, attempt.detectedAsSpeedClick),
  };
}

export function getAttemptDisplayAssessment(attempt) {
  if (attempt.selfAssessment === 'easy') return 'acertei';
  if (attempt.selfAssessment === 'good') return 'acertei';
  if (attempt.selfAssessment === 'hard') return 'errei mas ajustei';
  if (attempt.selfAssessment === 'partial') return 'parcial';
  if (attempt.selfAssessment === 'failed') return 'errei';
  return 'revelei sem tentar';
}

export function getAttemptOutcomeSummary(attempt) {
  return {
    countedAsRealValidation: isRealValidation(attempt),
    shouldCompleteItem: shouldCompleteFromAttempt(attempt),
    shouldMarkRevealedOnly: isRevealWithoutAttempt(attempt),
    needsReinforcement: shouldMarkReinforcement(attempt),
    eventType: classifyMissionEvent(attempt),
    tone: resolveFeedbackTone(attempt),
  };
}

/**
 * Verifica se a tentativa conta como progresso parcial.
 * "Erro tentando" ainda pode gerar progresso parcial.
 *
 * @param {import('../types').AnswerAttempt} attempt
 * @returns {boolean}
 */
export function isPartialProgress(attempt) {
  // Tentou mas errou — conta como parcial (não quebra ofensiva, mas não completa item)
  return attempt.answeredBeforeReveal && !attempt.detectedAsSpeedClick;
}

/**
 * Filtra as Validações Reais de uma lista de tentativas.
 * @param {import('../types').AnswerAttempt[]} attempts
 * @returns {import('../types').AnswerAttempt[]}
 */
export function getRealValidations(attempts) {
  return attempts.filter(isRealValidation);
}

/**
 * Filtra tentativas de um dia específico.
 * @param {import('../types').AnswerAttempt[]} attempts
 * @param {string} dateString YYYY-MM-DD
 * @returns {import('../types').AnswerAttempt[]}
 */
export function getAttemptsForDate(attempts, dateString) {
  return attempts.filter((a) => a.attemptedAt.startsWith(dateString));
}

/**
 * Verifica se um item de missão já foi tentado com Validação Real.
 * @param {import('../types').AnswerAttempt[]} attempts
 * @param {string} missionItemId
 * @returns {boolean}
 */
export function hasRealValidationForItem(attempts, missionItemId) {
  return attempts.some(
    (a) => a.missionItemId === missionItemId && isRealValidation(a),
  );
}
