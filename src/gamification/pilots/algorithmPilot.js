/**
 * @fileoverview algorithmPilot.js — Dados e engine do piloto de Algoritmo e Programação
 *
 * Usa o cycleEngine compartilhado para enriquecer os items com isEligibleNow,
 * isComingNext, isLocked, completedAt, recommendedWeight e subjectRotationHint.
 */

import {
  enrichCycleItems,
  getCurrentCycle,
  getSubjectRotationHint,
  calcProgressMetrics,
  getComingNextItems,
  getEligibleNowItems,
  getLockedItems,
} from '../cycles/cycleEngine.js';

export const ALGORITHM_PILOT_STORAGE_KEY = 'algoritmo-pilot-progress-v2';

// ─── CICLOS ───────────────────────────────────────────────────────────────────

const STUDY_CYCLES = [
  {
    id: 'alg-cycle-1',
    order: 1,
    title: 'Ciclo 1 · Revisão de vetores',
    objective: 'Reativar a base de vetores antes de abrir matrizes.',
  },
  {
    id: 'alg-cycle-2',
    order: 2,
    title: 'Ciclo 2 · Vetores na prática',
    objective: 'Levar vetores para exercícios reais e contato com juiz online.',
  },
  {
    id: 'alg-cycle-3',
    order: 3,
    title: 'Ciclo 3 · Introdução a matrizes',
    objective: 'Entender matriz como vetor bidimensional e dominar declaração e acesso.',
  },
  {
    id: 'alg-cycle-4',
    order: 4,
    title: 'Ciclo 4 · For aninhado e diagonais',
    objective: 'Controlar fluxo por linha/coluna e identificar diagonais com segurança.',
  },
  {
    id: 'alg-cycle-5',
    order: 5,
    title: 'Ciclo 5 · Operações com matrizes',
    objective: 'Aplicar filtro, transformação e leitura operacional em matrizes.',
  },
  {
    id: 'alg-cycle-6',
    order: 6,
    title: 'Ciclo 6 · Trilha prática',
    objective: 'Encadear situações práticas maiores até ganhar resistência de execução.',
  },
  {
    id: 'alg-cycle-7',
    order: 7,
    title: 'Ciclo 7 · Revisão e simulado',
    objective: 'Consolidar e testar retenção sem depender de agenda fixa.',
  },
];

// ─── ITEMS DO CICLO ───────────────────────────────────────────────────────────

const CYCLE_ITEMS = [
  {
    id: 'alg-vetores-revisao',
    cycleId: 'alg-cycle-1',
    subjectId: 'algoritmos-programacao',
    title: 'Revisão de vetores',
    description: 'Declaração, índice, inicialização, leitura, impressão, soma, média, maior e menor elemento.',
    kind: 'theory',
    order: 1,
    cycle: 1,
    difficulty: 'easy',
    isCore: true,
    dependsOn: [],
  },
  {
    id: 'alg-vetores-pratica',
    cycleId: 'alg-cycle-1',
    subjectId: 'algoritmos-programacao',
    title: 'Vetores na prática',
    description: 'Implementar vetor de notas, média e filtragem de positivos em C.',
    kind: 'practice',
    order: 2,
    cycle: 1,
    difficulty: 'easy',
    isCore: true,
    dependsOn: ['alg-vetores-revisao'],
  },
  {
    id: 'alg-vetores-beecrowd',
    cycleId: 'alg-cycle-2',
    subjectId: 'algoritmos-programacao',
    title: 'Vetores + Beecrowd',
    description: 'Resolver problemas iniciais de vetor e aprender com o feedback do juiz.',
    kind: 'practice',
    order: 3,
    cycle: 2,
    difficulty: 'medium',
    isCore: true,
    dependsOn: ['alg-vetores-pratica'],
  },
  {
    id: 'alg-intro-matrizes',
    cycleId: 'alg-cycle-3',
    subjectId: 'algoritmos-programacao',
    title: 'Introdução a matrizes',
    description: 'Matriz como vetor bidimensional, notação [i][j], leitura e impressão 3×3.',
    kind: 'theory',
    order: 4,
    cycle: 3,
    difficulty: 'medium',
    isCore: true,
    dependsOn: ['alg-vetores-beecrowd'],
  },
  {
    id: 'alg-for-aninhado-diagonais',
    cycleId: 'alg-cycle-4',
    subjectId: 'algoritmos-programacao',
    title: 'For aninhado + diagonais',
    description: 'Percorrer linhas e colunas, diagonal principal i == j e secundária i + j == N - 1.',
    kind: 'theory',
    order: 5,
    cycle: 4,
    difficulty: 'medium',
    isCore: true,
    dependsOn: ['alg-intro-matrizes'],
  },
  {
    id: 'alg-operacoes-matrizes',
    cycleId: 'alg-cycle-5',
    subjectId: 'algoritmos-programacao',
    title: 'Operações com matrizes',
    description: 'Multiplicar por escalar, filtrar elementos e gerar matrizes derivadas.',
    kind: 'practice',
    order: 6,
    cycle: 5,
    difficulty: 'medium',
    isCore: true,
    dependsOn: ['alg-for-aninhado-diagonais'],
  },
  {
    id: 'alg-trilha-pratica',
    cycleId: 'alg-cycle-6',
    subjectId: 'algoritmos-programacao',
    title: 'Trilha prática completa',
    description: 'Situações I, III e V com multiplicação, diagonal principal e transformação ao quadrado.',
    kind: 'practice',
    order: 7,
    cycle: 6,
    difficulty: 'hard',
    isCore: true,
    dependsOn: ['alg-operacoes-matrizes'],
  },
  {
    id: 'alg-revisao-simulado',
    cycleId: 'alg-cycle-7',
    subjectId: 'algoritmos-programacao',
    title: 'Revisão + simulado',
    description: 'Fechamento do ciclo com questões objetivas e simulado sem consulta.',
    kind: 'review',
    order: 8,
    cycle: 7,
    difficulty: 'hard',
    isCore: true,
    dependsOn: ['alg-trilha-pratica'],
  },
];

