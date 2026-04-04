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

export const flashcardsBlocoB = [
  {
    id: 'modelos-b-1',
    categoria: 'Fundamentos de Modelos',
    frente: 'O que é um modelo de processo?',
    verso: 'É uma descrição geral e simplificada de processos que possuem ciclo de vida semelhante. Ele basicamente descreve o ciclo de vida e facilita a compreensão dos processos.',
  },
  {
    id: 'modelos-b-2',
    categoria: 'Fundamentos de Modelos',
    frente: 'Quais são os modelos clássicos apresentados nos materiais?',
    verso: 'Codifica-remenda, Cascata (sequencial/linear), Incremental, Espiral e RAD.',
  },
  {
    id: 'modelos-b-3',
    categoria: 'Codifica-remenda',
    frente: 'O que é o modelo codifica-remenda na prática?',
    verso: 'Na prática, é a ausência de um processo definido. A lógica é “sentar e programar”; se der errado, corrige depois.',
  },
  {
    id: 'modelos-b-4',
    categoria: 'Codifica-remenda',
    frente: 'Quais ideias erradas sustentam o codifica-remenda?',
    verso: 'Os materiais associam o modelo a velhos mitos, como: achar que o único produto do processo é o programa, acreditar que começar a programar mais cedo sempre significa entregar mais cedo, e pensar que processos de engenharia só desperdiçam tempo e esforço.',
  },
  {
    id: 'modelos-b-5',
    categoria: 'Codifica-remenda',
    frente: 'Quais são as principais características do codifica-remenda?',
    verso: 'Ele é voluntarista, simples e caótico. Depende muito da atitude individual, não segue regras claras, não controla bem qualidade nem riscos e pode deixar erros passarem despercebidos.',
  },
  {
    id: 'modelos-b-6',
    categoria: 'Modelo Cascata',
    frente: 'Quais são as etapas centrais do modelo cascata mostradas nos slides?',
    verso: 'Análise, Projeto, Implementação e Entrega. A lógica é sequencial: primeiro entender o que o software deve fazer, depois definir como ele fará, implementar e então entregar.',
  },
  {
    id: 'modelos-b-7',
    categoria: 'Modelo Cascata',
    frente: 'Quais são os principais problemas do cascata destacados no material?',
    verso: 'Baixa comunicação com o cliente, necessidade de conhecer os requisitos a priori e baixa reação a mudanças.',
  },
  {
    id: 'modelos-b-8',
    categoria: 'Modelo Cascata',
    frente: 'Quando o modelo cascata tende a ser mais adequado?',
    verso: 'Quando os requisitos estão bem definidos desde o início e o projeto exige uma sequência mais rígida de etapas. O próprio cronograma destaca essa relação entre cascata e requisitos bem conhecidos.',
  },
  {
    id: 'modelos-b-9',
    categoria: 'Prototipagem',
    frente: 'Qual é a ideia central do desenvolvimento por prototipagem?',
    verso: 'Melhorar a comunicação com o cliente, melhorar o levantamento de requisitos e melhorar o entendimento do software por meio de mock-ups ou protótipos rápidos.',
  },
  {
    id: 'modelos-b-10',
    categoria: 'Prototipagem',
    frente: 'Como é o protótipo segundo os slides?',
    verso: 'É uma versão de testes da interface do software, de construção rápida, não necessariamente completamente funcional e de qualidade reduzida, mas suficiente para permitir que o usuário teste o “software”.',
  },
  {
    id: 'modelos-b-11',
    categoria: 'Prototipagem',
    frente: 'O que normalmente acontece quando o protótipo fica “bom”?',
    verso: 'Inicia-se a produção do produto real, geralmente usando um modelo cascata. Nesse caso, a prototipagem funciona como substituta da análise inicial.',
  },
  {
    id: 'modelos-b-12',
    categoria: 'Prototipagem',
    frente: 'Quais são as vantagens da prototipagem?',
    verso: 'Menor erro, maior comunicação com o cliente e visibilidade antecipada do resultado final.',
  },
  {
    id: 'modelos-b-13',
    categoria: 'Prototipagem',
    frente: 'Quais são as desvantagens da prototipagem?',
    verso: 'Pode ser um processo longo, o cliente pode não entender a diferença entre mock-up e produto real, e há tendência de se apegar a decisões de projeto feitas ainda no protótipo.',
  },
  {
    id: 'modelos-b-14',
    categoria: 'Incremental e Evolutivos',
    frente: 'O que caracteriza os modelos evolutivos?',
    verso: 'Eles aplicam a característica iterativa do cascata a todo o desenvolvimento, permitindo desenvolvimento modular. Os principais modelos evolutivos mostrados são o Incremental e o Espiral.',
  },
  {
    id: 'modelos-b-15',
    categoria: 'Incremental e Evolutivos',
    frente: 'Como o material define o modelo incremental?',
    verso: 'Ele utiliza abordagem iterativa, mas com a previsibilidade do modelo cascata e com planejamento antecipado. A entrega acontece em partes, por incrementos.',
  },
  {
    id: 'modelos-b-16',
    categoria: 'Incremental e Evolutivos',
    frente: 'Quais são as vantagens do modelo incremental?',
    verso: 'Permite correção de erros em versões posteriores e possibilita desenvolvimento concorrente.',
  },
  {
    id: 'modelos-b-17',
    categoria: 'Incremental e Evolutivos',
    frente: 'Quais são as desvantagens do modelo incremental?',
    verso: 'Exige planejamento complexo, nem todo software pode ser facilmente modularizado e pode ser caro.',
  },
  {
    id: 'modelos-b-18',
    categoria: 'Modelo Espiral',
    frente: 'Como o material caracteriza o modelo espiral?',
    verso: 'Ele se vale do planejamento incremental, permite trabalhar quando os requisitos não são bem compreendidos e é orientado à redução de riscos.',
  },
  {
    id: 'modelos-b-19',
    categoria: 'Modelo Espiral',
    frente: 'Quais são as vantagens do modelo espiral?',
    verso: 'Alta comunicação com o cliente, facilidade de controlar custos e riscos, além de alta reação a mudanças e correção de erros.',
  },
  {
    id: 'modelos-b-20',
    categoria: 'Modelo Espiral',
    frente: 'Quais são as desvantagens do modelo espiral?',
    verso: 'Ele pode ser bastante caro, ter ausência de um planejamento geral fechado desde o início e envolver alta documentação.',
  },
  {
    id: 'modelos-b-21',
    categoria: 'Modelo Espiral',
    frente: 'Por que um cronograma fechado no início entra em conflito com o modelo espiral?',
    verso: 'Porque o espiral trabalha por ciclos e orienta o processo à análise e redução de riscos. Como ele admite mudanças e refinamentos ao longo do caminho, um cronograma totalmente fechado no começo não combina bem com essa lógica.',
  },
  {
    id: 'modelos-b-22',
    categoria: 'RAD e 4a Geracao',
    frente: 'O que são as ferramentas de 4ª geração?',
    verso: 'São ferramentas que partem da ideia de que desenvolvimento não é apenas programação. Elas buscam eliminar a codificação manual, já que boa parte dos erros acontece na implementação.',
  },
  {
    id: 'modelos-b-23',
    categoria: 'RAD e 4a Geracao',
    frente: 'Como funcionam as ferramentas de 4ª geração?',
    verso: 'Elas se baseiam em projeto detalhado e bem feito, fazem geração de código a partir do projeto, evitam erro humano de codificação, mas podem produzir código de baixa qualidade.',
  },
  {
    id: 'modelos-b-24',
    categoria: 'RAD e 4a Geracao',
    frente: 'O que é o modelo RAD?',
    verso: 'É o modelo mais tradicional de 4ª geração. Ele é baseado nessas ferramentas, combina conceitos de 4ª geração com o modelo incremental e pode ser iterativo ou paralelo. RAD significa *Rapid Application Development*.',
  },
  {
    id: 'modelos-b-25',
    categoria: 'RAD e 4a Geracao',
    frente: 'Quais são as vantagens do RAD?',
    verso: 'Elimina erros de implementação, pode ser usado em paralelo e proporciona codificação rápida.',
  },
  {
    id: 'modelos-b-26',
    categoria: 'RAD e 4a Geracao',
    frente: 'Quais são as desvantagens do RAD?',
    verso: 'Pode gerar código de menor qualidade, para uso em paralelo exige muitas equipes e exige software modularizável.',
  },
  {
    id: 'modelos-b-27',
    categoria: 'Aplicacao de Modelos',
    frente: 'Em um caso em que o cliente não sabe bem o que quer, qual modelo tende a ser mais indicado segundo os materiais?',
    verso: 'A prototipagem tende a ser mais indicada, porque melhora a comunicação com o cliente, ajuda no levantamento de requisitos e permite validar ideias antes do desenvolvimento final.',
  },
  {
    id: 'modelos-b-28',
    categoria: 'Aplicacao de Modelos',
    frente: 'Em um caso em que os requisitos não são bem compreendidos, qual modelo tende a ser mais indicado?',
    verso: 'O modelo espiral, porque ele lida melhor com requisitos pouco claros, aceita evolução ao longo do processo e é orientado à redução de riscos.',
  },
  {
    id: 'modelos-b-29',
    categoria: 'Aplicacao de Modelos',
    frente: 'Em um caso em que os requisitos estão bem definidos desde o início, qual modelo tende a ser mais indicado?',
    verso: 'O cascata tende a ser mais adequado, porque trabalha com fases sequenciais rígidas e depende de requisitos conhecidos a priori.',
  },
  {
    id: 'modelos-b-30',
    categoria: 'Aplicacao de Modelos',
    frente: 'Qual modelo é chamado no cronograma de “anti-modelo”?',
    verso: 'O codifica-remenda, porque não tem planejamento real, não organiza adequadamente o processo e tende a gerar dívida técnica e caos no desenvolvimento.',
  },
  {
    id: 'modelos-b-31',
    categoria: 'Aplicacao de Modelos',
    frente: 'Qual é a principal ideia do incremental em linguagem simples?',
    verso: 'Entregar o software em partes, por incrementos, aproveitando iteração e modularização sem abandonar totalmente o planejamento.',
  },
  {
    id: 'modelos-b-32',
    categoria: 'Aplicacao de Modelos',
    frente: 'Qual é a principal diferença entre RAD e prototipagem?',
    verso: 'A prototipagem é voltada a entender melhor requisitos e melhorar a comunicação com o cliente por meio de versões de teste. Já o RAD é um modelo de 4ª geração que busca rapidez de construção com geração automatizada de código e pode operar de forma iterativa ou paralela.',
  },
];

