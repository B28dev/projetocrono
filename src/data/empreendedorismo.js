export const examDate = new Date('2026-04-10T08:00:00');

export const referenceVideoMaterials = [
  {
    id: 'video-univesp-playlist',
    title: 'UNIVESP - Empreendedorismo e Inovacao (playlist completa)',
    description: 'Fundamentos e visao geral da disciplina.',
    kind: 'playlist',
    url: 'https://www.youtube.com/playlist?list=PLxI8Can9yAHcbwZCGYvVLJiyOvrv4K_Nk',
  },
  {
    id: 'video-entrepreneurship-se',
    title: 'Entrepreneurship and Innovation in Software Engineering',
    description: 'Aplicacao de empreendedorismo no contexto de software.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=qQcnhHJteLw',
  },
  {
    id: 'video-projetos-empreendedores',
    title: 'Engenharia de Software: Projetos Empreendedores',
    description: 'Exemplos praticos de projetos com visao empreendedora.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=aGscEOgKBjs',
  },
  {
    id: 'video-empreendedorismo-inovacao',
    title: 'Empreendedorismo e Inovacao',
    description: 'Revisao objetiva dos conceitos centrais.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=_jIXLMHDyDM',
  },
  {
    id: 'video-proto-personas',
    title: 'UXNOW - Como fazer Proto Personas?',
    description: 'Guia rapido para montar personas.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=EqLfIj3RkJ8',
  },
  {
    id: 'video-canvas-proposta-valor',
    title: 'UX Design na Pratica - O que e Canvas da Proposta de Valor?',
    description: 'Como estruturar proposta de valor de forma clara.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=qi_GeATrb2Y',
  },
  {
    id: 'video-certi-proposta-valor',
    title: 'Fundacao CERTI - Proposta de Valor',
    description: 'Abordagem complementar para revisao do tema.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=qe6lfcHmBAs',
  },
  {
    id: 'video-pitch-startups',
    title: 'InovaPlus - PITCH para startups (parte 1)',
    description: 'Estrutura de apresentacao com foco em clareza.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=YotkmhUlsMk',
  },
  {
    id: 'video-ia-generativa',
    title: 'Automacao e Inovacao com IA Generativa',
    description: 'Apoio para contextualizar inovacao sem jargao vazio.',
    kind: 'video',
    url: 'https://www.youtube.com/watch?v=Lpk3qJYRnBw',
  },
];

export const referencePlaylists = referenceVideoMaterials.filter((item) => item.kind === 'playlist');

export const referencePdfMaterials = [
  {
    id: 'pdf-aula-01',
    title: 'Aula 1 - Conceitos de empreendedorismo e inovacao',
    description: 'Material base da Aula 01.',
    url: '',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\AULA 01 - Conceitos de empreendedorismo e inova\u00E7\u00E3o.pdf',
  },
  {
    id: 'pdf-aula-02',
    title: 'Aula 2',
    description: 'Material base da Aula 02.',
    url: '',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\Aula 2.pdf',
  },
  {
    id: 'pdf-aula-03',
    title: 'Aula 3',
    description: 'Material base da Aula 03.',
    url: '',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\AULA 03.pdf',
  },
  {
    id: 'pdf-exercicios-revisao',
    title: 'Exercicios de Revisao',
    description: 'Lista de exercicios de revisao da disciplina.',
    url: '',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\Exerc\u00EDcio de Revis\u00E3o - Empreendedorismo e Inova\u00E7\u00E3o - Eng. de Software.pdf',
  },
];

export const topics = [
  { id: 'escuta-ativa', name: 'Escuta ativa', frequency: '2/6 questoes', level: 'muito-frequente' },
  { id: 'proposta-valor', name: 'Proposta de valor', frequency: '1/6 questoes', level: 'apareceu' },
  { id: 'persona', name: 'Persona', frequency: '1/6 questoes', level: 'apareceu' },
  { id: 'valor-percebido', name: 'Valor percebido', frequency: '1/6 questoes', level: 'apareceu' },
  { id: 'comunicacao-pitch', name: 'Comunicacao e pitch', frequency: '1/6 questoes', level: 'apareceu' },
  { id: 'problema-real', name: 'Problema real', frequency: '1/6 questoes', level: 'apareceu' },
];

