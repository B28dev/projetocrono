export const CRONO_LAB_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    title: 'Centro de Comando',
    description: 'Visão geral operacional do laboratório com sensores, missão e progresso vivo.',
    hasLiveContent: true,
  },
  {
    id: 'missao',
    label: 'Missão Diária',
    icon: '🎯',
    title: 'Missão Diária',
    description: 'Área operacional para executar a missão de hoje com validação real.',
    hasLiveContent: true,
  },
  {
    id: 'disciplinas',
    label: 'Disciplinas',
    icon: '📚',
    title: 'Disciplinas',
    description: 'Módulo laboratorial reservado para organizar a camada acadêmica por matéria.',
    hasLiveContent: false,
  },
  {
    id: 'arena',
    label: 'Arena',
    icon: '⚔️',
    title: 'Arena',
    description: 'Espaço reservado para os combates, rounds e desafios táticos do Crono.',
    hasLiveContent: false,
  },
  {
    id: 'recompensas',
    label: 'Recompensas',
    icon: '💎',
    title: 'Recompensas',
    description: 'Camada futura de feedback premium, unlocks e economia study-first.',
    hasLiveContent: false,
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: '⚙️',
    title: 'Configurações',
    description: 'Área para ajustes do laboratório, preferências e toggles de teste.',
    hasLiveContent: false,
  },
];

export const CRONO_LAB_DEFAULT_SECTION = 'dashboard';

export function getCronoLabSection(section) {
  return CRONO_LAB_NAV_ITEMS.find((item) => item.id === section) || CRONO_LAB_NAV_ITEMS[0];
}

export function isValidCronoLabSection(section) {
  return CRONO_LAB_NAV_ITEMS.some((item) => item.id === section);
}
