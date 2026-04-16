export const DASHBOARD_PERIODS = [
  {
    id: 'p2',
    label: 'P2 Atual',
    ctaLabel: 'P2 Atual',
    description: 'Conteúdos da P2 em preparação para liberação gradual.',
    emptyStateTitle: 'Em breve',
    emptyStateSubtitle: 'Conteúdo da P2 ainda não liberado',
  },
  {
    id: 'p1',
    label: 'P1',
    ctaLabel: 'Ver conteúdos da P1',
    description: 'Acesse a base já disponível da P1 sem alterar o conteúdo atual.',
  },
];

export const DASHBOARD_P2_SUBJECTS = {
  arquitetura: {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
  empreendedorismo: {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
  'eletiva-ingles': {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
  'intro-eng-software': {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
  'matematica-discreta': {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
  'algoritmos-programacao': {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  },
};

export function getDashboardPeriod(periodId = 'p2') {
  return DASHBOARD_PERIODS.find((period) => period.id === periodId) || DASHBOARD_PERIODS[0];
}

export function getDashboardP2Override(subjectId) {
  return DASHBOARD_P2_SUBJECTS[subjectId] || {
    status: 'coming-soon',
    badge: 'Em breve',
    helperText: 'Conteúdo da P2 ainda não liberado',
  };
}
