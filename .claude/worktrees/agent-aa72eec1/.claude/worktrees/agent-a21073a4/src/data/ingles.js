export const examDate = new Date('2026-04-06T08:00:00');

export const summaryNotice =
  'Respostas curtas e objetivas no formato esperado pela disciplina: localizar informacao, justificar com trecho e finalizar com frase clara em ingles ou portugues conforme o enunciado.';

export const referenceVideoMaterials = [
  {
    id: 'video-skimming-scanning-base',
    title: 'Prof. Marta Garcia - Skimming e Scanning nas provas de proficiencia',
    description: 'Base para leitura estrategica e localizacao rapida de informacao.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=0I7Dw9zvQMU',
  },
  {
    id: 'video-skimming-scanning-pratica',
    title: 'Curso Enem Gratuito - Skimming e Scanning: exemplos praticos',
    description: 'Aplicacao direta das tecnicas em perguntas objetivas.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=qdkVExqTpW4',
  },
  {
    id: 'video-ingles-instrumental-estrategias',
    title: 'Ingles Instrumental: estrategias de leitura',
    description: 'Como aplicar leitura tecnica sem traducao integral.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=sjal7GW3KJA',
  },
  {
    id: 'video-vocabulario-sufixos',
    title: 'Easy with Iupi - Instrumental English: vocabulario tecnico e sufixos',
    description: 'Reconhecimento de padroes morfologicos em textos tecnicos.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=UMdpjjccbKU',
  },
  {
    id: 'video-estrategias-leitura-isabel',
    title: 'Isabel Pauline - Estrategias de Leitura em Ingles Instrumental',
    description: 'Reforco de tecnica para leitura e interpretacao em prova.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=wOZI0R40x6s',
  },
];

export const referenceVideoSections = [
  {
    id: 'videos-leitura-estrategica',
    title: 'Videos da disciplina - Leitura estrategica (Skimming/Scanning)',
    description: 'Bloco focado em localizar informacao sem ler o texto inteiro.',
    items: referenceVideoMaterials.filter((item) =>
      [
        'video-skimming-scanning-base',
        'video-skimming-scanning-pratica',
        'video-ingles-instrumental-estrategias',
      ].includes(item.id),
    ),
  },
  {
    id: 'videos-vocabulario-apoio',
    title: 'Videos da disciplina - Vocabulario tecnico e reforco',
    description: 'Bloco focado em sufixos, vocabulario e consolidacao.',
    items: referenceVideoMaterials.filter((item) =>
      [
        'video-vocabulario-sufixos',
        'video-estrategias-leitura-isabel',
      ].includes(item.id),
    ),
  },
];

export const referencePdfMaterials = [
  {
    id: 'pdf-resumo-skimming-scanning',
    title: 'Resumo - Skimming e Scanning',
    description: 'Preencher link do PDF de leitura estrategica.',
    url: '',
    localPath: '',
  },
  {
    id: 'pdf-expressoes-funcionais',
    title: 'Resumo - Expressoes Funcionais',
    description: 'Preencher link do PDF de expressoes para prova.',
    url: '',
    localPath: '',
  },
  {
    id: 'pdf-sufixos-gramatica',
    title: 'Resumo - Sufixos e Artigos',
    description: 'Preencher link do PDF de gramatica aplicada.',
    url: '',
    localPath: '',
  },
  {
    id: 'pdf-artigo-mit-ai',
    title: 'Material - Artigo MIT AI',
    description: 'Preencher link do artigo base para simulacao.',
    url: '',
    localPath: '',
  },
];

export const topics = [
  { id: 'scanning-abstract', name: 'Scanning no abstract', frequency: '2/2 provas', level: 'muito-frequente' },
  { id: 'producao-ingles', name: 'Escrever em ingles', frequency: '2/2 provas', level: 'muito-frequente' },
  { id: 'compreensao-pt', name: 'Compreensao em portugues', frequency: '2/2 provas', level: 'muito-frequente' },
  { id: 'expressoes-funcionais', name: 'Expressoes funcionais', frequency: '1/2 provas', level: 'apareceu' },
  { id: 'vocabulario-tecnico', name: 'Vocabulario tecnico', frequency: '1/2 provas', level: 'apareceu' },
];

