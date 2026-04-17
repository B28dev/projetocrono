/**
 * @fileoverview cycleEngine.js — Motor compartilhado de elegibilidade por ciclo
 *
 * Responsável por enriquecer qualquer array de items com os campos:
 * - isUnlocked       → todas as dependências estão completas
 * - isEligibleNow    → desbloqueado + pertence ao ciclo ativo
 * - isComingNext     → pertence ao ciclo seguinte (ciclo ativo + 1)
 * - isLocked         → pertence a ciclos além do próximo
 * - completedAt      → timestamp ISO quando foi marcado como feito
 * - recommendedWeight → 1.0 para isCore, 0.5 para não-core
 * - subjectRotationHint → 'focus' | 'alternate' | 'rest'
 *
 * Não depende de nenhum componente React — puro JS.
 */

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

/** Progresso acima do qual o sistema sugere alternar para outra matéria */
const ALTERNATE_THRESHOLD = 0.65;

/** Progresso acima do qual a matéria pode entrar em descanso */
const REST_THRESHOLD = 0.90;

// ─── CORE ENGINE ─────────────────────────────────────────────────────────────

/**
 * Enriquece um array de items com campos de elegibilidade derivados do progresso.
 *
 * @param {Array<Object>} rawItems - Items com ao menos: id, cycle, dependsOn[], isCore
 * @param {Array<Object>} studyCycles - Ciclos definidos com: id, order
 * @param {Record<string, boolean|string>} progress - Map de itemId → true|false|timestamp
 * @returns {Array<Object>} Items enriquecidos
 */
export function enrichCycleItems(rawItems, studyCycles, progress = {}) {
  // --- Passo 1: determinar status básico de cada item ---
  const withStatus = rawItems.map((item) => {
    const raw = progress[item.id];
    const isDone = Boolean(raw);
    const completedAt = (typeof raw === 'string' && raw.length > 4) ? raw : (isDone ? new Date(0).toISOString() : null);
    return {
      ...item,
      status: isDone ? 'completed' : 'pending',
      completedAt,
      recommendedWeight: item.isCore !== false ? 1.0 : 0.5,
    };
  });

  // --- Passo 2: mapa de lookup por id ---
  const byId = Object.fromEntries(withStatus.map((i) => [i.id, i]));

  // --- Passo 3: calcular isUnlocked (todas as dependências concluídas) ---
  const withUnlocked = withStatus.map((item) => ({
    ...item,
    isUnlocked: (item.dependsOn ?? []).every((depId) => byId[depId]?.status === 'completed'),
  }));

  // --- Passo 4: identificar ciclo ativo ---
  const activeCycle = getCurrentCycle(withUnlocked, studyCycles);
  const activeCycleOrder = activeCycle?.order ?? 1;

  // --- Passo 5: enriquecer com posição relativa ao ciclo ativo ---
  return withUnlocked.map((item) => ({
    ...item,
    isEligibleNow: item.isUnlocked && item.status !== 'completed' && item.cycle === activeCycleOrder,
    isComingNext: item.cycle === activeCycleOrder + 1,
    isLocked: item.cycle > activeCycleOrder + 1,
  }));
}

/**
 * Retorna o ciclo ativo — primeiro ciclo que ainda tem items pendentes.
 *
 * @param {Array<Object>} enrichedItems - Items já com `status`
 * @param {Array<Object>} studyCycles - Ciclos com `order`
 * @returns {Object} Ciclo ativo
 */
export function getCurrentCycle(enrichedItems, studyCycles) {
  const sorted = [...studyCycles].sort((a, b) => a.order - b.order);
  return (
    sorted.find((cycle) => {
      const items = enrichedItems.filter(
        (item) => item.cycle === cycle.order && item.isCore !== false,
      );
      return items.some((item) => item.status !== 'completed');
    }) ?? sorted[sorted.length - 1]
  );
}

/**
 * Calcula o hint de rotação entre matérias com base no progresso atual.
 *
 * @param {number} progressPercent - 0 a 100
 * @returns {'focus' | 'alternate' | 'rest'}
 */
export function getSubjectRotationHint(progressPercent) {
  const pct = progressPercent / 100;
  if (pct >= REST_THRESHOLD) return 'rest';
  if (pct >= ALTERNATE_THRESHOLD) return 'alternate';
  return 'focus';
}

/**
 * Calcula métricas de progresso básicas para um array de items.
 *
 * @param {Array<Object>} items - Items com `status`
 * @returns {{ completedCount: number, totalCount: number, progressPercent: number }}
 */
export function calcProgressMetrics(items) {
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return { completedCount, totalCount, progressPercent };
}

/**
 * Retorna os conteúdos do próximo ciclo (isComingNext), limitados a `limit`.
 *
 * @param {Array<Object>} enrichedItems
 * @param {number} limit
 * @returns {Array<Object>}
 */
export function getComingNextItems(enrichedItems, limit = 3) {
  return enrichedItems.filter((i) => i.isComingNext && i.status !== 'completed').slice(0, limit);
}

/**
 * Retorna items elegíveis agora (isEligibleNow).
 *
 * @param {Array<Object>} enrichedItems
 * @returns {Array<Object>}
 */
export function getEligibleNowItems(enrichedItems) {
  return enrichedItems.filter((i) => i.isEligibleNow);
}

/**
 * Retorna items bloqueados (ciclo > próximo).
 *
 * @param {Array<Object>} enrichedItems
 * @param {number} limit
 * @returns {Array<Object>}
 */
export function getLockedItems(enrichedItems, limit = 4) {
  return enrichedItems.filter((i) => i.isLocked).slice(0, limit);
}

function sortItemsBySequence(items) {
  return [...items].sort((a, b) => {
    if ((a.cycle ?? 0) !== (b.cycle ?? 0)) return (a.cycle ?? 0) - (b.cycle ?? 0);
    if ((a.order ?? 0) !== (b.order ?? 0)) return (a.order ?? 0) - (b.order ?? 0);
    return String(a.id).localeCompare(String(b.id));
  });
}

/**
 * Retorna o item principal recomendado da trilha oficial.
 *
 * @param {Array<Object>} enrichedItems
 * @returns {Object|null}
 */
export function getPrimaryRecommendedItem(enrichedItems) {
  const eligibleNow = sortItemsBySequence(enrichedItems.filter((item) => item.isEligibleNow && item.status !== 'completed'));
  if (eligibleNow[0]) return eligibleNow[0];

  const comingNext = sortItemsBySequence(enrichedItems.filter((item) => item.isComingNext && item.status !== 'completed'));
  return comingNext[0] ?? null;
}

/**
 * Retorna os itens recomendados da trilha oficial já ordenados.
 *
 * @param {Array<Object>} enrichedItems
 * @param {number} limit
 * @returns {Array<Object>}
 */
export function getRecommendedNowItems(enrichedItems, limit = 1) {
  const items = sortItemsBySequence(enrichedItems.filter((item) => (item.isEligibleNow || item.isComingNext) && item.status !== 'completed'));
  return items.slice(0, limit);
}
