/**
 * @fileoverview Execution Layer — Answer Attempts
 *
 * Registra o que o aluno REALMENTE fez — a camada de fatos.
 * Interpretações derivadas (XP ganho, progresso, etc.) são calculadas
 * em outras camadas a partir destes fatos.
 *
 * FÍSICA DO CRONO:
 * - Validação Real = answeredBeforeReveal: true + selfAssessment !== 'failed' + !detectedAsSpeedClick
 * - Revelar sem tentar não conta (revealed_only, answeredBeforeReveal: false)
 * - Erro tentando ainda pode gerar progresso parcial
 * - Anti-exploit: detectedAsSpeedClick = true se tempo < MIN_THINK_MS
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
  answeredBeforeReveal,
  selfAssessment,
  thinkTimeMs = 0,
  xpGranted = 0,
  needsReinforcement = false,
}) {
  const detectedAsSpeedClick =
    answeredBeforeReveal && thinkTimeMs < MIN_THINK_MS;

  return {
    id: generateAttemptId(),
    missionItemId,
    contentItemId,
    attemptType,
    answeredBeforeReveal,
    selfAssessment,
    detectedAsSpeedClick,
    xpGranted,
    needsReinforcement,
    attemptedAt: new Date().toISOString(),
  };
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
  if (attempt.selfAssessment === 'failed') return false;
  return true;
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
