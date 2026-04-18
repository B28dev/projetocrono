/**
 * @fileoverview Progression Layer — XP Engine
 *
 * Funções puras para cálculo de XP e nível. Nenhum estado aqui.
 * O XP é calculado a partir de um perfil (xpProfileId) e de bônus da ofensiva.
 *
 * FÍSICA DO CRONO:
 * - Validação Real com 'easy' = XP base
 * - Validação Real com 'good' = XP base + bônus
 * - Speed-click detectado = 0 XP
 * - Revelar sem tentar = 0 XP
 * - Streak multiplier aplicado sobre o XP final
 */

// ─── XP PROFILES ─────────────────────────────────────────────────────────────

/**
 * Perfis de XP por tipo de conteúdo e avaliação.
 * Cada perfil define o XP base e os modificadores por selfAssessment.
 */
export const XP_PROFILES = {
  flashcard_easy: {
    label: 'Flashcard Fácil',
    base: 10,
    multipliers: {
      easy: 0.8,  // acertou fácil = XP ligeiramente menor (menos desafio)
      good: 1.0,
      hard: 0.5,  // acertou mas foi difícil = progresso parcial
      failed: 0,  // errou = 0 XP base
    },
  },
  flashcard_medium: {
    label: 'Flashcard Médio',
    base: 15,
    multipliers: {
      easy: 1.0,
      good: 1.2,
      hard: 0.6,
      failed: 0,
    },
  },
  flashcard_hard: {
    label: 'Flashcard Difícil',
    base: 20,
    multipliers: {
      easy: 1.0,
      good: 1.3,
      hard: 0.7,
      failed: 0,
    },
  },
  assisted_easy: {
    label: 'Questão Assistida Fácil',
    base: 20,
    multipliers: {
      easy: 0.9,
      good: 1.1,
      hard: 0.5,
      failed: 0,
    },
  },
  assisted_medium: {
    label: 'Questão Assistida Média',
    base: 30,
    multipliers: {
      easy: 1.0,
      good: 1.2,
      hard: 0.6,
      failed: 0,
    },
  },
  assisted_hard: {
    label: 'Questão Assistida Difícil',
    base: 45,
    multipliers: {
      easy: 1.0,
      good: 1.4,
      hard: 0.7,
      failed: 0.1, // errou tentando dá XP simbólico
    },
  },
  review: {
    label: 'Revisão',
    base: 8,
    multipliers: {
      easy: 1.0,
      good: 1.0,
      hard: 1.0,
      failed: 0.5,
    },
  },
};

// ─── BÔNUS ───────────────────────────────────────────────────────────────────

/** XP bônus por completar a missão do dia */
export const XP_BONUS_DAILY_COMPLETE = 20;

/** XP bônus por dia limpo (meta + acumulado zerado) */
export const XP_BONUS_CLEAN_DAY = 150;

/** XP bônus ao subir de nível */
export const XP_BONUS_LEVEL_UP = 200;

/** XP bônus por limpar acumulado */
export const XP_BONUS_BACKLOG_CLEAR = 300;

// ─── LEVEL TABLE ─────────────────────────────────────────────────────────────

/**
 * XP necessário para alcançar cada nível.
 * Cresce progressivamente para manter engajamento de longo prazo.
 * Índice = nível - 1.
 */
const LEVEL_XP_TABLE = [
  0,    // nível 1 — base
  100,  // nível 2
  250,  // nível 3
  450,  // nível 4
  700,  // nível 5
  1000, // nível 6
  1370, // nível 7
  1820, // nível 8
  2360, // nível 9
  3000, // nível 10
  3750, // nível 11
  4620, // nível 12
  5630, // nível 13
  6800, // nível 14
  8150, // nível 15
  9700, // nível 16
  11470,// nível 17
  13490,// nível 18
  15790,// nível 19
  18400,// nível 20
];

const MAX_LEVEL = LEVEL_XP_TABLE.length;

// ─── PURE FUNCTIONS ──────────────────────────────────────────────────────────

/**
 * Calcula o XP ganho em uma tentativa.
 * Retorna 0 em casos inválidos (speed-click, não tentou antes de revelar).
 *
 * @param {import('../types').AnswerAttempt} attempt
 * @param {import('../types').ContentItem} contentItem
 * @param {number} [streakMultiplier=1.0] - Multiplicador da ofensiva
 * @returns {number} XP a ser concedido (inteiro)
 */
export function calculateXp(attempt, contentItem, streakMultiplier = 1.0) {
  if (attempt.detectedAsSpeedClick) return 0;
  if (!attempt.answeredBeforeReveal) return 0;
  if (attempt.validationSource && !attempt.isValidatedExecution && attempt.validationKind !== 'written') return 0;

  const validationKind = attempt.validationKind
    ?? (contentItem.kind === 'assisted_question' ? 'assisted_question' : 'flashcard');

  let base = 0;

  if (validationKind === 'flashcard' || validationKind === 'true_false' || validationKind === 'theory') {
    if (attempt.selfAssessment === 'theory_done') base = 12;
    if (attempt.selfAssessment === 'easy' || attempt.selfAssessment === 'good') base = 5;
    if (attempt.selfAssessment === 'hard') base = 2;
    if (attempt.selfAssessment === 'failed' || attempt.selfAssessment === 'revealed') base = 0;
  }

  if (validationKind === 'assisted_question' || validationKind === 'written') {
    if (attempt.selfAssessment === 'easy' || attempt.selfAssessment === 'good') base = 30;
    if (attempt.selfAssessment === 'partial') base = 18;
    if (attempt.selfAssessment === 'hard' || attempt.selfAssessment === 'failed') base = 8;
    if (attempt.selfAssessment === 'revealed') base = 0;
  }

  const withStreak = base * streakMultiplier;
  return Math.round(withStreak);
}

