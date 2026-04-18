import { getSoftwareEngineeringPilotData } from '../../gamification/pilots/softwareEngineeringPilot.js';

const DETAILS_SECTION_META = {
  subjects: {
    id: 'subjects',
    title: 'Blocos de estudo',
    description: 'A disciplina continua organizada por blocos para manter contexto antes do treino.',
  },
  topics: {
    id: 'topics',
    title: 'Temas mais cobrados',
    description: 'Os assuntos de maior incidência continuam visíveis, mas fora da linha principal de decisão.',
  },
  resources: {
    id: 'resources',
    title: 'Recursos de apoio',
    description: 'Playlists e vídeos ficam na área final para consulta sob demanda.',
  },
  summaries: {
    id: 'summaries',
    title: 'Base de revisão',
    description: 'Resumos e leitura de prova permanecem disponíveis sem competir com o topo da home.',
  },
  exercises: {
    id: 'exercises',
    title: 'Exercícios preparados',
    description: 'A estrutura de treino segue pronta por bloco e por nível de dificuldade.',
  },
};

const PERIOD_OPTIONS = [
  { id: '7d', label: '7 dias', days: 7 },
  { id: '14d', label: '14 dias', days: 14 },
  { id: '30d', label: '30 dias', days: 30 },
];

const SEGMENT_TONE = {
  completed: 'success',
  in_progress: 'info',
  planned: 'neutral',
  overdue: 'warning',
};

function getPeriodOption(periodKey) {
  return PERIOD_OPTIONS.find((option) => option.id === periodKey) ?? PERIOD_OPTIONS[1];
}

function getHeroSummary({ pilot }) {
  const { overview, nextAction, recovery, planState } = pilot;
  const { metrics } = planState;

  let summary = 'Seu progresso está consistente e o foco agora é manter a cadência.';

  if (recovery.overdueCount >= 3) {
    summary = 'A disciplina saiu do eixo; o melhor movimento agora é limpar o núcleo atrasado.';
  } else if (recovery.overdueCount > 0) {
    summary = 'Você avançou bem, mas ainda há pendências críticas segurando o ritmo.';
  } else if (recovery.pendingTodayCount > 0) {
    summary = 'Seu progresso está consistente e o foco agora é manter a cadência do dia.';
  } else if (metrics.progressPercent === 100) {
    summary = 'A trilha principal está limpa; agora vale consolidar a revisão e o treino.';
  }

  return {
    eyebrow: pilot.dashboardData.firstFold.hero.eyebrow,
    disciplineName: overview.title,
    status: overview.hero.statusLabel,
    statusTone: overview.hero.statusTone,
    progressLabel: overview.hero.metricLabel,
    progressValue: overview.hero.metricValue,
    summary,
    supportLabel: nextAction.kind,
  };
}

function getKpiItems({ pilot }) {
  const { topKpis } = pilot.dashboardData.firstFold.hero;
  const { recovery, planState } = pilot;
  const cadenceStatus = recovery.overdueCount > 0
    ? 'instável'
    : recovery.pendingTodayCount > 0
      ? 'atenção hoje'
      : 'estável';

  return [
    {
      ...topKpis[0],
      tone: 'success',
      trend: pilot.overview.progressPercent >= 60 ? 'bom avanço' : 'em construção',
    },
    {
      ...topKpis[1],
      tone: 'info',
      trend: 'foco principal',
    },
    {
      id: 'cadence',
      label: 'Cadência',
      value: cadenceStatus,
      helper: recovery.overdueCount > 0
        ? 'O atraso ainda quebra a constância da disciplina.'
        : recovery.pendingTodayCount > 0
          ? 'O ritmo depende de fechar o ciclo de hoje.'
          : 'A trilha está livre para manter avanço limpo.',
      tone: recovery.overdueCount > 0 ? 'warning' : 'info',
      trend: planState.statusMeta.shortLabel,
    },
    {
      id: 'pending-load',
      label: 'Carga pendente',
      value: recovery.overdueCount > 0
        ? `${recovery.overdueCount} crítica(s)`
        : recovery.pendingTodayCount > 0
          ? `${recovery.pendingTodayCount} hoje`
          : 'baixa',
      helper: recovery.overdueCount > 0
        ? 'Essa carga deve cair antes de ampliar o estudo.'
        : recovery.pendingTodayCount > 0
          ? 'Feche o dia para não transformar hoje em atraso.'
          : 'Sem acúmulo importante competindo com o topo.',
      tone: recovery.overdueCount > 0 ? 'warning' : recovery.pendingTodayCount > 0 ? 'info' : 'success',
      trend: 'prioridade operacional',
    },
  ];
}

