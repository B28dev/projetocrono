export const examDate = new Date('2026-04-13T08:00:00');

export const referencePlaylists = [
  {
    id: 'engsoftware-completo',
    title: 'Engenharia de Software (completo)',
    description: 'Playlist base para introducao, processo, modelos, agil e requisitos.',
    url: 'https://www.youtube.com/playlist?list=PLHacc__hCkF-eLfsK507j_HISZ34x42Ps',
  },
  {
    id: 'engsoftware-i',
    title: 'Engenharia de Software I',
    description: 'Playlist de apoio para revisao geral e simulados.',
    url: 'https://www.youtube.com/playlist?list=PLJHZRQCx_Lz3QB8c6MWupOwDt1WodiWsP',
  },
];

export const topicVideoSets = [
  {
    id: 'manifesto-agil',
    title: 'Manifesto Agil',
    description: 'O que e e por que e a base do Scrum / Os 12 Principios do Manifesto Agil.',
    videos: [
      {
        kind: 'youtube',
        title: 'Manifesto Agil: O que e e por que e a base do Scrum',
        url: 'https://www.youtube.com/watch?v=-Q_0V1SSu5I',
      },
      {
        kind: 'youtube',
        title: 'Os 12 Principios do Manifesto Agil',
        url: 'https://www.youtube.com/watch?v=e4VYnCRU25E',
      },
    ],
  },
  {
    id: 'modelos-processo',
    title: 'Modelos de Processo',
    description: 'Modelos de processo e atividades / Cascata, Incremental, Prototipacao e Espiral.',
    videos: [
      {
        kind: 'youtube',
        title: 'Modelos de processo e atividades',
        url: 'https://www.youtube.com/watch?v=kO1PSkzTsYc',
      },
      {
        kind: 'youtube',
        title: 'Cascata, Incremental, Prototipacao e Espiral',
        url: 'https://www.youtube.com/watch?v=WYmWKUcBjyk',
      },
    ],
  },
  {
    id: 'requisitos',
    title: 'Requisitos',
    description: 'Funcionais e nao-funcionais / Tipos de requisitos.',
    videos: [
      {
        kind: 'youtube',
        title: 'Requisitos funcionais e nao-funcionais',
        url: 'https://www.youtube.com/watch?v=vbl8W0eUUzs',
      },
      {
        kind: 'youtube',
        title: 'Tipos de Requisitos',
        url: 'https://www.youtube.com/watch?v=kTusEEsdTwY',
      },
    ],
  },
  {
    id: 'natureza-software',
    title: 'Natureza do Software',
    description: 'Definicao, caracteristicas e tipos.',
    videos: [
      {
        kind: 'youtube',
        title: 'Definicao, caracteristicas e tipos de software',
        url: 'https://www.youtube.com/watch?v=kO1PSkzTsYc',
      },
    ],
  },
  {
    id: 'mitos-gerenciamento',
    title: 'Mitos e Gerenciamento',
    description: 'Lei de Brooks e os mitos do gerente, engenheiro e cliente.',
    videos: [
      {
        kind: 'youtube',
        title: '8 Mitos da Engenharia de Software',
        url: 'https://www.youtube.com/watch?v=3O49yIVb4Qk',
      },
    ],
  },
];

export const topics = [
  { id: 'manifesto-agil', name: 'Manifesto Agil vs Tradicionais', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'modelos-processo', name: 'Modelos de Processo', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'requisitos', name: 'Requisitos de Software', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'natureza-manutencao', name: 'Natureza / Manutencao', frequency: '2/3 provas', level: 'frequente' },
  { id: 'gerencia-brooks', name: 'Gerencia / Lei de Brooks', frequency: '1/3 provas', level: 'apareceu' },
];

const resourcesByTopic = {
  manifesto: topicVideoSets.find((item) => item.id === 'manifesto-agil')?.videos || [],
  modelos: topicVideoSets.find((item) => item.id === 'modelos-processo')?.videos || [],
  requisitos: topicVideoSets.find((item) => item.id === 'requisitos')?.videos || [],
  natureza: topicVideoSets.find((item) => item.id === 'natureza-software')?.videos || [],
  mitos: topicVideoSets.find((item) => item.id === 'mitos-gerenciamento')?.videos || [],
  playlists: referencePlaylists.map((playlist) => ({
    kind: 'youtube',
    title: playlist.title,
    url: playlist.url,
  })),
};

