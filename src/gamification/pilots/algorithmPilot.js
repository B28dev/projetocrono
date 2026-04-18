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
import {
  getAlgorithmMatrixMissionBank,
} from './algorithmMatrixQuestionBank.js';

export const ALGORITHM_PILOT_STORAGE_KEY = 'algoritmo-pilot-progress-v3';
export const ALGORITHM_PILOT_PROGRESS_EVENT = 'algorithm-pilot-progress-changed';
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

const MATRIX_MISSION_BANK = getAlgorithmMatrixMissionBank();

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
    const normalized = normalizeAlgorithmPilotProgress(progress);
    window.localStorage.setItem(ALGORITHM_PILOT_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(ALGORITHM_PILOT_PROGRESS_EVENT, {
      detail: normalized,
    }));
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

const RECOMMENDED_REASON_LABEL = {
  [ELIGIBLE_REASON.RECOMMENDED_NOW]: 'Recomendado agora',
  [ELIGIBLE_REASON.CURRENT_CYCLE]: 'Etapa atual da trilha',
  [ELIGIBLE_REASON.EXPLORATION_OPEN]: 'Exploração livre disponível',
  [ELIGIBLE_REASON.NEXT_OFFICIAL]: 'Próxima camada oficial',
  [ELIGIBLE_REASON.LOCKED_CONTEXTUALLY]: 'Fora da sequência oficial',
  [ELIGIBLE_REASON.ALREADY_COMPLETED]: 'Já concluído oficialmente',
};

function getProgressPercent(completedCount, totalCount) {
  return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
}

function getEligibleReason(item, primaryRecommendedItemId) {
  if (item.status === 'completed') return ELIGIBLE_REASON.ALREADY_COMPLETED;
  if (item.id === primaryRecommendedItemId) return ELIGIBLE_REASON.RECOMMENDED_NOW;
  if (item.isEligibleNow) return ELIGIBLE_REASON.CURRENT_CYCLE;
  if (item.isComingNext) return ELIGIBLE_REASON.NEXT_OFFICIAL;
  if (item.isLocked) return ELIGIBLE_REASON.LOCKED_CONTEXTUALLY;
  return ELIGIBLE_REASON.EXPLORATION_OPEN;
}

function getCompletionMode(item, explorationCompletedAt) {
  if (item.status === 'completed' && explorationCompletedAt) return 'official_after_exploration';
  if (item.status === 'completed') return 'official';
  if (explorationCompletedAt) return 'out_of_sequence';
  return 'pending';
}

function getMotherSubjectByCycle(cycle) {
  return MOTHER_SUBJECTS.find((subject) => subject.cycleIds.includes(cycle)) ?? null;
}

export function getLayerStatus(layer) {
  if (!layer) return VISUAL_STATE.AVAILABLE_FOR_EXPLORATION;
  if (layer.isCompletedOfficially || layer.isOfficialCompleted || layer.status === 'completed') {
    return VISUAL_STATE.COMPLETED_OFFICIALLY;
  }
  if (layer.isRecommendedNow) return VISUAL_STATE.RECOMMENDED_NOW;
  if (layer.isCompletedOutOfSequence) return VISUAL_STATE.COMPLETED_OUT_OF_SEQUENCE;
  if (layer.isComingNext) return VISUAL_STATE.COMING_NEXT;
  if (layer.isLocked) return VISUAL_STATE.LOCKED_CONTEXTUALLY;
  return VISUAL_STATE.AVAILABLE_FOR_EXPLORATION;
}

function getLayerHint(layer) {
  if (layer.isRecommendedNow && layer.isCompletedOutOfSequence) {
    return 'Você já explorou este bloco. Agora falta validar na trilha oficial para mover a disciplina.';
  }
  if (layer.isRecommendedNow) {
    return 'Próxima camada recomendada. Siga por aqui para manter a progressão oficial.';
  }
  if (layer.isCompletedOfficially) {
    return 'Progressão validada. A trilha oficial já reconheceu este bloco.';
  }
  if (layer.isCompletedOutOfSequence) {
    return 'Conteúdo consultado antes da hora. Isso não substitui a próxima ação principal.';
  }
  if (layer.isComingNext) {
    return 'Está logo depois da etapa atual. Pode explorar, mas a recomendação principal continua no bloco anterior.';
  }
  if (layer.isLocked) {
    return 'Exploração liberada sem bloquear você, mas este bloco ainda está fora da sequência oficial.';
  }
  return 'Disponível para exploração. O progresso principal continua separado da navegação livre.';
}

