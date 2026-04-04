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

export const flashcardsBlocoA = [
  {
    id: 'agil-1',
    categoria: 'Manifesto Agil',
    frente: 'O que e o Manifesto Agil?',
    verso:
      'E um documento que formaliza o termo agil no desenvolvimento de software. Ele apresenta valores e principios da agilidade, sem definir uma metodologia unica.',
  },
  {
    id: 'agil-2',
    categoria: 'Manifesto Agil',
    frente: 'O Manifesto Agil define um passo a passo fechado?',
    verso:
      'Nao. O manifesto nao especifica uma metodologia pronta. Ele funciona como base de orientacao para diferentes metodos ageis.',
  },
  {
    id: 'agil-3',
    categoria: 'Manifesto Agil',
    frente: 'Quais sao os 4 valores do Manifesto Agil?',
    verso:
      '1) Individuos e interacoes mais que processos e ferramentas. 2) Software em funcionamento mais que documentacao abrangente. 3) Colaboracao com o cliente mais que negociacao de contratos. 4) Responder a mudancas mais que seguir um plano.',
  },
  {
    id: 'agil-4',
    categoria: 'Principios Ageis',
    frente: 'Qual e a maior prioridade segundo o 1o principio agil?',
    verso:
      'Satisfazer o cliente por meio da entrega continua e adiantada de software com valor agregado.',
  },
  {
    id: 'agil-5',
    categoria: 'Principios Ageis',
    frente: 'Como o agil enxerga mudancas de requisitos, mesmo tardiamente?',
    verso:
      'Mudancas sao bem-vindas, mesmo tarde no desenvolvimento, porque os processos ageis tiram proveito delas para aumentar valor e vantagem competitiva.',
  },
  {
    id: 'agil-6',
    categoria: 'Principios Ageis',
    frente: 'O que significa trabalhar com entregas frequentes no agil?',
    verso:
      'Significa entregar software funcionando em ciclos curtos, de poucas semanas a poucos meses, preferindo intervalos menores.',
  },
  {
    id: 'agil-7',
    categoria: 'Principios Ageis',
    frente: 'Qual e o papel do cliente no desenvolvimento agil?',
    verso:
      'Cliente e equipe participam continuamente. Pessoas de negocio e desenvolvedores colaboram ao longo de todo o projeto.',
  },
  {
    id: 'agil-8',
    categoria: 'Principios Ageis',
    frente: 'Como a equipe e vista no contexto agil?',
    verso:
      'Como um grupo de individuos motivados, com suporte e confianca para executar o trabalho, em estrutura mais autogerenciavel.',
  },
  {
    id: 'agil-9',
    categoria: 'Principios Ageis',
    frente: 'Qual e a principal medida de progresso em processos ageis?',
    verso:
      'Software funcionando. O progresso e medido por valor entregue, nao por burocracia ou volume de documentacao.',
  },
  {
    id: 'agil-10',
    categoria: 'Agil vs Tradicional',
    frente: 'Qual diferenca central entre desenvolvimento agil e tradicional?',
    verso:
      'Tradicional tende a ser mais burocratico e lento para mudancas. Agil prioriza ciclos curtos, colaboracao com cliente e adaptacao continua.',
  },
  {
    id: 'agil-11',
    categoria: 'Principios Ageis',
    frente: 'No agil, qual e o meio ideal de comunicacao entre membros da equipe?',
    verso:
      'Comunicacao direta, preferencialmente face a face, por ser o meio mais eficiente e eficaz de transmitir informacoes.',
  },
  {
    id: 'agil-12',
    categoria: 'Principios Ageis',
    frente: 'O que e desenvolvimento sustentavel no contexto agil?',
    verso:
      'E manter um ritmo constante e realista de trabalho, sustentavel para patrocinadores, desenvolvedores e usuarios sem sobrecarga continua.',
  },
  {
    id: 'agil-13',
    categoria: 'Principios Ageis',
    frente: 'Por que excelencia tecnica e bom design aumentam a agilidade?',
    verso:
      'Porque reduzem retrabalho e correcoes futuras, liberando tempo para evolucao real do produto.',
  },
  {
    id: 'agil-14',
    categoria: 'Principios Ageis',
    frente: 'O que o principio da simplicidade quer dizer no agil?',
    verso:
      'Maximizar o trabalho nao realizado e evitar complexidade desnecessaria, focando no que realmente gera valor.',
  },
  {
    id: 'agil-15',
    categoria: 'Principios Ageis',
    frente:
      'O que significa dizer que melhores arquiteturas e designs emergem de equipes auto-organizaveis?',
    verso:
      'Equipes com autonomia para decidir e se organizar tendem a produzir solucoes melhores do que estruturas excessivamente centralizadas.',
  },
  {
    id: 'agil-16',
    categoria: 'Principios Ageis',
    frente: 'Segundo o ultimo principio agil, o que a equipe deve fazer regularmente?',
    verso:
      'Refletir sobre como se tornar mais eficaz e ajustar comportamento e processo continuamente.',
  },
  {
    id: 'agil-17',
    categoria: 'Agil vs Tradicional',
    frente:
      'Em prova, como resumir a diferenca agil vs tradicional sobre mudancas de requisitos?',
    verso:
      'Agil abraca mudancas, inclusive tardias. Tradicional tende a resistir mudancas e congelar escopo mais cedo.',
  },
  {
    id: 'agil-18',
    categoria: 'Agil vs Tradicional',
    frente:
      'Em prova, como resumir a diferenca agil vs tradicional sobre organizacao da equipe?',
    verso:
      'No agil, equipe autogerenciavel e colaborativa. No tradicional, estrutura mais hierarquica e papeis mais rigidos.',
  },
  {
    id: 'agil-19',
    categoria: 'Agil vs Tradicional',
    frente: 'Em prova, como resumir a diferenca agil vs tradicional sobre entrega?',
    verso:
      'No agil, foco em entregas frequentes de software funcionando. No tradicional, maior peso em planejamento e documentacao antes da entrega final.',
  },
  {
    id: 'agil-20',
    categoria: 'Metodos Ageis',
    frente: 'Cite um metodo agil mencionado no material.',
    verso: 'Extreme Programming (XP), apresentado como um dos percursores do Manifesto Agil.',
  },
];

