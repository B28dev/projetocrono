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
 * - itens podem carregar ganchos de reforço e revisão futura sem acoplar a UI
 *
 * @backend-ready: Trocar `generateMissionItems` por `api.get('/mission-items/today')`.
 */

import { CONTENT_ITEMS } from '../content/contentItems.js';

function getMissionItemOriginFromRole(missionRole) {
  if (missionRole === 'reinforcement') return 'reinforcement';
  if (missionRole === 'pending') return 'backlog';
  return 'today';
}

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
  missionRole = null,
  sourceDisciplineId = null,
  motherSubjectId = null,
  layerId = null,
  layerTitle = null,
  priority = null,
  reason = null,
  isRecommended = false,
  isOfficial = true,
  generatedFrom = null,
  requiresValidation = true,
  validationType = null,
  validationStatus = 'idle',
  validationAttemptId = null,
  isValidated = false,
  validatedAt = null,
  lastResultTier = null,
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
    lastAttemptAt: null,
    attemptCount: 0,
    needsSameDayReinforcement: false,
    reviewBucket: null,
    nextReviewAt: null,
    difficultyRating: null,
    missionRole,
    sourceDisciplineId,
    motherSubjectId,
    layerId,
    layerTitle,
    priority,
    reason,
    isRecommended,
    isOfficial,
    generatedFrom,
    requiresValidation,
    validationType,
    validationStatus,
    validationAttemptId,
    isValidated,
    validatedAt,
    lastResultTier,
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

export function generateMissionItemsFromOfficialMission(mission, missionContentItems, previousItems = []) {
  if (!mission || missionContentItems.length === 0) return [];

  const previousItemsByLayerId = new Map(
    previousItems
      .filter((item) => item.layerId)
      .map((item) => [item.layerId, item]),
  );

  return missionContentItems
    .map((contentItem, index) => {
      const metadata = contentItem.missionMetadata ?? {};
      const origin = getMissionItemOriginFromRole(metadata.missionRole);
      const previousItem = previousItemsByLayerId.get(metadata.layerId)
        ?? previousItems.find((item) => item.contentItemId === contentItem.id)
        ?? null;

      const nextItem = createMissionItem({
        dailyMissionId: mission.id,
        contentItemId: contentItem.id,
        origin,
        order: index + 1,
        requiredForCleanDay: metadata.missionRole !== 'reinforcement',
        missionRole: metadata.missionRole ?? null,
        sourceDisciplineId: mission.sourceDisciplineId ?? metadata.sourceDisciplineId ?? null,
        motherSubjectId: metadata.motherSubjectId ?? null,
        layerId: metadata.layerId ?? null,
        layerTitle: contentItem.title,
        priority: metadata.priority ?? index + 1,
        reason: metadata.reason ?? null,
        isRecommended: metadata.missionRole === 'primary',
        isOfficial: metadata.isOfficial ?? metadata.missionRole !== 'reinforcement',
        generatedFrom: metadata.generatedFrom ?? null,
        requiresValidation: metadata.requiresValidation ?? true,
        validationType: metadata.validationType ?? contentItem.interactionType ?? null,
        validationStatus: 'idle',
        validationAttemptId: null,
        isValidated: false,
        validatedAt: null,
        lastResultTier: null,
      });

      if (!previousItem) return nextItem;

      return {
        ...nextItem,
        id: previousItem.id,
        status: previousItem.status,
        completedAt: previousItem.completedAt,
        lastAttemptAt: previousItem.lastAttemptAt,
        attemptCount: previousItem.attemptCount,
        needsSameDayReinforcement: previousItem.needsSameDayReinforcement,
        reviewBucket: previousItem.reviewBucket,
        nextReviewAt: previousItem.nextReviewAt,
        difficultyRating: previousItem.difficultyRating,
        validationStatus: previousItem.validationStatus ?? nextItem.validationStatus,
        validationAttemptId: previousItem.validationAttemptId ?? null,
        isValidated: previousItem.isValidated ?? false,
        validatedAt: previousItem.validatedAt ?? null,
        lastResultTier: previousItem.lastResultTier ?? null,
      };
    })
    .sort((a, b) => (a.priority ?? a.order) - (b.priority ?? b.order));
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

export function startMissionItem(item) {
  return {
    ...item,
    status: item.status === 'completed' ? 'completed' : 'in_progress',
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

export function applyAttemptToMissionItem(item, attempt, updates = {}) {
  return {
    ...item,
    lastAttemptAt: attempt?.attemptedAt ?? item.lastAttemptAt ?? null,
    attemptCount: (item.attemptCount ?? 0) + (attempt ? 1 : 0),
    needsSameDayReinforcement: updates.needsSameDayReinforcement ?? item.needsSameDayReinforcement ?? false,
    reviewBucket: updates.reviewBucket ?? item.reviewBucket ?? null,
    nextReviewAt: updates.nextReviewAt ?? item.nextReviewAt ?? null,
    difficultyRating: updates.difficultyRating ?? item.difficultyRating ?? null,
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