function getLayerBadges(layer) {
  const badges = [];

  if (layer.isRecommendedNow) {
    badges.push({ key: 'recommended_now', label: 'Recomendado agora', tone: 'recommended' });
  }
  if (layer.isCompletedOfficially) {
    badges.push({ key: 'completed_officially', label: 'Progressão validada', tone: 'official' });
  }
  if (layer.isCompletedOutOfSequence) {
    badges.push({ key: 'completed_out_of_sequence', label: 'Exploração antecipada', tone: 'exploration' });
  }
  if (!layer.isRecommendedNow && layer.isComingNext && !layer.isCompletedOfficially) {
    badges.push({ key: 'coming_next', label: 'Próxima da fila', tone: 'upcoming' });
  }
  if (!layer.isCompletedOfficially && !layer.isCompletedOutOfSequence && !layer.isRecommendedNow && !layer.isComingNext && !layer.isLocked) {
    badges.push({ key: 'available_for_exploration', label: 'Exploração livre', tone: 'neutral' });
  }
  if (!layer.isCompletedOfficially && !layer.isCompletedOutOfSequence && layer.isLocked) {
    badges.push({ key: 'locked_contextually', label: 'Fora da sequência', tone: 'muted' });
  }

  return badges;
}

function getLayerPrimaryAction(layer) {
  if (layer.isCompletedOfficially) {
    return {
      kind: 'none',
      label: 'Progressão validada',
      icon: '✓',
      tone: 'official',
      disabled: true,
    };
  }

  if (layer.isRecommendedNow) {
    return {
      kind: 'complete_official',
      label: layer.isCompletedOutOfSequence ? 'Validar na trilha oficial' : 'Concluir na trilha oficial',
      icon: layer.isCompletedOutOfSequence ? '↺' : '⚡',
      tone: 'recommended',
      disabled: false,
    };
  }

  if (layer.isEligibleNow) {
    return {
      kind: 'complete_official',
      label: 'Concluir nesta etapa',
      icon: '◎',
      tone: 'current',
      disabled: false,
    };
  }

  if (layer.isCompletedOutOfSequence) {
    return {
      kind: 'none',
      label: 'Exploração registrada',
      icon: '↗',
      tone: 'exploration',
      disabled: true,
    };
  }

  return {
    kind: 'toggle_exploration',
    label: layer.isComingNext ? 'Explorar antecipadamente' : layer.isLocked ? 'Explorar fora da sequência' : 'Marcar como explorado',
    icon: '↗',
    tone: layer.isComingNext ? 'upcoming' : 'neutral',
    disabled: false,
  };
}

function decorateCycleItems(cycleItems, freeExplorationProgress, primaryRecommendedItemId) {
  return cycleItems.map((item) => {
    const explorationCompletedAt = freeExplorationProgress[item.id] ?? null;
    const isCompletedOfficially = item.status === 'completed';
    const isCompletedOutOfSequence = !isCompletedOfficially && Boolean(explorationCompletedAt);
    const isExplored = isCompletedOfficially || isCompletedOutOfSequence;
    const isRecommendedNow = item.id === primaryRecommendedItemId;
    const motherSubject = getMotherSubjectByCycle(item.cycle);
    const recommendedReason = getEligibleReason(item, primaryRecommendedItemId);

    const decoratedItem = {
      ...item,
      motherSubjectId: motherSubject?.id ?? null,
      motherSubjectTitle: motherSubject?.title ?? null,
      sequenceOrder: item.order,
      motherSubjectOrder: motherSubject?.order ?? 0,
      layerType: item.kind,
      layerOrder: item.order,
      isExplored,
      isCompletedOfficially,
      isOfficialCompleted: isCompletedOfficially,
      isCompletedOutOfSequence,
      isRecommendedNow,
      isAvailableForExploration: !isCompletedOfficially,
      completionMode: getCompletionMode(item, explorationCompletedAt),
      progressType: isCompletedOfficially ? 'official' : isCompletedOutOfSequence ? 'exploration' : 'pending',
      recommendedReason,
      recommendedReasonLabel: RECOMMENDED_REASON_LABEL[recommendedReason],
      explorationCompletedAt,
      officialCompletedAt: item.completedAt,
      completedAt: item.completedAt ?? explorationCompletedAt ?? null,
    };

    const layerStatus = getLayerStatus(decoratedItem);

    return {
      ...decoratedItem,
      layerStatus,
      visualState: layerStatus,
      stateHint: getLayerHint({ ...decoratedItem, layerStatus }),
      badges: getLayerBadges({ ...decoratedItem, layerStatus }),
      primaryAction: getLayerPrimaryAction({ ...decoratedItem, layerStatus }),
    };
  });
}