function getNextActionViewModel({ pilot, bottlenecksLead, pendingGroups }) {
  const { nextAction } = pilot;
  const primaryItem = nextAction.items[0];
  const pendingCount = nextAction.items.length;
  const criticalItems = pendingGroups.find((group) => group.id === 'critical')?.items ?? [];

  return {
    eyebrow: 'o que eu faço agora',
    title: primaryItem
      ? `Conclua ${pendingCount} frente(s) em ${primaryItem.topic || 'ordem prioritária'}`
      : nextAction.title,
    summary: nextAction.reason,
    impact: primaryItem
      ? `Isso reduz a pressão em ${primaryItem.topic || 'seu foco atual'} e destrava a próxima camada da disciplina.`
      : 'Isso mantém a disciplina pronta para o próximo ciclo.',
    helper: nextAction.ctaLabel,
    cta: {
      label: 'Atacar próximas pendências',
      href: '#engenharia-software-detalhes',
    },
    items: nextAction.items,
    detail: {
      title: 'Plano sugerido para esta ação',
      subtitle: 'A visão principal continua curta; aqui entra o impacto e a ordem de execução.',
      subtasks: nextAction.items.map((item, index) => ({
        id: item.id,
        label: item.text,
        helper: `${index + 1}. ${item.topic || 'Trilha prioritária'}`,
      })),
      impactPreview: [
        primaryItem
          ? `Reduz o atrito em ${primaryItem.topic || 'seu foco atual'}.`
          : 'Mantém a disciplina pronta para o próximo ciclo.',
        bottlenecksLead
          ? `Ataca o gargalo principal em ${bottlenecksLead.topic}.`
          : 'Evita acúmulo novo no curto prazo.',
        criticalItems.length > 0
          ? `Ajuda a derrubar ${criticalItems.length} pendência(s) crítica(s).`
          : 'Mantém a disciplina limpa sem abrir novo débito.',
      ],
      executionOrder: nextAction.items.map((item, index) => ({
        id: `${item.id}-order`,
        label: `Passo ${index + 1}`,
        body: item.text,
      })),
    },
  };
}

function getProgressNarrative(composition) {
  const overdue = composition.segments.find((segment) => segment.id === 'overdue')?.value ?? 0;
  const inProgress = composition.segments.find((segment) => segment.id === 'in_progress')?.value ?? 0;
  const planned = composition.segments.find((segment) => segment.id === 'planned')?.value ?? 0;
  const completed = composition.segments.find((segment) => segment.id === 'completed')?.value ?? 0;

  if (overdue > inProgress && overdue > 0) {
    return 'A maior parte da pressão atual vem do atraso acumulado. Reduzir esse bloco devolve fôlego ao plano.';
  }

  if (planned > completed && planned > inProgress) {
    return 'Há bastante trilha ainda projetada à frente. O avanço já começou, mas o peso futuro continua alto para o estágio atual.';
  }

  if (inProgress > 0) {
    return 'A trilha já foi bem ativada. O ponto agora é transformar o que está em andamento em progresso fechado.';
  }

  return 'A disciplina está com boa parte do plano drenada e pouca pressão aberta no curto prazo.';
}