export const flashcardsBlocoC = [
  {
    "id": "requisitos-c-1",
    "categoria": "Fundamentos de Requisitos",
    "frente": "O que são requisitos de software?",
    "verso": "São descrições do que o software deve fazer e das condições que ele deve atender."
  },
  {
    "id": "requisitos-c-2",
    "categoria": "Fundamentos de Requisitos",
    "frente": "O que é análise de requisitos?",
    "verso": "É a atividade que busca entender o problema e definir o que o software vai fazer para resolvê-lo."
  },
  {
    "id": "requisitos-c-3",
    "categoria": "Tipos de Requisitos",
    "frente": "Requisito funcional = ?",
    "verso": "Diz o que o sistema faz."
  },
  {
    "id": "requisitos-c-4",
    "categoria": "Tipos de Requisitos",
    "frente": "Requisito não funcional = ?",
    "verso": "Diz como o sistema deve se comportar."
  },
  {
    "id": "requisitos-c-5",
    "categoria": "Tipos de Requisitos",
    "frente": "Exemplo de requisito funcional.",
    "verso": "“O sistema deve permitir login com e-mail e senha.”"
  },
  {
    "id": "requisitos-c-6",
    "categoria": "Tipos de Requisitos",
    "frente": "Exemplo de requisito não funcional.",
    "verso": "“O sistema deve responder em até 2 segundos.”"
  },
  {
    "id": "requisitos-c-7",
    "categoria": "Tipos de Requisitos",
    "frente": "Diferença central entre funcional e não funcional.",
    "verso": "Funcional = serviço/ação do sistema. Não funcional = qualidade, restrição ou comportamento do sistema."
  },
  {
    "id": "requisitos-c-8",
    "categoria": "Requisitos Implicitos e Legais",
    "frente": "O que é requisito implícito?",
    "verso": "É um requisito esperado, mas não documentado claramente."
  },
  {
    "id": "requisitos-c-9",
    "categoria": "Requisitos Implicitos e Legais",
    "frente": "Por que requisitos implícitos são perigosos?",
    "verso": "Porque geram retrabalho, conflito e falhas de entendimento."
  },
  {
    "id": "requisitos-c-10",
    "categoria": "Requisitos Implicitos e Legais",
    "frente": "Como reduzir requisitos implícitos?",
    "verso": "Com elicitação detalhada, validação e documentação clara."
  },
  {
    "id": "requisitos-c-11",
    "categoria": "Requisitos Implicitos e Legais",
    "frente": "O que é requisito legal ou normativo?",
    "verso": "É um requisito imposto por lei, norma ou regulação externa."
  },
  {
    "id": "requisitos-c-12",
    "categoria": "Requisitos Implicitos e Legais",
    "frente": "O cliente pode mandar ignorar um requisito legal?",
    "verso": "Não. Requisito legal não deve ser ignorado, mesmo se o cliente pedir."
  },
  {
    "id": "requisitos-c-13",
    "categoria": "Levantamento de Requisitos",
    "frente": "O que é levantamento de requisitos?",
    "verso": "É o processo de descobrir, coletar e entender as necessidades do sistema."
  },
  {
    "id": "requisitos-c-14",
    "categoria": "Levantamento de Requisitos",
    "frente": "O que são técnicas observacionais?",
    "verso": "São técnicas em que o analista observa o usuário e o ambiente real de trabalho."
  },
  {
    "id": "requisitos-c-15",
    "categoria": "Levantamento de Requisitos",
    "frente": "Principal vantagem da técnica observacional.",
    "verso": "Captura o uso real do sistema e revela detalhes que o usuário pode não mencionar."
  },
  {
    "id": "requisitos-c-16",
    "categoria": "Levantamento de Requisitos",
    "frente": "Principal desvantagem da técnica observacional.",
    "verso": "Pode ser mais lenta, custosa e constranger quem está sendo observado."
  },
  {
    "id": "requisitos-c-17",
    "categoria": "Levantamento de Requisitos",
    "frente": "Entrevista x observação: diferença rápida.",
    "verso": "Entrevista depende do que a pessoa diz; observação mostra o que ela realmente faz."
  },
  {
    "id": "requisitos-c-18",
    "categoria": "Gestao de Requisitos",
    "frente": "O que é especificação de requisitos?",
    "verso": "É o registro formal e organizado dos requisitos levantados."
  },
  {
    "id": "requisitos-c-19",
    "categoria": "Gestao de Requisitos",
    "frente": "O que é validação de requisitos?",
    "verso": "É verificar se os requisitos estão corretos, completos e alinhados com a necessidade do cliente."
  },
  {
    "id": "requisitos-c-20",
    "categoria": "Gestao de Requisitos",
    "frente": "O que é gerenciamento de requisitos?",
    "verso": "É controlar mudanças, versões e rastreabilidade dos requisitos ao longo do projeto."
  },
  {
    "id": "requisitos-c-21",
    "categoria": "Tipos de Requisitos",
    "frente": "“O sistema deve gerar relatório em PDF.” Isso é que tipo de requisito?",
    "verso": "Requisito funcional."
  },
  {
    "id": "requisitos-c-22",
    "categoria": "Tipos de Requisitos",
    "frente": "“O sistema deve estar disponível 99,9% do tempo.” Isso é que tipo de requisito?",
    "verso": "Requisito não funcional."
  },
  {
    "id": "requisitos-c-23",
    "categoria": "Fundamentos de Requisitos",
    "frente": "Por que requisitos são tão importantes no processo de software?",
    "verso": "Porque orientam projeto, implementação, testes e validação do produto."
  },
  {
    "id": "requisitos-c-24",
    "categoria": "Fundamentos de Requisitos",
    "frente": "Erro clássico em requisitos.",
    "verso": "Começar o desenvolvimento com requisitos vagos, implícitos ou mal validados."
  }
];

