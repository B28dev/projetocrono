/**
 * @fileoverview Plan Layer — Mission Items
 *
 * MissionItems são os itens concretos que o aluno deve executar em um dia.
 * Cada item tem uma origem: 'today' (novo), 'backlog' (acumulado) ou 'reinforcement'.
 *
 * FÍSICA DO CRONO:
 * - requiredForCleanDay = true nos itens 'today' e 'backlog'
 * - itens de 'reinforcement' somam XP mas não bloqueiam Dia Limpo
 * - status transitions: pending → in_progress → completed | skipped | revealed_only
 *
 * @backend-ready: Trocar `generateMissionItems` por `api.get('/mission-items/today')`.
 */

import { CONTENT_ITEMS } from '../content/contentItems.js';

// ─── ID GENERATOR ────────────────────────────────────────────────────────────

let _idCounter = 1;

function genMissionItemId() {
  return `mi-${Date.now()}-${_idCounter++}`;
}

// ─── FACTORY ─────────────────────────────────────────────────────────────────

/**
 * Cria um MissionItem a partir de um ContentItem e parâmetros da missão.
 *
 * @param {object} params
 * @param {string} params.dailyMissionId
 * @param {string} params.contentItemId
 * @param {import('../types').MissionItemOrigin} params.origin
 * @param {number} params.order
 * @param {boolean} [params.requiredForCleanDay]
 * @returns {import('../types').MissionItem}
 */
export function createMissionItem({
  dailyMissionId,
  contentItemId,
  origin,
  order,
  requiredForCleanDay = true,
}) {
  const contentItem = CONTENT_ITEMS.find((c) => c.id === contentItemId);
  const missionType = contentItem?.kind ?? 'flashcard';

  return {
    id: genMissionItemId(),
    dailyMissionId,
    contentItemId,
    origin,
    order,
    missionType,
    requiredForCleanDay: origin === 'reinforcement' ? false : requiredForCleanDay,
    status: 'pending',
    completedAt: null,
  };
}

// ─── MOCK GENERATOR (Fase 1) ─────────────────────────────────────────────────

/**
 * Gera a lista de MissionItems para uma DailyMission.
 *
 * Em produção, este gerador será substituído pelo algoritmo do backend
 * (spaced repetition + backlog insert).
 *
 * Lógica de montagem da missão:
 * 1. Pega os primeiros N itens ativos como "hoje"
 * 2. Insere itens de backlog (se houver) com requiredForCleanDay = true
 * 3. Adiciona 1-2 itens de reforço opcionais
 *
 * @param {import('../types').DailyMission} mission
 * @param {import('../types').ContentItem[]} availableItems - Itens disponíveis
 * @param {import('../types').ContentItem[]} [backlogItems=[]] - Itens do acumulado
 * @returns {import('../types').MissionItem[]}
 *
 * @backend-ready: Substituir por `api.get('/mission-items?missionId=X')`.
 */
export function generateMissionItems(mission, availableItems, backlogItems = []) {
  if (!mission || availableItems.length === 0) return [];

  const items = [];
  let order = 1;

  // 1. Itens de backlog (acumulado) — aparecem primeiro, requiredForCleanDay = true
  const backlogToInclude = backlogItems.slice(0, 2);
  for (const contentItem of backlogToInclude) {
    items.push(
      createMissionItem({
        dailyMissionId: mission.id,
        contentItemId: contentItem.id,
        origin: 'backlog',
        order: order++,
        requiredForCleanDay: true,
      }),
    );
  }

  // 2. Itens de hoje — núcleo da missão, requiredForCleanDay = true
  const todayItems = availableItems
    .filter((c) => !backlogItems.find((b) => b.id === c.id))
    .slice(0, Math.max(mission.targetValidations - backlogToInclude.length, 1));

  for (const contentItem of todayItems) {
    items.push(
      createMissionItem({
        dailyMissionId: mission.id,
        contentItemId: contentItem.id,
        origin: 'today',
        order: order++,
        requiredForCleanDay: true,
      }),
    );
  }

  // 3. Itens de reforço opcionais — bônus de XP, não bloqueiam Dia Limpo
  const reinforcementCandidates = availableItems
    .filter((c) => !items.find((i) => i.contentItemId === c.id))
    .slice(0, 2);

  for (const contentItem of reinforcementCandidates) {
    items.push(
      createMissionItem({
        dailyMissionId: mission.id,
        contentItemId: contentItem.id,
        origin: 'reinforcement',
        order: order++,
        requiredForCleanDay: false,
      }),
    );
  }

  return items;
}

// ─── STATUS HELPERS ──────────────────────────────────────────────────────────

/**
 * Marca um MissionItem como completado.
 * @param {import('../types').MissionItem} item
 * @returns {import('../types').MissionItem}
 */
export function completeMissionItem(item) {
  return {
    ...item,
    status: 'completed',
    completedAt: new Date().toISOString(),
  };
}

/**
 * Marca como "revelado sem tentar" — NÃO conta como progresso real.
 * @param {import('../types').MissionItem} item
 * @returns {import('../types').MissionItem}
 */
export function markRevealedOnly(item) {
  return {
    ...item,
    status: 'revealed_only',
  };
}

/**
 * Conta quantos itens obrigatórios foram completados.
 * @param {import('../types').MissionItem[]} items
 * @returns {number}
 */
export function countCompletedRequired(items) {
  return items.filter(
    (i) => i.requiredForCleanDay && i.status === 'completed',
  ).length;
}

/**
 * Conta total de itens obrigatórios da missão.
 * @param {import('../types').MissionItem[]} items
 * @returns {number}
 */
export function countTotalRequired(items) {
  return items.filter((i) => i.requiredForCleanDay).length;
}