const studyPlanBase = [
  {
    date: '2026-04-04',
    label: 'Sab 04/04',
    topic: 'Aula 01 - Conceitos, perfil e criatividade',
    tasks: [
      'Definir empreendedorismo como criacao de valor com risco financeiro, psiquico e social.',
      'Memorizar os 5Cs e escrever um exemplo pratico para cada eixo da gestao.',
      'Comparar mentalidade de treino e mentalidade de fundador em um paragrafo dissertativo.',
      'Explicar o ciclo Construir-Medir-Aprender e justificar o exemplo de MVP do Dropbox.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'UNIVESP - Empreendedorismo e Inovacao (playlist)',
        url: 'https://www.youtube.com/playlist?list=PLxI8Can9yAHcbwZCGYvVLJiyOvrv4K_Nk',
      },
      {
        kind: 'youtube',
        title: 'Empreendedorismo e Inovacao',
        url: 'https://www.youtube.com/watch?v=_jIXLMHDyDM',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Treine resposta em 3 paragrafos: definicao, funcionamento e impacto pratico.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'A prova e dissertativa. Organizacao do texto influencia diretamente a nota.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Aula 02 - Brasil/Piaui, comunicacao e pitch',
    tasks: [
      'Comparar empreendedorismo por necessidade versus oportunidade com exemplos reais.',
      'Sintetizar os dados do ecossistema do Piaui e citar ao menos 3 atores institucionais.',
      'Montar um roteiro de pitch com: gancho, problema, solucao, mercado, diferencial e chamada para acao.',
      'Treinar storytelling em formato problema, emocao e solucao para resposta dissertativa.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Entrepreneurship and Innovation in Software Engineering',
        url: 'https://www.youtube.com/watch?v=qQcnhHJteLw',
      },
      {
        kind: 'youtube',
        title: 'Engenharia de Software: Projetos Empreendedores',
        url: 'https://www.youtube.com/watch?v=aGscEOgKBjs',
      },
      {
        kind: 'youtube',
        title: 'PITCH - Modelo de apresentacao para startups',
        url: 'https://www.youtube.com/watch?v=YotkmhUlsMk',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Conecte teoria com startup real para ganhar forca argumentativa.',
      },
    ],
  },
  {
    date: '2026-04-06',
    label: 'Seg 06/04',
    topic: 'Aula 03 leve - proposito, missao e valores',
    tasks: [
      'Diferenciar proposito, missao e valores com foco na construcao de produtos de software.',
      'Explicar como esses tres elementos orientam decisoes de produto e posicionamento do negocio.',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Dia de carga menor: leitura guiada e entendimento sem memorizacao forcada.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Limite de 30 minutos para manter energia apos a prova de Eletiva I.',
      },
    ],
  },
  {
    date: '2026-04-07',
    label: 'Ter 07/04',
    topic: 'Aula 03 completa - conteudo mais cobrado',
    tasks: [
      'Contrastar persona versus publico-alvo e justificar por que segmentacao generica reduz aderencia.',
      'Aplicar escuta ativa em um cenario de software e apontar riscos de decidir por achismo.',
      'Defender que valor esta na percepcao do usuario e nao apenas na qualidade tecnica do codigo.',
      'Responder as 3 perguntas da proposta de valor com exemplo concreto de produto.',
      'Memorizar e aplicar as frases-chave em resposta estruturada de prova.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'UXNOW - Como fazer Proto Personas?',
        url: 'https://www.youtube.com/watch?v=EqLfIj3RkJ8',
      },
      {
        kind: 'youtube',
        title: 'Canvas da Proposta de Valor',
        url: 'https://www.youtube.com/watch?v=qi_GeATrb2Y',
      },
      {
        kind: 'youtube',
        title: 'Fundacao CERTI - Proposta de Valor',
        url: 'https://www.youtube.com/watch?v=qe6lfcHmBAs',
      },
    ],
    notes: [
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Esse e o dia central do cronograma. Reserve no minimo 1h30 de foco continuo.',
      },
    ],
  },
  {
    date: '2026-04-08',
    label: 'Qua 08/04',
    topic: 'Revisao com questoes da prova anterior',
    tasks: [
      'Responder as 6 questoes de revisao no papel, sem consulta, simulando condicoes reais.',
      'Corrigir com gabarito e registrar lacunas de argumento, exemplos e clareza textual.',
      'Refazer os pontos de erro com nova resposta dissertativa completa.',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Treino manuscrito reduz branco e melhora a fluidez da escrita na prova.',
      },
    ],
  },
  {
    date: '2026-04-09',
    label: 'Qui 09/04',
    topic: 'Vespera - revisao leve apos Algoritmos',
    tasks: [
      'Revisar escuta ativa, persona, proposta de valor, 5Cs e estrutura de pitch.',
      'Repassar a estrutura dissertativa: definicao, funcionamento e impacto com exemplo.',
      'Encerrar estudo cedo e priorizar descanso para consolidacao de memoria.',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: 'Bloco leve de 20 a 30 minutos para consolidar sem desgaste.',
      },
    ],
  },
  {
    date: '2026-04-10',
    label: 'Sex 10/04',
    topic: 'Revisao final e prova - Empreendedorismo',
    tasks: [
      'Confirmar material de prova: caneta azul ou preta e checklist final.',
      'Ler todas as questoes antes de responder e definir ordem por dominio.',
      'Aplicar em cada resposta a estrutura: definicao, funcionamento e impacto com exemplo real.',
      'Gerenciar tempo com foco nos temas mais recorrentes: escuta ativa e proposta de valor.',
    ],
    resources: [],
    notes: [
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Mantenha respostas objetivas, com causa e consequencia, evitando jargao vazio.',
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
    id: 'escuta-ativa',
    title: 'Escuta Ativa',
    badge: { label: 'Tema 1', color: 'rose' },
    bullets: [
      'Definicao: E a pratica de ouvir o usuario com atencao genuina e empatia, focado em entender sua dor real, sem tentar confirmar suas proprias hipoteses pre-concebidas.',
      'Como funciona: Durante entrevistas ou validacoes, o empreendedor faz perguntas abertas e observa o comportamento do cliente, evitando induzir respostas ou empurrar a solucao antes de entender o problema.',
      'Impacto/Exemplo: Sem escuta ativa, constroi-se um sistema baseado em "achismos". Exemplo: um app educacional tecnicamente perfeito, mas que os professores abandonam porque nao se adapta ao tempo real da sala de aula. Frase-chave: "Quem escuta melhor, erra menos".',
    ],
  },
  {
    id: 'persona-vs-publico-alvo',
    title: 'Persona vs Publico-Alvo',
    badge: { label: 'Tema 2', color: 'cyan' },
    bullets: [
      'Definicao: Publico-alvo e um grupo demografico amplo (ex: "homens, 18-25 anos, universitarios"). Persona e a representacao semi-ficticia do seu cliente ideal, detalhando habitos, dores, frustracoes e objetivos especificos.',
      'Como funciona: A persona humaniza o usuario, servindo como "norte" para o time de desenvolvimento decidir quais funcionalidades criar primeiro no MVP.',
      'Impacto/Exemplo: Frase-chave: "Quem tenta falar com todo mundo, nao conecta com ninguem". Desenvolver focando em uma persona especifica garante que a solucao resolva uma dor real de forma profunda, em vez de ser um produto generico e ignorado.',
    ],
  },
  {
    id: 'proposta-de-valor',
    title: 'Proposta de Valor',
    badge: { label: 'Tema 3', color: 'emerald' },
    bullets: [
      'Definicao: E a promessa de beneficio que a sua empresa entrega ao cliente. E o motivo pelo qual ele escolhe o seu software e nao o do concorrente.',
      'Como funciona: Ela deve responder de forma clara a 3 perguntas: 1) Qual problema voce resolve? 2) Como voce resolve? 3) Qual beneficio real o cliente obtem?',
      'Impacto/Exemplo: O valor percebido nao esta na complexidade do codigo, mas na utilidade. Se um sistema e tecnicamente impecavel, mas o cliente nao entende imediatamente o ganho de tempo ou dinheiro que tera, ele nao compra.',
    ],
  },
  {
    id: 'cinco-cs',
    title: 'Os 5Cs da Gestao Profissional',
    badge: { label: 'Tema 4', color: 'amber' },
    bullets: [
      'Definicao: Sao os pilares fundamentais para estruturar um negocio sustentavel, provando que empreender vai muito alem de apenas abrir um CNPJ.',
      'Como funciona: Coracao (proposito e missao), Cliente (produto nasce da dor real), Caixa (lucro e sustentabilidade financeira), Cadencia (disciplina e constancia), Cultura (personalidade, valores e regras invisiveis da empresa).',
      'Impacto/Exemplo: Um engenheiro focado so no "Cliente" e esquecendo o "Caixa" faz a startup falir. Sem "Cultura", o time de desenvolvedores fica desmotivado e a rotatividade afunda o projeto.',
    ],
  },
  {
    id: 'pitch-e-storytelling',
    title: 'Pitch e Storytelling',
    badge: { label: 'Tema 5', color: 'indigo' },
    bullets: [
      'Definicao: Pitch e uma apresentacao rapida e direta para vender uma ideia ou buscar investimento. Storytelling e a tecnica de contar essa ideia conectando contexto, emocao e solucao.',
      'Como funciona: Um bom pitch segue a estrutura: Gancho -> Problema -> Solucao -> Mercado -> Diferencial -> Chamada para acao.',
      'Impacto/Exemplo: Frase-chave: "Uma ideia mal comunicada e uma ideia desperdicada". Um erro fatal em pitches de TI e usar excesso de jargoes tecnicos em vez de focar em como aquilo resolve o problema do mercado de forma barata e rapida.',
    ],
  },
];

export const examCoverage = [
  {
    id: 'revisao-2025-q1',
    title: 'Q1 - Escuta ativa e persona',
    bullets: [
      'Como a ausencia de escuta ativa compromete software educacional.',
      'Relacao direta entre desconhecimento da persona e abandono do produto.',
    ],
  },
  {
    id: 'revisao-2025-q2',
    title: 'Q2 - IA sem problema claro',
    bullets: [
      'Uso de IA por tendencia, sem dor validada, gera solucao sem aderencia.',
      'Empreendedorismo exige problema real antes de definicao tecnologica.',
    ],
  },
  {
    id: 'revisao-2025-q3-q6',
    title: 'Q3 a Q6 - Pitch, valor e validacao',
    bullets: [
      'Erro de pitch com jargao tecnico e proposta pouco compreensivel.',
      'Produto tecnicamente correto pode falhar sem valor percebido.',
      'Nao entrevistar usuarios aumenta risco de retrabalho e rejeicao.',
      'Proposta de valor precisa responder problema, solucao e beneficio.',
    ],
  },
];
