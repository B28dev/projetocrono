const SUBJECT_BASE = [
  { id: 'arquitetura', name: 'Arquitetura de Computadores', short: 'ARQ', active: true, color: 'blue', progress: 35 },
  { id: 'matematica-discreta', name: 'Matematica Discreta', short: 'M.D', active: false, color: 'purple', progress: 0 },
  { id: 'algoritmos-programacao', name: 'Algoritmos e Programacao', short: 'ALG', active: false, color: 'amber', progress: 0 },
  { id: 'intro-eng-software', name: 'Intro. Engenharia de Software', short: 'IES', active: true, color: 'teal', progress: 0 },
  { id: 'eletiva-ingles', name: 'Eletiva I (Ingles)', short: 'ING', active: true, color: 'green', progress: 0, status: 'completed' },
  { id: 'empreendedorismo', name: 'Empreendedorismo', short: 'EMP', active: true, color: 'rose', progress: 0 },
];

const SUBJECT_EXAM_DATES = {
  'noturno-adele': {
    arquitetura: '2026-04-13T08:00:00',
    'matematica-discreta': '2026-04-14T08:00:00',
    'algoritmos-programacao': '2026-04-09T08:00:00',
    'intro-eng-software': '2026-04-08T08:00:00',
    'eletiva-ingles': '2026-04-06T08:00:00',
    empreendedorismo: '2026-04-10T08:00:00',
  },
  'vespertino-snyder': {
    arquitetura: '2026-04-07T08:00:00',
    'matematica-discreta': '2026-04-14T08:00:00',
    'algoritmos-programacao': '2026-04-08T08:00:00',
    'intro-eng-software': '2026-04-13T08:00:00',
    'eletiva-ingles': '2026-04-06T08:00:00',
    empreendedorismo: '2026-04-10T08:00:00',
  },
};

export function getSubjects(shift = 'noturno-adele') {
  const dates = SUBJECT_EXAM_DATES[shift] || SUBJECT_EXAM_DATES['noturno-adele'];

  return SUBJECT_BASE.map((subject) => ({
    ...subject,
    examDate: new Date(dates[subject.id]),
  }));
}
