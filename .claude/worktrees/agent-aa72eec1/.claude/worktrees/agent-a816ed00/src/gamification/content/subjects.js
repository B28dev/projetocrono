/**
 * @fileoverview Content Layer — Subjects
 *
 * Matérias acadêmicas estáveis. Esta lista é uma fonte de verdade do conteúdo,
 * não do progresso do usuário.
 *
 * @backend-ready: Trocar o array estático por `api.get('/subjects')` + useEffect.
 */

/** @type {import('../types').Subject[]} */
export const SUBJECTS = [
  {
    id: 'arquitetura',
    slug: 'arquitetura',
    title: 'Arquitetura de Computadores',
    period: 'p1',
    status: 'active',
    themeColorToken: 'blue',
  },
  {
    id: 'intro-eng-software',
    slug: 'engenharia-software',
    title: 'Intro. Engenharia de Software',
    period: 'p1',
    status: 'active',
    themeColorToken: 'teal',
  },
  {
    id: 'empreendedorismo',
    slug: 'empreendedorismo',
    title: 'Empreendedorismo',
    period: 'p1',
    status: 'active',
    themeColorToken: 'rose',
  },
  {
    id: 'eletiva-ingles',
    slug: 'eletiva-ingles',
    title: 'Eletiva I — Inglês',
    period: 'p1',
    status: 'archived',
    themeColorToken: 'green',
  },
];

/**
 * Retorna um Subject pelo ID.
 * @param {string} id
 * @returns {import('../types').Subject | undefined}
 */
export function getSubjectById(id) {
  return SUBJECTS.find((s) => s.id === id);
}

/**
 * Retorna subjects filtrando por status.
 * @param {'active' | 'archived' | 'upcoming'} status
 * @returns {import('../types').Subject[]}
 */
export function getSubjectsByStatus(status) {
  return SUBJECTS.filter((s) => s.status === status);
}
