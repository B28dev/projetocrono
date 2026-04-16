import {
  examDate,
  examCoverage,
  flashcardsEmpreendBloco1,
  flashcardsEmpreendLote2,
  getStudyPlanByShift,
  getStudyPlanTaskStorageKey,
  modelSummaries,
  questoesEmpreendBloco1,
  questoesEmpreendLote2,
  referencePdfMaterials,
  referenceVideoSections,
  topics,
} from '../../data/empreendedorismo.js';

export const ENTREPRENEURSHIP_PILOT_STORAGE_KEY = 'empreendedorismo-study-plan-progress-v2';

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadEntrepreneurshipTaskProgress() {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.localStorage.getItem(ENTREPRENEURSHIP_PILOT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getGroupedStudyPlan(shift, taskProgress) {
  const todayKey = getLocalDateKey();
  const studyPlan = getStudyPlanByShift(shift);

  const groups = studyPlan.reduce((acc, item) => {
    const storageDate = getStudyPlanTaskStorageKey(shift, item);
    const checkedTasks = taskProgress[storageDate] || {};
    const isDone = item.tasks.length > 0 && item.tasks.every((_, index) => checkedTasks[index]);
    const preparedItem = {
      ...item,
      storageDate,
      renderKey: item.id || item.date,
      isOverdue: false,
      checkedTasks,
    };

    if (item.date < todayKey && isDone) {
      acc.completedPast.push(preparedItem);
      return acc;
    }

    if (item.date < todayKey && !isDone) {
      acc.overdue.push({
        ...preparedItem,
        renderKey: `${item.id || item.date}-overdue`,
        isOverdue: true,
      });
      return acc;
    }

    if (item.date === todayKey) {
      acc.today.push(preparedItem);
      return acc;
    }

    if (item.date > todayKey) {
      acc.future.push(preparedItem);
    }

    return acc;
  }, { completedPast: [], overdue: [], today: [], future: [] });

  return groups;
}

function getProgressMetrics(groups) {
  const allItems = [
    ...groups.completedPast,
    ...groups.overdue,
    ...groups.today,
    ...groups.future,
  ];
  const totalTasks = allItems.reduce((sum, item) => sum + item.tasks.length, 0);
  const completedTasks = allItems.reduce((sum, item) => {
    return sum + item.tasks.reduce((taskSum, _, index) => taskSum + (item.checkedTasks?.[index] ? 1 : 0), 0);
  }, 0);

  return {
    totalTasks,
    completedTasks,
    remainingTasks: Math.max(totalTasks - completedTasks, 0),
    progressPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
  };
}

function getOverdueTasks(groups) {
  return groups.overdue.flatMap((item) => item.tasks.map((task, index) => ({
    id: `${item.storageDate}-overdue-${index}`,
    date: item.date,
    text: task,
    topic: item.topic,
    checked: Boolean(item.checkedTasks?.[index]),
  }))).filter((task) => !task.checked);
}

function getTodayTasks(groups) {
  return groups.today.flatMap((item) => item.tasks.map((task, index) => ({
    id: `${item.storageDate}-today-${index}`,
    text: task,
    topic: item.topic,
    checked: Boolean(item.checkedTasks?.[index]),
  })));
}

const STATUS_COPY = {
  recuperacao: 'Modo de recuperação: a disciplina pede limpeza e retomada antes de ampliar o ritmo.',
  acao_imediata: 'Modo de execução: há tarefa viva agora e a próxima frente já está destacada.',
  consolidado: 'Modo de consolidação: a base foi organizada e o foco vira revisão fina.',
  planejado: 'Modo de preparação: o laboratório já deixou a disciplina pronta para execução assistida.',
};

const NEXT_ACTION_MODE_CONFIG = {
  backlog: {
    kind: 'recuperação',
    title: 'Limpeza imediata do atraso',
    reason: 'Existe conteúdo aberto para trás. Primeiro limpa o que trava a disciplina, depois amplia.',
    ctaLabel: 'Comece pela primeira etapa desta sequência.',
  },
  today: {
    kind: 'execução de hoje',
    title: 'Execução obrigatória do dia',
    reason: 'Sem atraso crítico liderando. Agora o foco é proteger o ritmo e fechar o que vence hoje.',
    ctaLabel: 'Siga a ordem abaixo e preserve o fluxo da disciplina.',
  },
  future: {
    kind: 'próximo ciclo',
    title: 'Próxima frente já preparada',
    reason: 'Sem urgência crítica no momento. O laboratório já separou o melhor próximo passo para entrar depois.',
    ctaLabel: 'Use esta sequência quando encerrar o bloco atual.',
  },
};

export function getEntrepreneurshipPilotData({ shift = 'noturno-adele' } = {}) {
  const taskProgress = loadEntrepreneurshipTaskProgress();
  const groups = getGroupedStudyPlan(shift, taskProgress);
  const overdueTasks = getOverdueTasks(groups);
  const todayTasks = getTodayTasks(groups);
  const pendingTodayTasks = todayTasks.filter((task) => !task.checked);
  const metrics = getProgressMetrics(groups);

  const nextActionItems = overdueTasks.length > 0
    ? overdueTasks.slice(0, 3)
    : pendingTodayTasks.length > 0
      ? pendingTodayTasks.slice(0, 3)
      : groups.future.slice(0, 1).flatMap((item) => item.tasks.slice(0, 3).map((task, index) => ({
          id: `${item.storageDate}-future-${index}`,
          text: task,
          topic: item.topic,
          date: item.date,
        })));

  const nextActionMode = overdueTasks.length > 0
    ? 'backlog'
    : pendingTodayTasks.length > 0
      ? 'today'
      : 'future';

  const nextActionConfig = NEXT_ACTION_MODE_CONFIG[nextActionMode];
  const status = overdueTasks.length > 0
    ? 'recuperacao'
    : pendingTodayTasks.length > 0
      ? 'acao_imediata'
      : metrics.progressPercent === 100
        ? 'consolidado'
        : 'planejado';

  return {
    overview: {
      subjectId: 'empreendedorismo',
      title: 'Empreendedorismo',
      subtitle: 'Disciplina-piloto reorganizada para testar clareza, sequência e leitura mais leve dentro do Crono-Lab.',
      role: 'Aqui a disciplina vira um teste de UX assistiva: ação primeiro, contexto depois, biblioteca por último.',
      professor: 'Prof. Italo',
      period: '2026/1',
      examDate,
      status,
      statusCopy: STATUS_COPY[status],
      nextActionLabel: nextActionItems[0]?.text ?? 'Base revisada. Sem ação crítica imediata.',
      recoveryLabel: overdueTasks.length > 0
        ? `${overdueTasks.length} pendência(s) crítica(s)`
        : pendingTodayTasks.length > 0
          ? `${pendingTodayTasks.length} item(ns) de hoje ainda aberto(s)`
          : 'Fluxo limpo no momento',
      ...metrics,
      pilotNotice: {
        label: 'piloto temporário',
        title: 'Formato em teste no laboratório',
        body: 'Esta disciplina foi trazida para o Crono-Lab para validar organização e clareza. Pode ser removida, refeita ou expandida depois.',
      },
    },
    nextAction: {
      eyebrow: 'Próxima ação',
      kind: nextActionConfig.kind,
      title: nextActionConfig.title,
      reason: nextActionConfig.reason,
      ctaLabel: nextActionConfig.ctaLabel,
      items: nextActionItems,
      mode: nextActionMode,
    },
    recovery: {
      eyebrow: 'Recuperação / pendências',
      title: overdueTasks.length > 0 ? 'O que ficou para trás' : 'Painel de limpeza leve',
      description: overdueTasks.length > 0
        ? 'Este bloco existe para limpar o que ficou aberto sem roubar o centro da próxima ação.'
        : pendingTodayTasks.length > 0
          ? 'Sem atraso antigo no momento. Só existem pendências leves de hoje para não deixar acumular.'
          : 'Nenhum atraso crítico encontrado. A disciplina pode seguir para treino e apoio com mais clareza.',
      isActive: overdueTasks.length > 0,
      overdueCount: overdueTasks.length,
      pendingTodayCount: pendingTodayTasks.length,
      items: overdueTasks.slice(0, 4),
      pendingTodayPreview: pendingTodayTasks.slice(0, 3),
    },
    activeStudy: {
      eyebrow: 'Estudo ativo',
      title: 'Onde o treino acontece',
      description: 'Treino separado por intenção. Primeiro base, depois prova e pegadinha, sem virar biblioteca bagunçada.',
      priorityTopics: topics.slice(0, 4),
      blocks: [
        {
          id: 'empreendedorismo-base',
          title: 'Bloco 1 · Base de conteúdo',
          subtitle: 'Fundamentos, 5Cs, escuta ativa, proposta de valor e mentalidade empreendedora.',
          flashcards: flashcardsEmpreendBloco1,
          questions: questoesEmpreendBloco1,
        },
        {
          id: 'empreendedorismo-prova',
          title: 'Bloco 2 · Treino para prova e pegadinhas',
          subtitle: 'Questões mais traiçoeiras, cenários de prova e revisão de elite.',
          flashcards: flashcardsEmpreendLote2,
          questions: questoesEmpreendLote2,
        },
      ],
    },
    resources: {
      eyebrow: 'Recursos e apoio',
      title: 'Onde aprofundar ou revisar',
      description: 'Playlists e PDFs ficam fora da linha principal de execução. Abra só quando precisar de apoio real.',
      videoSections: referenceVideoSections,
      pdfs: referencePdfMaterials,
    },
    extraContext: {
      eyebrow: 'Contexto extra',
      title: 'Consolidação e leitura complementar',
      description: 'Bloco final para revisão rápida e leitura de prova. Entra depois que ação, limpeza e treino já ficaram claros.',
      summaries: {
        modelSummaries,
        examCoverage,
      },
    },
  };
}