export const questoesBlocoA = [
  {
    id: 'qa-1',
    categoria: 'Manifesto Agil',
    tipo: 'Fixacao',
    pergunta: 'O que é o Manifesto Ágil e por que ele não pode ser confundido com uma metodologia pronta?',
    resposta: 'Resposta Completa:\nO Manifesto Ágil é um documento publicado em 2001 que formaliza o termo "Ágil" no desenvolvimento de software. Ele reúne um conjunto de valores e princípios que guiam como equipes devem pensar e trabalhar — mas não define um processo fechado com etapas obrigatórias. É exatamente por isso que não pode ser confundido com uma metodologia: ele é uma base filosófica sobre a qual métodos ágeis concretos, como Scrum e XP, são construídos.\n\n\n⚠️ Pontos que nao podem faltar:\n- formaliza o que significa ser "ágil" no desenvolvimento de software;\n- define valores e princípios, não um passo a passo fixo;\n- funciona como base para métodos ágeis, não como receita pronta.',
  },
  {
    id: 'qa-2',
    categoria: 'Manifesto Agil',
    tipo: 'Fixacao',
    pergunta: 'Quais são os 4 valores do Manifesto Ágil?',
    resposta: 'Resposta Completa:\nOs 4 valores do Manifesto Ágil são apresentados em pares, sempre priorizando o lado esquerdo — sem negar o valor do lado direito:\n1. Indivíduos e interações mais que processos e ferramentas.\n2. Software em funcionamento mais que documentação abrangente.\n3. Colaboração com o cliente mais que negociação de contratos.\n4. Responder a mudanças mais que seguir um plano.\n\nVale destacar: o manifesto não diz que processos, documentação, contratos ou planos não têm valor — apenas que os itens à esquerda têm mais peso nas decisões.\n\n\n⚠️ Pontos que nao podem faltar:\n- pessoas e interação acima de processos e ferramentas;\n- software funcionando acima de documentação extensa;\n- colaboração com o cliente acima de negociação contratual;\n- adaptação a mudanças acima de seguir um plano rígido.',
  },
  {
    id: 'qa-3',
    categoria: 'Agil vs Tradicional',
    tipo: 'Comparacao',
    pergunta: 'Explique a principal diferença entre desenvolvimento ágil e desenvolvimento tradicional.',
    resposta: 'Resposta Completa:\nO desenvolvimento tradicional é orientado a planejamento extensivo feito no início, fases sequenciais e resistência a mudanças após o escopo ser definido. O ágil, por outro lado, organiza o trabalho em ciclos curtos e iterativos, mantém o cliente próximo durante todo o processo e trata mudanças de requisitos como algo natural — e até desejável — para aumentar o valor do produto. Enquanto o tradicional prioriza previsibilidade, o ágil prioriza adaptabilidade.\n\n\n⚠️ Pontos que nao podem faltar:\n- tradicional: planejamento inicial extenso, fases rígidas, resposta lenta a mudanças;\n- ágil: ciclos curtos, colaboração contínua com o cliente, mudanças bem-vindas;\n- a diferença central é entre previsibilidade e adaptabilidade.',
  },
  {
    id: 'qa-4',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'Por que o ágil aceita mudanças nos requisitos até mesmo tardiamente no desenvolvimento?',
    resposta: 'Resposta Completa:\nPorque o pensamento ágil reconhece que o entendimento sobre o que o software deve fazer evolui com o tempo — tanto para o cliente quanto para a equipe. Uma mudança tardia pode refletir uma necessidade real do negócio que não estava clara no início. Bloquear essa mudança significaria entregar um produto desatualizado. Por isso, o ágil estrutura o desenvolvimento em iterações curtas justamente para conseguir incorporar essas mudanças com o menor custo possível.\n\n\n⚠️ Pontos que nao podem faltar:\n- o entendimento do produto evolui ao longo do projeto;\n- mudanças tardias podem representar mais valor para o cliente;\n- iterações curtas reduzem o custo de incorporar mudanças.',
  },
  {
    id: 'qa-5',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'O que significa dizer que, no ágil, "software funcionando é a medida primária de progresso"?',
    resposta: 'Resposta Completa:\nSignifica que a principal evidência de avanço em um projeto ágil é a existência de software que funciona e pode ser usado ou validado, não a conclusão de documentos, o preenchimento de cronogramas ou o cumprimento de etapas burocráticas. Um projeto pode ter centenas de páginas de especificação e nenhum resultado utilizável — o ágil considera isso falta de progresso real.\n\n\n⚠️ Pontos que nao podem faltar:\n- progresso real é medido por entrega de software funcionando;\n- documentos e cronogramas não substituem resultados utilizáveis;\n- o foco está no valor entregue, não em artefatos intermediários.',
  },
  {
    id: 'qa-6',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'Qual é o papel do cliente no desenvolvimento ágil?',
    resposta: 'Resposta Completa:\nNo desenvolvimento ágil, o cliente — ou representantes do negócio — deve estar presente e acessível durante todo o projeto, e não apenas na definição inicial dos requisitos e na entrega final. Essa presença contínua permite validar entregas parciais, esclarecer dúvidas rapidamente, identificar mudanças necessárias e garantir que o produto esteja sempre alinhado com o valor esperado. O ágil trata a colaboração como condição para o sucesso, não como cortesia.\n\n\n⚠️ Pontos que nao podem faltar:\n- o cliente participa ativamente durante todo o desenvolvimento;\n- valida entregas, tira dúvidas e ajuda a priorizar mudanças;\n- a colaboração contínua é estrutural no ágil, não opcional.',
  },
  {
    id: 'qa-7',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'Explique o princípio do desenvolvimento sustentável nos processos ágeis.',
    resposta: 'Resposta Completa:\nDesenvolvimento sustentável significa que patrocinadores, equipe e usuários devem ser capazes de manter um ritmo constante indefinidamente. O objetivo é evitar picos de sobrecarga — os chamados "crunches" — que parecem acelerar o projeto no curto prazo, mas costumam gerar cansaço, queda na qualidade do código, aumento de erros e, consequentemente, mais retrabalho. No ágil, ritmo estável é preferível a velocidade insustentável.\n\n\n⚠️ Pontos que nao podem faltar:\n- equipe, patrocinadores e usuários devem sustentar um ritmo constante;\n- "crunches" geram cansaço, erros e retrabalho a médio prazo;\n- ritmo estável produz resultados mais confiáveis do que pressão contínua.',
  },
  {
    id: 'qa-8',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'Por que a comunicação direta, preferencialmente face a face, é valorizada no ágil?',
    resposta: 'Resposta Completa:\nPorque ela é considerada a forma mais eficiente e eficaz de transmitir informações dentro e para a equipe de desenvolvimento. A comunicação direta reduz interpretações erradas, acelera decisões e dispensa a criação de documentos intermediários apenas para transmitir uma informação simples. Isso não significa que documentação não tem lugar no ágil — significa que ela não deve substituir o diálogo direto quando esse é possível.\n\n\n⚠️ Pontos que nao podem faltar:\n- comunicação direta reduz ruídos e acelera decisões;\n- é a forma mais eficiente de transmitir informações à equipe;\n- não elimina a documentação, mas prioriza o diálogo.',
  },
  {
    id: 'qa-9',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'O que significa dizer que equipes ágeis são auto-organizáveis?',
    resposta: 'Resposta Completa:\nSignifica que a equipe tem autonomia para decidir como organizar o trabalho, distribuir tarefas e construir soluções — sem precisar de aprovação hierárquica para cada passo. Isso não elimina lideranças, mas muda seu papel: em vez de chefiar e controlar, líderes apoiam e removem impedimentos. Segundo os princípios ágeis, equipes com essa autonomia tendem a produzir melhores arquiteturas, requisitos e designs.\n\n\n⚠️ Pontos que nao podem faltar:\n- a equipe decide como distribuir o trabalho e construir soluções;\n- liderança assume papel de apoio, não de controle rígido;\n- autonomia tende a melhorar a qualidade técnica das entregas.',
  },
  {
    id: 'qa-10',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'Explique por que excelência técnica e bom design aumentam a agilidade.',
    resposta: 'Resposta Completa:\nPorque uma base técnica de qualidade torna o sistema mais fácil de modificar e evoluir. Quando o código é bem estruturado e o design é cuidadoso, a equipe consegue incorporar novas funcionalidades ou corrigir problemas com menos esforço. O oposto também é verdadeiro: dívida técnica acumulada torna cada mudança mais cara, mais arriscada e mais lenta — o que contradiz diretamente a proposta ágil.\n\n\n⚠️ Pontos que nao podem faltar:\n- boa base técnica facilita adaptações futuras;\n- dívida técnica torna mudanças mais caras e lentas;\n- excelência técnica é condição para sustentar agilidade ao longo do tempo.',
  },
  {
    id: 'qa-11',
    categoria: 'Principios Ageis',
    tipo: 'Fixacao',
    pergunta: 'O que o princípio da simplicidade quer dizer no contexto ágil?',
    resposta: 'Resposta Completa:\nSimplicidade, no ágil, significa fazer apenas o que é necessário agora — nem mais, nem menos. O manifesto fala em "maximizar a quantidade de trabalho não realizado", ou seja, evitar implementar funcionalidades, estruturas ou abstrações que ainda não são necessárias. Isso reduz complexidade, facilita manutenção e evita desperdício de tempo com código que talvez nunca seja utilizado.\n\n\n⚠️ Pontos que nao podem faltar:\n- fazer apenas o que é necessário no momento atual;\n- evitar complexidade e funcionalidades desnecessárias;\n- simplicidade reduz custo de manutenção e facilita evolução.',
  },
  {
    id: 'qa-12',
    categoria: 'Fundamentos Ageis',
    tipo: 'Comparacao',
    pergunta: 'O ágil significa desenvolver sem metodologia, com improviso e pouca organização?',
    resposta: 'Resposta Completa:\nNão. O ágil surgiu justamente como resposta organizada aos problemas dos modelos tradicionais — mas também ao caos que alguns times geravam ao simplesmente abandonar qualquer estrutura. Ágil tem valores claros, princípios definidos e práticas concretas. Métodos como Scrum e XP são exemplos de como o ágil se organiza de forma rigorosa. A diferença em relação ao tradicional está no tipo de organização — mais leve e adaptável —, não na ausência dela.\n\n\n⚠️ Pontos que nao podem faltar:\n- ágil não é ausência de método nem improviso;\n- possui valores, princípios e práticas bem definidas;\n- a organização ágil é mais leve e adaptável, mas ainda é organização.',
  },
  {
    id: 'qa-13',
    categoria: 'Metodos Ageis (XP)',
    tipo: 'Fixacao',
    pergunta: 'O que é Extreme Programming (XP) e por que ele aparece no estudo de métodos ágeis?',
    resposta: 'Resposta Completa:\nO XP é um método ágil criado por Kent Beck, em parte com contribuições de Martin Fowler, que surgiu durante o desenvolvimento do projeto C3 na Chrysler. Ele é estudado como um dos percursores do Manifesto Ágil — muitos dos valores e práticas que o manifesto formaliza estavam presentes no XP antes de 2001. Seu estudo ajuda a entender como os princípios ágeis se traduzem em comportamentos concretos de uma equipe de desenvolvimento.\n\n\n⚠️ Pontos que nao podem faltar:\n- método ágil criado por Kent Beck, com participação de Martin Fowler;\n- surgiu no contexto do projeto C3 da Chrysler;\n- precursor direto do Manifesto Ágil.',
  },
  {
    id: 'qa-14',
    categoria: 'Metodos Ageis (XP)',
    tipo: 'Fixacao',
    pergunta: 'Quais são as bases do XP apresentadas no material?',
    resposta: 'Resposta Completa:\nO XP é organizado em torno de três bases principais: ciclo de vida, 5 valores e 12 práticas. O ciclo de vida do XP funciona em diferentes escalas de tempo — planejamento geral, ciclo trimestral, ciclo semanal e ciclo diário —, permitindo que a equipe alinhe estratégia e execução em diferentes horizontes de planejamento.\n\n\n⚠️ Pontos que nao podem faltar:\n- as três bases são: ciclo de vida, 5 valores e 12 práticas;\n- o ciclo de vida opera em quatro escalas: geral, trimestral, semanal e diário;\n- essa estrutura permite alinhar planejamento estratégico com execução cotidiana.',
  },
  {
    id: 'qa-15',
    categoria: 'Metodos Ageis (XP)',
    tipo: 'Fixacao',
    pergunta: 'Cite os 5 valores do XP e explique brevemente cada um.',
    resposta: 'Resposta Completa:\nOs 5 valores do XP são:\n- Simplicidade: fazer somente o necessário, sem complicar o que pode ser simples.\n- Comunicação: todos na equipe devem se comunicar constantemente, inclusive com o cliente.\n- Feedback: mostrar software funcionando cedo e frequentemente, ouvir retornos e ajustar o rumo.\n- Respeito: cada membro da equipe contribui com valor, e esse valor deve ser reconhecido.\n- Coragem: ser honesto sobre o progresso real, enfrentar problemas difíceis e aceitar mudanças necessárias.\n\n\n⚠️ Pontos que nao podem faltar:\n- simplicidade, comunicação, feedback, respeito e coragem;\n- feedback envolve mostrar software cedo e reagir aos retornos;\n- coragem implica honestidade sobre o que está funcionando ou não.',
  },
  {
    id: 'qa-16',
    categoria: 'Agil Aplicado',
    tipo: 'Situacional',
    pergunta: 'Situação prática: um cliente muda parte dos requisitos no meio do projeto. Como o pensamento ágil tende a lidar com isso?',
    resposta: 'Resposta Completa:\nO pensamento ágil tende a tratar a mudança como informação válida, não como problema automático. A equipe abre um diálogo com o cliente para entender a nova necessidade, avalia o impacto e decide junto como incorporá-la no próximo ciclo de desenvolvimento. Não significa aceitar qualquer mudança a qualquer custo — significa ter um processo que facilita a avaliação e a incorporação controlada de mudanças, em vez de bloqueá-las por princípio.\n\n\n⚠️ Pontos que nao podem faltar:\n- mudança é tratada como informação, não como ameaça;\n- equipe dialoga com o cliente para entender a necessidade;\n- a incorporação é avaliada e planejada em ciclos curtos.',
  },
  {
    id: 'qa-17',
    categoria: 'Agil Aplicado',
    tipo: 'Situacional',
    pergunta: 'Situação prática: uma equipe está medindo o sucesso do projeto apenas pelo número de documentos produzidos. Por que isso contraria a lógica ágil?',
    resposta: 'Resposta Completa:\nPorque, para o ágil, documentos são meios, não fins. O principal indicador de progresso é software que funciona e gera valor. Uma equipe pode produzir volumes imensos de documentação enquanto não entrega nenhum resultado utilizável — e isso, do ponto de vista ágil, representa ausência de progresso real. Documentação tem seu papel, especialmente para comunicação e registro, mas não deve ser o critério central de sucesso.\n\n\n⚠️ Pontos que nao podem faltar:\n- documentos são meios de suporte, não evidência de progresso real;\n- software funcionando é o principal indicador de avanço;\n- produzir muito documento e pouco software utilizável é, para o ágil, improdutividade.',
  },
  {
    id: 'qa-18',
    categoria: 'Agil Aplicado',
    tipo: 'Situacional',
    pergunta: 'Situação prática: a empresa quer forçar a equipe a trabalhar muitas horas extras por meses para "acelerar" a entrega. Como responder isso com base nos princípios ágeis?',
    resposta: 'Resposta Completa:\nEssa decisão contraria diretamente o princípio do desenvolvimento sustentável. O ágil prevê que o ritmo de trabalho deve ser mantível indefinidamente — não apenas por semanas. O excesso contínuo de horas extras gera cansaço acumulado, queda na concentração, aumento de erros e, consequentemente, mais retrabalho. O que parece acelerar no curto prazo frequentemente atrasa no médio prazo pela degradação da qualidade e do engajamento da equipe.\n\n\n⚠️ Pontos que nao podem faltar:\n- contraria o princípio do desenvolvimento sustentável;\n- ritmo insustentável gera cansaço, erros e retrabalho;\n- a aceleração aparente no curto prazo tende a atrasar o projeto no médio prazo.',
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