const studyPlanBase = [
  {
    date: '2026-04-04',
    label: 'Sab 04/04',
    topic: 'Skimming, scanning e artigo do MIT',
    tasks: [
      'Skimming: mapear a ideia central do artigo do MIT em 3 minutos (titulo, primeiro e ultimo paragrafos, frases iniciais).',
      'Scanning: localizar no texto quem e Karen Hao, o que e AlphaFold, argumento sobre escala de IA e impactos ambientais.',
      'Pratica: simular resposta da prova sobre problemas da IA em larga escala e escrever uma sentenca em ingles sem copia literal.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Skimming e Scanning nas provas de proficiencia',
        url: 'https://www.youtube.com/watch?v=0I7Dw9zvQMU',
      },
      {
        kind: 'youtube',
        title: 'Skimming e Scanning: exemplos praticos',
        url: 'https://www.youtube.com/watch?v=qdkVExqTpW4',
      },
    ],
    notes: [
      {
        variant: 'coach',
        title: 'Estrategia-chave',
        content: 'A prova pede localizacao e interpretacao objetiva. Evite traducao integral do texto.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Expressoes, sufixos, artigos e simulacao',
    tasks: [
      'Expressoes: revisar frases para concordar, discordar com educacao, demonstrar surpresa e pedir desculpas.',
      'Sufixos: reconhecer padroes -tion, -ity, -ment, -ness, -er, -ive, -al, -ing para inferir sentido em vocabulario tecnico.',
      'Gramatica: revisar uso de the, a e an e identificar ocorrencias no artigo do MIT.',
      'Simulacao: responder 3 perguntas no modelo da prova (scanning + producao) com escrita manual e tempo controlado.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Ingles Instrumental: estrategias de leitura',
        url: 'https://www.youtube.com/watch?v=sjal7GW3KJA',
      },
      {
        kind: 'youtube',
        title: 'Vocabulario tecnico e sufixos',
        url: 'https://www.youtube.com/watch?v=UMdpjjccbKU',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Simulacao',
        content: 'Escreva respostas no papel para reproduzir o ritmo da avaliacao real.',
      },
    ],
  },
  {
    date: '2026-04-06',
    label: 'Seg 06/04',
    topic: 'Dia da prova - Eletiva I (Ingles)',
    tasks: [
      'Checklist: levar caneta azul ou preta e organizar tempo total de 1h40.',
      'Leitura inicial: ler todos os enunciados antes de responder e separar questoes de scanning e producao.',
      'Resolucao: sublinhar palavras-chave da pergunta e buscar trecho exato no texto, sem leitura linear completa.',
      'Expressao: usar estruturas prontas do resumo rapido para respostas em ingles, sem improviso desnecessario.',
    ],
    resources: [],
    notes: [
      {
        variant: 'coach',
        title: 'Regra de ouro',
        content: 'Quando a questao pedir frase em ingles, use informacao correta do texto e redacao objetiva.',
      },
    ],
    isExamDay: true,
    isExamAlert: true,
  },
];

function withPlanIds(plan, prefix) {
  return plan.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
  }));
}

export const studyPlanByShift = {
  'noturno-adele': withPlanIds(studyPlanBase, 'noturno'),
  'vespertino-snyder': withPlanIds(studyPlanBase, 'vespertino'),
};

export function getStudyPlanByShift(shift = 'noturno-adele') {
  return studyPlanByShift[shift] || studyPlanByShift['noturno-adele'];
}

export function getStudyPlanTaskStorageKey(shift, item) {
  const itemKey = item?.id || item?.date || 'unknown';
  return `${shift}:${itemKey}`;
}

export const studyPlan = studyPlanByShift['noturno-adele'];

