/**
 * @fileoverview algorithmPilot.js — Dados e engine do piloto de Algoritmo e Programação
 *
 * Separa trilha oficial e exploração livre, reaproveitando o cycleEngine para manter
 * a progressão principal coerente sem bloquear navegação fora da sequência.
 */

import {
  enrichCycleItems,
  getCurrentCycle,
  getSubjectRotationHint,
  calcProgressMetrics,
  getComingNextItems,
  getEligibleNowItems,
  getLockedItems,
  getPrimaryRecommendedItem,
  getRecommendedNowItems,
} from '../cycles/cycleEngine.js';

export const ALGORITHM_PILOT_STORAGE_KEY = 'algoritmo-pilot-progress-v3';
const ALGORITHM_PILOT_LEGACY_STORAGE_KEY = 'algoritmo-pilot-progress-v2';

const VISUAL_STATE = {
  RECOMMENDED_NOW: 'recommended_now',
  AVAILABLE_FOR_EXPLORATION: 'available_for_exploration',
  COMPLETED_OFFICIALLY: 'completed_officially',
  COMPLETED_OUT_OF_SEQUENCE: 'completed_out_of_sequence',
  COMING_NEXT: 'coming_next',
  LOCKED_CONTEXTUALLY: 'locked_contextually',
};

const ELIGIBLE_REASON = {
  RECOMMENDED_NOW: 'recommended_now',
  CURRENT_CYCLE: 'current_cycle',
  EXPLORATION_OPEN: 'exploration_open',
  NEXT_OFFICIAL: 'next_official',
  LOCKED_CONTEXTUALLY: 'locked_contextually',
  ALREADY_COMPLETED: 'already_completed',
};

const EMPTY_PROGRESS_STATE = {
  version: 3,
  officialProgress: {},
  freeExplorationProgress: {},
};

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

const MOTHER_SUBJECTS = [
  {
    id: 'ms-vetores',
    order: 1,
    title: 'Vetores',
    description: 'Fundamentos de vetores: declaração, índices, varredura com for, cálculos comuns (média, soma) e primeiros contatos com problemas no juiz online (Beecrowd).',
    cycleIds: [1, 2],
  },
  {
    id: 'ms-matrizes',
    order: 2,
    title: 'Matrizes',
    description: 'Vetores bidimensionais: leitura e impressão com for aninhado, manipulação de diagonais, operações entre matrizes e simulação prática de desafios reais.',
    cycleIds: [3, 4, 5, 6],
  },
  {
    id: 'ms-revisao-simulado',
    order: 3,
    title: 'Consolidação e Simulado',
    description: 'Fechamento do módulo com revisão cruzada e simulado sem consulta para medir retenção.',
    cycleIds: [7],
  },
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────

function sanitizeProgressMap(progress) {
  if (!progress || typeof progress !== 'object' || Array.isArray(progress)) return {};

  return Object.fromEntries(
    Object.entries(progress).filter(([, value]) => Boolean(value)).map(([key, value]) => [
      key,
      typeof value === 'string' && value.length > 4 ? value : new Date(0).toISOString(),
    ]),
  );
}

function normalizeAlgorithmPilotProgress(progress) {
  if (!progress || typeof progress !== 'object' || Array.isArray(progress)) {
    return { ...EMPTY_PROGRESS_STATE };
  }

  if ('officialProgress' in progress || 'freeExplorationProgress' in progress) {
    return {
      version: 3,
      officialProgress: sanitizeProgressMap(progress.officialProgress),
      freeExplorationProgress: sanitizeProgressMap(progress.freeExplorationProgress),
    };
  }

  return {
    version: 3,
    officialProgress: sanitizeProgressMap(progress),
    freeExplorationProgress: {},
  };
}

function readStoredProgress(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function readAlgorithmPilotProgress() {
  if (typeof window === 'undefined') return { ...EMPTY_PROGRESS_STATE };

  const current = readStoredProgress(window.localStorage.getItem(ALGORITHM_PILOT_STORAGE_KEY));
  if (current) return normalizeAlgorithmPilotProgress(current);

  const legacy = readStoredProgress(window.localStorage.getItem(ALGORITHM_PILOT_LEGACY_STORAGE_KEY));
  if (legacy) {
    const migrated = normalizeAlgorithmPilotProgress(legacy);
    writeAlgorithmPilotProgress(migrated);
    window.localStorage.removeItem(ALGORITHM_PILOT_LEGACY_STORAGE_KEY);
    return migrated;
  }

  return { ...EMPTY_PROGRESS_STATE };
}

export function writeAlgorithmPilotProgress(progress) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ALGORITHM_PILOT_STORAGE_KEY, JSON.stringify(normalizeAlgorithmPilotProgress(progress)));
  } catch {
    // noop
  }
}