export function getShouldCompleteMissionItem(attempt) {
  return Boolean(attempt?.isValidatedExecution) && Boolean(attempt?.answeredBeforeReveal) && !attempt?.detectedAsSpeedClick;
}

export function getShouldMarkRevealedOnly(attempt) {
  return !attempt.answeredBeforeReveal || attempt.selfAssessment === 'revealed';
}

export function getBonusXp(sourceType) {
  if (sourceType === 'clean_day_bonus') return 150;
  if (sourceType === 'daily_complete_bonus') return 20; // TODO: future rule hook for true bloco de fogo closure
  if (sourceType === 'backlog_clear_bonus') return 300; // TODO: future rule hook when backlog clear is detected explicitly
  if (sourceType === 'level_bonus') return 0;
  return XP_BONUS_DAILY_COMPLETE;
}

export function resolveAttemptFeedbackTone(attempt) {
  if (attempt.detectedAsSpeedClick) return 'warning';
  if (!attempt.answeredBeforeReveal) return 'danger';
  if (attempt.resultTier === 'validated') return 'success';
  if (attempt.resultTier === 'partial') return 'warning';
  return 'info';
}

export function shouldFlagReinforcement(attempt) {
  return attempt.selfAssessment === 'hard' || attempt.selfAssessment === 'failed' || attempt.selfAssessment === 'partial';
}

export function isZeroRewardAttempt(attempt) {
  return attempt.detectedAsSpeedClick || !attempt.answeredBeforeReveal || attempt.selfAssessment === 'revealed';
}

export function finalizeAttemptWithXp(attempt, contentItem, streakMultiplier = 1.0) {
  const xpGranted = calculateXp(attempt, contentItem, streakMultiplier);
  return {
    ...attempt,
    xpGranted,
    needsReinforcement: shouldFlagReinforcement(attempt),
  };
}

export function getBonusReason(sourceType) {
  if (sourceType === 'clean_day_bonus') return 'Bônus de Dia Limpo';
  if (sourceType === 'daily_complete_bonus') return 'Bônus de Bloco Fechado';
  if (sourceType === 'backlog_clear_bonus') return 'Bônus por Limpar Acumulado';
  return 'Bônus operacional';
}

export function createMissionBonusEntry({ userId, sourceType, sourceId }) {
  const amount = getBonusXp(sourceType);
  return createXpEntry({
    userId,
    reason: getBonusReason(sourceType),
    amount,
    sourceType,
    sourceId,
  });
}

// TODO: future rule hook — difficulty-based bonus layering
// TODO: future rule hook — nextReviewAt and reviewBucket scheduling
// TODO: future rule hook — same-day reinforcement queue bonus

export const XP_EVENT_SOURCE_MAP = {
  block_closed: 'daily_complete_bonus',
  clean_day: 'clean_day_bonus',
  backlog_cleared: 'backlog_clear_bonus',
};

/**
 * Retorna o nível a partir do XP total.
 * @param {number} totalXp
 * @returns {number} Nível atual (1–MAX_LEVEL)
 */
export function getLevel(totalXp) {
  let level = 1;
  for (let i = 0; i < LEVEL_XP_TABLE.length; i++) {
    if (totalXp >= LEVEL_XP_TABLE[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, MAX_LEVEL);
}

/**
 * Retorna o progresso dentro do nível atual.
 * @param {number} totalXp
 * @returns {import('../types').LevelProgress}
 */
export function getLevelProgress(totalXp) {
  const level = getLevel(totalXp);
  const levelIndex = level - 1;

  const xpForThisLevel = LEVEL_XP_TABLE[levelIndex] ?? 0;
  const xpForNextLevel =
    level < MAX_LEVEL ? LEVEL_XP_TABLE[level] - xpForThisLevel : 0;

  const xpInLevel = totalXp - xpForThisLevel;
  const percent =
    xpForNextLevel > 0 ? Math.min(Math.round((xpInLevel / xpForNextLevel) * 100), 100) : 100;

  return {
    level,
    xpInLevel: Math.max(xpInLevel, 0),
    xpForNextLevel,
    percent,
  };
}

/**
 * Cria uma entrada no XP Ledger.
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.reason
 * @param {number} params.amount
 * @param {import('../types').XpSourceType} params.sourceType
 * @param {string} params.sourceId
 * @returns {import('../types').XpLedger}
 */
export function createXpEntry({ userId, reason, amount, sourceType, sourceId }) {
  return {
    id: `xp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userId,
    reason,
    amount,
    sourceType,
    sourceId,
    createdAt: new Date().toISOString(),
  };
}