function buildExplorationProgressFromItems(cycleItems) {
  const exploredOnlyCount = cycleItems.filter((item) => item.isCompletedOutOfSequence).length;
  const totalCount = cycleItems.length;

  return {
    exploredOnlyCount,
    totalCount,
    progressPercent: getProgressPercent(exploredOnlyCount, totalCount),
  };
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

function buildMotherSubjectResourceItems(motherSubjectId) {
  if (motherSubjectId === 'ms-vetores') {
    return RESOURCE_ITEMS.filter((resource) => ['alg-resource-beecrowd'].includes(resource.id));
  }

  if (motherSubjectId === 'ms-matrizes') {
    return RESOURCE_ITEMS.filter((resource) => ['alg-resource-pdf-matrizes', 'alg-resource-pdf-trilha', 'alg-resource-playlist'].includes(resource.id));
  }

  return [];
}

function buildMotherSubjectsFromCycleItems(cycleItems, primaryRecommendedItem) {
  return MOTHER_SUBJECTS.map((motherSubject) => {
    const layers = cycleItems
      .filter((item) => motherSubject.cycleIds.includes(item.cycle))
      .sort((a, b) => a.order - b.order);

    const totalCount = layers.length;
    const officialCompletedCount = layers.filter((item) => item.isCompletedOfficially).length;
    const exploredOutOfSequenceCount = layers.filter((item) => item.isCompletedOutOfSequence).length;
    const containsRecommendedNow = layers.some((item) => item.isRecommendedNow);
    const isUnlocked = layers.some((item) => item.isEligibleNow || item.isComingNext || item.isExplored);
    const officialProgressPercent = getProgressPercent(officialCompletedCount, totalCount);
    const explorationProgressPercent = getProgressPercent(exploredOutOfSequenceCount, totalCount);

    const nextRecommendedLayer = layers.find((item) => item.isRecommendedNow)
      ?? layers.find((item) => item.isEligibleNow && !item.isCompletedOfficially)
      ?? layers.find((item) => item.isComingNext && !item.isCompletedOfficially)
      ?? null;

    const status =
      officialCompletedCount === totalCount ? 'concluido'
      : isUnlocked ? 'em_execucao'
      : 'bloqueado';

    const theoryItems = layers
      .filter((item) => item.kind === 'theory' || item.kind === 'review')
      .map((item) => ({ ...item, theoryPoints: buildTheoryPoints(item) }));

    const practiceCycleItems = layers
      .filter((item) => item.kind === 'practice')
      .map((item) => ({
        ...item,
        exercises: PRACTICE_ITEMS.filter((practiceItem) => practiceItem.cycle === item.cycle),
      }));

    return {
      ...motherSubject,
      status,
      layers,
      progressPercent: officialProgressPercent,
      officialProgressPercent,
      explorationProgressPercent,
      officialCompletedCount,
      exploredOutOfSequenceCount,
      completedCount: officialCompletedCount,
      totalCount,
      isUnlocked,
      containsRecommendedNow,
      nextRecommendedLayerId: nextRecommendedLayer?.id ?? null,
      nextRecommendedLayerTitle: nextRecommendedLayer?.title ?? null,
      nextRecommendedLayer,
      theoryItems,
      practiceCycleItems,
      resourceItems: buildMotherSubjectResourceItems(motherSubject.id),
      isRecommendedMotherSubject: containsRecommendedNow && primaryRecommendedItem != null,
    };
  });
}

export function getRecommendedLayer(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  return buildDecoratedCycleData(progress).primaryRecommendedItem;
}

export function getNextRecommendedAction(progressOverride) {
  const recommendedLayer = getRecommendedLayer(progressOverride);
  if (!recommendedLayer) return null;

  return {
    itemId: recommendedLayer.id,
    motherSubjectId: recommendedLayer.motherSubjectId,
    motherSubjectTitle: recommendedLayer.motherSubjectTitle,
    title: recommendedLayer.title,
    visualState: recommendedLayer.visualState,
    layerType: recommendedLayer.layerType,
    cycle: recommendedLayer.cycle,
    completionMode: recommendedLayer.completionMode,
    recommendedReason: recommendedLayer.recommendedReason,
    recommendedReasonLabel: recommendedLayer.recommendedReasonLabel,
    supportText: recommendedLayer.stateHint,
    actionLabel: recommendedLayer.primaryAction?.label ?? 'Continuar',
  };
}

export function getAlgorithmMissionCandidates(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const pilot = getAlgorithmPilotData(progress);
  const primaryAction = pilot.recommendedLayer
    ? {
        ...pilot.recommendedLayer,
        missionRole: 'primary',
        priority: 1,
        isOfficial: true,
        generatedFrom: 'recommended_now',
        reason: pilot.nextRecommendedAction?.supportText ?? pilot.recommendedLayer.stateHint,
      }
    : null;

  const pendingActions = pilot.eligibleItems
    .filter((item) => item.id !== primaryAction?.id && !item.isCompletedOfficially)
    .map((item, index) => ({
      ...item,
      missionRole: 'pending',
      priority: 20 + index,
      isOfficial: true,
      generatedFrom: 'official_pending',
      reason: item.stateHint,
    }));

  const reinforcementActions = pilot.allCycleItems
    .filter((item) => item.isCompletedOfficially && item.kind !== 'review')
    .slice(-2)
    .reverse()
    .map((item, index) => ({
      ...item,
      missionRole: 'reinforcement',
      priority: 40 + index,
      isOfficial: false,
      generatedFrom: 'official_reinforcement',
      reason: `Reforce ${item.title.toLowerCase()} para consolidar o ciclo atual sem roubar o foco da ação principal.`,
    }));

  return {
    disciplineId: pilot.subject.id,
    primaryAction,
    pendingActions,
    reinforcementActions,
    recommendedAction: pilot.nextRecommendedAction,
    officialProgress: pilot.officialProgress,
    explorationProgress: pilot.explorationProgress,
    missionReady: primaryAction != null || pendingActions.length > 0 || reinforcementActions.length > 0,
  };
}

function getMatrixMissionTemplateForAction(action) {
  if (!action) return null;

  if (action.layerType === 'practice') {
    const writtenItems = MATRIX_MISSION_BANK.written;
    const writtenIndex = action.cycle >= 6 ? 2 : action.cycle >= 5 ? 1 : 0;
    return writtenItems[writtenIndex] ?? writtenItems[0] ?? null;
  }

  if (action.layerType === 'review') {
    return MATRIX_MISSION_BANK.trueFalse[3] ?? MATRIX_MISSION_BANK.trueFalse[0] ?? null;
  }

  if (action.cycle >= 4) {
    return MATRIX_MISSION_BANK.trueFalse[(action.order - 1) % MATRIX_MISSION_BANK.trueFalse.length] ?? null;
  }

  return MATRIX_MISSION_BANK.theory[(action.order - 1) % MATRIX_MISSION_BANK.theory.length] ?? null;
}

export function getAlgorithmMissionContentItems(progressOverride) {
  const { primaryAction, pendingActions, reinforcementActions } = getAlgorithmMissionCandidates(progressOverride);
  const allActions = [primaryAction, ...pendingActions, ...reinforcementActions].filter(Boolean);

  return allActions.map((action) => {
    const template = getMatrixMissionTemplateForAction(action);
    const interactionType = template?.interactionType ?? (action.layerType === 'practice' ? 'written' : 'theory');
    const isWritten = interactionType === 'written';
    const kind = isWritten ? 'assisted_question' : 'flashcard';

    return {
      id: `alg-mission-${action.id}`,
      subjectId: 'algoritmos-programacao',
      moduleId: action.motherSubjectId ?? 'algoritmo-daily-mission',
      kind,
      interactionType,
      validationMode: template?.validationMode ?? (isWritten ? 'self_assessed' : 'auto'),
      sourceRef: template?.sourceRef ?? null,
      title: template?.title ?? action.title,
      front: !isWritten ? (template?.statement ?? action.description) : null,
      back: !isWritten ? (template?.explanation ?? action.reason) : null,
      prompt: isWritten ? (template?.prompt ?? action.description) : null,
      answerModel: template?.answerModel ?? action.reason,
      mustIncludePoints: template?.mustIncludePoints ?? [],
      options: template?.options ?? [],
      correctOptionId: template?.correctOptionId ?? null,
      explanationsByOption: template?.explanationsByOption ?? null,
      trueFalseAnswer: template?.trueFalseAnswer ?? null,
      difficulty: template?.difficulty ?? action.difficulty ?? 'medium',
      xpProfileId: template?.xpProfileId ?? (isWritten ? 'assisted_medium' : 'flashcard_medium'),
      isActive: true,
      missionMetadata: {
        layerId: action.id,
        motherSubjectId: action.motherSubjectId,
        missionRole: action.missionRole,
        generatedFrom: action.generatedFrom,
        isOfficial: action.isOfficial,
        priority: action.priority,
        reason: action.reason,
        sourceDisciplineId: 'algoritmos-programacao',
        validationType: interactionType,
        requiresValidation: true,
      },
    };
  });
}

export function completeAlgorithmMissionLayer(layerId, progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  if (!layerId) return progress;
  if (progress.officialProgress[layerId]) return progress;

  const next = {
    ...progress,
    officialProgress: {
      ...progress.officialProgress,
      [layerId]: new Date().toISOString(),
    },
  };

  writeAlgorithmPilotProgress(next);
  return next;
}

export function toggleAlgorithmMissionReinforcement(layerId, progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  if (!layerId) return progress;

  const next = {
    ...progress,
    freeExplorationProgress: toggleProgressEntry(progress.freeExplorationProgress, layerId),
  };

  writeAlgorithmPilotProgress(next);
  return next;
}

export function isAlgorithmMissionContentItem(contentItemId) {
  return typeof contentItemId === 'string' && contentItemId.startsWith('alg-mission-');
}

export function getAlgorithmLayerIdFromMissionContentItem(contentItemId) {
  if (!isAlgorithmMissionContentItem(contentItemId)) return null;
  return contentItemId.replace('alg-mission-', '');
}

export function getAlgorithmLayerById(layerId, progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems } = buildDecoratedCycleData(progress);
  return cycleItems.find((item) => item.id === layerId) ?? null;
}

