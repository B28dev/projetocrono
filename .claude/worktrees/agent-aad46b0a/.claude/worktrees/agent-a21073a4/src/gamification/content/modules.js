/**
 * @fileoverview Content Layer — Modules
 *
 * Módulos agrupam ContentItems dentro de uma Subject.
 * Ordem importa: define a progressão natural do conteúdo.
 *
 * @backend-ready: Trocar por `api.get('/modules?subjectId=X')`.
 */

/** @type {import('../types').Module[]} */
export const MODULES = [
  // ── Arquitetura de Computadores ──────────────────────────────────────────
  {
    id: 'arq-m1',
    subjectId: 'arquitetura',
    title: 'Fundamentos de Arquitetura',
    order: 1,
    type: 'lecture',
    isLockedByDefault: false,
  },
  {
    id: 'arq-m2',
    subjectId: 'arquitetura',
    title: 'Organização da CPU',
    order: 2,
    type: 'practice',
    isLockedByDefault: false,
  },
  {
    id: 'arq-m3',
    subjectId: 'arquitetura',
    title: 'Memória e Cache',
    order: 3,
    type: 'revision',
    isLockedByDefault: true,
  },

  // ── Engenharia de Software ───────────────────────────────────────────────
  {
    id: 'es-m1',
    subjectId: 'intro-eng-software',
    title: 'Processos de Software',
    order: 1,
    type: 'lecture',
    isLockedByDefault: false,
  },
  {
    id: 'es-m2',
    subjectId: 'intro-eng-software',
    title: 'Engenharia de Requisitos',
    order: 2,
    type: 'practice',
    isLockedByDefault: false,
  },
  {
    id: 'es-m3',
    subjectId: 'intro-eng-software',
    title: 'Questões Estilo Prova',
    order: 3,
    type: 'exam_prep',
    isLockedByDefault: true,
  },

  // ── Empreendedorismo ─────────────────────────────────────────────────────
  {
    id: 'emp-m1',
    subjectId: 'empreendedorismo',
    title: 'Conceitos Fundamentais',
    order: 1,
    type: 'lecture',
    isLockedByDefault: false,
  },
  {
    id: 'emp-m2',
    subjectId: 'empreendedorismo',
    title: 'Modelos de Negócio',
    order: 2,
    type: 'practice',
    isLockedByDefault: false,
  },

  // ── Inglês ───────────────────────────────────────────────────────────────
  {
    id: 'ing-m1',
    subjectId: 'eletiva-ingles',
    title: 'Vocabulário Técnico',
    order: 1,
    type: 'revision',
    isLockedByDefault: false,
  },
];

/**
 * @param {string} subjectId
 * @returns {import('../types').Module[]}
 */
export function getModulesBySubject(subjectId) {
  return MODULES.filter((m) => m.subjectId === subjectId)
    .sort((a, b) => a.order - b.order);
}

/**
 * @param {string} id
 * @returns {import('../types').Module | undefined}
 */
export function getModuleById(id) {
  return MODULES.find((m) => m.id === id);
}