export const questoesBlocoC = [
  {
    "id": "qc-1",
    "categoria": "Fundamentos de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "O que são requisitos de software e por que eles são tão importantes no desenvolvimento?",
    "resposta": "Requisitos de software são as descrições do que o sistema deve fazer e das condições que ele deve atender para ser considerado adequado. Eles são importantes porque orientam todo o restante do desenvolvimento: projeto, implementação, testes, validação e até manutenção. Quando os requisitos estão mal entendidos, incompletos ou ambíguos, a equipe corre o risco de construir um sistema tecnicamente correto, mas que não resolve o problema real do cliente.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>requisitos descrevem necessidades, comportamentos e restrições do sistema;</li><li>servem de base para as demais atividades do processo;</li><li>erros em requisitos tendem a se espalhar pelo restante do projeto;</li></ul>"
  },
  {
    "id": "qc-2",
    "categoria": "Tipos de Requisitos",
    "tipo": "Comparacao",
    "pergunta": "Explique a diferença entre requisitos funcionais e requisitos não funcionais.",
    "resposta": "Requisitos funcionais descrevem o que o sistema faz, isto é, as funções, serviços e comportamentos esperados. Já os requisitos não funcionais descrevem como o sistema deve se comportar ou sob quais condições deve operar, envolvendo aspectos como desempenho, segurança, disponibilidade, usabilidade e confiabilidade. Em outras palavras, o funcional trata da função entregue; o não funcional trata da qualidade ou da restrição associada a essa entrega.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>funcionais = o que o sistema faz;</li><li>não funcionais = como o sistema se comporta ou quais restrições deve cumprir;</li><li>os dois são necessários para definir corretamente o produto;</li></ul>"
  },
  {
    "id": "qc-3",
    "categoria": "Tipos de Requisitos",
    "tipo": "Comparacao",
    "pergunta": "Dê exemplos de requisitos funcionais e não funcionais e explique por que eles pertencem a categorias diferentes.",
    "resposta": "Um exemplo de requisito funcional seria: “o sistema deve permitir login com e-mail e senha”. Ele descreve uma capacidade concreta do sistema. Já um exemplo de requisito não funcional seria: “o sistema deve responder à autenticação em até 2 segundos” ou “deve proteger os dados com mecanismos adequados de segurança”. Nesse caso, não se descreve uma função nova, mas sim uma condição de qualidade, desempenho ou restrição aplicada à função.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>exemplo funcional ligado a ação ou serviço do sistema;</li><li>exemplo não funcional ligado a desempenho, segurança, disponibilidade, usabilidade ou qualidade;</li><li>a diferença está entre capacidade e condição de operação;</li></ul>"
  },
  {
    "id": "qc-4",
    "categoria": "Requisitos Implicitos",
    "tipo": "Fixacao",
    "pergunta": "O que são requisitos implícitos e por que eles costumam ser problemáticos?",
    "resposta": "Requisitos implícitos são necessidades que o cliente, a equipe ou os usuários assumem como óbvias, mas que não foram explicitamente registradas ou discutidas. Eles são problemáticos porque criam expectativas escondidas: alguém acredita que determinada funcionalidade ou comportamento “está entendido”, enquanto outra parte sequer percebe que aquilo deveria existir. O resultado costuma ser retrabalho, conflito, atraso e frustração na validação final.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>são requisitos não documentados ou não verbalizados claramente;</li><li>geram mal-entendidos entre cliente e equipe;</li><li>costumam causar retrabalho, conflito e correções tardias;</li></ul>"
  },
  {
    "id": "qc-5",
    "categoria": "Requisitos Implicitos",
    "tipo": "Fixacao",
    "pergunta": "Como a equipe pode reduzir o risco de requisitos implícitos durante o projeto?",
    "resposta": "A principal forma de reduzir requisitos implícitos é tornar o entendimento do sistema o mais explícito possível. Isso inclui conversar bastante com o cliente, validar exemplos concretos de uso, registrar decisões, revisar requisitos com frequência e confirmar se todos estão interpretando as necessidades da mesma maneira. Sempre que algo parecer “óbvio”, vale a pena perguntar e documentar — porque, em projetos de software, o óbvio para uma pessoa pode não ser óbvio para outra.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>esclarecer dúvidas cedo e com frequência;</li><li>validar entendimento com exemplos e revisões;</li><li>documentar decisões para evitar suposições escondidas;</li></ul>"
  },
  {
    "id": "qc-6",
    "categoria": "Requisitos Legais",
    "tipo": "Fixacao",
    "pergunta": "O que são requisitos legais ou normativos e por que eles não podem ser ignorados?",
    "resposta": "Requisitos legais ou normativos são exigências impostas por leis, regulamentos, normas técnicas ou obrigações formais do contexto em que o software será usado. Eles não podem ser ignorados porque não dependem apenas da vontade do cliente ou da equipe: muitas vezes representam obrigações externas que precisam ser cumpridas. Se forem desconsiderados, o sistema pode até funcionar do ponto de vista técnico, mas ainda assim estar inadequado, irregular ou sujeito a problemas sérios de conformidade.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>vêm de leis, normas ou exigências externas ao projeto;</li><li>não dependem apenas da preferência do cliente;</li><li>seu descumprimento pode tornar o sistema inadequado mesmo que funcione;</li></ul>"
  },
  {
    "id": "qc-7",
    "categoria": "Requisitos Legais",
    "tipo": "Situacional",
    "pergunta": "Situação prática: o cliente diz que determinada exigência legal “não precisa ser seguida”. Como a equipe deve enxergar isso?",
    "resposta": "A equipe não deve tratar essa fala como autorização automática para ignorar o requisito. Quando a exigência é legal ou normativa, ela ultrapassa a simples preferência do cliente. Nesse caso, o papel da equipe é deixar claro que existe uma obrigação externa que precisa ser considerada no produto. Aceitar a exclusão sem análise pode levar à entrega de um sistema que falha justamente em um ponto crítico de conformidade.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>requisito legal não pode ser tratado como opcional apenas porque o cliente quer;</li><li>a equipe precisa reconhecer a obrigação externa envolvida;</li><li>ignorar esse tipo de requisito pode comprometer o sistema como um todo;</li></ul>"
  },
  {
    "id": "qc-8",
    "categoria": "Engenharia de Requisitos",
    "tipo": "Comparacao",
    "pergunta": "Qual é a diferença entre levantamento de requisitos e análise de requisitos?",
    "resposta": "O levantamento de requisitos está ligado à coleta de informações: entender o contexto, ouvir o cliente, observar usuários, descobrir necessidades e identificar problemas. Já a análise de requisitos vai além da coleta; ela procura organizar, interpretar, esclarecer e estruturar o que foi levantado para que fique compreensível e útil ao desenvolvimento. Em resumo, levantar é descobrir; analisar é transformar essa descoberta em entendimento consistente sobre o que o software deve fazer.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>levantamento = coletar informações e necessidades;</li><li>análise = interpretar, organizar e esclarecer o que foi levantado;</li><li>a análise transforma dados brutos em entendimento do sistema;</li></ul>"
  },
  {
    "id": "qc-9",
    "categoria": "Analise de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "O que significa dizer que a análise de requisitos procura entender o problema e como o software irá resolvê-lo?",
    "resposta": "Significa que a equipe não deve apenas listar funcionalidades soltas. Antes disso, precisa compreender qual problema real existe no contexto do cliente, por que esse problema importa e de que forma o software pode atuar como solução. Essa visão evita que o projeto vire apenas um acúmulo de pedidos desconexos. Um bom trabalho de análise conecta necessidade, objetivo e funcionalidade, dando coerência ao produto final.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>a análise não é só listar funções;</li><li>é preciso entender o problema do cliente;</li><li>o software deve ser pensado como solução para esse problema;</li></ul>"
  },
  {
    "id": "qc-10",
    "categoria": "Documentacao de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "O que é especificação ou documentação de requisitos e qual é seu papel no projeto?",
    "resposta": "Especificação ou documentação de requisitos é o registro organizado do que foi entendido sobre o sistema: suas funções, restrições, expectativas e condições de operação. Seu papel é servir como referência compartilhada entre cliente, analistas, desenvolvedores, testadores e demais envolvidos. Ela não existe para burocratizar o processo, mas para reduzir ambiguidades, preservar decisões importantes e permitir que o time trabalhe com uma visão comum do que precisa ser construído.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>é o registro estruturado dos requisitos;</li><li>ajuda a alinhar todos os envolvidos no projeto;</li><li>reduz ambiguidades e serve de base para desenvolvimento e testes;</li></ul>"
  },
  {
    "id": "qc-11",
    "categoria": "Validacao de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "O que é validação de requisitos e por que ela é necessária antes de avançar demais no desenvolvimento?",
    "resposta": "Validação de requisitos é a atividade de verificar se aquilo que foi levantado e analisado realmente representa o que o cliente precisa e o que o sistema deve atender. Ela é necessária porque um requisito pode estar bem escrito e ainda assim estar errado do ponto de vista do negócio. Validar cedo evita que a equipe invista tempo em projetar, codificar e testar uma solução baseada em um entendimento incorreto.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>validação confirma se o requisito está correto para o problema real;</li><li>um requisito pode estar claro e mesmo assim estar errado;</li><li>validar cedo evita retrabalho caro no restante do projeto;</li></ul>"
  },
  {
    "id": "qc-12",
    "categoria": "Gerenciamento de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "O que é gerenciamento de requisitos e por que ele se torna especialmente importante quando há mudanças?",
    "resposta": "Gerenciamento de requisitos é o conjunto de cuidados usados para acompanhar, controlar e manter os requisitos coerentes ao longo do projeto. Isso inclui registrar mudanças, revisar impactos, manter consistência entre decisões e evitar que o time trabalhe com versões contraditórias do que deve ser construído. Ele se torna especialmente importante quando há mudanças porque, sem esse controle, o projeto perde referência, surgem conflitos entre partes do sistema e aumenta o risco de cada membro estar seguindo uma ideia diferente do produto.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>gerenciar requisitos é acompanhar e controlar sua evolução;</li><li>mudanças precisam ser registradas e avaliadas;</li><li>sem gerenciamento, o projeto perde consistência e direção;</li></ul>"
  },
  {
    "id": "qc-13",
    "categoria": "Tecnicas de Levantamento",
    "tipo": "Fixacao",
    "pergunta": "Quais são as vantagens das técnicas observacionais no levantamento de requisitos?",
    "resposta": "As técnicas observacionais têm a vantagem de mostrar como o trabalho ou o uso do sistema acontece na prática, e não apenas como as pessoas dizem que acontece. Muitas vezes o usuário esquece detalhes, omite etapas ou descreve uma rotina idealizada quando responde perguntas. Ao observar diretamente o contexto real, a equipe consegue identificar necessidades escondidas, dificuldades concretas e comportamentos que talvez nunca aparecessem apenas em entrevistas.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>mostram a prática real, não só o discurso do usuário;</li><li>ajudam a encontrar detalhes que o usuário pode esquecer ou omitir;</li><li>tendem a gerar compreensão mais concreta do contexto;</li></ul>"
  },
  {
    "id": "qc-14",
    "categoria": "Tecnicas de Levantamento",
    "tipo": "Comparacao",
    "pergunta": "Quais são as limitações ou desvantagens das técnicas observacionais em comparação com entrevistas?",
    "resposta": "Apesar de serem mais realistas em muitos casos, técnicas observacionais também têm limitações. Elas podem consumir mais tempo, exigir maior presença da equipe no ambiente do usuário e nem sempre revelam bem intenções, justificativas e expectativas futuras. Observar mostra muito do comportamento real, mas não substitui totalmente perguntar. Por isso, em muitos projetos, o melhor resultado vem da combinação entre observação e entrevista.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>podem ser mais lentas e exigir mais esforço de campo;</li><li>nem sempre revelam motivações ou expectativas futuras com clareza;</li><li>costumam funcionar melhor quando combinadas com outras técnicas;</li></ul>"
  },
  {
    "id": "qc-15",
    "categoria": "Requisitos Implicitos",
    "tipo": "Situacional",
    "pergunta": "Situação prática: durante a entrega, o cliente reclama de algo que “era óbvio”, mas isso não estava documentado. Que problema de requisitos aconteceu aí?",
    "resposta": "Esse é um caso clássico de requisito implícito. Algo que uma das partes considerava evidente não foi explicitado, validado nem registrado, e por isso acabou ficando fora da solução. O problema não está apenas no cliente ou apenas na equipe: ele revela falha de comunicação e de validação. Em situações assim, a lição principal é que aquilo que parece óbvio precisa ser tornado visível e verificável antes da implementação avançar.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>trata-se de um requisito implícito;</li><li>houve falha de comunicação e de validação do entendimento;</li><li>o “óbvio” precisa ser explicitado e registrado;</li></ul>"
  },
  {
    "id": "qc-16",
    "categoria": "Analise de Requisitos",
    "tipo": "Situacional",
    "pergunta": "Situação prática: a equipe levantou muitos requisitos, mas eles estão vagos, misturados e contraditórios. Qual etapa precisa ser fortalecida e por quê?",
    "resposta": "Nesse caso, a etapa que precisa ser fortalecida é a análise de requisitos. O problema não parece ser apenas falta de informação, mas falta de tratamento adequado da informação coletada. A análise serve justamente para separar, interpretar, esclarecer, organizar prioridades e resolver ambiguidades ou contradições. Sem isso, o projeto segue adiante com uma base instável e qualquer decisão posterior fica comprometida.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>a etapa central aqui é a análise de requisitos;</li><li>o objetivo é organizar, esclarecer e resolver contradições;</li><li>seguir sem análise sólida compromete projeto, implementação e testes;</li></ul>"
  },
  {
    "id": "qc-17",
    "categoria": "Fundamentos de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "Explique por que requisitos de software aparecem como um dos temas mais cobrados da prova.",
    "resposta": "Requisitos aparecem muito porque eles estão no começo da cadeia de decisões do desenvolvimento. Se a equipe entende mal o que deve ser construído, todas as demais atividades ficam comprometidas: projeto, implementação, testes, validação e entrega. Além disso, o tema permite ao professor cobrar tanto definição quanto comparação e cenário prático, como requisitos funcionais versus não funcionais, requisitos implícitos, exigências legais e técnicas de levantamento.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>requisitos influenciam todas as etapas seguintes do processo;</li><li>erros de requisitos geram impacto amplo no projeto;</li><li>o tema permite cobrar definição, comparação e aplicação prática;</li></ul>"
  },
  {
    "id": "qc-18",
    "categoria": "Engenharia de Requisitos",
    "tipo": "Fixacao",
    "pergunta": "Faça uma síntese: quais são as etapas principais do trabalho com requisitos apresentadas no material da disciplina?",
    "resposta": "O material organiza o trabalho com requisitos em um fluxo que passa por levantamento e análise de requisitos, depois especificação e documentação, seguido por validação e gerenciamento de requisitos. A lógica é simples: primeiro descobrir e entender o que o sistema precisa atender; depois registrar isso de forma clara; em seguida confirmar se está correto; e, por fim, acompanhar mudanças e manter a consistência ao longo do projeto.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>levantamento e análise;</li><li>especificação/documentação;</li><li>validação;</li><li>gerenciamento para acompanhar mudanças e manter consistência;</li></ul>"
  }
];