function toggleProgressEntry(progressMap, itemId) {
  const isCurrentlyDone = Boolean(progressMap[itemId]);
  if (isCurrentlyDone) {
    const { [itemId]: _removed, ...rest } = progressMap;
    return rest;
  }

  return {
    ...progressMap,
    [itemId]: new Date().toISOString(),
  };
}

export function toggleAlgorithmPilotOfficialItem(itemId) {
  const current = readAlgorithmPilotProgress();
  const next = {
    ...current,
    officialProgress: toggleProgressEntry(current.officialProgress, itemId),
  };
  writeAlgorithmPilotProgress(next);
  return next;
}

export function toggleAlgorithmPilotFreeExplorationItem(itemId) {
  const current = readAlgorithmPilotProgress();
  const next = {
    ...current,
    freeExplorationProgress: toggleProgressEntry(current.freeExplorationProgress, itemId),
  };
  writeAlgorithmPilotProgress(next);
  return next;
}

// ─── DERIVAÇÕES ────────────────────────────────────────────────────────────────

function getExplorationVisualState(item, primaryRecommendedItemId) {
  const isOfficialCompleted = item.status === 'completed';
  const isCompletedOutOfSequence = Boolean(item.isCompletedOutOfSequence);

  if (isOfficialCompleted) return VISUAL_STATE.COMPLETED_OFFICIALLY;
  if (item.id === primaryRecommendedItemId) return VISUAL_STATE.RECOMMENDED_NOW;
  if (isCompletedOutOfSequence) return VISUAL_STATE.COMPLETED_OUT_OF_SEQUENCE;
  if (item.isComingNext) return VISUAL_STATE.COMING_NEXT;
  if (item.isLocked) return VISUAL_STATE.LOCKED_CONTEXTUALLY;
  return VISUAL_STATE.AVAILABLE_FOR_EXPLORATION;
}

function getEligibleReason(item, primaryRecommendedItemId) {
  if (item.status === 'completed') return ELIGIBLE_REASON.ALREADY_COMPLETED;
  if (item.id === primaryRecommendedItemId) return ELIGIBLE_REASON.RECOMMENDED_NOW;
  if (item.isEligibleNow) return ELIGIBLE_REASON.CURRENT_CYCLE;
  if (item.isComingNext) return ELIGIBLE_REASON.NEXT_OFFICIAL;
  if (item.isLocked) return ELIGIBLE_REASON.LOCKED_CONTEXTUALLY;
  return ELIGIBLE_REASON.EXPLORATION_OPEN;
}

function decorateCycleItems(cycleItems, freeExplorationProgress, primaryRecommendedItemId) {
  return cycleItems.map((item) => {
    const explorationCompletedAt = freeExplorationProgress[item.id] ?? null;
    const isOfficialCompleted = item.status === 'completed';
    const isCompletedOutOfSequence = !isOfficialCompleted && Boolean(explorationCompletedAt);
    const isExplored = isOfficialCompleted || isCompletedOutOfSequence;
    const isRecommendedNow = item.id === primaryRecommendedItemId;
    const visualState = getExplorationVisualState({ ...item, isCompletedOutOfSequence }, primaryRecommendedItemId);

    return {
      ...item,
      sequenceOrder: item.order,
      motherSubjectOrder: getMotherSubjectOrder(item.cycle),
      layerOrder: item.order,
      isOfficialCompleted,
      isCompletedOutOfSequence,
      isExplored,
      isRecommendedNow,
      progressType: isOfficialCompleted ? 'official' : isCompletedOutOfSequence ? 'exploration' : 'official',
      visualState,
      eligibleReason: getEligibleReason(item, primaryRecommendedItemId),
      explorationCompletedAt,
      officialCompletedAt: item.completedAt,
    };
  });
}

function getMotherSubjectOrder(cycle) {
  return MOTHER_SUBJECTS.find((subject) => subject.cycleIds.includes(cycle))?.order ?? 0;
}

