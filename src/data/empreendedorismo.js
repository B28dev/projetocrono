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