// ─── ITEMS DE PRÁTICA ─────────────────────────────────────────────────────────

const PRACTICE_ITEMS = [
  {
    id: 'alg-practice-notas-media',
    title: 'Vetor de 5 notas + média',
    description: 'Implementar vetor de notas, calcular média e imprimir.',
    cycle: 1,
    resourceType: 'exercise',
  },
  {
    id: 'alg-practice-positivos',
    title: 'Vetor de 10 números com positivos',
    description: 'Ler números e imprimir apenas os positivos.',
    cycle: 1,
    resourceType: 'exercise',
  },
  {
    id: 'alg-practice-beecrowd',
    title: 'Beecrowd 1000–1100',
    description: 'Treino externo para vetores com feedback de juiz online.',
    cycle: 2,
    resourceType: 'external-practice',
  },
  {
    id: 'alg-practice-matriz-3x3',
    title: 'Leitura e impressão de matriz 3×3',
    description: 'Declarar, ler e imprimir matriz 3×3 com entrada do usuário.',
    cycle: 3,
    resourceType: 'exercise',
  },
  {
    id: 'alg-practice-diagonais',
    title: 'Diagonais principal e secundária',
    description: 'Implementar extração das diagonais e percorrer com for aninhado.',
    cycle: 4,
    resourceType: 'exercise',
  },
  {
    id: 'alg-practice-operacoes',
    title: 'Escalar, filtro e matriz derivada',
    description: 'Aplicar operações típicas sobre matrizes.',
    cycle: 5,
    resourceType: 'exercise',
  },
  {
    id: 'alg-practice-trilha',
    title: 'Trilha prática ICEV',
    description: 'Situações I, III e V em sequência para consolidar execução.',
    cycle: 6,
    resourceType: 'track',
  },
  {
    id: 'alg-practice-simulado',
    title: 'Simulado sem consulta',
    description: 'Resolver 1 exercício de vetor, 1 de diagonal e 1 de operação entre matrizes.',
    cycle: 7,
    resourceType: 'simulation',
  },
];

// ─── ITEMS DE REVISÃO ─────────────────────────────────────────────────────────

const REVIEW_ITEMS = [
  {
    id: 'alg-review-questions',
    title: 'Questões guiadas — Vetores e Matrizes em C',
    description: '10 questões objetivas com gabarito comentado para consolidar os conceitos-base.',
    kind: 'review',
    cycle: 7,
    items: [
      { id: 'alg-q1', prompt: 'Forma correta de declarar um vetor de 5 inteiros em C.', answer: 'int vetor[5];', explanation: 'Em C, arrays usam colchetes e o tipo vem antes do nome.' },
      { id: 'alg-q2', prompt: 'Valor de v[3] em {10,20,30,40,50}.', answer: '40', explanation: 'Índices em C começam em 0; v[3] é o quarto elemento.' },
      { id: 'alg-q3', prompt: 'Forma correta de declarar uma matriz 3×3.', answer: 'int matriz[3][3];', explanation: 'Cada dimensão precisa do seu próprio par de colchetes.' },
      { id: 'alg-q4', prompt: 'Posições da diagonal principal em uma matriz 4×4.', answer: 'm[0][0], m[1][1], m[2][2], m[3][3]', explanation: 'Diagonal principal é onde i == j.' },
      { id: 'alg-q5', prompt: 'Estrutura ideal para percorrer todos os elementos de uma matriz.', answer: 'Dois for aninhados', explanation: 'O for externo percorre linhas e o interno colunas.' },
      { id: 'alg-q6', prompt: 'Resultado de v[0] + v[3] no vetor {5,10,15,20}.', answer: '25', explanation: '5 + 20 = 25.' },
      { id: 'alg-q7', prompt: 'Condição correta para diagonal secundária de ordem N.', answer: 'i + j == N - 1', explanation: 'Essa condição pega a diagonal que vai do canto superior direito ao inferior esquerdo.' },
      { id: 'alg-q8', prompt: 'Quantas vezes o scanf executa numa matriz 3×3 com for aninhado.', answer: '9', explanation: 'Uma vez por elemento; 3 × 3 = 9.' },
      { id: 'alg-q9', prompt: 'Erro em acessar v[3] num vetor int v[3].', answer: 'Acesso fora dos limites', explanation: 'Os índices válidos vão de 0 a 2.' },
      { id: 'alg-q10', prompt: 'O que ocorre ao usar v[2] sem inicializar int v[5] local.', answer: 'Lixo de memória', explanation: 'Variáveis locais não inicializadas contêm valor imprevisível.' },
    ],
  },
];

