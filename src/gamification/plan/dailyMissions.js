/**
 * @fileoverview Plan Layer — Daily Missions
 *
 * Uma DailyMission representa o conjunto de obrigações do aluno para um dia.
 * Esta camada gera e valida missões — não decide quais itens entram (isso é missionItems.js).
 *
 * FÍSICA DO CRONO:
 * - targetValidations = mínimo de Validações Reais para manter ofensiva
 * - targetBlocks = blocos de fogo esperados
 * - isCompleted = ≥ targetValidations feitas
 * - isCleanDay = isCompleted + accumulatedDebt === 0
 *
 * @backend-ready: Trocar `createDailyMission` por `api.post('/missions/generate')`.
 */


// ─── CONSTANTES DA FÍSICA ─────────────────────────────────────────────────────

/** Mínimo de Validações Reais para manter ofensiva */
export const MIN_VALIDATIONS_TO_STAY_ACTIVE = 1;

/** Meta padrão de Validações Reais por dia */
export const DEFAULT_TARGET_VALIDATIONS = 5;

/** Meta padrão de Blocos de Fogo por dia */
export const DEFAULT_TARGET_BLOCKS = 2;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Retorna a data atual no formato YYYY-MM-DD (local timezone).
 * @param {Date} [date=new Date()]
 * @returns {string}
 */
export function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Gera um ID único para a missão do dia.
 * @param {string} userId
 * @param {string} date YYYY-MM-DD
 * @returns {string}
 */
function generateMissionId(userId, date) {
  return `mission-${userId}-${date}`;
}

// ─── FACTORY ─────────────────────────────────────────────────────────────────

/**
 * Cria uma DailyMission para o dia fornecido.
 *
 * @param {string} userId
 * @param {string} [date] - YYYY-MM-DD. Padrão: hoje.
 * @param {Partial<{targetValidations: number, targetBlocks: number}>} [opts]
 * @returns {import('../types').DailyMission}
 */
export function createDailyMission(userId, date, opts = {}) {
  const missionDate = date ?? getLocalDateString();
  const targetValidations = opts.targetValidations ?? DEFAULT_TARGET_VALIDATIONS;
  const targetBlocks = opts.targetBlocks ?? DEFAULT_TARGET_BLOCKS;

  return {
    id: generateMissionId(userId, missionDate),
    date: missionDate,
    targetValidations,
    targetBlocks,
    isCompleted: false,
    isCleanDay: false,
    summaryStatus: 'pending',
  };
}

/**
 * Verifica se uma missão pertence a hoje.
 * @param {import('../types').DailyMission | null} mission
 * @returns {boolean}
 */
export function isMissionForToday(mission) {
  if (!mission) return false;
  return mission.date === getLocalDateString();
}

/**
 * Retorna os itens de conteúdo ativos disponíveis para uma nova missão.
 * Em produção, isso virá de um algoritmo de spaced repetition.
 *
 * @param {string} [subjectId] - Filtrar por matéria. Null = todas.
 * @returns {import('../types').ContentItem[]}
 *
 * @backend-ready: Substituir por `api.get('/content/due-today')` — lista
 * calculada pelo algoritmo de repetição espaçada no backend.
 */
export function getAvailableContentForMission(subjectId) {
  const items = CONTENT_ITEMS.filter((c) => c.isActive);
  if (!subjectId) return items;
  return items.filter((c) => c.subjectId === subjectId);
}

// ─── MOCK DATA (Fase 1 — desenvolvimento) ────────────────────────────────────

/**
 * Missão mock para os testes da Fase 1.
 * Será substituída pelo gerador real quando o backend estiver pronto.
 *
 * @param {string} userId
 * @returns {import('../types').DailyMission}
 */
export function getMockTodayMission(userId) {
  return createDailyMission(userId, getLocalDateString(), {
    targetValidations: DEFAULT_TARGET_VALIDATIONS,
    targetBlocks: DEFAULT_TARGET_BLOCKS,
  });
}
