/**
 * @fileoverview Persistence Layer — localStorage Keys and Helpers
 *
 * Fonte de verdade para todas as chaves de localStorage da gamificação.
 *
 * REGRA: cada função de leitura/escrita tem um fallback seguro e é marcada
 * com @backend-ready para indicar onde a troca por api será feita.
 *
 * @backend-ready: Quando houver backend, substituir as funções por chamadas
 * REST e remover as funções localStorage correspondentes.
 */

// ─── STORAGE KEYS ────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  USER_PROGRESS:   'crono_user_progress_v1',
  STREAK_STATE:    'crono_streak_v1',
  BACKLOG_STATE:   'crono_backlog_v1',
  TODAY_MISSION:   'crono_today_mission_v1',
  MISSION_ITEMS:   'crono_mission_items_v1',
  ANSWER_ATTEMPTS: 'crono_attempts_v1',
  XP_LEDGER:       'crono_xp_ledger_v1',
};

// ─── GENERIC HELPERS ─────────────────────────────────────────────────────────

/**
 * Lê e parseia JSON do localStorage com fallback seguro.
 * @template T
 * @param {string} key
 * @param {T} defaultValue
 * @returns {T}
 */
export function readStorage(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    // Dados corrompidos → fallback limpo, sem crash
    console.warn(`[Crono] localStorage.getItem('${key}') falhou. Usando fallback.`);
    return defaultValue;
  }
}

/**
 * Serializa e grava no localStorage com fallback seguro.
 * @param {string} key
 * @param {unknown} value
 */
export function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`[Crono] localStorage.setItem('${key}') falhou (storage cheio?).`);
  }
}

/**
 * Remove uma chave do localStorage.
 * @param {string} key
 */
export function clearStorage(key) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

// ─── DOMAIN-SPECIFIC READERS / WRITERS ───────────────────────────────────────

/** @returns {import('./types').UserProgress | null} */
export function readUserProgress() {
  // @backend-ready: return await api.get('/progress/me');
  return readStorage(STORAGE_KEYS.USER_PROGRESS, null);
}

/** @param {import('./types').UserProgress} progress */
export function writeUserProgress(progress) {
  // @backend-ready: return await api.put('/progress/me', progress);
  writeStorage(STORAGE_KEYS.USER_PROGRESS, progress);
}

/** @returns {import('./types').StreakState | null} */
export function readStreakState() {
  // @backend-ready: return await api.get('/streak/me');
  return readStorage(STORAGE_KEYS.STREAK_STATE, null);
}

/** @param {import('./types').StreakState} streak */
export function writeStreakState(streak) {
  // @backend-ready: return await api.put('/streak/me', streak);
  writeStorage(STORAGE_KEYS.STREAK_STATE, streak);
}

/** @returns {import('./types').BacklogState | null} */
export function readBacklogState() {
  // @backend-ready: return await api.get('/backlog/me');
  return readStorage(STORAGE_KEYS.BACKLOG_STATE, null);
}

/** @param {import('./types').BacklogState} backlog */
export function writeBacklogState(backlog) {
  // @backend-ready: return await api.put('/backlog/me', backlog);
  writeStorage(STORAGE_KEYS.BACKLOG_STATE, backlog);
}

/** @returns {import('./types').DailyMission | null} */
export function readTodayMission() {
  // @backend-ready: return await api.get('/missions/today');
  return readStorage(STORAGE_KEYS.TODAY_MISSION, null);
}

/** @param {import('./types').DailyMission} mission */
export function writeTodayMission(mission) {
  // @backend-ready: return await api.put('/missions/today', mission);
  writeStorage(STORAGE_KEYS.TODAY_MISSION, mission);
}

/** @returns {import('./types').MissionItem[]} */
export function readMissionItems() {
  // @backend-ready: return await api.get('/mission-items/today');
  return readStorage(STORAGE_KEYS.MISSION_ITEMS, []);
}

/** @param {import('./types').MissionItem[]} items */
export function writeMissionItems(items) {
  // @backend-ready: return await api.put('/mission-items/today', items);
  writeStorage(STORAGE_KEYS.MISSION_ITEMS, items);
}

/** @returns {import('./types').AnswerAttempt[]} */
export function readAnswerAttempts() {
  // @backend-ready: return await api.get('/attempts?date=today');
  return readStorage(STORAGE_KEYS.ANSWER_ATTEMPTS, []);
}

/** @param {import('./types').AnswerAttempt[]} attempts */
export function writeAnswerAttempts(attempts) {
  // @backend-ready: return await api.post('/attempts', attempts);
  writeStorage(STORAGE_KEYS.ANSWER_ATTEMPTS, attempts);
}

/** @returns {import('./types').XpLedger[]} */
export function readXpLedger() {
  // @backend-ready: return await api.get('/xp-ledger?limit=100');
  return readStorage(STORAGE_KEYS.XP_LEDGER, []);
}

/** @param {import('./types').XpLedger[]} ledger */
export function writeXpLedger(ledger) {
  // @backend-ready: return await api.post('/xp-ledger', ledger);
  writeStorage(STORAGE_KEYS.XP_LEDGER, ledger);
}