function buildDecoratedCycleData(progressState) {
  const cycleItems = enrichCycleItems(CYCLE_ITEMS, STUDY_CYCLES, progressState.officialProgress);
  const primaryRecommendedItem = getPrimaryRecommendedItem(cycleItems);
  const decoratedCycleItems = decorateCycleItems(cycleItems, progressState.freeExplorationProgress, primaryRecommendedItem?.id ?? null);

  return {
    cycleItems: decoratedCycleItems,
    primaryRecommendedItem: decoratedCycleItems.find((item) => item.id === primaryRecommendedItem?.id) ?? null,
    recommendedNowItems: getRecommendedNowItems(decoratedCycleItems, 3),
  };
}

export function getRecommendedLayer(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  return buildDecoratedCycleData(progress).primaryRecommendedItem;
}

export function getNextRecommendedAction(progressOverride) {
  const recommendedItem = getRecommendedLayer(progressOverride);
  if (!recommendedItem) return null;

  return {
    itemId: recommendedItem.id,
    title: recommendedItem.title,
    visualState: recommendedItem.visualState,
    cycle: recommendedItem.cycle,
    eligibleReason: recommendedItem.eligibleReason,
  };
}

export function getOfficialProgress(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems } = buildDecoratedCycleData(progress);
  return calcProgressMetrics(cycleItems);
}

export function getExplorationProgress(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems } = buildDecoratedCycleData(progress);
  const exploredOnlyCount = cycleItems.filter((item) => item.isCompletedOutOfSequence).length;
  const totalCount = cycleItems.length;
  const progressPercent = totalCount > 0 ? Math.round((exploredOnlyCount / totalCount) * 100) : 0;

  return {
    exploredOnlyCount,
    totalCount,
    progressPercent,
  };
}

export function isOutOfSequenceCompletion(item) {
  return Boolean(item?.isCompletedOutOfSequence);
}

// ─── DATA GETTER ──────────────────────────────────────────────────────────────

/**
 * Retorna os "Conteúdos-Mãe" da disciplina (estilo cebola).
 * Cada Mother Subject encapsula um ou mais ciclos, agrupando Teoria e Prática daquele bloco maior.
 */
export function getMotherSubjectsWithContent(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems, primaryRecommendedItem } = buildDecoratedCycleData(progress);

  return MOTHER_SUBJECTS.map((ms) => {
    const items = cycleItems.filter((item) => ms.cycleIds.includes(item.cycle));

    const totalCount = items.length;
    const officialCompletedCount = items.filter((item) => item.isOfficialCompleted).length;
    const exploredOutOfSequenceCount = items.filter((item) => item.isCompletedOutOfSequence).length;
    const containsRecommendedNow = items.some((item) => item.isRecommendedNow);
    const isUnlocked = items.some((item) => item.isEligibleNow || item.isComingNext || item.isExplored);
    const officialProgressPercent = totalCount > 0 ? Math.round((officialCompletedCount / totalCount) * 100) : 0;

    const status =
      officialCompletedCount === totalCount ? 'concluido'
      : isUnlocked ? 'em_execucao'
      : 'bloqueado';

    const theoryItems = items
      .filter((item) => item.kind === 'theory' || item.kind === 'review')
      .map((item) => ({ ...item, theoryPoints: buildTheoryPoints(item) }));

    const practiceCycleItems = items
      .filter((item) => item.kind === 'practice')
      .map((item) => ({
        ...item,
        exercises: PRACTICE_ITEMS.filter((practiceItem) => practiceItem.cycle === item.cycle),
      }));

    const resourceItems = RESOURCE_ITEMS.filter((resource) => {
      if (ms.id === 'ms-vetores') return ['alg-resource-beecrowd'].includes(resource.id);
      if (ms.id === 'ms-matrizes') return ['alg-resource-pdf-matrizes', 'alg-resource-pdf-trilha', 'alg-resource-playlist'].includes(resource.id);
      return false;
    });

    const nextOfficialLayer = items.find((item) => item.isRecommendedNow)
      ?? items.find((item) => item.isEligibleNow && !item.isOfficialCompleted)
      ?? items.find((item) => item.isComingNext && !item.isOfficialCompleted)
      ?? null;

    return {
      ...ms,
      status,
      progressPercent: officialProgressPercent,
      officialProgressPercent,
      officialCompletedCount,
      exploredOutOfSequenceCount,
      completedCount: officialCompletedCount,
      totalCount,
      isUnlocked,
      containsRecommendedNow,
      nextOfficialLayerTitle: nextOfficialLayer?.title ?? null,
      theoryItems,
      practiceCycleItems,
      resourceItems,
      isRecommendedMotherSubject: containsRecommendedNow && primaryRecommendedItem != null,
    };
  });
}