export const questoesBlocoB = [
  {
    "id": "qb-1",
    "categoria": "Fundamentos de Modelos",
    "tipo": "Fixacao",
    "pergunta": "O que é um modelo de processo e por que ele é útil no estudo da Engenharia de Software?",
    "resposta": "Um modelo de processo é uma descrição geral e simplificada de um grupo de processos que possuem ciclos de vida semelhantes. Em vez de estudar separadamente cada processo proposto por autores ou organizações, o modelo permite compreender a lógica comum entre eles. Essa simplificação é útil porque facilita o entendimento de como o trabalho é organizado no tempo, como as etapas se relacionam e em que situações cada abordagem tende a funcionar melhor.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>é uma descrição geral e simplificada;</li><li>agrupa processos com ciclos de vida semelhantes;</li><li>serve para facilitar a compreensão dos processos de software;</li></ul>"
  },
  {
    "id": "qb-2",
    "categoria": "Codifica-remenda",
    "tipo": "Fixacao",
    "pergunta": "Explique por que o codifica-remenda é tratado como um “anti-modelo” de processo.",
    "resposta": "O codifica-remenda é considerado um “anti-modelo” porque, na prática, ele representa a ausência de um processo definido. A lógica dele é começar a programar o mais rápido possível, sem planejamento adequado, sem preocupação real com análise, projeto e organização do trabalho. Isso parece acelerar a entrega no começo, mas normalmente gera correções sucessivas, retrabalho, aumento da dificuldade de manutenção e queda da qualidade do software. Ele se apoia em mitos antigos, como a ideia de que basta programar logo para terminar mais cedo.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>é a ausência de um processo bem definido;</li><li>prioriza começar a programar imediatamente;</li><li>tende a gerar retrabalho, correções e baixa qualidade;</li></ul>"
  },
  {
    "id": "qb-3",
    "categoria": "Modelo Cascata",
    "tipo": "Fixacao",
    "pergunta": "Quais são as principais características do modelo cascata e em que situação ele tende a ser mais adequado?",
    "resposta": "O modelo cascata organiza o desenvolvimento em fases sequenciais e bem definidas, de modo que cada atividade deve ser concluída antes da próxima começar. Isso o torna simples de entender, previsível e relativamente fácil de gerenciar quando o projeto está bem delimitado. Ele tende a ser mais adequado quando os requisitos já são conhecidos com antecedência, mudam pouco e o projeto exige uma estrutura mais rígida e linear. Em contextos assim, a previsibilidade do cascata deixa de ser um problema e passa a ser uma vantagem.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>fases sequenciais e rígidas;</li><li>cada etapa termina antes da próxima começar;</li><li>funciona melhor quando os requisitos já são bem conhecidos;</li></ul>"
  },
  {
    "id": "qb-4",
    "categoria": "Modelo Cascata",
    "tipo": "Fixacao",
    "pergunta": "Por que o modelo cascata costuma falhar quando os requisitos não são bem conhecidos desde o início?",
    "resposta": "Porque o cascata depende justamente de uma boa definição inicial do que será construído. Quando os requisitos ainda estão incertos, o projeto avança com base em suposições frágeis. Como o modelo tem baixa comunicação contínua com o cliente e baixa reação a mudanças, qualquer erro de entendimento no começo costuma aparecer tarde demais, quando corrigir já ficou caro. Por isso, em cenários de incerteza, o cascata tende a gerar retrabalho e decisões inadequadas.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>exige conhecimento prévio dos requisitos;</li><li>reage mal a mudanças;</li><li>erros iniciais de entendimento custam caro depois;</li></ul>"
  },
  {
    "id": "qb-5",
    "categoria": "Prototipagem",
    "tipo": "Fixacao",
    "pergunta": "O que é desenvolvimento por prototipagem e qual problema ele tenta resolver?",
    "resposta": "O desenvolvimento por prototipagem é uma abordagem que usa mock-ups ou protótipos para melhorar a comunicação com o cliente e esclarecer melhor os requisitos antes da construção do produto final. O protótipo é uma versão rápida da interface ou do comportamento esperado do software, nem sempre totalmente funcional e geralmente com qualidade reduzida, mas suficiente para permitir que o usuário teste e reaja. O principal problema que essa abordagem tenta resolver é a dificuldade de entender, logo de início, o que o cliente realmente precisa.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>usa mock-ups ou protótipos rápidos;</li><li>melhora a comunicação com o cliente;</li><li>ajuda no levantamento e entendimento dos requisitos;</li></ul>"
  },
  {
    "id": "qb-6",
    "categoria": "Prototipagem",
    "tipo": "Fixacao",
    "pergunta": "Quais são as principais vantagens e desvantagens da prototipagem?",
    "resposta": "Entre as principais vantagens da prototipagem estão a redução de erros de entendimento, a maior comunicação com o cliente e a visibilidade antecipada do resultado final, já que o usuário consegue testar algo antes da construção definitiva. Por outro lado, ela também tem desvantagens: pode tornar o processo mais longo, o cliente pode confundir o mock-up com o produto real e a equipe pode acabar se apegando demais a decisões tomadas no protótipo, mesmo quando elas não são as melhores para o sistema final.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>vantagens: menos erro, mais comunicação, mais visibilidade antecipada;</li><li>desvantagens: pode ser longo;</li><li>risco de confundir protótipo com produto final e de se prender ao mock-up;</li></ul>"
  },
  {
    "id": "qb-7",
    "categoria": "Modelo Incremental",
    "tipo": "Fixacao",
    "pergunta": "Explique o modelo incremental e diga por que ele costuma ser uma boa alternativa quando os requisitos não estão totalmente fechados.",
    "resposta": "O modelo incremental divide o desenvolvimento em partes menores chamadas incrementos, entregando o software aos poucos, em vez de esperar tudo ficar pronto para só então apresentar o resultado. Isso permite que o cliente acompanhe a evolução do produto, valide entregas parciais e ajude a ajustar o rumo do projeto ao longo do tempo. Ele costuma ser uma boa alternativa quando os requisitos não estão totalmente fechados porque reduz o risco de apostar tudo em uma visão inicial ainda imatura. Em vez de tentar acertar tudo de uma vez, o sistema evolui por entregas sucessivas.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>entrega o software em partes;</li><li>permite acompanhamento e validação progressiva;</li><li>é mais adequado quando os requisitos ainda não estão completamente definidos;</li></ul>"
  },
  {
    "id": "qb-8",
    "categoria": "Modelo Espiral",
    "tipo": "Fixacao",
    "pergunta": "O que diferencia o modelo espiral dos outros modelos clássicos e por que ele costuma ser associado ao controle de riscos?",
    "resposta": "O modelo espiral se diferencia por organizar o desenvolvimento em ciclos iterativos que combinam planejamento, construção, avaliação e replanejamento contínuo. Ele mantém alta comunicação com o cliente, reage bem a mudanças e permite corrigir erros ao longo do processo. Sua associação com o controle de riscos vem do fato de que cada volta da espiral serve não apenas para desenvolver parte do produto, mas também para reavaliar incertezas, custos e decisões antes de avançar. É um modelo mais robusto para contextos complexos, embora também mais caro e mais documentado.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>funciona em ciclos iterativos;</li><li>tem alta comunicação com o cliente e alta reação a mudanças;</li><li>facilita o controle de custos e riscos;</li></ul>"
  },
  {
    "id": "qb-9",
    "categoria": "Modelo Espiral",
    "tipo": "Fixacao",
    "pergunta": "Por que um cronograma completamente fechado no início é incompatível com o modelo espiral?",
    "resposta": "Porque o espiral foi pensado para um desenvolvimento em que o planejamento é revisado continuamente a cada ciclo. Como o projeto avança por iterações e incorpora avaliação constante de riscos, custos, mudanças e correções, não faz sentido congelar todo o cronograma logo no início como se nada relevante pudesse mudar. O próprio material destaca como desvantagem do espiral a ausência de um planejamento geral rígido. Por isso, um cronograma fechado combina muito mais com modelos lineares, como o cascata, do que com o espiral.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>o espiral revisa o planejamento ao longo do processo;</li><li>incorpora mudanças e reavaliações sucessivas;</li><li>é incompatível com um cronograma totalmente rígido desde o começo;</li></ul>"
  },
  {
    "id": "qb-10",
    "categoria": "RAD e 4a Geracao",
    "tipo": "Fixacao",
    "pergunta": "O que são ferramentas de 4ª geração e qual é a lógica por trás do modelo RAD?",
    "resposta": "As ferramentas de 4ª geração partem da ideia de que desenvolvimento não se resume à programação manual e de que muitos erros acontecem justamente na implementação. Por isso, elas buscam gerar código a partir de um projeto detalhado, automatizando parte do trabalho e reduzindo erro humano de codificação. O RAD, ou Rapid Application Development, é o modelo mais tradicional ligado a essa lógica. Ele combina conceitos das ferramentas de 4ª geração com a ideia incremental, podendo funcionar de forma iterativa ou até em paralelo entre módulos.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>ferramentas de 4ª geração automatizam parte do desenvolvimento;</li><li>geram código a partir do projeto;</li><li>o RAD combina 4ª geração com conceitos incrementais;</li></ul>"
  },
  {
    "id": "qb-11",
    "categoria": "RAD e 4a Geracao",
    "tipo": "Fixacao",
    "pergunta": "Quais são as principais vantagens e limitações do modelo RAD?",
    "resposta": "O RAD tem como vantagens a codificação rápida, a possibilidade de reduzir erros de implementação e, em certos casos, o uso paralelo de equipes ou módulos, o que acelera a produção. Porém, ele também apresenta limitações importantes: pode gerar código de menor qualidade, exige software bem modularizável e, quando usado em paralelo, depende de várias equipes trabalhando ao mesmo tempo. Em outras palavras, ele pode ser muito eficiente em certos contextos, mas não é uma solução universal.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>vantagens: rapidez, menos erro de implementação, possibilidade de paralelismo;</li><li>desvantagens: código de menor qualidade;</li><li>exige modularização e, em paralelo, muitas equipes;</li></ul>"
  },
  {
    "id": "qb-12",
    "categoria": "Comparacao de Modelos",
    "tipo": "Comparacao",
    "pergunta": "Compare prototipagem e RAD. Apesar de ambos buscarem acelerar ou facilitar o desenvolvimento, qual é a diferença central entre eles?",
    "resposta": "A diferença central é que a prototipagem existe principalmente para entender melhor o problema e os requisitos, enquanto o RAD busca acelerar a construção do sistema por meio de automação e organização modular. Na prototipagem, o foco é validar ideias com o cliente antes da produção real; no RAD, o foco é transformar rapidamente um projeto em aplicação. Assim, um ajuda mais na descoberta e refinamento do que deve ser feito, enquanto o outro atua mais na velocidade de implementação.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>prototipagem foca em entender e validar requisitos;</li><li>RAD foca em acelerar a implementação;</li><li>um atua mais na descoberta do problema, o outro na rapidez da construção;</li></ul>"
  },
  {
    "id": "qb-13",
    "categoria": "Aplicacao de Modelos",
    "tipo": "Situacional",
    "pergunta": "Situação prática: Elisa está usando o modelo cascata, mas o cliente ainda não sabe bem o que quer e os requisitos mudam com frequência. O processo é adequado? Qual modelo tende a ser mais apropriado?",
    "resposta": "Não, o cascata não é o modelo mais adequado nessa situação. Como ele depende de requisitos bem definidos logo no início e reage mal a mudanças, usar cascata nesse contexto aumenta a chance de erro e retrabalho. Se o maior problema for o cliente ainda não conseguir expressar claramente o que deseja, a prototipagem tende a ser a melhor saída inicial, porque melhora a comunicação e o entendimento do software. Se o projeto já puder avançar por entregas sucessivas mesmo com alguma incerteza, o incremental também se torna uma alternativa forte.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>cascata não é adequado com requisitos incertos;</li><li>prototipagem ajuda quando o cliente não sabe bem o que quer;</li><li>incremental é boa opção quando o sistema pode evoluir em partes;</li></ul>"
  },
  {
    "id": "qb-14",
    "categoria": "Aplicacao de Modelos",
    "tipo": "Situacional",
    "pergunta": "Situação prática: Elisa usa o modelo espiral, mas o cliente exige um cronograma fechado logo no início do projeto. Isso é compatível? Para qual modelo ela poderia migrar?",
    "resposta": "Não é totalmente compatível. O espiral pressupõe reavaliação contínua, ajustes ao longo dos ciclos e planejamento progressivo, o que entra em choque com a ideia de um cronograma totalmente congelado desde o começo. Se o cliente realmente quer previsibilidade rígida e os requisitos estiverem bem definidos, a migração mais coerente tende a ser para o modelo cascata, que trabalha com fases sequenciais e planejamento mais estável. Se os requisitos ainda tiverem alguma incerteza, o incremental pode ser um meio-termo melhor que o cascata.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>espiral não combina com cronograma totalmente fechado;</li><li>cascata faz mais sentido quando há previsibilidade e requisitos claros;</li><li>incremental pode ser alternativa se ainda houver alguma incerteza;</li></ul>"
  },
  {
    "id": "qb-15",
    "categoria": "Aplicacao de Modelos",
    "tipo": "Situacional",
    "pergunta": "Situação prática: um sistema pode ser dividido claramente em módulos independentes, a empresa tem várias equipes disponíveis e quer acelerar ao máximo a implementação. Qual modelo passa a fazer mais sentido e por quê?",
    "resposta": "Nesse cenário, o RAD passa a fazer bastante sentido. O material mostra que ele pode funcionar em paralelo, acelera a codificação e aproveita ferramentas automatizadas de desenvolvimento. Como o sistema é modularizável e existem várias equipes, duas das principais exigências do RAD estão sendo atendidas. Ainda assim, a resposta completa deve reconhecer a limitação: essa velocidade pode vir acompanhada de menor qualidade de código se o projeto não for muito bem conduzido.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>RAD é adequado quando há modularização e várias equipes;</li><li>permite acelerar a implementação e até trabalhar em paralelo;</li><li>deve-se mencionar o risco de código de menor qualidade;</li></ul>"
  },
  {
    "id": "qb-16",
    "categoria": "Comparacao de Modelos",
    "tipo": "Comparacao",
    "pergunta": "Em uma comparação geral, como escolher entre cascata, prototipagem, incremental, espiral e RAD sem decorar tudo mecanicamente?",
    "resposta": "A melhor forma de escolher é pensar no tipo de problema do projeto. Se os requisitos são claros e a previsibilidade é prioridade, o cascata faz mais sentido. Se o cliente não sabe bem o que quer, a prototipagem ajuda a descobrir. Se o sistema pode evoluir em entregas sucessivas, o incremental é forte candidato. Se o projeto envolve incerteza alta, necessidade de revisão contínua e atenção a riscos, o espiral tende a ser melhor. Se o objetivo é acelerar a implementação com apoio de automação e modularização, o RAD se destaca. Em resumo, a escolha correta nasce do cenário, não da decoração isolada do nome do modelo.<br /><br /><span class=\"text-amber-500 font-bold\">&#9888; Pontos que nao podem faltar:</span><ul class=\"mt-2 list-disc pl-5 space-y-1\"><li>a escolha depende do cenário do projeto;</li><li>cascata = previsibilidade e requisitos claros;</li><li>prototipagem = descoberta de requisitos;</li><li>incremental = entregas em partes;</li><li>espiral = risco e revisão contínua;</li><li>RAD = velocidade com automação e modularização;</li></ul>"
  }
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