const studyPlanNoturnoBase = [
  {
    date: '2026-04-01',
    label: 'Qua 01/04',
    topic: 'Introducao e natureza do software',
    tasks: [
      'Definicao de software versus programacao e 5 tipos de software.',
      'As 3 caracteristicas: nao desgasta, nao e fabricado, sob encomenda.',
      'Pratica dissertativa: obsolescencia e impactos no trabalho do engenheiro.',
    ],
    resources: resourcesByTopic.natureza,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Reforce obsolescencia, manutencao continua e diferenca entre software e programa.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Obsolescencia caiu em 2023. Explique por que software nao desgasta, mas fica obsoleto.',
      },
    ],
  },
  {
    date: '2026-04-02',
    label: 'Qui 02/04',
    topic: 'Mitos da engenharia e Lei de Brooks',
    tasks: [
      'Mitos do gerente, engenheiro e cliente.',
      'Lei de Brooks aplicada em projeto atrasado.',
      'Escrever refutacoes curtas para cada mito.',
    ],
    resources: resourcesByTopic.mitos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Conecte os mitos com manutencao, comunicacao e riscos de decisao gerencial.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'A questao de 2024 cobrou Lei de Brooks com argumentacao. Treine causa e consequencia.',
      },
    ],
  },
  {
    date: '2026-04-03',
    label: 'Sex 03/04',
    topic: 'Processo de software e atividades',
    tasks: [
      'Por que seguir processo ao inves de codificar sem planejamento.',
      'Memorizar as 6 atividades e a ordem.',
      'Verificacao versus validacao com exemplo pratico.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Analise, projeto, implementacao, V&V, entrega e manutencao devem formar um fluxo coeso.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Questoes de modelos exigem entender como o processo muda em cada abordagem.',
      },
    ],
  },
  {
    date: '2026-04-04',
    label: 'Sab 04/04',
    topic: 'Modelos I: cascata, prototipacao e incremental',
    tasks: [
      'Cascata: quando usar e principais falhas.',
      'Prototipacao para cenarios sem clareza de requisitos.',
      'Incremental em entregas por partes.',
      'Pratica: cenario Elisa e escolha do modelo.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Compare os modelos com foco em estabilidade de requisitos e velocidade de feedback.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'A pergunta Elisa usa modelo X apareceu nas provas. Treine resposta para cada modelo.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Modelos II: espiral, RAD e revisao geral',
    tasks: [
      'Espiral e analise de riscos por ciclo.',
      '4a Geracao / RAD: vantagens e limites.',
      'Revisao dos 6 modelos com quadro comparativo.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Espiral nao combina com cronograma totalmente fechado no inicio.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Modelos cairam nas 3 provas. Saiba justificar adequacao com contexto de requisitos e risco.',
      },
    ],
  },
  {
    date: '2026-04-06',
    label: 'Seg 06/04',
    topic: 'Manifesto agil versus tradicional',
    tasks: [
      'Os 4 valores do manifesto e principios mais cobrados.',
      'Agil versus tradicional em mudancas de requisitos.',
      'Agil versus tradicional na organizacao da equipe.',
      'Pratica dissertativa com dois cenarios.',
    ],
    resources: resourcesByTopic.manifesto,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Foque em entregas frequentes, colaboracao com cliente e adaptabilidade.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Agil apareceu nas 3 provas. Treine respostas por angulo: mudancas, equipe e entregas.',
      },
    ],
  },
  {
    date: '2026-04-07',
    label: 'Ter 07/04',
    topic: 'Requisitos e revisao geral',
    tasks: [
      'Funcionais versus nao-funcionais com exemplos.',
      'Requisitos implicitos e legais.',
      'Tecnicas observacionais de levantamento.',
      'Revisao final dos blocos da semana.',
    ],
    resources: resourcesByTopic.requisitos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Requisitos legais nao podem ser ignorados; implicitos exigem refinamento de descoberta.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Requisitos cairam nas 3 provas com enfoques diferentes. Treine exemplos claros.',
      },
    ],
  },
  {
    date: '2026-04-08',
    label: 'Qua 08/04',
    topic: 'Dia da prova',
    tasks: [
      'Caneta azul ou preta.',
      'Ler as 5 questoes antes de responder.',
      'Estruturar resposta: introducao, desenvolvimento e conclusao.',
      'Gerenciar tempo de cerca de 20 min por questao.',
    ],
    resources: resourcesByTopic.playlists,
    notes: [
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Evite respostas sem estrutura. Erros de portugues e organizacao reduzem nota.',
      },
    ],
    isExamDay: true,
  },
];