function buildTheoryPoints(item) {
  const MAP = {
    'alg-vetores-revisao': [
      'Declaração: `int v[10];` — reserva 10 posições de memória contíguas.',
      'Acessos via índice começam em 0 e vão até `N-1`. Cuidado com lixo de memória.',
      'Varredura padrão requer o par: laço de repetição + índice linear.',
      'Soma e contagem: sempre inicialize o acumulador fora do laço.',
    ],
    'alg-intro-matrizes': [
      'Matriz em C: `int m[linhas][colunas];`.',
      'Leitura padrão: dois laços `for` aninhados (i para linha, j para coluna).',
      'Acesso seguro à memória: percorrer as colunas da linha i antes de ir para a i+1 otimiza cache.',
    ],
    'alg-for-aninhado-diagonais': [
      'Diagonal principal: a linha é igual à coluna (`i == j`).',
      'Diagonal secundária: a soma das coordenadas dá a dimensão máxima (`i + j == N - 1`).',
      'Filtragem nas diagonais permite evitar loops excessivos usando um for linear indexado por i.',
    ],
    'alg-revisao-simulado': [
      'Aplicações conjuntas exigem que o estudante entenda qual laço coordena a matriz original ou auxiliar.',
      'Saber declarar o escopo das variáveis previne a poluição estadais em grandes funções.',
    ],
  };
  return MAP[item.id] ?? [`Pontos principais sobre "${item.title}".`];
}

export function getAlgorithmPilotData(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems, primaryRecommendedItem, recommendedNowItems } = buildDecoratedCycleData(progress);
  const currentCycle = getCurrentCycle(cycleItems, STUDY_CYCLES);
  const officialProgress = calcProgressMetrics(cycleItems);
  const explorationProgress = getExplorationProgress(progress);

  const eligibleItems = getEligibleNowItems(cycleItems);
  const comingNextItems = getComingNextItems(cycleItems, 3);
  const lockedItems = getLockedItems(cycleItems, 4);
  const subjectRotationHint = getSubjectRotationHint(officialProgress.progressPercent);
  const cycleItemsCurrent = cycleItems.filter((item) => item.cycle === currentCycle.order);
  const nextRecommendedAction = getNextRecommendedAction(progress);

  return {
    pilotNotice: {
      title: 'Piloto de Algoritmo e Programação no Crono-Lab',
      body: 'Agora a disciplina separa exploração livre da trilha oficial. Você pode adiantar conteúdo sem perder o próximo passo principal.',
      label: 'progressão oficial ativa',
    },
    subject: {
      id: 'algoritmos-programacao',
      title: 'Algoritmo e Programação',
      subtitle: 'Disciplina-piloto com trilha oficial, exploração livre e próxima camada recomendada sempre visível.',
      status:
        officialProgress.completedCount === officialProgress.totalCount
          ? 'consolidado'
          : primaryRecommendedItem
          ? 'em_execucao'
          : 'travado',
      progressPercent: officialProgress.progressPercent,
      officialProgressPercent: officialProgress.progressPercent,
      explorationProgressPercent: explorationProgress.progressPercent,
      completedCount: officialProgress.completedCount,
      totalCount: officialProgress.totalCount,
      exploredCount: explorationProgress.exploredOnlyCount,
      nextStep: primaryRecommendedItem?.title ?? 'Todos os ciclos concluídos.',
      nextStepSupport: primaryRecommendedItem
        ? 'Siga por aqui para manter a progressão oficial da disciplina.'
        : 'A trilha oficial desta disciplina já foi concluída.',
      subjectRotationHint,
    },
    studyCycles: STUDY_CYCLES,
    currentCycle: {
      ...currentCycle,
      items: cycleItemsCurrent,
    },
    primaryRecommendedItem,
    recommendedNowItems,
    nextRecommendedAction,
    eligibleItems,
    comingNextItems,
    lockedItems,
    allCycleItems: cycleItems,
    officialProgress,
    explorationProgress,
    progressSnapshot: progress,
    practiceItems: PRACTICE_ITEMS,
    reviewItems: REVIEW_ITEMS,
    resourceItems: RESOURCE_ITEMS,
  };
}
