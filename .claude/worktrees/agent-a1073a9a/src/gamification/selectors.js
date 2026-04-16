/**
 * @fileoverview Selectors — Derived State Functions
 *
 * Todas as funções puras que a camada visual (UI) consome.
 * REGRA: nenhum seletor tem efeito colateral. Entrada → Saída. Só isso.
 *
 * A UI nunca calcula — ela só lê seletores.
 * Os seletores nunca persistem — eles só derivam.
 *
 * @backend-ready: Estes seletores podem ser executados tanto no cliente
 * quanto no servidor (SSR) sem mudança — são funções puras.
 */

import { getLocalDateString } from './plan/dailyMissions.js';
import { getRealValidations, getAttemptsForDate } from './execution/answerAttempts.js';
import { isActiveDay as _isActiveDay, getStreakStatus } from './progression/streakEngine.js';
import { isCleanDay as _isCleanDay, getBacklogItems, getDebtSeverity } from './progression/backlogEngine.js';
import { getLevelProgress } from './progression/xpEngine.js';
import { countCompletedRequired, countTotalRequired } from './plan/missionItems.js';

// ─── MISSION ──────────────────────────────────────────────────────────────────

/**
 * Retorna a missão de hoje a partir de uma lista de missões.
 * @param {import('./types').DailyMission[]} missions
 * @param {string} [dateString] - YYYY-MM-DD. Padrão: hoje.
 * @returns {import('./types').DailyMission | null}
 */
export function getTodayMission(missions, dateString) {
  const today = dateString ?? getLocalDateString();
  return missions.find((m) => m.date === today) ?? null;
}

/**
 * Retorna os MissionItems da missão de hoje.
 * @param {import('./types').MissionItem[]} missionItems
 * @param {string | null} missionId
 * @returns {import('./types').MissionItem[]}
 */
export function getTodayMissionItems(missionItems, missionId) {
  if (!missionId) return [];
  return missionItems
    .filter((i) => i.dailyMissionId === missionId)
    .sort((a, b) => a.order - b.order);
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────

/**
 * Calcula o progresso de hoje baseado nos MissionItems e tentativas.
 *
 * @param {import('./types').DailyMission | null} mission
 * @param {import('./types').MissionItem[]} todayItems - Itens da missão de hoje
 * @param {import('./types').AnswerAttempt[]} attempts
 * @returns {{ done: number, total: number, percent: number, validationsToday: number }}
 */
export function getTodayProgress(mission, todayItems, attempts) {
  if (!mission || todayItems.length === 0) {
    return { done: 0, total: 0, percent: 0, validationsToday: 0 };
  }

  const today = mission.date;
  const dayAttempts = getAttemptsForDate(attempts, today);
  const validationsToday = getRealValidations(dayAttempts).length;

  const total = countTotalRequired(todayItems);
  const done = countCompletedRequired(todayItems);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, total, percent, validationsToday };
}

// ─── ACTIVE DAY ───────────────────────────────────────────────────────────────

/**
 * Verificar se hoje é um Dia Ativo (≥ 1 Validação Real).
 * @param {import('./types').AnswerAttempt[]} attempts
 * @param {string} [dateString] - YYYY-MM-DD. Padrão: hoje.
 * @returns {boolean}
 */
export function getIsActiveDay(attempts, dateString) {
  const today = dateString ?? getLocalDateString();
  return _isActiveDay(attempts, today);
}

// ─── CLEAN DAY ────────────────────────────────────────────────────────────────

/**
 * Verifica se hoje é um Dia Limpo.
 * Dia Limpo = 100% da meta diária + accumulado === 0.
 *
 * @param {import('./types').DailyMission | null} mission
 * @param {import('./types').MissionItem[]} todayItems
 * @param {import('./types').AnswerAttempt[]} attempts
 * @param {import('./types').MissionItem[]} allMissionItems - Histórico completo para calcular backlog
 * @returns {boolean}
 */
export function getIsCleanDay(mission, todayItems, attempts, allMissionItems) {
  const backlog = getBacklogItems(allMissionItems, attempts);
  return _isCleanDay(mission, todayItems, attempts, backlog.length);
}

// ─── MOMENTUM ─────────────────────────────────────────────────────────────────

/**
 * Calcula o estado de momentum do aluno.
 *
 * - 'idle':     sem atividade hoje
 * - 'warming':  tem atividade mas abaixo da meta mínima
 * - 'momentum': ≥ meta mínima, ofensiva ativa
 * - 'locked':   streak quebrado e sem atividade
 *
 * @param {import('./types').StreakState} streakState
 * @param {{ done: number, total: number, validationsToday: number }} todayProgress
 * @param {string} [dateString] - YYYY-MM-DD. Padrão: hoje.
 * @returns {import('./types').MomentumState}
 */
export function getMomentumState(streakState, todayProgress, dateString) {
  const today = dateString ?? getLocalDateString();
  const status = getStreakStatus(streakState, today);
  const { validationsToday } = todayProgress;

  if (validationsToday === 0) {
    if (status === 'broken') return 'locked';
    return 'idle';
  }

  if (validationsToday >= 1 && todayProgress.percent < 100) return 'warming';
  if (todayProgress.percent >= 100) return 'momentum';

  return 'warming';
}

// ─── LEVEL ────────────────────────────────────────────────────────────────────

/**
 * Retorna o progresso de nível atual do usuário.
 * @param {import('./types').UserProgress} userProgress
 * @returns {import('./types').LevelProgress}
 */
export function getCurrentLevelProgress(userProgress) {
  return getLevelProgress(userProgress?.totalXp ?? 0);
}

// ─── BACKLOG ──────────────────────────────────────────────────────────────────

/**
 * Retorna os itens do acumulado (história de missões incompletas).
 * @param {import('./types').MissionItem[]} allMissionItems
 * @param {import('./types').AnswerAttempt[]} attempts
 * @param {string} [dateString] - YYYY-MM-DD. Padrão: hoje.
 * @returns {import('./types').MissionItem[]}
 */
export function getBacklogItemsSelector(allMissionItems, attempts, dateString) {
  return getBacklogItems(allMissionItems, attempts, dateString);
}

/**
 * Retorna a severidade do débito atual.
 * @param {import('./types').BacklogState} backlogState
 * @returns {import('./types').DebtSeverity}
 */
export function getDebtSeveritySelector(backlogState) {
  return getDebtSeverity(backlogState?.totalDebtItems ?? 0);
}