const studyPlanVespertinoBase = [
  {
    date: '2026-04-01',
    label: 'Qua 01/04',
    topic: 'Introducao e natureza do software',
    tasks: [
      'Definicao e tipos de software.',
      'As 3 caracteristicas fundamentais.',
      'Pratica: obsolescencia e manutencao.',
    ],
    resources: resourcesByTopic.natureza,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Conecte caracteristicas do software com implicacoes praticas para o engenheiro.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Obsolescencia ja caiu em prova. Tenha argumento pronto em formato dissertativo.',
      },
    ],
  },
  {
    date: '2026-04-02',
    label: 'Qui 02/04',
    topic: 'Mitos da engenharia e Lei de Brooks',
    tasks: [
      'Mitos do gerente, engenheiro e cliente.',
      'Lei de Brooks na pratica.',
      'Pratica: escrever refutacoes.',
    ],
    resources: resourcesByTopic.mitos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Relacione mitos com risco de atraso, retrabalho e manutencao.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Lei de Brooks foi cobrada em 2024. Explique curva de aprendizado e comunicacao.',
      },
    ],
  },
  {
    date: '2026-04-03',
    label: 'Sex 03/04',
    topic: 'Processo de software',
    tasks: [
      'Importancia de processo.',
      'As 6 atividades e V&V.',
      'Pratica: fluxo completo de memoria.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Diferencie verificacao (produto certo?) e validacao (produto para o cliente certo?).',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Essa base sustenta as questoes de modelos. Entenda o encadeamento das etapas.',
      },
    ],
  },
  {
    date: '2026-04-04',
    label: 'Sab 04/04',
    topic: 'Modelos I: cascata, prototipacao e incremental',
    tasks: [
      'Cascata, prototipacao e incremental.',
      'Codifica-remenda e por que evitar.',
      'Pratica: adequacao de cenarios.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Compare modelos por previsibilidade, flexibilidade e resposta a requisitos incertos.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Treine a resposta tipo Elisa para cascata e incremental.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Modelos II: espiral e RAD',
    tasks: [
      'Espiral com foco em risco.',
      'RAD/4a geracao: vantagens e limitacoes.',
      'Pratica: simulados de modelos.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Espiral exige iteracoes; RAD prioriza velocidade com apoio forte de ferramentas.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Modelos estao presentes em todas as provas. Domine comparacao por cenario.',
      },
    ],
  },
  {
    date: '2026-04-06',
    label: 'Seg 06/04',
    topic: 'Manifesto agil',
    tasks: [
      'Valores e principios do manifesto.',
      'Adaptacao a mudancas versus tradicional.',
      'Pratica: dissertacao agil.',
    ],
    resources: resourcesByTopic.manifesto,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Reforce entregas curtas, colaboracao e adaptabilidade.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Prepare comparacoes objetivas entre agil e tradicional em 3 eixos.',
      },
    ],
  },
  {
    date: '2026-04-07',
    label: 'Ter 07/04',
    topic: 'Requisitos de software',
    tasks: [
      'Funcionais versus nao-funcionais.',
      'Implicitos e legais.',
      'Levantamento observacional.',
    ],
    resources: resourcesByTopic.requisitos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Use exemplos concretos para cada tipo de requisito e impacto do erro de classificacao.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Requisitos legais e func x nao-func cairam em 2024. Treine explicacao com exemplos.',
      },
    ],
  },
  {
    date: '2026-04-08',
    label: 'Qua 08/04',
    topic: 'Revisao Bloco 1',
    tasks: [
      'Revisar introducao, tipos de software e mitos.',
      'Revisar Lei de Brooks de memoria.',
      'Simular 1 questao dissertativa em 20 min.',
    ],
    resources: resourcesByTopic.playlists,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Fechamento do bloco de base antes de aprofundar simulados completos.',
      },
    ],
  },
  {
    date: '2026-04-09',
    label: 'Qui 09/04',
    topic: 'Revisao Bloco 2',
    tasks: [
      'Tabela mental dos modelos.',
      'Simulacao: Elisa usa modelo X.',
      'Revisar vantagens do RAD.',
    ],
    resources: resourcesByTopic.modelos,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Compare modelos por contexto de uso, nao apenas por definicao.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Questoes de modelo valorizam justificativa. Sempre explique o por que da escolha.',
      },
    ],
  },
  {
    date: '2026-04-10',
    label: 'Sex 10/04',
    topic: 'Revisao Bloco 3',
    tasks: [
      'Revisar valores do agil.',
      'Revisar tipos de requisitos.',
      'Simular 2 questoes mistas.',
    ],
    resources: [...resourcesByTopic.manifesto, ...resourcesByTopic.requisitos],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Bloco final de teoria recorrente antes do simulado completo.',
      },
    ],
  },
  {
    date: '2026-04-11',
    label: 'Sab 11/04',
    topic: 'Simulado real',
    tasks: [
      'Simular 1h40 sem interrupcoes com 5 questoes.',
      'Usar apenas caneta e estrutura dissertativa.',
      'Corrigir com os resumos.',
    ],
    resources: resourcesByTopic.playlists,
    notes: [
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Treinar no papel melhora organizacao e reduz branco na prova.',
      },
    ],
  },
  {
    date: '2026-04-12',
    label: 'Dom 12/04',
    topic: 'Vespera',
    tasks: [
      'Leitura do resumo rapido.',
      'Rever pontos fracos do simulado.',
      'Descanso estrategico.',
    ],
    resources: resourcesByTopic.playlists,
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Vespera e para consolidacao e descanso, nao para conteudo novo.',
      },
    ],
  },
  {
    date: '2026-04-13',
    label: 'Seg 13/04',
    topic: 'Dia da prova',
    tasks: [
      'Caneta azul ou preta.',
      'Ler todas as questoes antes de comecar.',
      'Estruturar resposta: introducao, desenvolvimento e conclusao.',
      'Gerenciar tempo de cerca de 20 min por questao.',
    ],
    resources: resourcesByTopic.playlists,
    notes: [
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Mantenha escrita clara e evite respostas muito curtas sem conclusao.',
      },
    ],
    isExamDay: true,
  },
];

