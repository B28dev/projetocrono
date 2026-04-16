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

export const referenceVideoSections = [
  {
    id: 'videos-fundamentos-contexto',
    title: 'Videos da disciplina - Fundamentos e contexto',
    description: 'Base para conceitos, ecossistema e visao empreendedora em software.',
    items: referenceVideoMaterials.filter((item) =>
      [
        'video-univesp-playlist',
        'video-entrepreneurship-se',
        'video-projetos-empreendedores',
        'video-empreendedorismo-inovacao',
      ].includes(item.id),
    ),
  },
  {
    id: 'videos-persona-valor-pitch',
    title: 'Videos da disciplina - Persona, proposta de valor e pitch',
    description: 'Bloco focado em persona, valor percebido, comunicacao e apresentacao.',
    items: referenceVideoMaterials.filter((item) =>
      [
        'video-proto-personas',
        'video-canvas-proposta-valor',
        'video-certi-proposta-valor',
        'video-pitch-startups',
        'video-ia-generativa',
      ].includes(item.id),
    ),
  },
];

export const referencePdfMaterials = [
  {
    id: 'pdf-aula-01',
    title: 'Aula 1 - Conceitos de empreendedorismo e inovacao',
    description: 'Material base da Aula 01.',
    url: '/pdfs/AULA 01 - Conceitos de empreendedorismo e inovação.pdf',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\AULA 01 - Conceitos de empreendedorismo e inova\u00E7\u00E3o.pdf',
  },
  {
    id: 'pdf-aula-02',
    title: 'Aula 2',
    description: 'Material base da Aula 02.',
    url: '/pdfs/Aula 2.pdf',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\Aula 2.pdf',
  },
  {
    id: 'pdf-aula-03',
    title: 'Aula 3',
    description: 'Material base da Aula 03.',
    url: '/pdfs/AULA 03.pdf',
    localPath: 'C:\\Users\\bruno\\Desktop\\lowcode\\crono\\assets\\empreendedorismo\\AULA 03.pdf',
  },
  {
    id: 'pdf-exercicios-revisao',
    title: 'Exercicios de Revisao',
    description: 'Lista de exercicios de revisao da disciplina.',
    url: '/pdfs/Exercício de Revisão - Empreendedorismo e Inovação - Eng. de Software.pdf',
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

export const flashcardsEmpreendBloco1 = [
  { id: 'empreend-bloco1-f1', categoria: 'Fundamentos', frente: 'O que e empreendedorismo?', verso: 'E a capacidade de idealizar, coordenar e realizar projetos ou servicos, criando algo novo e com valor.' },
  { id: 'empreend-bloco1-f2', categoria: 'Fundamentos', frente: 'Empreendedorismo e so abrir um CNPJ?', verso: 'Nao. Empreender vai alem de abrir empresa; envolve inovacao, execucao e gestao sob risco e incerteza.' },
  { id: 'empreend-bloco1-f3', categoria: 'Fundamentos', frente: 'A que o empreendedorismo costuma estar associado?', verso: 'A inovacao e a gestao em condicoes de risco e incerteza.' },
  { id: 'empreend-bloco1-f4', categoria: 'Fundamentos', frente: 'Qual e o "crime" no empreendedorismo, segundo a aula?', verso: 'Executar com perfeicao um plano que ninguem deseja.' },
  { id: 'empreend-bloco1-f5', categoria: 'Fundamentos', frente: 'O empreendedorismo deve ser visto como o que?', verso: 'Como uma forma de administracao adaptada ao caos.' },
  { id: 'empreend-bloco1-f6', categoria: 'Casos e Aprendizados', frente: 'O que o caso Dropbox ensina?', verso: 'Que e melhor validar interesse antes de investir meses construindo algo que ninguem quer.' },
  { id: 'empreend-bloco1-f7', categoria: 'Mentalidade Empreendedora', frente: 'O que e mentalidade de treino?', verso: 'Ver problemas como desafios e aprendizado: fazer + errar + aprender = treino.' },
  { id: 'empreend-bloco1-f8', categoria: 'Mentalidade Empreendedora', frente: 'O que caracteriza a mentalidade do fundador?', verso: 'Missao insurgente, cabeca de dono e obsessao com a linha de frente.' },
  { id: 'empreend-bloco1-f9', categoria: 'Mentalidade Empreendedora', frente: 'O que e resiliencia no comportamento empreendedor?', verso: 'A capacidade de superar dificuldades e quebrar crencas limitantes que impedem crescimento.' },
  { id: 'empreend-bloco1-f10', categoria: 'Fundamentos', frente: 'Em que se baseia o foco em pontos fortes?', verso: 'Em desenvolver talentos naturais, em vez de focar so na correcao de fraquezas.' },
  { id: 'empreend-bloco1-f11', categoria: '5Cs e Gestao', frente: 'Quais sao os 5Cs da gestao profissional?', verso: 'Coracao, Cliente, Caixa, Cadencia e Cultura.' },
  { id: 'empreend-bloco1-f12', categoria: '5Cs e Gestao', frente: 'O que significa Coracao nos 5Cs?', verso: 'Proposito: descobrir o que move o negocio alem do dinheiro.' },
  { id: 'empreend-bloco1-f13', categoria: '5Cs e Gestao', frente: 'O que significa Cliente nos 5Cs?', verso: 'Que o produto nasce da dor do cliente e precisa ser validado no mundo real.' },
  { id: 'empreend-bloco1-f14', categoria: '5Cs e Gestao', frente: 'O que significa Caixa nos 5Cs?', verso: 'Controlar entradas e saidas com rigor, sem misturar caixa pessoal com o da empresa.' },
  { id: 'empreend-bloco1-f15', categoria: '5Cs e Gestao', frente: 'O que significa Cadencia nos 5Cs?', verso: 'Criar rituais, disciplina e ciclos constantes de planejamento e execucao.' },
  { id: 'empreend-bloco1-f16', categoria: '5Cs e Gestao', frente: 'O que significa Cultura nos 5Cs?', verso: 'E a personalidade do negocio, moldada pelo exemplo do lider no dia a dia.' },
  { id: 'empreend-bloco1-f17', categoria: 'Fundamentos', frente: 'Qual a diferenca entre empreender por necessidade e por oportunidade?', verso: 'Necessidade e abrir negocio para gerar renda; oportunidade e enxergar um problema real e criar uma solucao.' },
  { id: 'empreend-bloco1-f18', categoria: 'Fundamentos', frente: 'Empreendedorismo comeca com dinheiro?', verso: 'Nao. Comeca com percepcao.' },
  { id: 'empreend-bloco1-f19', categoria: 'Casos e Aprendizados', frente: 'O que os casos Mercado Livre, Nubank e iFood tem em comum?', verso: 'Resolveram problemas reais do dia a dia das pessoas.' },
  { id: 'empreend-bloco1-f20', categoria: 'Comunicacao e Estrategia', frente: 'O que e storytelling de negocios?', verso: 'E a arte de contar historias com intencao estrategica para comunicar valor.' },
  { id: 'empreend-bloco1-f21', categoria: 'Comunicacao e Estrategia', frente: 'Qual e a formula resumida do storytelling de negocios?', verso: 'Contexto + emocao + solucao.' },
  { id: 'empreend-bloco1-f22', categoria: 'Comunicacao e Estrategia', frente: 'Quais sao os 3 componentes do storytelling de negocios?', verso: 'Problema, virada e transformacao.' },
  { id: 'empreend-bloco1-f23', categoria: 'Comunicacao e Estrategia', frente: 'O que e um pitch?', verso: 'Uma apresentacao rapida da startup ou solucao para clientes ou investidores.' },
  { id: 'empreend-bloco1-f24', categoria: 'Comunicacao e Estrategia', frente: 'O que e proposito no empreendedorismo?', verso: 'O porque do negocio existir; sua razao de ser e impacto gerado.' },
  { id: 'empreend-bloco1-f25', categoria: 'Comunicacao e Estrategia', frente: 'O que e missao no empreendedorismo?', verso: 'O que a empresa faz no presente e qual valor entrega ao publico.' },
  { id: 'empreend-bloco1-f26', categoria: 'Comunicacao e Estrategia', frente: 'O que sao valores no empreendedorismo?', verso: 'Sao os principios eticos que orientam atitudes, cultura e decisoes.' },
  { id: 'empreend-bloco1-f27', categoria: 'Comunicacao e Estrategia', frente: 'O que e visao?', verso: 'E onde a empresa quer chegar e no que deseja se tornar no futuro.' },
  { id: 'empreend-bloco1-f28', categoria: 'Fundamentos', frente: 'O que significa dizer que um produto carrega intencionalidade?', verso: 'Que ele nao e so um conjunto de funcoes; ele expressa proposito e direcao estrategica.' },
  { id: 'empreend-bloco1-f29', categoria: 'Fundamentos', frente: 'Onde o empreendedorismo comeca de verdade?', verso: 'Em um problema real, nao em uma ideia brilhante isolada.' },
  { id: 'empreend-bloco1-f30', categoria: 'Fundamentos', frente: 'Por que muitos negocios falham?', verso: 'Porque resolvem problemas irrelevantes, nao por falta de tecnologia.' },
  { id: 'empreend-bloco1-f31', categoria: 'Fundamentos', frente: 'O que precisa ser entendido antes de criar um aplicativo?', verso: 'Qual problema ele resolve, para quem, com que frequencia e com qual impacto.' },
  { id: 'empreend-bloco1-f32', categoria: 'Validacao de Problema', frente: 'O que e escuta ativa?', verso: 'Ouvir o cliente com atencao genuina, sem tentar apenas confirmar hipoteses previas.' },
  { id: 'empreend-bloco1-f33', categoria: 'Fundamentos', frente: 'O usuario sempre sabe dizer qual solucao quer?', verso: 'Nao. Muitas vezes ele nao sabe a solucao, mas sabe descrever a dor.' },
  { id: 'empreend-bloco1-f34', categoria: 'Validacao de Problema', frente: 'O que e persona?', verso: 'E uma representacao do cliente ideal, usada para entender necessidades, dores e comportamento.' },
  { id: 'empreend-bloco1-f35', categoria: 'Validacao de Problema', frente: 'O que e proposta de valor?', verso: 'E a promessa central do negocio: por que o cliente escolheria sua solucao e nao a do concorrente.' },
  { id: 'empreend-bloco1-f36', categoria: 'Validacao de Problema', frente: 'Quais 3 perguntas a proposta de valor deve responder?', verso: 'Qual problema voce resolve? Como resolve? Qual beneficio real o cliente obtem?' },
  { id: 'empreend-bloco1-f37', categoria: 'Validacao de Problema', frente: 'O que acontece quando falta escuta ativa?', verso: 'O produto passa a ser construido com base em achismos.' },
  { id: 'empreend-bloco1-f38', categoria: 'Fundamentos', frente: 'Um sistema pode estar tecnicamente correto e ainda falhar?', verso: 'Sim. Se nao gerar valor percebido, boa experiencia e utilidade para o usuario, ele falha.' },
  { id: 'empreend-bloco1-f39', categoria: 'Fundamentos', frente: 'Qual frase resume a logica da disciplina?', verso: 'Codigo constroi sistemas. Mentalidade constroi negocios.' },
  { id: 'empreend-bloco1-f40', categoria: 'Fundamentos', frente: 'O que a aula mostra sobre Teresina no ecossistema de inovacao?', verso: 'Que Teresina aparece entre as cidades brasileiras com maior numero de startups mapeadas.' },
];

export const questoesEmpreendBloco1 = [
    {
        "id":  "empreend-q1",
        "pergunta":  "O que e empreendedorismo e por que ele nao pode ser reduzido apenas a abertura de uma empresa?",
        "resposta":  "Empreendedorismo e a capacidade de idealizar, coordenar e realizar projetos ou servicos que criem algo novo e com valor. Ele esta ligado a inovacao, a execucao e a tomada de decisao em contextos de risco e incerteza. Por isso, nao pode ser reduzido a simples abertura de um CNPJ: alguem pode abrir uma empresa sem agir de forma empreendedora, assim como pode empreender ao criar solucoes novas dentro de organizacoes ja existentes.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eempreender e criar algo novo e com valor;\u003c/li\u003e\u003cli\u003eenvolve inovacao, coordenacao e execucao;\u003c/li\u003e\u003cli\u003evai alem da mera formalizacao de uma empresa.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q2",
        "pergunta":  "Explique a frase da aula: “No empreendedorismo, o crime e executar com perfeicao um plano que ninguem deseja.”",
        "resposta":  "A frase mostra que eficiencia sozinha nao basta. Um projeto pode ser muito bem executado do ponto de vista tecnico, financeiro ou operacional e, ainda assim, fracassar se estiver resolvendo um problema irrelevante ou se nao houver demanda real. No empreendedorismo, o foco principal nao e apenas fazer bem feito, mas garantir que aquilo que esta sendo feito realmente importa para alguem. Em outras palavras, antes da excelencia operacional vem a relevancia da solucao.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eexecutar bem nao garante sucesso;\u003c/li\u003e\u003cli\u003eo plano precisa resolver um problema real;\u003c/li\u003e\u003cli\u003erelevancia vem antes de perfeicao tecnica.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q3",
        "pergunta":  "O que o caso Dropbox ensina sobre validacao e reducao de risco no empreendedorismo?",
        "resposta":  "O caso Dropbox ensina que o empreendedor nao deve partir imediatamente para o desenvolvimento completo de uma solucao sem antes testar se ela desperta interesse real. Ao apresentar a ideia por meio de um video antes de construir toda a complexidade tecnica do produto, Drew Houston reduziu o risco de gastar meses em algo que talvez ninguem quisesse usar. A licao central nao e “fazer um video”, mas validar a demanda cedo para evitar desperdicio de tempo, energia e dinheiro.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003evalidar interesse antes de construir tudo;\u003c/li\u003e\u003cli\u003ereduzir risco de perda de tempo e recursos;\u003c/li\u003e\u003cli\u003etestar demanda antes do desenvolvimento completo.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q4",
        "pergunta":  "Por que a aula afirma que o sucesso empreendedor depende mais de processo do que de “bons genes”?",
        "resposta":  "Porque o comportamento empreendedor e apresentado como algo que pode ser aprendido, treinado e desenvolvido. A disciplina mostra que o sucesso nao depende apenas de talento nato, carisma ou “dom”, mas de pratica, adaptacao, estudo do mercado e desenvolvimento de mentalidades adequadas. Isso torna o empreendedorismo menos mitico e mais acessivel: errar, aprender, corrigir e repetir faz parte do processo de formacao do empreendedor.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eempreendedorismo pode ser aprendido;\u003c/li\u003e\u003cli\u003edepende de pratica, treino e adaptacao;\u003c/li\u003e\u003cli\u003enao e exclusividade de pessoas com “dom natural”.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q5",
        "pergunta":  "O que e mentalidade de treino e por que ela e importante?",
        "resposta":  "Mentalidade de treino e enxergar problemas, erros e dificuldades como parte do aprendizado, e nao como prova de incapacidade. A formula apresentada em aula — fazer + errar + aprender = treino — reforca que o crescimento empreendedor exige acao constante e reflexao sobre os resultados. Essa mentalidade e importante porque impede a paralisia causada pelo medo de falhar e transforma a experiencia pratica em evolucao real.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eproblemas e erros viram aprendizado;\u003c/li\u003e\u003cli\u003ea pratica faz parte da formacao do empreendedor;\u003c/li\u003e\u003cli\u003ereduz o medo de falhar e favorece evolucao continua.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q6",
        "pergunta":  "Explique o que a aula chama de mentalidade do fundador.",
        "resposta":  "A mentalidade do fundador e caracterizada por missao insurgente, cabeca de dono e obsessao com a linha de frente. Isso significa agir com forte senso de proposito, assumir responsabilidade real pelo negocio e manter proximidade com o que acontece na pratica, especialmente no contato com clientes e operacao. Essa mentalidade evita que o empreendedor se afaste da realidade do negocio e ajuda a manter foco no que realmente gera valor.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003emissao forte e senso de proposito;\u003c/li\u003e\u003cli\u003ecabeca de dono e responsabilidade;\u003c/li\u003e\u003cli\u003eproximidade com clientes e operacao.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q7",
        "pergunta":  "Quais sao os 5Cs da gestao profissional e qual a logica por tras deles?",
        "resposta":  "Os 5Cs sao Coracao, Cliente, Caixa, Cadencia e Cultura. Eles funcionam como cinco pilares que ajudam a transformar uma ideia em um negocio mais solido e profissional. O Coracao da proposito, o Cliente garante aderencia ao problema real, o Caixa assegura sobrevivencia financeira, a Cadencia cria disciplina e constancia, e a Cultura molda o comportamento interno. A logica e mostrar que empreender nao depende de um unico fator, mas do equilibrio entre direcao, mercado, financas, execucao e equipe.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003ecitar os cinco Cs corretamente;\u003c/li\u003e\u003cli\u003emostrar que eles formam pilares complementares;\u003c/li\u003e\u003cli\u003edestacar a ideia de equilibrio de gestao.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q8",
        "pergunta":  "Explique a diferenca entre empreender por necessidade e empreender por oportunidade.",
        "resposta":  "Empreender por necessidade acontece quando a pessoa cria um negocio principalmente para gerar renda ou sobreviver economicamente. Ja empreender por oportunidade acontece quando alguem percebe um problema real no mercado e decide criar uma solucao para ele. A diferenca central esta no ponto de partida: na necessidade, o impulso e a urgencia financeira; na oportunidade, e a percepcao estrategica de uma dor ou lacuna que pode ser atendida.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003enecessidade: foco em renda e sobrevivencia;\u003c/li\u003e\u003cli\u003eoportunidade: foco em problema real e solucao;\u003c/li\u003e\u003cli\u003ea diferenca esta no motivo inicial do empreendimento.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q9",
        "pergunta":  "Como a aula relaciona empreendedorismo, software e resolucao de problemas do dia a dia?",
        "resposta":  "A aula mostra que grandes negocios de tecnologia, como Mercado Livre, Nubank e iFood, cresceram porque resolveram problemas concretos do cotidiano das pessoas. Isso aproxima o empreendedorismo da engenharia de software: software nao deve ser visto apenas como codigo, mas como solucao aplicada a dores reais. Em vez de comecar pela tecnologia em si, o raciocinio empreendedor comeca pela dor do usuario e so depois escolhe a melhor forma de resolve-la.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003esoftware como solucao de problemas reais;\u003c/li\u003e\u003cli\u003eexemplos de negocios que cresceram por resolver dores concretas;\u003c/li\u003e\u003cli\u003etecnologia como meio, nao como ponto de partida.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q10",
        "pergunta":  "O que e storytelling de negocios e por que ele e importante?",
        "resposta":  "Storytelling de negocios e a arte de contar historias com intencao estrategica para comunicar o valor de uma solucao de forma clara, envolvente e memoravel. Ele e importante porque uma boa ideia mal comunicada pode morrer antes mesmo de ser testada ou adotada. Ao usar narrativa, o empreendedor ajuda o outro a entender o contexto do problema, enxergar a solucao e perceber a transformacao gerada, aumentando o poder de convencimento da mensagem.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003estorytelling comunica valor com intencao estrategica;\u003c/li\u003e\u003cli\u003eajuda a tornar a ideia clara e envolvente;\u003c/li\u003e\u003cli\u003eevita que uma boa solucao seja desperdicada por ma comunicacao.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q11",
        "pergunta":  "Quais sao os tres componentes fundamentais do storytelling de negocios?",
        "resposta":  "Os tres componentes sao problema, virada e transformacao. O problema mostra quem sofre, como sofre e qual e a dor real. A virada apresenta o momento em que a solucao aparece. A transformacao mostra como a vida do cliente muda depois que a solucao passa a existir. Essa estrutura organiza a narrativa de forma simples e eficaz, sendo tambem a base de um bom pitch.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eproblema: dor real;\u003c/li\u003e\u003cli\u003evirada: entrada da solucao;\u003c/li\u003e\u003cli\u003etransformacao: resultado percebido depois da solucao.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q12",
        "pergunta":  "Diferencie proposito, missao, valores e visao no contexto do empreendedorismo.",
        "resposta":  "O proposito e o porque do negocio existir, ou seja, sua razao de ser e impacto no mundo. A missao e o que a empresa faz no presente e qual valor entrega ao publico. Os valores sao os principios que orientam atitudes, comportamentos e decisoes. Ja a visao indica onde a empresa quer chegar no futuro. Juntos, esses elementos criam identidade, coerencia interna e direcao estrategica para o negocio.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eproposito = porque;\u003c/li\u003e\u003cli\u003emissao = o que faz hoje;\u003c/li\u003e\u003cli\u003evalores = principios de conduta;\u003c/li\u003e\u003cli\u003evisao = futuro desejado.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q13",
        "pergunta":  "Por que proposito, missao e valores funcionam como um norte estrategico?",
        "resposta":  "Porque ajudam o empreendedor e a equipe a tomar decisoes com mais clareza, mesmo em cenarios complexos ou incertos. Quando esses elementos estao bem definidos, eles servem como criterio para escolher prioridades, rejeitar caminhos incoerentes e manter consistencia entre discurso e pratica. No contexto de produtos digitais, isso influencia desde decisoes tecnicas ate a experiencia do usuario, ja que o produto passa a refletir uma intencao mais clara.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003ereduzem incerteza na tomada de decisao;\u003c/li\u003e\u003cli\u003eajudam a manter coerencia e foco;\u003c/li\u003e\u003cli\u003eimpactam inclusive a construcao do produto.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q14",
        "pergunta":  "Por que a aula afirma que empreender comeca com um problema real e nao com uma ideia brilhante?",
        "resposta":  "Porque muitos negocios fracassam nao por falta de tecnologia, mas por tentar resolver problemas irrelevantes. A ideia, por si so, pode ser interessante, mas nao sustenta um negocio se nao estiver conectada a uma dor concreta do usuario. O empreendedorismo orientado a valor parte da observacao, da empatia e da analise critica do contexto para identificar algo que realmente merece ser resolvido. A ideia passa a ter forca quando nasce dessa necessidade real.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eproblemas irrelevantes geram negocios fracos;\u003c/li\u003e\u003cli\u003ea dor real do usuario vem antes da solucao;\u003c/li\u003e\u003cli\u003eobservacao e empatia ajudam a identificar oportunidades verdadeiras.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q15",
        "pergunta":  "O que e escuta ativa e por que ela e tao importante no empreendedorismo?",
        "resposta":  "Escuta ativa e ouvir o cliente com atencao genuina, sem tentar apenas confirmar hipoteses que o empreendedor ja tinha antes. Ela e importante porque o usuario nem sempre sabe dizer exatamente qual solucao quer, mas geralmente consegue expressar a dor, a frustracao e o contexto do problema. Quando o empreendedor escuta bem, ele reduz achismos, compreende melhor a realidade do usuario e aumenta a chance de criar algo relevante, utilizavel e valorizado.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eouvir com atencao genuina;\u003c/li\u003e\u003cli\u003eevitar confirmar apenas hipoteses previas;\u003c/li\u003e\u003cli\u003eusar a fala do cliente para entender a dor real.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q16",
        "pergunta":  "O que e persona e como ela ajuda na construcao de um software?",
        "resposta":  "Persona e uma representacao do cliente ideal, criada para ajudar a equipe a compreender melhor quem e o usuario, quais sao suas dores, comportamentos, necessidades e expectativas. Ela ajuda na construcao do software porque evita decisoes genericas e aproxima o produto de um publico concreto. Quando a equipe entende a persona, consegue priorizar melhor funcionalidades, simplificar interface e construir uma experiencia mais alinhada com o uso real.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003epersona representa o cliente ideal;\u003c/li\u003e\u003cli\u003eajuda a entender dores e comportamento;\u003c/li\u003e\u003cli\u003eorienta decisoes de interface, funcionalidade e experiencia.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q17",
        "pergunta":  "Uma equipe decide usar inteligencia artificial apenas porque e uma tecnologia “em alta”. Por que essa logica esta errada?",
        "resposta":  "Essa logica esta errada porque coloca a tecnologia acima do problema. No empreendedorismo, a tecnologia deve ser um meio para resolver uma dor real, e nao o ponto de partida da decisao. Quando a equipe comeca pela ferramenta da moda, corre o risco de construir algo sofisticado, mas inutil, dificil de explicar e sem aderencia ao mercado. O correto seria primeiro definir o problema relevante, depois avaliar qual tecnologia faz mais sentido para resolve-lo.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003ea tecnologia nao deve vir antes do problema;\u003c/li\u003e\u003cli\u003ecomecar pela moda aumenta risco de irrelevancia;\u003c/li\u003e\u003cli\u003eprimeiro define-se a dor, depois a solucao tecnologica.\u003c/li\u003e\u003c/ul\u003e"
    },
    {
        "id":  "empreend-q18",
        "pergunta":  "O que e proposta de valor e quais perguntas ela precisa responder?",
        "resposta":  "A proposta de valor e a promessa central de um negocio digital, ou seja, a razao principal pela qual alguem escolheria aquela solucao em vez da concorrencia. Para ser clara e forte, ela precisa responder tres perguntas: qual problema voce resolve, como voce resolve e qual beneficio real o cliente obtem. Se o usuario nao entende rapidamente essas respostas, tende a abandonar a solucao e buscar outra alternativa.\u003cbr /\u003e\u003cbr /\u003e\u003cspan class=\"text-amber-500 font-bold\"\u003e\u0026#9888; Pontos que nao podem faltar:\u003c/span\u003e\u003cul\u003e\u003cli\u003eproposta de valor e a promessa central do negocio;\u003c/li\u003e\u003cli\u003edeve responder problema, solucao e beneficio;\u003c/li\u003e\u003cli\u003eprecisa ser clara o bastante para convencer rapido.\u003c/li\u003e\u003c/ul\u003e"
    }
];



export const flashcardsEmpreendLote2 = [
  { id: 'empreend-lote2-f1', categoria: 'Pegadinhas de Prova', frente: 'Empreendedorismo e so abrir uma empresa?', verso: 'Nao. Empreendedorismo e criar algo novo e com valor, assumindo riscos e coordenando projetos ou mudancas.' },
  { id: 'empreend-lote2-f2', categoria: 'Pegadinhas de Prova', frente: 'Inovacao comeca pela tecnologia?', verso: 'Nao. Ela comeca pela identificacao de um problema real e relevante.' },
  { id: 'empreend-lote2-f3', categoria: 'Pegadinhas de Prova', frente: 'Empreender por necessidade e por oportunidade sao a mesma coisa?', verso: 'Nao. Por necessidade: buscar renda. Por oportunidade: enxergar um problema e criar uma solucao.' },
  { id: 'empreend-lote2-f4', categoria: 'Pegadinhas de Prova', frente: 'Uma ideia brilhante vale mais que um problema real?', verso: 'Nao. Negocios costumam falhar mais por resolver problemas irrelevantes do que por falta de tecnologia.' },
  { id: 'empreend-lote2-f5', categoria: 'Pegadinhas de Prova', frente: 'O que vem primeiro: tecnologia ou problema?', verso: 'Primeiro o problema. A tecnologia e o meio, nao o ponto de partida.' },
  { id: 'empreend-lote2-f6', categoria: 'Pegadinhas de Prova', frente: 'Escuta ativa serve so para “ser educado” com o cliente?', verso: 'Nao. Ela reduz erros, evita achismos e aproxima o produto da dor real do usuario.' },
  { id: 'empreend-lote2-f7', categoria: 'Pegadinhas de Prova', frente: 'Persona e qualquer descricao generica de publico?', verso: 'Nao. Persona e uma representacao mais concreta do cliente ideal, com contexto, dores e comportamento.' },
  { id: 'empreend-lote2-f8', categoria: 'Pegadinhas de Prova', frente: 'Se o codigo esta correto, o produto ja gerou valor?', verso: 'Nao necessariamente. Valor depende de utilidade, experiencia e aderencia ao problema do usuario.' },
  { id: 'empreend-lote2-f9', categoria: 'Pegadinhas de Prova', frente: 'Falar dificil em um pitch transmite mais competencia?', verso: 'Nao. Linguagem excessivamente tecnica pode afastar o cliente e esconder o valor real da solucao.' },
  { id: 'empreend-lote2-f10', categoria: 'Pegadinhas de Prova', frente: 'Storytelling de negocios e “contar uma historia bonita”?', verso: 'Nao. E organizar a narrativa em problema, virada e transformacao para comunicar valor com clareza.' },
  { id: 'empreend-lote2-f11', categoria: 'Pegadinhas de Prova', frente: 'Proposito, missao e valores significam a mesma coisa?', verso: 'Nao. Proposito = porque. Missao = o que fazemos. Valores = como agimos.' },
  { id: 'empreend-lote2-f12', categoria: 'Pegadinhas de Prova', frente: 'Visao e a mesma coisa que missao?', verso: 'Nao. Visao aponta onde a empresa quer chegar; missao define sua razao de ser no presente.' },
  { id: 'empreend-lote2-f13', categoria: 'Pegadinhas de Prova', frente: 'Proposito e apenas lucro?', verso: 'Nao. Proposito e a razao de existir e o impacto que o negocio quer gerar.' },
  { id: 'empreend-lote2-f14', categoria: 'Pegadinhas de Prova', frente: 'Missao fala mais do futuro distante do que do presente?', verso: 'Nao. Missao define a razao de ser da empresa no presente e o valor entregue ao publico.' },
  { id: 'empreend-lote2-f15', categoria: 'Pegadinhas de Prova', frente: 'Valores afetam so a imagem externa da empresa?', verso: 'Nao. Eles orientam comportamento, cultura e decisoes internas.' },
  { id: 'empreend-lote2-f16', categoria: 'Pegadinhas de Prova', frente: 'O empreendedor de sucesso nasce pronto?', verso: 'Nao. O material destaca que o processo empreendedor pode ser aprendido e ensinado.' },
  { id: 'empreend-lote2-f17', categoria: 'Pegadinhas de Prova', frente: 'Mentalidade de treino significa evitar erros?', verso: 'Nao. Significa fazer, errar, aprender e transformar isso em evolucao.' },
  { id: 'empreend-lote2-f18', categoria: 'Pegadinhas de Prova', frente: 'Resiliencia empreendedora e “aguentar tudo calado”?', verso: 'Nao. E superar barreiras, quebrar crencas limitantes e seguir ajustando a rota.' },
  { id: 'empreend-lote2-f19', categoria: 'Pegadinhas de Prova', frente: 'Foco em pontos fortes significa ignorar qualquer fraqueza?', verso: 'Nao. Significa construir excelencia a partir de talentos naturais, sem reduzir tudo a correcao de defeitos.' },
  { id: 'empreend-lote2-f20', categoria: 'Pegadinhas de Prova', frente: 'O caso Dropbox ensina que todo negocio deve comecar com video?', verso: 'Nao. A licao central e validar interesse e reduzir risco antes de investir pesado no desenvolvimento.' },
  { id: 'empreend-lote2-f21', categoria: 'Pegadinhas de Prova', frente: 'O primeiro C dos 5Cs e Cliente?', verso: 'Nao. O primeiro C e Coracao, ligado a proposito.' },
  { id: 'empreend-lote2-f22', categoria: 'Pegadinhas de Prova', frente: 'Cliente, nos 5Cs, quer dizer “o consumidor aparece so no final”?', verso: 'Nao. O produto nasce da dor do cliente e precisa ser validado em contato com ele.' },
  { id: 'empreend-lote2-f23', categoria: 'Pegadinhas de Prova', frente: 'Caixa, nos 5Cs, e so lucro?', verso: 'Nao. Refere-se a saude financeira e a capacidade de sustentar o negocio.' },
  { id: 'empreend-lote2-f24', categoria: 'Pegadinhas de Prova', frente: 'Cadencia e trabalhar sem parar?', verso: 'Nao. E criar disciplina, rituais e ciclos consistentes de planejamento e execucao.' },
  { id: 'empreend-lote2-f25', categoria: 'Pegadinhas de Prova', frente: 'Cultura e um detalhe “bonito”, mas secundario?', verso: 'Nao. Cultura molda comportamento, alinhamento e a forma como a empresa executa sua estrategia.' },
  { id: 'empreend-lote2-f26', categoria: 'Pegadinhas de Prova', frente: 'Proposta de valor responde so “o que meu app faz”?', verso: 'Nao. Ela deve deixar claro qual problema resolve, como resolve e qual beneficio real entrega.' },
  { id: 'empreend-lote2-f27', categoria: 'Pegadinhas de Prova', frente: 'Se o usuario nao entende rapidamente a proposta de valor, isso nao e tao grave?', verso: 'E grave. Ele pode abandonar seu software e ir para o concorrente.' },
  { id: 'empreend-lote2-f28', categoria: 'Pegadinhas de Prova', frente: 'Empreendedorismo comeca com dinheiro?', verso: 'Nao. O material reforca que comeca com percepcao.' },
  { id: 'empreend-lote2-f29', categoria: 'Pegadinhas de Prova', frente: 'Nubank e exemplo de diferencial tecnico complexo ou de experiencia simples?', verso: 'De experiencia do usuario radicalmente simples.' },
  { id: 'empreend-lote2-f30', categoria: 'Pegadinhas de Prova', frente: 'Resolver problemas do dia a dia das pessoas e exemplo de que tipo de empreendedorismo?', verso: 'Empreendedorismo por oportunidade.' },
];

export const questoesEmpreendLote2 = [
  { id: 'empreend-lote2-q1', pergunta: 'Explique por que o empreendedorismo nao pode ser reduzido ao simples ato de abrir uma empresa ou tirar um CNPJ.', resposta: 'O empreendedorismo vai alem da abertura formal de um negocio. O material define empreendedorismo como a capacidade de idealizar, coordenar e realizar projetos ou servicos, criando algo novo e com valor, sob condicoes de risco e incerteza. Isso significa que empreender envolve percepcao de problema, criacao de solucao, tomada de decisao e construcao de valor real para alguem, e nao apenas registrar uma empresa. Por isso, alguem pode ate abrir um CNPJ sem agir de forma empreendedora, enquanto outra pessoa pode empreender ao inovar dentro de uma organizacao ja existente.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>empreendedorismo nao e so abrir empresa;</li><li>envolve criar algo novo e com valor;</li><li>inclui risco, coordenacao, inovacao e solucao de problemas.</li></ul>' },
  { id: 'empreend-lote2-q2', pergunta: 'Diferencie empreendedorismo por necessidade e empreendedorismo por oportunidade, e explique por que essa diferenca importa.', resposta: 'Empreendedorismo por necessidade acontece quando a pessoa cria um negocio principalmente porque precisa gerar renda. Ja o empreendedorismo por oportunidade surge quando alguem percebe um problema real e decide criar uma solucao para ele. Essa diferenca importa porque, no segundo caso, o foco tende a estar mais na dor do cliente e no valor entregue, o que aumenta as chances de construir algo relevante. O material tambem mostra que o Brasil tem forte presenca dos dois modelos e que ha uma migracao crescente para negocios orientados por oportunidade.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>necessidade = busca de renda;</li><li>oportunidade = percepcao de problema real;</li><li>oportunidade tende a aproximar mais o negocio de valor e inovacao.</li></ul>' },
  { id: 'empreend-lote2-q3', pergunta: 'Uma equipe decide desenvolver um software porque a tecnologia usada esta “na moda”, mas nao sabe qual problema real vai resolver. Por que essa decisao e fraca do ponto de vista empreendedor?', resposta: 'Essa decisao e fraca porque inverte a logica do empreendedorismo. O ponto de partida correto nao e a tecnologia, mas o problema do cliente. Quando uma equipe escolhe a ferramenta antes de entender a dor real, corre o risco de criar um produto sofisticado, porem irrelevante. O material e o exercicio de revisao deixam claro que negocios falham mais por resolver problemas sem importancia do que por falta de tecnologia. A tecnologia deve ser escolhida depois que o problema, o publico e o valor estiverem claros.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>a tecnologia nao deve ser o ponto de partida;</li><li>o problema real deve vir primeiro;</li><li>sem clareza de dor e valor, o produto pode ser tecnicamente bom e comercialmente inutil.</li></ul>' },
  { id: 'empreend-lote2-q4', pergunta: 'O que significa dizer que “um sistema nao e apenas um conjunto de funcionalidades, ele carrega intencionalidade”?', resposta: 'Significa que um produto digital nao e apenas uma soma de recursos tecnicos. Ele expressa uma intencao, uma direcao e uma razao de existir. Quando proposito, missao e valores estao bem definidos, eles influenciam decisoes tecnicas, design, experiencia do usuario e prioridades de desenvolvimento. Assim, a construcao do sistema deixa de ser apenas operacional e passa a refletir o impacto que o negocio quer gerar no mundo e na vida do usuario.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>sistema nao e so funcionalidade;</li><li>ha proposito e direcao estrategica por tras do produto;</li><li>isso influencia decisoes tecnicas e experiencia do usuario.</li></ul>' },
  { id: 'empreend-lote2-q5', pergunta: 'Diferencie proposito, missao, visao e valores no contexto empreendedor.', resposta: 'Proposito e o “porque” da existencia do negocio, sua razao maior e o impacto que busca gerar. Missao e o “o que”, ou seja, o que a empresa faz no presente e qual valor entrega ao publico. Visao aponta onde a organizacao quer chegar no futuro, qual posicao deseja ocupar ou que referencia pretende se tornar. Ja os valores sao os principios que orientam atitudes, comportamentos e decisoes internas. Juntos, esses elementos formam a base identitaria e estrategica do negocio.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>proposito = porque;</li><li>missao = o que faz no presente;</li><li>visao = onde quer chegar;</li><li>valores = principios de acao e cultura.</li></ul>' },
  { id: 'empreend-lote2-q6', pergunta: 'Explique por que a escuta ativa e tao importante no desenvolvimento de produtos digitais.', resposta: 'A escuta ativa e importante porque impede que o produto seja construido com base em achismos. Ao ouvir o usuario com atencao, a equipe entende melhor suas dores, comportamentos, frustracoes e expectativas. Isso melhora a definicao de funcionalidades, reduz erros de direcao e aumenta a chance de o software ser util e adotado. Sem escuta ativa, a equipe corre o risco de investir tempo e esforco em algo que faz sentido apenas internamente, mas nao para o cliente real.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>evita achismos;</li><li>aproxima o desenvolvimento da dor real do usuario;</li><li>reduz erros e melhora aceitacao do produto.</li></ul>' },
  { id: 'empreend-lote2-q7', pergunta: 'Durante um pitch, um desenvolvedor fala de APIs, microsservicos e arquitetura em nuvem, mas o cliente nao entende a proposta. Qual foi o erro central?', resposta: 'O erro central foi comunicar a solucao em linguagem tecnica para um publico que precisava ouvir sobre problema, beneficio e valor. Em um contexto empreendedor, especialmente em pitches, a comunicacao deve comecar pela dor do cliente, mostrar como a solucao resolve essa dor e qual transformacao gera. Falar da tecnologia sem antes traduzir o beneficio faz a apresentacao perder clareza e impacto. A tecnica pode ser mencionada, mas nao deve ocupar o centro da mensagem para um publico nao tecnico.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>excesso de jargao tecnico;</li><li>foco errado na tecnologia, e nao no valor;</li><li>a apresentacao deveria explicar problema, solucao e beneficio.</li></ul>' },
  { id: 'empreend-lote2-q8', pergunta: 'Um sistema foi entregue sem bugs graves, mas os usuarios o abandonam porque e dificil de usar. Por que ele falhou do ponto de vista empreendedor?', resposta: 'Ele falhou porque correcao tecnica nao e suficiente para gerar valor. Um produto empreendedor precisa resolver a dor do usuario de forma util, clara e utilizavel. Se a experiencia e ruim, se a navegacao confunde ou se o sistema exige esforco excessivo, o cliente nao percebe valor real, mesmo que o codigo esteja bem feito. No empreendedorismo, o sucesso do produto depende da combinacao entre solucao, experiencia e aderencia a necessidade do usuario.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>sistema tecnicamente correto pode falhar no mercado;</li><li>valor depende tambem de usabilidade e experiencia;</li><li>sem resolver bem a dor, o usuario abandona.</li></ul>' },
  { id: 'empreend-lote2-q9', pergunta: 'O que a aula do Dropbox ensina sobre validacao e reducao de risco?', resposta: 'O caso do Dropbox ensina que nem sempre e necessario construir toda a solucao antes de testar o interesse do mercado. O fundador usou um video para apresentar a ideia e medir a reacao das pessoas antes de investir meses no desenvolvimento completo. A grande licao nao e “fazer video”, mas validar o problema, a proposta e a demanda de um jeito simples e barato. Isso reduz o risco de gastar tempo e recursos em algo que ninguem quer.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>a principal licao e validar antes de construir pesado;</li><li>o video foi um meio de testar interesse;</li><li>isso reduz risco e desperdicio de tempo.</li></ul>' },
  { id: 'empreend-lote2-q10', pergunta: 'Explique a importancia da persona no desenvolvimento de um software.', resposta: 'A persona ajuda a equipe a sair do abstrato e enxergar com mais clareza quem e o cliente ideal. Em vez de pensar em “usuarios em geral”, o time passa a considerar dores, contexto, comportamento, linguagem e necessidades de um perfil mais concreto. Isso melhora decisoes de interface, funcionalidades, comunicacao e proposta de valor. Sem persona, o produto tende a ficar generico e distante da realidade de quem vai usa-lo.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>persona representa o cliente ideal de forma concreta;</li><li>orienta decisoes de produto e comunicacao;</li><li>evita solucoes genericas e desconectadas do usuario real.</li></ul>' },
  { id: 'empreend-lote2-q11', pergunta: 'O que e proposta de valor e quais tres perguntas fundamentais ela deve responder?', resposta: 'Proposta de valor e a promessa central do negocio, aquilo que explica por que o cliente deveria escolher aquela solucao em vez de outras. Segundo o exercicio de revisao, ela precisa responder com clareza: qual problema voce resolve, como voce resolve e qual beneficio real o cliente obtem. Quando essas tres respostas nao aparecem rapidamente, o usuario tende a perder interesse e buscar outra alternativa.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>proposta de valor e a promessa central do negocio;</li><li>deve responder: qual problema resolve, como resolve, qual beneficio gera;</li><li>clareza rapida e decisiva para retencao e escolha.</li></ul>' },
  { id: 'empreend-lote2-q12', pergunta: 'Explique os 5Cs como base para profissionalizar uma ideia empreendedora.', resposta: 'Os 5Cs sao um conjunto de pilares para transformar uma ideia em empresa profissional. Coracao representa proposito, aquilo que move o negocio alem do dinheiro. Cliente lembra que o produto deve nascer da dor real do publico e ser validado com ele. Caixa se relaciona a saude financeira e a sustentabilidade do negocio. Cadencia diz respeito a disciplina, aos rituais e ciclos de execucao que mantem a empresa em movimento. Cultura envolve os comportamentos e valores que sustentam a forma de trabalhar. O equilibrio entre esses pilares evita que o negocio dependa apenas de inspiracao ou improviso.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>citar os 5Cs corretamente;</li><li>mostrar que eles estruturam a gestao do negocio;</li><li>destacar que o produto precisa nascer da dor do cliente.</li></ul>' },
  { id: 'empreend-lote2-q13', pergunta: 'O que significa ter mentalidade de treino no empreendedorismo?', resposta: 'Ter mentalidade de treino significa entender que o desenvolvimento empreendedor ocorre por pratica e aprendizado continuo, nao por perfeicao imediata. O material resume isso na logica de fazer, errar, aprender e treinar. Em vez de enxergar erros como prova de incapacidade, o empreendedor os trata como parte do processo de construcao de competencia. Essa visao favorece adaptacao, evolucao e coragem para agir mesmo em contextos de incerteza.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>empreender e processo aprendivel;</li><li>fazer + errar + aprender = treino;</li><li>erro vira aprendizado, nao paralisia.</li></ul>' },
  { id: 'empreend-lote2-q14', pergunta: 'Como a mentalidade do fundador se diferencia de uma postura apenas operacional?', resposta: 'A mentalidade do fundador envolve missao insurgente, cabeca de dono e obsessao com a linha de frente. Isso significa agir com senso de responsabilidade, proximidade com o cliente e compromisso profundo com o problema que esta sendo resolvido. Ja uma postura apenas operacional tende a executar tarefas sem esse vinculo estrategico e emocional com o negocio. A mentalidade do fundador faz a pessoa pensar no impacto, na visao e na sustentabilidade do projeto, e nao apenas na tarefa do dia.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>cabeca de dono;</li><li>missao e compromisso com o problema real;</li><li>proximidade com a linha de frente e visao estrategica.</li></ul>' },
  { id: 'empreend-lote2-q15', pergunta: 'Por que o material afirma que “empreendedorismo nao comeca com dinheiro; comeca com percepcao”?', resposta: 'Porque a origem de um bom negocio nao esta necessariamente no capital inicial, mas na capacidade de perceber problemas, oportunidades, mudancas e necessidades mal atendidas. Muitos casos apresentados mostram empresas que cresceram porque identificaram dores concretas do cotidiano e criaram solucoes relevantes. O dinheiro ajuda a escalar, mas a base empreendedora nasce da leitura correta da realidade e do valor que pode ser criado a partir dela.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>percepcao vem antes do recurso financeiro;</li><li>empreendedorismo comeca ao enxergar problemas e oportunidades;</li><li>capital ajuda, mas nao substitui visao de valor.</li></ul>' },
  { id: 'empreend-lote2-q16', pergunta: 'Use um exemplo das aulas para mostrar o que e resolver um problema real do cotidiano.', resposta: 'Um exemplo claro e o Nubank, citado como uma startup que enfrentou a burocracia bancaria com uma experiencia radicalmente simples. Outro e o iFood, que conectou restaurantes, entregadores e consumidores em tempo real, resolvendo um problema concreto do dia a dia. Esses casos mostram que bons negocios digitais nao crescem apenas por tecnologia sofisticada, mas por aliviar dores reais que as pessoas ja sentem com frequencia.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>citar ao menos um caso concreto das aulas;</li><li>mostrar qual problema real foi resolvido;</li><li>destacar que o crescimento vem da combinacao entre problema real e solucao util.</li></ul>' },
  { id: 'empreend-lote2-q17', pergunta: 'Uma equipe acredita ja saber o que o usuario quer e decide nao entrevistar, observar nem testar nada. Quais riscos essa decisao gera?', resposta: 'Essa decisao aumenta o risco de desenvolver um produto orientado por suposicoes e nao por evidencias. A equipe pode priorizar funcionalidades irrelevantes, construir uma interface desalinhada com o comportamento do usuario e gastar recursos em algo que sera mal recebido. Alem disso, sem contato com o cliente, a proposta de valor pode ficar confusa e a solucao pode nao atacar a dor principal. Escuta ativa e validacao reduzem exatamente esse tipo de desperdicio.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>risco de trabalhar por achismo;</li><li>possibilidade de criar produto desalinhado com o usuario;</li><li>entrevistas, testes e observacao reduzem desperdicio e erro.</li></ul>' },
  { id: 'empreend-lote2-q18', pergunta: 'Explique por que storytelling e pitch sao importantes no empreendedorismo, especialmente em tecnologia.', resposta: 'Storytelling e pitch sao importantes porque permitem transformar uma solucao tecnica em uma mensagem compreensivel e convincente. Em tecnologia, e comum o criador se apaixonar pela arquitetura, pela ferramenta ou pela complexidade da implementacao, mas o cliente, investidor ou parceiro quer entender a dor, a virada e a transformacao prometida. Um bom storytelling organiza essa narrativa e o pitch a apresenta de forma curta, clara e estrategica. Assim, a comunicacao deixa de ser tecnica demais e passa a destacar valor e impacto.<br /><br /><span class="text-amber-500 font-bold">&#9888; Pontos que nao podem faltar:</span><ul><li>storytelling organiza a narrativa em problema, virada e transformacao;</li><li>pitch comunica isso de forma rapida;</li><li>em tecnologia, isso ajuda a traduzir complexidade em valor percebido.</li></ul>' },
];