/**
 * @fileoverview Progression Layer — Streak Engine
 *
 * Funções puras para calcular e atualizar a ofensiva (streak) do aluno.
 * Nenhum efeito colateral aqui — só recebe estado atual, retorna novo estado.
 *
 * FÍSICA DO CRONO:
 * - Dia Ativo = pelo menos 1 Validação Real concluída antes de 23h59
 * - Ofensiva = sequência de Dias Ativos consecutivos
 * - Streak quebra se um dia passar sem 1 Validação Real
 * - Multiplier escala com a streak até 2.0x
 *
 * @backend-ready: A lógica aqui é stateless e pode rodar no backend sem mudanças.
 */

import { getRealValidations, getAttemptsForDate } from '../execution/answerAttempts.js';

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

/** Dias de streak para cada nível de multiplicador */
const STREAK_MULTIPLIER_THRESHOLDS = [
  { days: 0,  multiplier: 1.0 },
  { days: 3,  multiplier: 1.1 },
  { days: 7,  multiplier: 1.25 },
  { days: 14, multiplier: 1.4 },
  { days: 21, multiplier: 1.6 },
  { days: 30, multiplier: 1.8 },
  { days: 60, multiplier: 2.0 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Subtrai N dias de uma data ISO string (YYYY-MM-DD).
 * @param {string} dateString
 * @param {number} days
 * @returns {string}
 */
function subtractDays(dateString, days) {
  const date = new Date(dateString + 'T12:00:00');
  date.setDate(date.getDate() - days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Diferença em dias entre duas datas ISO string (YYYY-MM-DD).
 * @param {string} dateA
 * @param {string} dateB
 * @returns {number}
 */
function daysDiff(dateA, dateB) {
  const a = new Date(dateA + 'T12:00:00');
  const b = new Date(dateB + 'T12:00:00');
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

// ─── PURE FUNCTIONS ──────────────────────────────────────────────────────────

/**
 * Verifica se houve pelo menos 1 Validação Real em um dia específico.
 *
 * @param {import('../types').AnswerAttempt[]} attempts - Todas as tentativas
 * @param {string} dateString - YYYY-MM-DD
 * @returns {boolean}
 */
export function isActiveDay(attempts, dateString) {
  const dayAttempts = getAttemptsForDate(attempts, dateString);
  const realValidations = getRealValidations(dayAttempts);
  return realValidations.length >= 1;
}

/**
 * Calcula o multiplicador de XP com base na streak atual.
 * @param {number} currentStreak
 * @returns {number}
 */
export function getStreakMultiplier(currentStreak) {
  let multiplier = 1.0;
  for (const threshold of STREAK_MULTIPLIER_THRESHOLDS) {
    if (currentStreak >= threshold.days) {
      multiplier = threshold.multiplier;
    }
  }
  return multiplier;
}

/**
 * Calcula o status da streak.
 * @param {import('../types').StreakState} streakState
 * @param {string} todayDate YYYY-MM-DD
 * @returns {import('../types').StreakStatus}
 */
export function getStreakStatus(streakState, todayDate) {
  if (!streakState.lastActiveDate) return 'active'; // sem histórico = fresh

  const diff = daysDiff(todayDate, streakState.lastActiveDate);

  if (diff === 0) return 'active';
  if (diff === 1) return 'at_risk'; // não validou ainda hoje, mas ainda dá tempo
  if (diff > 1 && streakState.currentStreak > 0) return 'broken';
  if (streakState.currentStreak === 0 && diff > 1) return 'recovering';
  return 'active';
}

/**
 * Atualiza o estado da streak com base nas tentativas do dia.
 * Esta função deve ser chamada no final de cada sessão do dia.
 *
 * @param {import('../types').StreakState} currentStreak
 * @param {import('../types').AnswerAttempt[]} attempts - Todas as tentativas históricas
 * @param {string} todayDate - YYYY-MM-DD
 * @returns {import('../types').StreakState}
 */
export function updateStreak(currentStreak, attempts, todayDate) {
  const todayIsActive = isActiveDay(attempts, todayDate);
  const lastActiveDate = currentStreak.lastActiveDate;

  // Sem validação hoje ainda: retorna apenas com status atualizado
  if (!todayIsActive) {
    return {
      ...currentStreak,
      streakStatus: getStreakStatus(currentStreak, todayDate),
      streakMultiplier: getStreakMultiplier(currentStreak.currentStreak),
    };
  }

  // Já computou hoje: não duplica
  if (lastActiveDate === todayDate) {
    return {
      ...currentStreak,
      streakStatus: 'active',
      streakMultiplier: getStreakMultiplier(currentStreak.currentStreak),
    };
  }

  // Verifica se o último dia ativo foi ontem (streak contínua)
  const yesterday = subtractDays(todayDate, 1);
  const isContinuous = lastActiveDate === yesterday;

  const newCurrentStreak = isContinuous ? currentStreak.currentStreak + 1 : 1;
  const newHighest = Math.max(newCurrentStreak, currentStreak.highestStreak);
  const newMultiplier = getStreakMultiplier(newCurrentStreak);

  return {
    ...currentStreak,
    currentStreak: newCurrentStreak,
    highestStreak: newHighest,
    lastActiveDate: todayDate,
    streakMultiplier: newMultiplier,
    streakStatus: 'active',
  };
}

/**
 * Cria um StreakState inicial (zerado) para um novo usuário.
 * @param {string} userId
 * @returns {import('../types').StreakState}
 */
export function createInitialStreakState(userId) {
  return {
    userId,
    currentStreak: 0,
    highestStreak: 0,
    lastActiveDate: null,
    streakMultiplier: 1.0,
    streakStatus: 'active',
  };
}