function getProgressChartViewModel({ pilot }) {
  const composition = pilot.dashboardData.contextGrid.blocks.find((block) => block.type === 'composition')?.data ?? pilot.overview.charts.composition;

  return {
    title: 'Situação agregada da disciplina',
    description: 'Leitura geral do peso já concluído, do que está vivo agora e do que ainda disputa avanço.',
    centerValue: composition.centerValue,
    centerLabel: composition.centerLabel,
    segments: composition.segments.map((segment) => ({
      ...segment,
      tone: SEGMENT_TONE[segment.id] ?? 'neutral',
    })),
    narrative: getProgressNarrative(composition),
    detail: {
      title: 'Decomposição do progresso',
      subtitle: 'Cada bloco mostra onde o peso da disciplina está concentrado agora.',
      items: composition.segments.map((segment) => ({
        id: segment.id,
        label: segment.label,
        value: segment.value,
        helper: segment.helper,
      })),
    },
  };
}

function getCompositionViewModel({ pilot }) {
  const composition = pilot.dashboardData.contextGrid.blocks.find((block) => block.type === 'composition')?.data ?? pilot.overview.charts.composition;

  return {
    ...composition,
    narrative: composition.dominantLabel === 'Atrasado'
      ? 'Seu estado hoje é puxado por débito antigo. O ganho mais relevante vem da limpeza do atraso.'
      : composition.dominantLabel === 'Em andamento'
        ? 'A maior parte da energia está no que já foi iniciado. Vale fechar o que está vivo antes de abrir novas frentes.'
        : composition.dominantLabel === 'Planejado'
          ? 'O plano futuro ainda pesa mais do que o que já foi drenado. A disciplina ainda pede tração contínua.'
          : 'A maior fatia já está concluída, sinal de que a disciplina entrou em zona mais controlada.',
  };
}

function getCadenceSeries({ pilot, periodKey }) {
  const { planState } = pilot;
  const period = getPeriodOption(periodKey);
  const recentItems = [...planState.groups.completedPast, ...planState.groups.overdue, ...planState.groups.today].slice(-period.days);

  return recentItems.map((item) => {
    const total = item.tasks.length || 1;
    const completed = item.tasks.reduce((sum, _, index) => sum + (item.checkedTasks?.[index] ? 1 : 0), 0);
    const value = Math.round((completed / total) * 100);

    return {
      id: item.renderKey,
      label: item.label,
      shortLabel: item.label.slice(0, 3),
      value,
      state: item.isOverdue ? 'warning' : item.date === recentItems[recentItems.length - 1]?.date ? 'info' : value === 100 ? 'success' : 'neutral',
      detail: `${completed}/${total} tarefas fechadas nesse marco.`,
    };
  });
}

function getCadenceViewModel({ pilot, periodKey }) {
  const { planState, recovery } = pilot;
  const series = getCadenceSeries({ pilot, periodKey });

  let narrative = 'Você mantém constância suficiente para continuar avançando.';
  if (recovery.overdueCount > 0) {
    narrative = 'Seu ritmo caiu porque o atraso antigo ainda compete com o avanço atual.';
  } else if (recovery.pendingTodayCount > 0) {
    narrative = 'O ritmo está estável, mas depende de fechar o bloco do dia para não perder tração.';
  } else if (series.some((item) => item.value === 100)) {
    narrative = 'Houve retomada recente e a disciplina já mostra sinais de constância limpa.';
  }

  return {
    label: planState.statusMeta.label,
    body: planState.statusMeta.commandLine,
    helper: pilot.overview.progressLogicSummary,
    narrative,
    series,
    periodLabel: getPeriodOption(periodKey).label,
    detail: {
      title: 'Detalhe de cadência',
      subtitle: `Janela atual: ${getPeriodOption(periodKey).label}.`,
      items: series.map((item) => ({
        id: item.id,
        label: item.label,
        value: `${item.value}%`,
        helper: item.detail,
      })),
    },
  };
}