export function getAlgorithmMissionMissionItemPatch(missionItem, progressOverride) {
  const layerId = getAlgorithmLayerIdFromMissionContentItem(missionItem?.contentItemId ?? '');
  const layer = getAlgorithmLayerById(layerId, progressOverride);
  if (!layer) return null;

  return {
    sourceDisciplineId: 'algoritmos-programacao',
    missionRole: missionItem?.missionRole ?? layer.missionRole ?? 'pending',
    priority: missionItem?.priority ?? 99,
    motherSubjectId: layer.motherSubjectId,
    layerId: layer.id,
    layerTitle: layer.title,
    isRecommended: layer.isRecommendedNow,
    isOfficial: missionItem?.isOfficial ?? true,
    generatedFrom: missionItem?.generatedFrom ?? 'algorithm_engine',
    reason: missionItem?.reason ?? layer.stateHint,
  };
}

export function getAlgorithmMissionState(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const candidates = getAlgorithmMissionCandidates(progress);
  const officialMissionItems = [candidates.primaryAction, ...candidates.pendingActions].filter(Boolean);
  const completedMissionItems = officialMissionItems.filter((item) => item.isCompletedOfficially);
  const missionProgressPercent = officialMissionItems.length > 0
    ? Math.round((completedMissionItems.length / officialMissionItems.length) * 100)
    : 0;

  return {
    id: `alg-daily-mission-${new Date().toISOString().slice(0, 10)}`,
    sourceDisciplineId: 'algoritmos-programacao',
    primaryAction: candidates.primaryAction,
    pendingActions: candidates.pendingActions,
    reinforcementActions: candidates.reinforcementActions,
    officialMissionItems,
    completedMissionItems,
    missionProgressPercent,
    isCompleted: officialMissionItems.length > 0 && completedMissionItems.length === officialMissionItems.length,
  };
}

