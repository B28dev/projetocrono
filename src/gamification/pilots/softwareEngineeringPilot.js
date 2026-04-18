import {
  examDate,
  examCoverage,
  flashcardsBlocoA,
  flashcardsBlocoB,
  flashcardsBlocoC,
  getStudyPlanByShift,
  getStudyPlanTaskStorageKey,
  modelSummaries,
  questoesBlocoA,
  questoesBlocoB,
  questoesBlocoC,
  referencePlaylists,
  topicVideoSets,
  topics,
} from '../../data/engenharia-software.js';

export const SOFTWARE_ENGINEERING_PILOT_STORAGE_KEY = 'engsoftware-study-plan-progress-v3';

const DIFFICULTY_META = {
  facil: {
    label: 'Fácil',
    description: 'Fixação e aquecimento para consolidar a base.',
  },
  medio: {
    label: 'Médio',
    description: 'Comparações e cenários típicos de prova.',
  },
  dificil: {
    label: 'Difícil',
    description: 'Situações mais abertas e treino de argumentação.',
  },
};

const SUBJECT_TAG_META = {
  'Manifesto Agil': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Principios Ageis': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Agil vs Tradicional': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Metodos Ageis': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Metodos Ageis (XP)': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Fundamentos Ageis': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Agil Aplicado': { subjectLabel: 'Ágil', motherSubjectId: 'bloco-a' },
  'Fundamentos de Modelos': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Codifica-remenda': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Modelo Cascata': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  Prototipagem: { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Incremental e Evolutivos': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Modelo Espiral': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'RAD e 4a Geracao': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Aplicacao de Modelos': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Comparacao de Modelos': { subjectLabel: 'Modelos de Processo', motherSubjectId: 'bloco-b' },
  'Fundamentos de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Tipos de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Requisitos Implicitos e Legais': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Requisitos Implicitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Requisitos Legais': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Levantamento de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Gestao de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Engenharia de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Analise de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Documentacao de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Validacao de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Gerenciamento de Requisitos': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
  'Tecnicas de Levantamento': { subjectLabel: 'Requisitos', motherSubjectId: 'bloco-c' },
};

const MOTHER_SUBJECTS = [
  {
    id: 'bloco-a',
    order: 1,
    title: 'Bloco A · Prioridade Máxima',
    shortTitle: 'Bloco A',
    description: 'Ágil, modelos mais recorrentes de comparação e raciocínio de prova que mais aparecem no topo da disciplina.',
    topicLabel: 'Ágil, manifesto e comparação com tradicional',
  },
  {
    id: 'bloco-b',
    order: 2,
    title: 'Bloco B · Apoio Forte',
    shortTitle: 'Bloco B',
    description: 'Modelos de processo, adequação por cenário, risco e leitura de contexto para justificar escolhas.',
    topicLabel: 'Modelos de processo e aplicação por cenário',
  },
  {
    id: 'bloco-c',
    order: 3,
    title: 'Bloco C · Base Conceitual',
    shortTitle: 'Bloco C',
    description: 'Requisitos, levantamento, validação e pontos conceituais que sustentam respostas mais seguras.',
    topicLabel: 'Requisitos de software e engenharia de requisitos',
  },
];

const STATUS_COPY = {
  recuperacao: 'Modo de recuperação: há atraso real separado da linha principal para a visão geral continuar respirando.',
  acao_imediata: 'Modo de execução: a próxima ação já está clara e o assunto em curso permanece visível sem virar mini dashboard.',
  consolidado: 'Modo de consolidação: a disciplina está limpa e pronta para revisão e treino fino.',
  planejado: 'Modo de preparação: o laboratório já estruturou o próximo passo sem poluir a leitura.',
};

const STATUS_META = {
  recuperacao: {
    label: 'Em recuperação',
    shortLabel: 'Recuperação',
    tone: 'warning',
    commandLine: 'Existe custo aberto antes de avançar. Limpe o atraso para recuperar a linha da disciplina.',
  },
  acao_imediata: {
    label: 'Em execução',
    shortLabel: 'Execução',
    tone: 'info',
    commandLine: 'Sem atraso crítico liderando. O foco agora é fechar o que está vivo hoje com clareza.',
  },
  consolidado: {
    label: 'Consolidado',
    shortLabel: 'Limpo',
    tone: 'success',
    commandLine: 'O plano está limpo. A disciplina entrou em zona boa para revisão e treino de pressão.',
  },
  planejado: {
    label: 'Planejado',
    shortLabel: 'Preparado',
    tone: 'neutral',
    commandLine: 'A próxima frente já está organizada. Você entra no próximo ciclo sem atrito visual.',
  },
};

const NEXT_ACTION_MODE_CONFIG = {
  backlog: {
    kind: 'recuperação',
    title: 'Limpeza prioritária antes de avançar',
    reason: 'Existe conteúdo para trás competindo com a progressão. O sistema separa essa carga para você retomar o eixo da disciplina.',
    ctaLabel: 'Ataque estas pendências primeiro.',
  },
  today: {
    kind: 'execução do dia',
    title: 'Próximo passo oficial da disciplina',
    reason: 'Sem atraso crítico liderando. Agora a meta é fechar o que está vivo hoje e preservar o ritmo oficial.',
    ctaLabel: 'Siga esta ordem para continuar limpo.',
  },
  future: {
    kind: 'próximo ciclo',
    title: 'Próxima frente já preparada',
    reason: 'Sem urgência imediata. A disciplina já deixa a próxima camada organizada para você entrar com clareza.',
    ctaLabel: 'Use esta sequência ao fechar o bloco atual.',
  },
};

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTaskCompletionCount(item) {
  return item.tasks.reduce((sum, _, index) => sum + (item.checkedTasks?.[index] ? 1 : 0), 0);
}

function getPendingTaskCount(item) {
  return item.tasks.reduce((sum, _, index) => sum + (item.checkedTasks?.[index] ? 0 : 1), 0);
}

function getTaskCount(items) {
  return items.reduce((sum, item) => sum + item.tasks.length, 0);
}

function getCompletedTaskCount(items) {
  return items.reduce((sum, item) => sum + getTaskCompletionCount(item), 0);
}

function getPendingTaskCountFromItems(items) {
  return items.reduce((sum, item) => sum + getPendingTaskCount(item), 0);
}

function getChartState(item, todayKey) {
  const completed = getTaskCompletionCount(item);

  if (item.date < todayKey) {
    return completed >= item.tasks.length ? 'done' : 'overdue';
  }

  if (item.date === todayKey) {
    return completed >= item.tasks.length ? 'today_done' : 'today';
  }

  return completed >= item.tasks.length ? 'done' : 'planned';
}

export function loadSoftwareEngineeringTaskProgress() {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.localStorage.getItem(SOFTWARE_ENGINEERING_PILOT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getGroupedStudyPlan(shift, taskProgress) {
  const todayKey = getLocalDateKey();
  const studyPlan = getStudyPlanByShift(shift);

  return studyPlan.reduce((acc, item) => {
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
}

function getProgressMetrics(groups) {
  const allItems = [...groups.completedPast, ...groups.overdue, ...groups.today, ...groups.future];
  const totalTasks = getTaskCount(allItems);
  const completedTasks = getCompletedTaskCount(allItems);

  return {
    totalTasks,
    completedTasks,
    remainingTasks: Math.max(totalTasks - completedTasks, 0),
    progressPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
  };
}

function getOverdueTasks(groups) {
  return groups.overdue
    .flatMap((item) => item.tasks.map((task, index) => ({
      id: `${item.storageDate}-overdue-${index}`,
      date: item.date,
      text: task,
      topic: item.topic,
      checked: Boolean(item.checkedTasks?.[index]),
    })))
    .filter((task) => !task.checked);
}

function getTodayTasks(groups) {
  return groups.today.flatMap((item) => item.tasks.map((task, index) => ({
    id: `${item.storageDate}-today-${index}`,
    text: task,
    topic: item.topic,
    checked: Boolean(item.checkedTasks?.[index]),
  })));
}

function getPendingTodayTasks(todayTasks) {
  return todayTasks.filter((task) => !task.checked);
}

function getDisciplineProgressChart(groups) {
  const todayKey = getLocalDateKey();
  const entries = [...groups.completedPast, ...groups.overdue, ...groups.today, ...groups.future]
    .sort((left, right) => left.date.localeCompare(right.date))
    .map((item) => {
      const completed = getTaskCompletionCount(item);
      const total = item.tasks.length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        id: item.renderKey,
        label: item.label,
        date: item.date,
        total,
        completed,
        percent,
        state: getChartState(item, todayKey),
        isExamDay: Boolean(item.isExamDay),
      };
    });

  return {
    eyebrow: 'Evolução oficial',
    title: 'Como a disciplina está andando pelo plano',
    description: 'Cada coluna mostra o quanto daquele dia já foi drenado. Hoje e atraso aparecem com mais contraste.',
    entries,
    maxTasks: Math.max(...entries.map((entry) => entry.total), 1),
  };
}

function getDisciplineCompositionChart(groups, metrics) {
  const allItems = [...groups.completedPast, ...groups.overdue, ...groups.today, ...groups.future];
  const completed = getCompletedTaskCount(allItems);
  const overdue = getPendingTaskCountFromItems(groups.overdue);
  const inProgress = getPendingTaskCountFromItems(groups.today);
  const planned = getTaskCount(groups.future);

  const segments = [
    {
      id: 'completed',
      label: 'Concluído',
      value: completed,
      color: '#22c55e',
      tone: 'text-emerald-200',
      helper: 'Tarefas já drenadas do plano oficial.',
    },
    {
      id: 'in_progress',
      label: 'Em andamento',
      value: inProgress,
      color: '#00e8ff',
      tone: 'text-cyan-200',
      helper: 'Carga aberta no dia atual.',
    },
    {
      id: 'planned',
      label: 'Planejado',
      value: planned,
      color: '#a78bfa',
      tone: 'text-violet-200',
      helper: 'Carga que ainda está nos próximos ciclos.',
    },
    {
      id: 'overdue',
      label: 'Atrasado',
      value: overdue,
      color: '#fb7185',
      tone: 'text-rose-200',
      helper: 'Custo real que ficou para trás.',
    },
  ].filter((segment) => segment.value > 0);

  const dominantSegment = [...segments].sort((left, right) => right.value - left.value)[0] ?? null;

  return {
    eyebrow: 'Composição atual',
    title: 'Onde está o peso da disciplina agora',
    description: 'O anel mostra se a disciplina está mais drenada, mais aberta hoje, ainda projetada ou pagando atraso.',
    centerValue: `${metrics.progressPercent}%`,
    centerLabel: 'do plano concluído',
    total: segments.reduce((sum, segment) => sum + segment.value, 0),
    segments,
    dominantLabel: dominantSegment?.label ?? 'Sem carga ativa',
  };
}

function getCurrentFocusMeta(nextAction, activeMotherSubject) {
  const primaryItem = nextAction.items[0] ?? null;

  return {
    label: primaryItem?.topic ?? activeMotherSubject.topicLabel,
    helper: primaryItem?.text ?? 'A próxima camada oficial já está mapeada para você.',
  };
}

function getOverviewContext({ metrics, currentFocus, statusMeta, overdueTasks, pendingTodayTasks, nextAction }) {
  const operationalLoad = overdueTasks.length > 0
    ? `${overdueTasks.length} pendência(s) crítica(s)`
    : pendingTodayTasks.length > 0
      ? `${pendingTodayTasks.length} item(ns) de hoje abertos`
      : 'Fluxo limpo';

  return [
    {
      id: 'progress',
      label: 'Progresso oficial',
      value: `${metrics.progressPercent}%`,
      helper: `${metrics.completedTasks}/${metrics.totalTasks} tarefas do plano já drenadas.`,
      tone: 'cyan',
    },
    {
      id: 'focus',
      label: 'Assunto em curso',
      value: currentFocus.label,
      helper: currentFocus.helper,
      tone: 'amber',
    },
    {
      id: 'rhythm',
      label: 'Ritmo atual',
      value: statusMeta.label,
      helper: nextAction.reason,
      tone: 'fuchsia',
    },
    {
      id: 'load',
      label: 'Carga aberta',
      value: operationalLoad,
      helper: overdueTasks.length > 0
        ? 'O custo aberto aparece separado para não contaminar o foco principal.'
        : pendingTodayTasks.length > 0
          ? 'Sem atraso antigo. A disciplina pede só fechamento do ciclo atual.'
          : 'Sem dívida crítica. A home fica livre para progresso e revisão.',
      tone: overdueTasks.length > 0 ? 'rose' : pendingTodayTasks.length > 0 ? 'cyan' : 'emerald',
    },
  ];
}

function getOverviewInsights({ nextAction, statusMeta, compositionChart, currentFocus, shift }) {
  const professor = shift.includes('noturno') ? 'Adele' : 'Snyder';

  return {
    eyebrow: 'Leitura operacional',
    title: 'O que esta home precisa responder em poucos segundos',
    description: 'Direção, ritmo e composição aparecem em camadas diferentes para a disciplina respirar como central de comando.',
    items: [
      {
        id: 'mode',
        label: 'Modo do momento',
        value: statusMeta.shortLabel,
        body: statusMeta.commandLine,
      },
      {
        id: 'weight',
        label: 'Peso dominante',
        value: compositionChart.dominantLabel,
        body: 'O gráfico de composição mostra onde a disciplina está concentrando energia agora.',
      },
      {
        id: 'focus',
        label: 'Próximo passo certo',
        value: currentFocus.label,
        body: `${professor} · a próxima ação continua sendo a porta principal de entrada na disciplina.`,
      },
    ],
  };
}

function inferQuestionDifficulty(question) {
  if (question.tipo === 'Fixacao') return 'facil';
  if (question.tipo === 'Comparacao') return 'medio';
  return 'dificil';
}

function normalizeFlashcards(cards) {
  return cards.map((card) => {
    const meta = SUBJECT_TAG_META[card.categoria] || {
      subjectLabel: card.categoria || 'Consolidação',
      motherSubjectId: 'bloco-c',
    };

    return {
      id: card.id,
      motherSubjectId: meta.motherSubjectId,
      subjectLabel: meta.subjectLabel,
      front: card.frente,
      back: card.verso,
      type: 'flashcard',
      status: 'ready',
      sourceCategory: card.categoria,
      difficulty: 'futuro',
    };
  });
}

function normalizeQuestions(questions) {
  return questions.map((question) => {
    const meta = SUBJECT_TAG_META[question.categoria] || {
      subjectLabel: question.categoria || 'Consolidação',
      motherSubjectId: 'bloco-c',
    };
    const difficulty = inferQuestionDifficulty(question);

    return {
      id: question.id,
      motherSubjectId: meta.motherSubjectId,
      subjectLabel: meta.subjectLabel,
      difficulty,
      questionType: question.tipo,
      prompt: question.pergunta,
      answer: question.resposta,
      status: 'ready',
      sourceCategory: question.categoria,
    };
  });
}

const FLASHCARDS_BY_MOTHER_SUBJECT = {
  'bloco-a': normalizeFlashcards(flashcardsBlocoA),
  'bloco-b': normalizeFlashcards(flashcardsBlocoB),
  'bloco-c': normalizeFlashcards(flashcardsBlocoC),
};

const QUESTIONS_BY_MOTHER_SUBJECT = {
  'bloco-a': normalizeQuestions(questoesBlocoA),
  'bloco-b': normalizeQuestions(questoesBlocoB),
  'bloco-c': normalizeQuestions(questoesBlocoC),
};

function buildNextAction(groups, overdueTasks, pendingTodayTasks) {
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

  const mode = overdueTasks.length > 0 ? 'backlog' : pendingTodayTasks.length > 0 ? 'today' : 'future';
  const config = NEXT_ACTION_MODE_CONFIG[mode];

  return {
    eyebrow: 'Próxima ação',
    kind: config.kind,
    title: config.title,
    reason: config.reason,
    ctaLabel: config.ctaLabel,
    items: nextActionItems,
    mode,
  };
}

function buildExerciseBlocks() {
  return MOTHER_SUBJECTS.map((subject) => {
    const flashcards = FLASHCARDS_BY_MOTHER_SUBJECT[subject.id] || [];
    const questions = QUESTIONS_BY_MOTHER_SUBJECT[subject.id] || [];

    return {
      id: subject.id,
      title: subject.title,
      shortTitle: subject.shortTitle,
      subtitle: subject.description,
      topicLabel: subject.topicLabel,
      flashcards,
      questionLevels: {
        facil: questions.filter((question) => question.difficulty === 'facil'),
        medio: questions.filter((question) => question.difficulty === 'medio'),
        dificil: questions.filter((question) => question.difficulty === 'dificil'),
      },
    };
  });
}

export function getSoftwareEngineeringPilotData({ shift = 'noturno-adele' } = {}) {
  const taskProgress = loadSoftwareEngineeringTaskProgress();
  const groups = getGroupedStudyPlan(shift, taskProgress);
  const overdueTasks = getOverdueTasks(groups);
  const todayTasks = getTodayTasks(groups);
  const pendingTodayTasks = getPendingTodayTasks(todayTasks);
  const metrics = getProgressMetrics(groups);
  const nextAction = buildNextAction(groups, overdueTasks, pendingTodayTasks);
  const exerciseBlocks = buildExerciseBlocks();
  const activeMotherSubject = exerciseBlocks.find((block) => block.id === 'bloco-a') || exerciseBlocks[0];

  const status = overdueTasks.length > 0
    ? 'recuperacao'
    : pendingTodayTasks.length > 0
      ? 'acao_imediata'
      : metrics.progressPercent === 100
        ? 'consolidado'
        : 'planejado';

  const statusMeta = STATUS_META[status];
  const progressChart = getDisciplineProgressChart(groups);
  const compositionChart = getDisciplineCompositionChart(groups, metrics);
  const currentFocus = getCurrentFocusMeta(nextAction, activeMotherSubject);
  const contextStats = getOverviewContext({
    metrics,
    currentFocus,
    statusMeta,
    overdueTasks,
    pendingTodayTasks,
    nextAction,
  });
  const insights = getOverviewInsights({
    nextAction,
    statusMeta,
    compositionChart,
    currentFocus,
    shift,
  });

  return {
    subject: {
      id: 'engenharia-software',
      title: 'Introdução à Engenharia de Software',
      subtitle: 'Disciplina-piloto do Crono-Lab reorganizada por visão geral, conteúdos e um universo próprio de exercícios.',
      status: 'em_execucao',
    },
    overview: {
      subjectId: 'engenharia-software',
      title: 'Introdução à Engenharia de Software',
      subtitle: 'Visão geral enxuta para responder onde você está, o que vem agora e qual assunto está puxando a disciplina.',
      role: 'Menos painel, mais direção. A disciplina abre pelo próximo passo e deixa teoria, apoio e treino em camadas próprias.',
      professor: shift.includes('noturno') ? 'Adele' : 'Snyder',
      period: '2026/1',
      examDate,
      status,
      statusCopy: STATUS_COPY[status],
      nextActionLabel: nextAction.items[0]?.text ?? 'Base revisada. Sem ação crítica imediata.',
      recoveryLabel: overdueTasks.length > 0
        ? `${overdueTasks.length} pendência(s) crítica(s)`
        : pendingTodayTasks.length > 0
          ? `${pendingTodayTasks.length} item(ns) de hoje ainda aberto(s)`
          : 'Fluxo limpo no momento',
      currentTopicLabel: currentFocus.label,
      progressLogicSummary: 'A progressão oficial anda por plano, depois por conteúdos e então por exercícios em modos separados de treino.',
      ...metrics,
      pilotNotice: {
        label: 'piloto em refinamento',
        title: 'Arquitetura nova de disciplina dentro do Crono-Lab',
        body: 'A navegação agora separa visão geral, conteúdos e exercícios para deixar a disciplina mais clara e pronta para crescer sem entortar a hierarquia.',
      },
      hero: {
        eyebrow: 'engenharia · crono-lab',
        statusLabel: statusMeta.label,
        statusTone: statusMeta.tone,
        commandLine: statusMeta.commandLine,
        metricValue: `${metrics.progressPercent}%`,
        metricLabel: 'progresso oficial',
        metricHelper: `${metrics.completedTasks}/${metrics.totalTasks} tarefas do plano já foram drenadas.`,
        metricSecondary: overdueTasks.length > 0
          ? `${overdueTasks.length} pendência(s) crítica(s)`
          : pendingTodayTasks.length > 0
            ? `${pendingTodayTasks.length} item(ns) de hoje abertos`
            : 'sem custo aberto',
      },
      contextStats,
      charts: {
        progress: progressChart,
        composition: compositionChart,
      },
      insights,
    },
    nextAction,
    recovery: {
      eyebrow: 'Recuperação / pendências',
      title: overdueTasks.length > 0 ? 'O que ficou para trás' : 'Painel de limpeza leve',
      description: overdueTasks.length > 0
        ? 'Este bloco existe para limpar atraso sem roubar o topo da próxima ação.'
        : pendingTodayTasks.length > 0
          ? 'Sem atraso antigo. Restam só pendências leves do ciclo atual.'
          : 'Nenhum atraso crítico agora. A disciplina está livre para estudo e treino.',
      isActive: overdueTasks.length > 0,
      overdueCount: overdueTasks.length,
      pendingTodayCount: pendingTodayTasks.length,
      items: overdueTasks.slice(0, 4),
      pendingTodayPreview: pendingTodayTasks.slice(0, 3),
    },
    contents: {
      eyebrow: 'Conteúdos',
      title: 'Assuntos organizados por bloco-mãe',
      description: 'Os temas principais seguem a lógica cebola. Você escolhe o assunto antes de decidir como quer treinar.',
      motherSubjects: exerciseBlocks.map((block) => ({
        id: block.id,
        title: block.title,
        shortTitle: block.shortTitle,
        subtitle: block.subtitle,
        topicLabel: block.topicLabel,
        flashcardCount: block.flashcards.length,
        questionCount: Object.values(block.questionLevels).reduce((sum, items) => sum + items.length, 0),
      })),
      priorityTopics: topics,
      resources: {
        playlists: referencePlaylists,
        videosByTopic: topicVideoSets,
      },
      summaries: {
        modelSummaries,
        examCoverage,
      },
    },
    exercises: {
      eyebrow: 'Exercícios',
      title: 'Escolha como quer treinar',
      description: 'Flashcards e questões vivem dentro do mesmo universo, mas em modos separados. Questões já nascem prontas para fácil, médio e difícil.',
      blocks: exerciseBlocks,
      difficulties: DIFFICULTY_META,
    },
  };
}