function withPlanIds(plan, prefix) {
  return plan.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
  }));
}

export const studyPlanByShift = {
  'noturno-adele': withPlanIds(studyPlanNoturnoBase, 'noturno'),
  'vespertino-snyder': withPlanIds(studyPlanVespertinoBase, 'vespertino'),
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
    id: 'manifesto-agil',
    title: 'Manifesto Agil - o que sempre revisar',
    bullets: [
      'Entregas frequentes de software funcional.',
      'Mudancas de requisitos sao esperadas e tratadas continuamente.',
      'Equipe colaborativa e com comunicacao constante com o cliente.',
      'Comparacao com tradicional: escopo e papeis mais rigidos.',
    ],
  },
  {
    id: 'modelos',
    title: 'Modelos de Processo - guia rapido',
    bullets: [
      'Cascata: requisitos estaveis e fases sequenciais.',
      'Incremental: entregas em partes e escopo evolutivo.',
      'Espiral: ciclos com foco em risco.',
      'Prototipacao: validacao quando o cliente nao tem clareza inicial.',
      'RAD/4a geracao: rapidez com limitacoes de ferramenta.',
      'Codifica-remenda: anti-modelo que gera retrabalho.',
    ],
  },
  {
    id: 'requisitos',
    title: 'Requisitos de Software',
    bullets: [
      'Funcionais: o que o sistema faz.',
      'Nao-funcionais: como o sistema se comporta.',
      'Implicitos: nao documentados e fonte de retrabalho.',
      'Legais: obrigatorios, mesmo com pressao do cliente.',
      'Observacionais: tecnicas de levantamento mais realistas.',
    ],
  },
  {
    id: 'natureza',
    title: 'Natureza / Manutencao / Gerencia',
    bullets: [
      'Software nao desgasta fisicamente, mas se torna obsoleto.',
      'O trabalho do engenheiro continua apos entrega (manutencao e evolucao).',
      'Lei de Brooks: adicionar pessoas em projeto atrasado tende a atrasar ainda mais.',
    ],
  },
];

export const examCoverage = [
  {
    id: 'p1-2023',
    title: 'P1 - Abr/2023',
    bullets: [
      'Natureza: obsolescencia de software (Pressman).',
      'Modelos: incremental em cenario com requisitos incertos.',
      'Agil: manifesto com foco em ciclos curtos e entregas frequentes.',
      'Requisitos: implicitos e tecnicas observacionais.',
    ],
  },
  {
    id: 'p1-2024-ada',
    title: 'P1 - Abr/2024 (Turma Ada)',
    bullets: [
      'Gerencia: Lei de Brooks (adicionar devs em projeto atrasado).',
      'Modelos: cascata e 4a geracao/RAD.',
      'Agil: mudancas de requisitos vs processos tradicionais.',
      'Requisitos: legais e responsabilidade da equipe.',
    ],
  },
  {
    id: 'p1-2024-hopper',
    title: 'P1 - Abr/2024 (Turma Hopper)',
    bullets: [
      'Natureza: manutencao apos entrega.',
      'Modelos: espiral e analise de risco.',
      'Agil: organizacao da equipe em comparacao ao tradicional.',
      'Requisitos: legais, funcionais e nao-funcionais.',
    ],
  },
];