export function getAlgorithmMissionSummaryStatus(progressOverride) {
  const missionState = getAlgorithmMissionState(progressOverride);
  if (missionState.isCompleted) return 'completed';
  if (missionState.completedMissionItems.length > 0) return 'in_progress';
  return missionState.pendingActions.length > 0 || missionState.reinforcementActions.length > 0 ? 'pending' : 'failed';
}

export function getAlgorithmMissionProgress(progressOverride) {
  const missionState = getAlgorithmMissionState(progressOverride);
  return {
    completedCount: missionState.completedMissionItems.length,
    totalCount: missionState.officialMissionItems.length,
    percent: missionState.missionProgressPercent,
  };
}

export function getAlgorithmMissionCompletionState(progressOverride) {
  const missionState = getAlgorithmMissionState(progressOverride);
  return {
    isCompleted: missionState.isCompleted,
    summaryStatus: getAlgorithmMissionSummaryStatus(progressOverride),
  };
}

export function getPrimaryMissionAction(progressOverride) {
  return getAlgorithmMissionCandidates(progressOverride).primaryAction;
}

export function getPendingMissionItems(progressOverride) {
  return getAlgorithmMissionCandidates(progressOverride).pendingActions;
}

export function getReinforcementMissionItems(progressOverride) {
  return getAlgorithmMissionCandidates(progressOverride).reinforcementActions;
}