// ─── RECURSOS ─────────────────────────────────────────────────────────────────

const RESOURCE_ITEMS = [
  {
    id: 'alg-resource-pdf-matrizes',
    title: 'PDF — Introdução a Matrizes com a Linguagem C (ICEV)',
    description: 'Material citado no cronograma de referência. Ainda não foi importado para o repositório público do laboratório.',
    kind: 'resource',
    resourceType: 'pdf',
    url: '',
    status: 'referenciado',
  },
  {
    id: 'alg-resource-pdf-trilha',
    title: 'PDF — Trilha prática de matrizes (ICEV)',
    description: 'Referência prática para as situações I a V. Estrutura prevista no laboratório.',
    kind: 'resource',
    resourceType: 'pdf',
    url: '',
    status: 'referenciado',
  },
  {
    id: 'alg-resource-playlist',
    title: 'Playlist — Linguagem C MATRIZ (EVBA)',
    description: 'Apoio em vídeo citado no material de referência.',
    kind: 'resource',
    resourceType: 'playlist',
    url: '',
    status: 'referenciado',
  },
  {
    id: 'alg-resource-beecrowd',
    title: 'Beecrowd 1000–1100',
    description: 'Trilha externa de prática para vetores e primeiros problemas de programação.',
    kind: 'resource',
    resourceType: 'external-practice',
    url: '',
    status: 'referenciado',
  },
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────

export function readAlgorithmPilotProgress() {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.localStorage.getItem(ALGORITHM_PILOT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function writeAlgorithmPilotProgress(progress) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ALGORITHM_PILOT_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // noop
  }
}

/**
 * Alterna o estado de um item. Salva timestamp ISO quando marcando como feito.
 */
export function toggleAlgorithmPilotItem(itemId) {
  const current = readAlgorithmPilotProgress();
  const isCurrentlyDone = Boolean(current[itemId]);
  const next = {
    ...current,
    [itemId]: isCurrentlyDone ? false : new Date().toISOString(),
  };
  writeAlgorithmPilotProgress(next);
  return next;
}

// ─── DATA GETTER ──────────────────────────────────────────────────────────────

export function getAlgorithmPilotData(progressOverride) {
  const progress = progressOverride ?? readAlgorithmPilotProgress();

  // Enriquecer items via engine
  const cycleItems = enrichCycleItems(CYCLE_ITEMS, STUDY_CYCLES, progress);
  const currentCycle = getCurrentCycle(cycleItems, STUDY_CYCLES);
  const { completedCount, totalCount, progressPercent } = calcProgressMetrics(cycleItems);

  const eligibleItems = getEligibleNowItems(cycleItems);
  const comingNextItems = getComingNextItems(cycleItems, 3);
  const lockedItems = getLockedItems(cycleItems, 4);
  const subjectRotationHint = getSubjectRotationHint(progressPercent);

  const cycleItemsCurrent = cycleItems.filter((i) => i.cycle === currentCycle.order);

  return {
    pilotNotice: {
      title: 'Piloto de Algoritmo e Programação no Crono-Lab',
      body: 'Esta disciplina foi reorganizada por ciclos de conteúdo, não por datas. A estrutura está em validação.',
      label: 'piloto temporário',
    },
    subject: {
      id: 'algoritmos-programacao',
      title: 'Algoritmo e Programação',
      subtitle: 'Disciplina-piloto adaptada para ciclos guiados por conteúdo e progressão pedagógica.',
      status:
        completedCount === totalCount
          ? 'consolidado'
          : eligibleItems.length > 0
          ? 'em_execucao'
          : 'travado',
      progressPercent,
      completedCount,
      totalCount,
      nextStep: eligibleItems[0]?.title ?? comingNextItems[0]?.title ?? 'Todos os ciclos concluídos.',
      subjectRotationHint,
    },
    studyCycles: STUDY_CYCLES,
    currentCycle: {
      ...currentCycle,
      items: cycleItemsCurrent,
    },
    eligibleItems,
    comingNextItems,
    lockedItems,
    allCycleItems: cycleItems,
    practiceItems: PRACTICE_ITEMS,
    reviewItems: REVIEW_ITEMS,
    resourceItems: RESOURCE_ITEMS,
  };
}
