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

export function getEntrepreneurshipPilotData({ shift = 'noturno-adele' } = {}) {
  const taskProgress = loadEntrepreneurshipTaskProgress();
  const groups = getGroupedStudyPlan(shift, taskProgress);
  const overdueTasks = getOverdueTasks(groups);
  const todayTasks = getTodayTasks(groups);
  const completedTodayTasks = todayTasks.filter((task) => task.checked);
  const pendingTodayTasks = todayTasks.filter((task) => !task.checked);
  const metrics = getProgressMetrics(groups);

  const nextActions = overdueTasks.length > 0
    ? overdueTasks.slice(0, 3)
    : pendingTodayTasks.length > 0
      ? pendingTodayTasks.slice(0, 3)
      : groups.future.slice(0, 1).flatMap((item) => item.tasks.slice(0, 3).map((task, index) => ({
          id: `${item.storageDate}-future-${index}`,
          text: task,
          topic: item.topic,
          date: item.date,
        })));

  const status = overdueTasks.length > 0
    ? 'recuperacao'
    : pendingTodayTasks.length > 0
      ? 'acao_imediata'
      : metrics.progressPercent === 100
        ? 'consolidado'
        : 'planejado';

  return {
    pilotNotice: {
      title: 'Piloto de disciplina no Crono-Lab',
      body: 'Empreendedorismo foi trazida para o laboratório como simulação controlada do novo modelo do Crono. Esta organização pode ser removida, refeita ou expandida depois.',
      label: 'piloto temporário',
    },
    overview: {
      subjectId: 'empreendedorismo',
      title: 'Empreendedorismo',
      subtitle: 'Disciplina-piloto adaptada para o novo modelo assistivo do Crono.',
      professor: 'Prof. Italo',
      period: '2026/1',
      examDate,
      status,
      nextActionLabel: nextActions[0]?.text ?? 'Base revisada. Sem ação crítica imediata.',
      ...metrics,
    },
    nextActions: {
      title: 'O que fazer agora',
      items: nextActions,
      mode: overdueTasks.length > 0 ? 'backlog' : pendingTodayTasks.length > 0 ? 'today' : 'future',
    },
    backlog: {
      overdueTasks,
      overdueDays: groups.overdue,
      pendingTodayTasks,
      completedTodayTasks,
    },
    highFrequencyTopics: topics,
    resources: {
      videoSections: referenceVideoSections,
      pdfs: referencePdfMaterials,
    },
    activeStudy: {
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
    summaries: {
      modelSummaries,
      examCoverage,
    },
  };
}