export function generateDailyMission(progressOverride) {
  return getAlgorithmMissionState(progressOverride);
}

export function getMissionProgress(progressOverride) {
  return getAlgorithmMissionProgress(progressOverride);
}

export function getMissionCompletionState(progressOverride) {
  return getAlgorithmMissionCompletionState(progressOverride);
}

export function getMissionSummaryStatus(progressOverride) {
  return getAlgorithmMissionSummaryStatus(progressOverride);
}

export function getAlgorithmMissionSnapshot(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const mission = getAlgorithmMissionState(progress);
  const candidates = getAlgorithmMissionCandidates(progress);

  return {
    progress,
    mission,
    candidates,
    contentItems: getAlgorithmMissionContentItems(progress),
    summaryStatus: getAlgorithmMissionSummaryStatus(progress),
    progressState: getAlgorithmMissionProgress(progress),
  };
}

export function buildAlgorithmMissionMetadata(progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  return {
    sourceDisciplineId: 'algoritmos-programacao',
    primaryActionId: snapshot.candidates.primaryAction?.id ?? null,
    pendingCount: snapshot.candidates.pendingActions.length,
    reinforcementCount: snapshot.candidates.reinforcementActions.length,
    missionProgressPercent: snapshot.progressState.percent,
    missionSummaryStatus: snapshot.summaryStatus,
  };
}

export function buildAlgorithmMissionTitle(progressOverride) {
  const primaryAction = getPrimaryMissionAction(progressOverride);
  if (!primaryAction) return 'Missão diária sem ação oficial aberta';
  return `Hoje o foco é ${primaryAction.title}`;
}