function getBottlenecksViewModel({ pilot }) {
  const overdueByTopic = new Map();
  const itemsByTopic = new Map();

  [...pilot.planState.overdueTasks, ...pilot.planState.pendingTodayTasks].forEach((item) => {
    const topic = item.topic || pilot.planState.currentFocus.label;
    overdueByTopic.set(topic, (overdueByTopic.get(topic) ?? 0) + 1);
    itemsByTopic.set(topic, [...(itemsByTopic.get(topic) ?? []), item]);
  });

  const items = [...overdueByTopic.entries()]
    .map(([topic, count]) => ({
      id: topic,
      topic,
      count,
      helper: count > 1 ? `${count} itens pressionando o avanço desse assunto.` : 'Esse tema ainda precisa de fechamento para não contaminar a cadência.',
      priorityLabel: count > 2 ? 'ataque primeiro' : 'acompanhe de perto',
      relatedItems: (itemsByTopic.get(topic) ?? []).slice(0, 4),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const lead = items[0];

  return {
    items,
    narrative: lead
      ? `${lead.topic} concentra o maior acúmulo agora. Esse é o melhor lugar para recuperar tração.`
      : 'Não há gargalo dominante neste momento; a disciplina está mais equilibrada.',
    lead,
    detail: {
      title: 'Detalhe dos gargalos',
      subtitle: 'Abra cada grupo para enxergar por onde começar e o que está ligado a ele.',
      groups: items.map((item) => ({
        id: item.id,
        title: item.topic,
        helper: item.helper,
        lead: item.priorityLabel,
        items: item.relatedItems.map((relatedItem) => ({
          id: relatedItem.id,
          label: relatedItem.text,
          helper: relatedItem.topic,
        })),
      })),
    },
  };
}

function classifyPendingGroup(task, todayKey) {
  if (task.date && task.date < todayKey) return 'critical';
  if (task.date && task.date === todayKey) return 'important';
  return 'complementary';
}

function getPendingGroupsViewModel({ pilot }) {
  const todayKey = new Date().toISOString().slice(0, 10);
  const groups = {
    critical: [],
    important: [],
    complementary: [],
  };

  pilot.planState.overdueTasks.forEach((task) => {
    groups[classifyPendingGroup(task, todayKey)].push(task);
  });

  pilot.planState.pendingTodayTasks.forEach((task) => {
    groups[classifyPendingGroup({ ...task, date: todayKey }, todayKey)].push({ ...task, date: todayKey });
  });

  pilot.planState.groups.future.slice(0, 2).forEach((item) => {
    item.tasks.slice(0, 2).forEach((task, index) => {
      groups.complementary.push({
        id: `${item.renderKey}-future-preview-${index}`,
        text: task,
        topic: item.topic,
        date: item.date,
      });
    });
  });

  return [
    {
      id: 'critical',
      label: 'Crítico',
      description: 'Itens que já viraram custo aberto e seguram o ritmo.',
      tone: 'warning',
      items: groups.critical,
    },
    {
      id: 'important',
      label: 'Importante',
      description: 'O que ainda precisa fechar hoje para a disciplina não escorregar.',
      tone: 'info',
      items: groups.important,
    },
    {
      id: 'complementary',
      label: 'Complementar',
      description: 'Próximas frentes já visíveis, mas sem competir com a recuperação principal.',
      tone: 'neutral',
      items: groups.complementary,
    },
  ].filter((group) => group.items.length > 0);
}

function getTimelineEventsViewModel({ pilot, periodKey }) {
  const period = getPeriodOption(periodKey);
  const events = pilot.overview.charts.progress.entries.slice(-period.days).map((entry) => ({
    id: entry.id,
    label: entry.label,
    status: entry.state,
    date: entry.date,
    completion: `${entry.completed}/${entry.total}`,
    summary: entry.state === 'overdue'
      ? 'Esse marco ficou para trás e ainda puxa custo operacional.'
      : entry.state === 'today'
        ? 'Este é o ponto vivo do ciclo atual.'
        : entry.state === 'done' || entry.state === 'today_done'
          ? 'Esse trecho já foi drenado no plano.'
          : 'Esse marco ainda está projetado à frente.',
    isExamDay: entry.isExamDay,
    detail: {
      title: entry.label,
      body: entry.state === 'overdue'
        ? 'Esse marco precisa ser reabsorvido para reduzir a pressão do backlog.'
        : entry.state === 'today'
          ? 'Esse é o pedaço da disciplina que merece foco imediato.'
          : entry.state === 'planned'
            ? 'Esse marco ainda não pede ação agora, mas já ajuda a antecipar o próximo ciclo.'
            : 'Esse marco já foi resolvido e serve como sinal de avanço acumulado.',
    },
  }));

  return {
    title: 'Linha de evolução da disciplina',
    description: 'Cada marco mostra onde você avançou, onde travou e o que ainda está pela frente.',
    items: events,
    periodLabel: period.label,
  };
}

function getSupportItemsViewModel({ pilot, bottlenecksLead }) {
  const firstPlaylist = pilot.contents.resources.playlists[0];
  const firstVideoSet = pilot.contents.resources.videosByTopic[0];
  const firstSummary = pilot.contents.summaries.modelSummaries[0];
  const mode = pilot.overview.status;

  const modeLabel = mode === 'recuperacao'
    ? 'recuperação'
    : mode === 'acao_imediata'
      ? 'manutenção de ritmo'
      : mode === 'consolidado'
        ? 'consolidação'
        : 'retomada';

  return {
    eyebrow: 'apoio útil',
    title: 'O que ajuda a retomar sem aumentar a carga cognitiva',
    description: 'Suporte curto para quando você precisa destravar a disciplina, revisar ou ganhar contexto rápido.',
    modeLabel,
    items: [
      {
        id: 'guidance',
        label: modeLabel,
        value: pilot.overview.statusCopy,
        body: pilot.overview.hero.commandLine,
      },
      {
        id: 'resource',
        label: bottlenecksLead ? `Apoio para ${bottlenecksLead.topic}` : 'Material-chave',
        value: firstPlaylist?.title ?? 'Playlist principal',
        body: firstPlaylist?.description ?? 'Use este material quando precisar de apoio rápido no tópico central.',
      },
      {
        id: 'review',
        label: 'Revisão útil',
        value: firstSummary?.title ?? firstVideoSet?.title ?? 'Resumo guiado',
        body: firstSummary?.bullets?.[0] ?? firstVideoSet?.description ?? 'Abra esse apoio quando quiser revisar sem aumentar o ruído da home.',
      },
    ],
  };
}

function getContextGrid({ pilot, composition, cadence, bottlenecks }) {
  return {
    ...pilot.dashboardData.contextGrid,
    blocks: pilot.dashboardData.contextGrid.blocks.map((block) => {
      if (block.type === 'composition') {
        return {
          ...block,
          data: composition,
        };
      }

      if (block.type === 'cadence') {
        return {
          ...block,
          data: cadence,
        };
      }

      if (block.type === 'bottleneck') {
        return {
          ...block,
          data: bottlenecks,
        };
      }

      return block;
    }),
  };
}

export function getSoftwareEngineeringDashboardViewModel({
  shift = 'noturno-adele',
  shiftLabel = 'Noturno (Adele)',
  selectedPeriodKey = '14d',
} = {}) {
  const pilot = getSoftwareEngineeringPilotData({ shift });
  const heroSummary = getHeroSummary({ pilot });
  const kpiItems = getKpiItems({ pilot });
  const pendingGroups = getPendingGroupsViewModel({ pilot });
  const bottlenecks = getBottlenecksViewModel({ pilot });
  const nextAction = getNextActionViewModel({ pilot, bottlenecksLead: bottlenecks.lead, pendingGroups });
  const progressChart = getProgressChartViewModel({ pilot });
  const composition = getCompositionViewModel({ pilot });
  const cadence = getCadenceViewModel({ pilot, periodKey: selectedPeriodKey });
  const timelineEvents = getTimelineEventsViewModel({ pilot, periodKey: selectedPeriodKey });
  const supportItems = getSupportItemsViewModel({ pilot, bottlenecksLead: bottlenecks.lead });

  return {
    status: 'ready',
    periodOptions: PERIOD_OPTIONS,
    selectedPeriodKey,
    priorityFilterOptions: [
      { id: 'all', label: 'Todas' },
      { id: 'critical', label: 'Crítico' },
      { id: 'important', label: 'Importante' },
      { id: 'complementary', label: 'Complementar' },
    ],
    subject: pilot.subject,
    overview: pilot.overview,
    header: {
      ...pilot.dashboardData.header,
      eyebrow: 'Painel da disciplina',
      periodLabel: `${pilot.overview.period} · ${shiftLabel}`,
      cta: {
        ...pilot.dashboardData.header.cta,
        href: '#engenharia-software-detalhes',
      },
    },
    firstFold: {
      ...pilot.dashboardData.firstFold,
      hero: {
        ...pilot.dashboardData.firstFold.hero,
        disciplineName: heroSummary.disciplineName,
        status: heroSummary.status,
        statusTone: heroSummary.statusTone,
        summary: heroSummary.summary,
        progressLabel: heroSummary.progressLabel,
        progressValue: heroSummary.progressValue,
        supportLabel: heroSummary.supportLabel,
        topKpis: kpiItems,
        nextAction,
        cta: {
          ...nextAction.cta,
        },
      },
      primaryChart: progressChart,
    },
    contextGrid: getContextGrid({ pilot, composition, cadence, bottlenecks }),
    secondarySections: [
      {
        id: 'pending',
        type: 'pending',
        title: 'Pendências rebaixadas',
        data: pendingGroups,
      },
      {
        id: 'timeline',
        type: 'timeline',
        title: 'Linha de evolução',
        data: timelineEvents,
      },
      {
        id: 'support',
        type: 'support',
        title: 'Suporte contextual',
        data: supportItems,
      },
    ],
    detailPanels: {
      progress: progressChart.detail,
      cadence: cadence.detail,
      bottleneck: bottlenecks.detail,
      nextAction: nextAction.detail,
      timeline: {
        title: timelineEvents.title,
        subtitle: `Período selecionado: ${timelineEvents.periodLabel}.`,
        items: timelineEvents.items.map((item) => ({
          id: item.id,
          label: item.label,
          value: item.completion,
          helper: item.detail.body,
        })),
      },
    },
    focusTargets: {
      primaryBottleneckId: bottlenecks.lead?.id ?? null,
      urgentPendingGroupId: pendingGroups[0]?.id ?? null,
    },
    details: {
      id: 'engenharia-software-detalhes',
      title: 'Área final de detalhes',
      description: 'Tudo que aprofunda a disciplina continua disponível aqui, claramente abaixo da leitura de decisão.',
      sections: [
        {
          ...DETAILS_SECTION_META.subjects,
          type: 'subjects',
          data: pilot.contents.motherSubjects,
        },
        {
          ...DETAILS_SECTION_META.topics,
          type: 'topics',
          data: pilot.contents.priorityTopics,
        },
        {
          ...DETAILS_SECTION_META.resources,
          type: 'resources',
          data: pilot.contents.resources,
        },
        {
          ...DETAILS_SECTION_META.summaries,
          type: 'summaries',
          data: pilot.contents.summaries,
        },
        {
          ...DETAILS_SECTION_META.exercises,
          type: 'exercises',
          data: pilot.exercises,
        },
      ],
    },
  };
}