export const modelSummaries = [
  {
    id: 'skimming-vs-scanning',
    title: 'Skimming vs Scanning',
    badge: { label: 'Tema 1', color: 'cyan' },
    table: {
      headers: ['Tecnica', 'Para que serve', 'Como fazer'],
      rows: [
        ['Skimming', 'Captar a ideia geral rapidamente', 'Ler titulo, primeiro paragrafo, frases iniciais e fechamento.'],
        ['Scanning', 'Localizar informacao especifica', 'Buscar palavra-chave da pergunta sem leitura integral.'],
      ],
    },
  },
  {
    id: 'expressoes-funcionais',
    title: 'Expressoes Funcionais',
    badge: { label: 'Tema 2', color: 'emerald' },
    table: {
      headers: ['Situacao', 'Expressoes em ingles'],
      rows: [
        ['Concordar', 'I agree. / That is right. / Exactly. / Good point.'],
        ['Discordar (educado)', 'I see your point, but... / I respectfully disagree. / That may be true, however...'],
        ['Surpresa', 'Wow! / That is amazing! / I cannot believe it! / Really?'],
        ['Desculpa', "I am sorry. / I apologize. / Excuse me."],
      ],
    },
  },
  {
    id: 'sufixos-comuns',
    title: 'Sufixos Comuns (-tion, -ity, -ment...)',
    badge: { label: 'Tema 3', color: 'amber' },
    table: {
      headers: ['Sufixo', 'Significado', 'Exemplo'],
      rows: [
        ['-tion / -sion', 'acao, resultado', 'information, adoption'],
        ['-ity / -ty', 'qualidade, estado', 'productivity, quality'],
        ['-ment', 'resultado, processo', 'development, management'],
        ['-ness', 'estado, condicao', 'usefulness, awareness'],
        ['-er / -or', 'agente, pessoa', 'developer, creator'],
        ['-ive', 'caracteristica, qualidade', 'effective, productive'],
        ['-al', 'relativo a', 'technical, digital'],
        ['-ing', 'acao continua / substantivo', 'learning, testing'],
      ],
    },
  },
  {
    id: 'artigos-the-a-an',
    title: 'Artigos (the / a / an)',
    badge: { label: 'Tema 4', color: 'indigo' },
    table: {
      headers: ['Artigo', 'Quando usar', 'Exemplo'],
      rows: [
        ['the', 'Referencia especifica ou ja mencionada', 'The model is small.'],
        ['a', 'Primeira mencao, nao especifico, som de consoante', 'A small model.'],
        ['an', 'Primeira mencao, nao especifico, som de vogal', 'An AI tool.'],
      ],
    },
  },
  {
    id: 'fatos-mit-ai',
    title: 'Fatos do Artigo do MIT AI',
    badge: { label: 'Tema 5', color: 'rose' },
    bullets: [
      'Titulo: "What is the right path for AI?" (MIT News, March 2026).',
      'Tese central: escala massiva de IA nao e necessaria; modelos menores e especificos sao mais eficientes.',
      'Autora: Karen Hao (jornalista, ex-WSJ e MIT Technology Review).',
      'Exemplo-chave: AlphaFold como modelo especifico de alto impacto cientifico.',
      'Riscos da escala: alto consumo de energia, emissao, uso de agua e impacto humano em trabalho de rotulagem.',
      'Frases-chave: "This scale is unnecessary" e "If we really want AI to be broadly beneficial, we urgently need to shift away from this approach."',
    ],
  },
];

export const examCoverage = [
  {
    id: 'p1-2024-stela',
    title: 'P1 - 2024 (Prof. Stela)',
    bullets: [
      'Abstract sobre TDD com resposta em ingles sobre qualidade de software.',
      'Texto sobre multilinguismo com explicacao em portugues sobre cognicao.',
      'Questao de expressoes funcionais (discordar educadamente e expressar surpresa).',
      'Abstract sobre Agile-Scrum com beneficio para pequenas empresas (scanning + resposta em PT).',
    ],
  },
  {
    id: 'p1-2023-ney-rubens',
    title: 'P1 - 2023 (Prof. Ney Rubens)',
    bullets: [
      'Texto sobre historia da engenharia de software.',
      'Scanning para identificar figuras historicas da area.',
      'Scanning para explicar o software development life cycle em ingles.',
    ],
  },
];