export function buildAlgorithmMissionSubtitle(progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  if (snapshot.candidates.primaryAction) {
    return snapshot.candidates.primaryAction.reason;
  }
  if (snapshot.candidates.pendingActions.length > 0) {
    return 'Sem ação principal nova. Resolva as pendências oficiais abertas para manter a trilha limpa.';
  }
  return 'A trilha oficial do piloto está limpa por hoje.';
}

export function getMissionPanelState(progressOverride) {
  const metadata = buildAlgorithmMissionMetadata(progressOverride);
  return {
    ...metadata,
    title: buildAlgorithmMissionTitle(progressOverride),
    subtitle: buildAlgorithmMissionSubtitle(progressOverride),
  };
}

export function getMissionItemPriorityLabel(missionRole) {
  if (missionRole === 'primary') return 'Ação principal';
  if (missionRole === 'pending') return 'Pendência';
  if (missionRole === 'reinforcement') return 'Reforço';
  return 'Missão';
}

export function getMissionItemReason(missionRole, progressOverride) {
  if (missionRole === 'primary') return buildAlgorithmMissionSubtitle(progressOverride);
  if (missionRole === 'pending') return 'Pendência oficial aberta da trilha atual.';
  if (missionRole === 'reinforcement') return 'Reforço complementar do dia.';
  return 'Item da missão diária.';
}

export function getMissionRoleByLayerId(layerId, progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  if (snapshot.candidates.primaryAction?.id === layerId) return 'primary';
  if (snapshot.candidates.pendingActions.some((item) => item.id === layerId)) return 'pending';
  if (snapshot.candidates.reinforcementActions.some((item) => item.id === layerId)) return 'reinforcement';
  return null;
}

export function getMissionPriorityByLayerId(layerId, progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  const action = [snapshot.candidates.primaryAction, ...snapshot.candidates.pendingActions, ...snapshot.candidates.reinforcementActions]
    .filter(Boolean)
    .find((item) => item.id === layerId);
  return action?.priority ?? null;
}

export function getMissionGeneratedFromByLayerId(layerId, progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  const action = [snapshot.candidates.primaryAction, ...snapshot.candidates.pendingActions, ...snapshot.candidates.reinforcementActions]
    .filter(Boolean)
    .find((item) => item.id === layerId);
  return action?.generatedFrom ?? null;
}

export function getMissionIsOfficialByLayerId(layerId, progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  const action = [snapshot.candidates.primaryAction, ...snapshot.candidates.pendingActions, ...snapshot.candidates.reinforcementActions]
    .filter(Boolean)
    .find((item) => item.id === layerId);
  return Boolean(action?.isOfficial);
}

export function getMissionReasonByLayerId(layerId, progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  const action = [snapshot.candidates.primaryAction, ...snapshot.candidates.pendingActions, ...snapshot.candidates.reinforcementActions]
    .filter(Boolean)
    .find((item) => item.id === layerId);
  return action?.reason ?? null;
}

export function getMissionLayerMetadataById(layerId, progressOverride) {
  if (!layerId) return null;
  return {
    missionRole: getMissionRoleByLayerId(layerId, progressOverride),
    priority: getMissionPriorityByLayerId(layerId, progressOverride),
    generatedFrom: getMissionGeneratedFromByLayerId(layerId, progressOverride),
    isOfficial: getMissionIsOfficialByLayerId(layerId, progressOverride),
    reason: getMissionReasonByLayerId(layerId, progressOverride),
  };
}

export function getMissionStateByLayerId(layerId, progressOverride) {
  const layer = getAlgorithmLayerById(layerId, progressOverride);
  if (!layer) return null;
  return {
    ...layer,
    ...getMissionLayerMetadataById(layerId, progressOverride),
  };
}

export function getMissionItemLabelByLayerId(layerId, progressOverride) {
  const state = getMissionStateByLayerId(layerId, progressOverride);
  if (!state) return null;
  return `${getMissionItemPriorityLabel(state.missionRole)} · ${state.title}`;
}

