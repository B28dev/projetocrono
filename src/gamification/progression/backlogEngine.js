/**
 * @fileoverview Progression Layer — Backlog Engine
 *
 * Funções puras para calcular o acumulado (backlog) do aluno.
 * O acumulado representa o que era OBRIGATÓRIO e ficou em aberto.
 *
 * FÍSICA DO CRONO:
 * - Acumulado = MissionItems com requiredForCleanDay:true + status !== 'completed' + de dias passados
 * - Dia Limpo = meta 100% cumprida + accumulatedDebt === 0
 * - Severidade escala pela quantidade de itens em aberto e tempo do débito mais antigo
 *
 * @backend-ready: Funções puras — podem rodar no backend sem mudança.
 */

import { getLocalDateString } from '../plan/dailyMissions.js';
import { hasRealValidationForItem } from '../execution/answerAttempts.js';
import { countCompletedRequired, countTotalRequired } from '../plan/missionItems.js';
import { compareMissionDates, extractMissionDate } from '../plan/missionDates.js';

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

/** Thresholds de severidade por número de itens em aberto */
const SEVERITY_THRESHOLDS = {
  none:     0,
  low:      1,
  medium:   4,
  high:     8,
  critical: 15,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Diferença em dias entre hoje e uma data ISO (YYYY-MM-DD).
 * @param {string} dateString
 * @returns {number}
 */
function daysAgo(dateString) {
  const today = new Date(getLocalDateString() + 'T12:00:00');
  const target = new Date(dateString + 'T12:00:00');
  return Math.max(Math.round((today - target) / (1000 * 60 * 60 * 24)), 0);
}

// ─── PURE FUNCTIONS ──────────────────────────────────────────────────────────

/**
 * Retorna os MissionItems obrigatórios que ficaram em aberto em dias passados.
 * Esses itens formam o "acumulado" (backlog).
 *
 * @param {import('../types').MissionItem[]} missionItems - Todos os items históricos
 * @param {import('../types').AnswerAttempt[]} attempts - Todas as tentativas
 * @param {string} [todayDate] - YYYY-MM-DD. Padrão: hoje.
 * @returns {import('../types').MissionItem[]}
 */
export function getBacklogItems(missionItems, attempts, todayDate) {
  const today = todayDate ?? getLocalDateString();

  return missionItems.filter((item) => {
    if (!item.requiredForCleanDay) return false;

    const missionDate = extractMissionDate(item.dailyMissionId);
    if (missionDate === today) return false;

    if (item.status === 'completed') return false;
    if (hasRealValidationForItem(attempts, item.id)) return false;

    return true;
  });
}

/**
 * Calcula a severidade do acumulado.
 * @param {number} totalDebtItems
 * @returns {import('../types').DebtSeverity}
 */
export function getDebtSeverity(totalDebtItems) {
  if (totalDebtItems <= SEVERITY_THRESHOLDS.none) return 'none';
  if (totalDebtItems < SEVERITY_THRESHOLDS.low + SEVERITY_THRESHOLDS.medium) return 'low';
  if (totalDebtItems < SEVERITY_THRESHOLDS.medium + SEVERITY_THRESHOLDS.high) return 'medium';
  if (totalDebtItems < SEVERITY_THRESHOLDS.high + SEVERITY_THRESHOLDS.critical) return 'high';
  return 'critical';
}

/**
 * Verifica se hoje é um Dia Limpo.
 * Dia Limpo = 100% da meta diária + accumulatedDebt === 0.
 *
 * @param {import('../types').DailyMission} mission
 * @param {import('../types').MissionItem[]} todayItems - Itens da missão de hoje
 * @param {import('../types').AnswerAttempt[]} attempts
 * @param {number} accumulatedDebt - Número de itens em aberto de dias passados
 * @returns {boolean}
 */
export function isCleanDay(mission, todayItems, attempts, accumulatedDebt) {
  if (!mission) return false;
  if (accumulatedDebt > 0) return false;

  const totalRequired = countTotalRequired(todayItems);
  if (totalRequired === 0) return false;

  const completedRequired = countCompletedRequired(todayItems);
  return completedRequired >= totalRequired;
}

/**
 * Cria um BacklogState inicial (zerado) para um novo usuário.
 * @param {string} userId
 * @returns {import('../types').BacklogState}
 */
export function createInitialBacklogState(userId) {
  return {
    userId,
    totalDebtItems: 0,
    oldestDebtDate: null,
    debtSeverity: 'none',
    backlogClearedAt: null,
    pendingMissionItems: 0,
    reinforcementPendingCount: 0,
    lastDebtUpdateAt: null,
  };
}

/**
 * Reconstrói o BacklogState a partir dos dados atuais.
 * @param {string} userId
 * @param {import('../types').MissionItem[]} missionItems
 * @param {import('../types').AnswerAttempt[]} attempts
 * @returns {import('../types').BacklogState}
 */
export function rebuildBacklogState(userId, missionItems, attempts) {
  const backlogItems = getBacklogItems(missionItems, attempts);
  const reinforcementPendingCount = missionItems.filter(
    (item) => item.origin === 'reinforcement' && item.status !== 'completed',
  ).length;

  let oldestDebtDate = null;
  for (const item of backlogItems) {
    const missionDate = extractMissionDate(item.dailyMissionId);
    if (compareMissionDates(missionDate, oldestDebtDate) < 0) {
      oldestDebtDate = missionDate;
    }
  }

  const totalDebtItems = backlogItems.length;
  const debtSeverity = getDebtSeverity(totalDebtItems);
  const now = new Date().toISOString();

  return {
    userId,
    totalDebtItems,
    oldestDebtDate,
    debtSeverity,
    backlogClearedAt: totalDebtItems === 0 ? now : null,
    pendingMissionItems: totalDebtItems,
    reinforcementPendingCount,
    lastDebtUpdateAt: now,
  };
}

/**
 * Retorna rótulo legível para a severidade.
 * @param {import('../types').DebtSeverity} severity
 * @returns {string}
 */
export function getSeverityLabel(severity) {
  const labels = {
    none:     'Zerado',
    low:      'Leve',
    medium:   'Moderado',
    high:     'Pesado',
    critical: 'Crítico',
  };
  return labels[severity] ?? 'Desconhecido';
}

/**
 * Retorna o tempo de existência do débito mais antigo em dias.
 * @param {import('../types').BacklogState} backlogState
 * @returns {number}
 */
export function getOldestDebtAge(backlogState) {
  if (!backlogState.oldestDebtDate) return 0;
  return daysAgo(backlogState.oldestDebtDate);
}