export function getMissionSummary(progressOverride) {
  const snapshot = getAlgorithmMissionSnapshot(progressOverride);
  return {
    title: buildAlgorithmMissionTitle(progressOverride),
    subtitle: buildAlgorithmMissionSubtitle(progressOverride),
    primaryAction: snapshot.candidates.primaryAction,
    pendingActions: snapshot.candidates.pendingActions,
    reinforcementActions: snapshot.candidates.reinforcementActions,
    missionProgress: snapshot.progressState,
    missionSummaryStatus: snapshot.summaryStatus,
  };
}

export function getMissionOfficialItems(progressOverride) {
  return getAlgorithmMissionState(progressOverride).officialMissionItems;
}

export function getCompletedMissionItems(progressOverride) {
  return getAlgorithmMissionState(progressOverride).completedMissionItems;
}

export function getMissionSourceDisciplineId() {
  return 'algoritmos-programacao';
}

export function getMissionDate() {
  return new Date().toISOString().slice(0, 10);
}

export function getNextRecommendedLayerByMotherSubject(progressOverride) {
  return Object.fromEntries(
    getMotherSubjectsWithContent(progressOverride).map((motherSubject) => [
      motherSubject.id,
      motherSubject.nextRecommendedLayer
        ? {
            id: motherSubject.nextRecommendedLayer.id,
            title: motherSubject.nextRecommendedLayer.title,
            layerStatus: motherSubject.nextRecommendedLayer.layerStatus,
            recommendedReason: motherSubject.nextRecommendedLayer.recommendedReason,
          }
        : null,
    ]),
  );
}

export function getOfficialProgress(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems } = buildDecoratedCycleData(progress);
  return calcProgressMetrics(cycleItems);
}

export function getOfficialProgressByDiscipline(progressOverride) {
  return getOfficialProgress(progressOverride);
}

export function getOfficialProgressByMotherSubject(progressOverride) {
  return Object.fromEntries(
    getMotherSubjectsWithContent(progressOverride).map((motherSubject) => [
      motherSubject.id,
      {
        completedCount: motherSubject.officialCompletedCount,
        totalCount: motherSubject.totalCount,
        progressPercent: motherSubject.officialProgressPercent,
      },
    ]),
  );
}

export function getExplorationProgress(progressOverride) {
  const progress = normalizeAlgorithmPilotProgress(progressOverride ?? readAlgorithmPilotProgress());
  const { cycleItems } = buildDecoratedCycleData(progress);
  return buildExplorationProgressFromItems(cycleItems);
}

export function getExplorationProgressByMotherSubject(progressOverride) {
  return Object.fromEntries(
    getMotherSubjectsWithContent(progressOverride).map((motherSubject) => [
      motherSubject.id,
      {
        exploredOnlyCount: motherSubject.exploredOutOfSequenceCount,
        totalCount: motherSubject.totalCount,
        progressPercent: motherSubject.explorationProgressPercent,
      },
    ]),
  );
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
  return buildMotherSubjectsFromCycleItems(cycleItems, primaryRecommendedItem);
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
  const motherSubjects = buildMotherSubjectsFromCycleItems(cycleItems, primaryRecommendedItem);
  const currentCycle = getCurrentCycle(cycleItems, STUDY_CYCLES);
  const officialProgress = calcProgressMetrics(cycleItems);
  const explorationProgress = buildExplorationProgressFromItems(cycleItems);

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
      nextStepSupport: nextRecommendedAction?.supportText ?? 'A trilha oficial desta disciplina já foi concluída.',
      subjectRotationHint,
    },
    disciplineProgress: {
      official: officialProgress,
      exploration: explorationProgress,
      nextRecommendedLayerId: primaryRecommendedItem?.id ?? null,
      nextRecommendedLayerTitle: primaryRecommendedItem?.title ?? null,
      status:
        officialProgress.completedCount === officialProgress.totalCount
          ? 'consolidado'
          : primaryRecommendedItem
          ? 'em_execucao'
          : 'travado',
    },
    studyCycles: STUDY_CYCLES,
    currentCycle: {
      ...currentCycle,
      items: cycleItemsCurrent,
    },
    primaryRecommendedItem,
    recommendedLayer: primaryRecommendedItem,
    recommendedNowItems,
    nextRecommendedAction,
    motherSubjects,
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
