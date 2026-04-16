export const examDate = new Date('2026-04-07T08:00:00');

export const referencePlaylists = [
  {
    id: 'marcelo-rios',
    title: 'Prof. Marcelo Rios - Arquitetura de Computadores',
    description: 'Playlist base para geracoes, numeracao e memoria.',
    url: 'https://www.youtube.com/playlist?list=PL866_LrQxNVipiEgWtJMK5Fcgc6IBfVvc',
  },
  {
    id: 'santiago-2020',
    title: 'Prof. Santiago - Arquitetura de Computadores 2020/1',
    description: 'Playlist de apoio para cache, pipeline, paralelismo e RISC/CISC.',
    url: 'https://www.youtube.com/playlist?list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD',
  },
];

export const topics = [
  { id: 'risc-cisc', name: 'RISC vs CISC', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'cache', name: 'Memoria Cache', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'geracoes', name: 'Geracoes (V/F)', frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'operacoes-binarias', name: 'Operacoes Binarias', frequency: '2/3 provas', level: 'frequente' },
  { id: 'pipeline', name: 'Pipeline', frequency: '2/3 provas', level: 'frequente' },
  { id: 'ula', name: 'ULA', frequency: '1/3 provas', level: 'apareceu' },
  { id: 'ram-rom', name: 'Memoria RAM/ROM', frequency: '1/3 provas', level: 'apareceu' },
  { id: 'paralela', name: 'Arq. Paralela', frequency: '1/3 provas', level: 'apareceu' },
];

const studyPlanNoturnoBase = [
  {
    date: '2026-03-31',
    label: 'Ter 31/03',
    topic: 'Introducao + Geracoes',
    tasks: [
      'Marcel Rios - Aula 1: Evolucao dos computadores.',
      'Marcel Rios - Aula 2: Componentes do computador.',
      'Responder questoes de V/F e justificar os itens FALSOS por escrito',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Evolucao dos Computadores',
        url: 'https://www.youtube.com/watch?v=jNRxV5DPeTc&list=PL866_LrQxNVipiEgWtJMK5Fcgc6IBfVvc&index=2',
      },
      {
        kind: 'youtube',
        title: 'Componentes do Computador',
        url: 'https://www.youtube.com/watch?v=69PulYNXpzM',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Conteudo',
        content: '1a = valvulas, 2a = transistores, 3a = CI, 4a = microprocessadores, 5a = IA.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Nas provas de 2023 e 2024, as questoes V/F pediram justificativa dos itens falsos. Os erros mais comuns estao na 1a geracao e na 5a geracao.',
      },
    ],
  },
  {
    date: '2026-04-01',
    label: 'Qua 01/04',
    topic: 'Sistemas de numeracao e conversoes',
    tasks: [
      'Marcel Rios - Representacao de Dados (binario, decimal e hexadecimal).',
      'Ewerton Salvador - Aprenda numeros binarios.',
      'Praticar conversoes: decimal <-> binario <-> hexadecimal (10 numeros de cada sentido).',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Representacao de Dados',
        url: 'https://www.youtube.com/watch?v=m13GwTUw3BI',
      },
      {
        kind: 'youtube',
        title: 'Aprenda Numeros Binarios',
        url: 'https://www.youtube.com/watch?v=oSWaCuNoc6U',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Foco',
        content: 'O caminho hexadecimal -> decimal -> binario e o mais cobrado nos itens f-j das provas.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Na prova de 2023, as operacoes encadeadas davam credito parcial se a conversao estivesse certa. Mostre o raciocinio.',
      },
    ],
  },
  {
    date: '2026-04-02',
    label: 'Qui 02/04',
    topic: 'Operacoes binarias: +, -, x e /',
    tasks: [
      'Codigo Binario - operacoes completas e revisao de sistemas de numeracao.',
      'Resolver os itens a-e das questoes 15, 16 e 17 do simulado.',
      'Resolver itens - (encadeados: converter -> operar -> converter resultado)',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Codigo Binario - Operacoes Completas',
        url: 'https://www.youtube.com/watch?v=uFh7E_dMisk',
      },
      {
        kind: 'youtube',
        title: 'Sistemas de Numeracao',
        url: 'https://www.youtube.com/watch?v=OOxWr3aNIFw&list=PL866_LrQxNVipiEgWtJMK5Fcgc6IBfVvc&index=4',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Regra',
        content: 'Sempre converta tudo para binario antes de operar. Nao opere direto em hexadecimal.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Na P1/2023, um erro classico foi errar a conversao antes de multiplicar. Confira as potencias de 2 antes de operar.',
      },
    ],
  },
  {
    date: '2026-04-03',
    label: 'Sex 03/04',
    topic: 'Memoria RAM, ROM e hierarquia',
    tasks: [
      'Marcel Rios - memoria e tipos (RAM, ROM e memoria secundaria).',
      'Prof. Santiago - organizacao da memoria, barramentos e hierarquia.',
      'Redigir um paragrafo comparando RAM e ROM com exemplos reais.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Tipos de Memoria',
        url: 'https://www.youtube.com/watch?v=kPPcJsMKb4g&list=PL866_LrQxNVipiEgWtJMK5Fcgc6IBfVvc&index=7&pp=iAQB',
      },
      {
        kind: 'youtube',
        title: 'Tipos de Barramento',
        url: 'https://www.youtube.com/watch?v=AAidPCXPZ2A',
      },
      {
        kind: 'youtube',
        title: 'Hierarquia de Memoria',
        url: 'https://www.youtube.com/watch?v=WcHX6Ukm15E&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=12&pp=iAQB',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Piramide',
        content: 'Registradores -> cache -> RAM -> disco, do mais rapido para o mais lento.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Na P1/2024-B, a questao pediu exemplos de uso. Para RAM, cite programas em execucao. Para ROM, cite BIOS e firmware.',
      },
    ],
  },
  {
    date: '2026-04-04',
    label: 'Sab 04/04',
    topic: 'Memoria cache - L1, L2 e L3',
    tasks: [
      'Prof. Santiago - hierarquia e memoria cache (L1, L2 e L3).',
      'Material ICMC/USP - organizacao da memoria cache.',
      'Redigir respostas sobre memoria cache (Conceito de cache como e utilizada pra otimizar o desempenho, como ela funciona destacando vantagens, falar sobre os diferentes niveis de cache L1 L2 L3)',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Hierarquia de Memoria',
        url: 'https://www.youtube.com/watch?v=WcHX6Ukm15E&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=12&pp=iAQB',
      },
      {
        kind: 'youtube',
        title: 'Memoria Cache',
        url: 'https://www.youtube.com/watch?v=pNUUHlWj27Y&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=13&pp=iAQB',
      },
      {
        kind: 'youtube',
        title: 'Memoria Cache - Mapeamento',
        url: 'https://www.youtube.com/watch?v=pNUUHlWj27Y&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=13&pp=iAQB',
      },
      {
        kind: 'youtube',
        title: 'Memoria Cache - Otimizacao',
        url: 'https://www.youtube.com/watch?v=QmsLiYVQoXE&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=15&pp=iAQB0gcJCdkKAYcqIYzv',
      },
      {
        kind: 'link',
        title: 'PDF ICMC/USP - Organizacao da Memoria Cache',
        url: 'http://wiki.icmc.usp.br/images/c/c6/SSC0510-Aula09.pdf',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Regra',
        content: 'L1 e a menor e mais rapida dentro do core. L3 e a maior e mais lenta, compartilhada entre nucleos.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Cache caiu nas 3 provas com enfoques diferentes. Prepare uma resposta que cubra conceito, desempenho e diferencas entre os niveis.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Calculo de memoria - T, N, M e E',
    tasks: [
      'Como calcular barramento de enderecos em bits.',
      'Organizacao da memoria e espaco de enderecamento.',
      'Refazer os 4 exemplos da Aula 07 sem olhar a solucao.',
      'Resolver os 10 exercicios de calculo de memoria do PDF da Aula',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Barramento de Enderecos em Bits',
        url: 'https://www.youtube.com/watch?v=1VHeS6ABQrk',
      },
      {
        kind: 'youtube',
        title: 'Organizacao da Memoria',
        url: 'https://www.youtube.com/watch?v=ypRu1BQ0z18',
      },
      {
        kind: 'youtube',
        title: 'Complementar de Memoria',
        url: 'https://www.youtube.com/watch?v=GVcQpKFNd1Q',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Formulas',
        content: 'T = N x M, N = 2^E, E = log2(N) e 8K = 2^13.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Mesmo errando o resultado final, mostrar as potencias e o desenvolvimento costuma garantir parte da pontuacao.',
      },
    ],
  },
  {
    date: '2026-04-06',
    label: 'Seg 06/04',
    topic: 'RISC vs CISC - tema mais cobrado',
    tasks: [
      'Prof. Santiago - conjunto de instrucoes e enderecamento.',
      'Video explicativo de RISC vs CISC.',
      'Filosofia RISC-V na pratica.',
      'Ler os slides do Luciani da Aula 02.',
      'Redigir no papel sobre a diferenca entre RISC e CISC (conjunto de instrucoes, desempenho, complexidade de execucao, eficiencia e flexibilidade)',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Conjunto de Instrucoes: Caracteristicas e Funcoes',
        url: 'https://www.youtube.com/watch?v=LfGdcjG_xTI&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=4',
      },
      {
        kind: 'youtube',
        title: 'Conjunto de Instrucoes: Modos de Enderecamento e Formatos',
        url: 'https://www.youtube.com/watch?v=CUJg6d1DDy0',
      },
      {
        kind: 'youtube',
        title: 'RISC-V na Pratica',
        url: 'https://www.youtube.com/watch?v=kA5QCiqhNv0',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Resumo',
        content: 'RISC = poucas instrucoes simples e geralmente 1 ciclo. CISC = mais instrucoes complexas e codigo mais compacto.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Tema presente nas 3 provas. Sempre mencione numero de instrucoes, complexidade do hardware, papel do compilador e impacto no desempenho.',
      },
    ],
  },
  {
    date: '2026-04-07',
    label: 'Ter 07/04',
    topic: 'Pipeline, ULA e arquitetura paralela',
    tasks: [
      'Prof. Santiago - Aula 14: Pipelining.',
      'Prof. Santiago - Aula 21: Paralelismo e arquitetura paralela.',
      'Prof. Santiago - CPU, caminho de dados e ULA.',
      'Redigir respostas sobre (1. pipeline: o que e, quais desafios, como e utilizada pra melhorar o desempenho, desafios e formas de mitigar; 2. arquitetura paralela: o que e, quais os tipos e como cada um funciona para melhorar o desempenho, exemplo de 2 estruturas paralelas; 3. ULA: o que e, quais as funcoes e como contribui para o desempenho.)',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Pipelining - Visao Geral',
        url: 'https://www.youtube.com/watch?v=FvI5Kk8jmZQ',
      },
      {
        kind: 'youtube',
        title: 'Paralelismo de Instrucoes',
        url: 'https://www.youtube.com/watch?v=NV4P_P_ZNLA',
      },
      {
        kind: 'youtube',
        title: 'Caminho de Dados',
        url: 'https://www.youtube.com/watch?v=4b9fsI_3FG8&list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD&index=9',
      },
    ],
    notes: [
      {
        variant: 'base',
        title: 'Pipeline',
        content: 'IF -> ID -> EX -> MEM -> WB. Hazard acontece quando uma etapa depende de resultado anterior e trava a linha.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Ao explicar pipeline, cite definicao, ganho de desempenho e os tres tipos de hazard: dados, controle e estrutural.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra 2',
        content: 'Para arquitetura paralela, tenha pelo menos dois exemplos prontos: multiprocessadores e SIMD.',
      },
    ],
  },
  {
    date: '2026-04-05',
    label: 'Dom 05/04',
    topic: 'Resolver Questoes (se possivel algum simulado)',
    subtitle: 'REVISAO',
    tasks: [
      'Revisao: Resolver o simulado completo do zero - 1h40 cronometrado',
      'Revisao: Comparar respostas e marcar os pontos fracos',
      'Revisao: Refazer operacoes binarias das provas P1/2023 e P1/2024',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Objetivo',
        content: 'Simular a pressao da prova real. O que errar aqui define o foco do dia seguinte.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'A prova tem 5 questoes dissertativas, caneta azul ou preta e desconto por erros de portugues. Escreva com frases completas.',
      },
    ],
  },
  {
    date: '2026-04-09',
    label: 'Qui 09/04',
    topic: 'Reforco nos pontos fracos',
    tasks: [
      'Rever os temas que erraram no simulado do dia 9 (caso tenha achado).',
      'Escrever as respostas dissertativas no papel, como sera na prova real.',
      'Fazer 5 operacoes binarias aleatorias para manter o ritmo.',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Por que escrever no papel',
        content: 'A prova e manuscrita. Treinar a escrita ajuda a organizar ideias e evita branco na hora.',
      },
      {
        variant: 'coach',
        title: 'Dica Extra',
        content: 'Use uma estrutura simples: definicao, desenvolvimento e conclusao com impacto ou exemplo. Tres paragrafos bastam.',
      },
    ],
  },
  {
    date: '2026-04-10',
    label: 'Sex 10/04',
    topic: 'Vespera - revisao leve e descanso',
    tasks: [
      'Reler os resumos de RISC/CISC, cache, pipeline e geracoes.',
      'Revisar a tabela de geracoes e as formulas T = N x M e E = log2(N).',
      'Dormir bem e evitar madrugada estudando.',
    ],
    resources: [],
    notes: [
      {
        variant: 'base',
        title: 'Ritmo',
        content: 'Revisao leve e suficiente. O sono ajuda a consolidar a memoria antes da prova.',
      },
    ],
  },
  {
    date: '2026-04-13',
    label: 'Seg 13/04',
    topic: 'Dia da Prova',
    tasks: [
      'Levar caneta azul ou preta.',
      'Ler todas as questoes antes de comecar a responder.',
      'Comecar pelas questoes que voce domina para garantir a pontuacao base.',
      'Nas operacoes binarias, conferir cada passo com as potencias de 2.',
    ],
    resources: [],
    notes: [
      {
        variant: 'coach',
        title: 'Regras',
        content: 'Tempo minimo para sair: 30 min. Tempo total: 1h40. Erros de portugues sao descontados.',
      },
    ],
    isExamDay: true,
  },
];

const VESPERTINO_CRONO_MAP = [
  { date: '2026-03-28', label: 'Sab 28/03', topic: 'Introducao + Geracoes' },
  { date: '2026-03-29', label: 'Dom 29/03', topic: 'Sistemas de numeracao e conversoes' },
  { date: '2026-03-30', label: 'Seg 30/03', topic: 'Operacoes binarias: +, -, x e /' },
  { date: '2026-03-31', label: 'Ter 31/03', topic: 'Memoria RAM, ROM e hierarquia' },
  { date: '2026-04-01', label: 'Qua 01/04', topic: 'Memoria cache - L1, L2 e L3' },
  { date: '2026-04-02', label: 'Qui 02/04', topic: 'Calculo de memoria - T, N, M e E' },
  { date: '2026-04-03', label: 'Sex 03/04', topic: 'RISC vs CISC - tema mais cobrado' },
  { date: '2026-04-04', label: 'Sab 04/04', topic: 'Pipeline, ULA e arquitetura paralela' },
  { date: '2026-04-05', label: 'Dom 05/04', topic: 'Resolver Questoes (se possivel algum simulado)' },
  { date: '2026-04-06', label: 'Seg 06/04', topic: 'Reforco nos pontos fracos' },
  { date: '2026-04-06', label: 'Seg 06/04', topic: 'Vespera - revisao leve e descanso' },
  { date: '2026-04-07', label: 'Ter 07/04', topic: 'Dia da Prova', isExamDay: true },
];

function withPlanIds(plan, prefix) {
  return plan.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
  }));
}

const studyPlanNoturno = withPlanIds(studyPlanNoturnoBase, 'noturno');

const studyPlanVespertinoBase = withPlanIds(
  studyPlanNoturnoBase.map((item, index) => {
    const mapped = VESPERTINO_CRONO_MAP[index];

    if (!mapped) return item;

    return {
      ...item,
      date: mapped.date,
      label: mapped.label,
      topic: mapped.topic,
      isExamDay: mapped.isExamDay ?? item.isExamDay,
    };
  }),
  'vespertino',
);

const studyPlanVespertino = [
  {
    id: 'vespertino-0',
    date: '2026-03-27',
    label: 'Sex 27/03',
    topic: 'Playlists Referencia',
    tasks: [
      'Playlist base para geracoes, numeracao e memoria.',
      'Playlist de apoio para cache, pipeline, paralelismo e RISC/CISC.',
    ],
    resources: [
      {
        kind: 'youtube',
        title: 'Prof. Marcelo Rios - Arquitetura de Computadores',
        url: 'https://www.youtube.com/playlist?list=PL866_LrQxNVipiEgWtJMK5Fcgc6IBfVvc',
      },
      {
        kind: 'youtube',
        title: 'Prof. Santiago - Arquitetura de Computadores 2020/1',
        url: 'https://www.youtube.com/playlist?list=PLBw9d_OueVJQV_O4qEvC2e5TQ5RZeL9BD',
      },
    ],
    notes: [],
  },
  ...studyPlanVespertinoBase,
];

export const studyPlanByShift = {
  'noturno-adele': studyPlanNoturno,
  'vespertino-snyder': studyPlanVespertino,
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
    id: 'geracoes',
    title: 'Geracoes dos Computadores',
    bullets: [
      '1a (1940-50): valvulas eletronicas, maquinas enormes, lentas e com alto consumo. Exemplo: ENIAC.',
      '2a (1950-60): transistores, menores, mais rapidos e mais confiaveis.',
      '3a (1960-70): circuitos integrados, varios transistores em um unico chip.',
      '4a (1970-hoje): microprocessadores, CPU inteira em um unico chip e popularizacao do PC.',
      '5a (em desenvolvimento): IA e sistemas capazes de aprender e raciocinar.',
      'Erro classico de prova: a 5a geracao ainda nao e algo consolidado. Evite afirmar isso como fato fechado em V/F.',
    ],
  },
  {
    id: 'risc-cisc',
    title: 'RISC vs CISC',
    bullets: [
      'RISC: poucas instrucoes simples, tamanho fixo e tendencia a 1 ciclo por instrucao. Hardware mais simples. Ex: ARM e RISC-V.',
      'CISC: muitas instrucoes complexas, varias operacoes por instrucao e multiplos ciclos. Hardware mais complexo. Ex: x86.',
      'RISC favorece clock alto e pipeline eficiente.',
      'CISC favorece compatibilidade e maior densidade de codigo.',
      'RISC usa poucos modos de enderecamento; CISC costuma suportar muitos.',
      'Resposta forte em prova: numero de instrucoes, complexidade de hardware, papel do compilador e impacto no desempenho.',
    ],
  },
  {
    id: 'cache',
    title: 'Memoria Cache',
    bullets: [
      'Memoria de alta velocidade entre processador e RAM, usada para manter dados e instrucoes de acesso frequente.',
      'Melhora desempenho reduzindo latencia e evitando acessos lentos a RAM.',
      'L1: menor e mais rapida, dentro do nucleo.',
      'L2: maior que L1 e um pouco mais lenta, ainda no chip.',
      'L3: maior, compartilhada entre nucleos e mais lenta que L1/L2, mas muito mais rapida que a RAM.',
      'Regra de ouro: quanto mais perto do processador, menor e mais rapida; quanto mais longe, maior e mais lenta.',
    ],
  },
  {
    id: 'pipeline',
    title: 'Pipeline',
    bullets: [
      'Pipeline divide a execucao em estagios independentes para permitir varias instrucoes em paralelo.',
      'Estagios classicos: IF -> ID -> EX -> MEM -> WB.',
      'Melhora desempenho aumentando throughput.',
      'Hazard de dados: uma instrucao depende de resultado ainda nao pronto; mitigacao com forwarding ou stall.',
      'Hazard de controle: desvios condicionais interrompem o fluxo; mitigacao com predicao de desvio.',
      'Hazard estrutural: dois estagios disputam o mesmo recurso; mitigacao com duplicacao de hardware.',
    ],
  },
  {
    id: 'ula',
    title: 'ULA (Unidade Logica e Aritmetica)',
    bullets: [
      'Componente do processador responsavel pelos calculos numericos e operacoes logicas.',
      'Operacoes aritmeticas: adicao, subtracao, multiplicacao, divisao e comparacao.',
      'Operacoes logicas: AND, OR, NOT e XOR.',
      'Recebe operandos dos registradores, executa a operacao indicada pelo opcode e devolve o resultado para registrador ou memoria.',
    ],
  },
  {
    id: 'ram-rom',
    title: 'RAM e ROM',
    bullets: [
      'RAM e volatil: perde os dados ao desligar. Guarda programas e dados em execucao.',
      'ROM e nao volatil: mantem dados sem energia. Guarda BIOS, UEFI e firmware.',
      'Analogia util: RAM = mesa de trabalho; ROM = livro impresso.',
      'Hierarquia completa: registradores -> cache -> RAM -> disco.',
      'Em prova, exemplos concretos valem mais que definicoes genericas.',
    ],
  },
  {
    id: 'paralela',
    title: 'Arquitetura Paralela',
    bullets: [
      'Organizacao de sistemas que permite execucao simultanea de tarefas para elevar desempenho.',
      'Multiprocessadores: varias CPUs independentes compartilhando memoria.',
      'SIMD: uma instrucao aplicada a varios dados ao mesmo tempo.',
      'Principio central: dividir o trabalho entre varias unidades reduz o tempo total.',
      'Na prova, tenha ao menos dois tipos diferentes prontos para explicar com exemplo.',
    ],
  },
];

export const examCoverage = [
  {
    id: 'p1-2023',
    title: 'P1 - Abr/2023',
    bullets: [
      'RISC/CISC: diferencas, desempenho e complexidade.',
      'Cache: conceito, niveis, tamanho e velocidade.',
      'Pipeline: conceito, desafios e mitigacao.',
      'Operacoes binarias com conversoes hexadecimal/decimal.',
      'Geracoes: V/F sobre evolucao dos computadores.',
    ],
  },
  {
    id: 'p1-2024-a',
    title: 'P1 - Abr/2024 (Turma A)',
    bullets: [
      'RISC/CISC: modos de enderecamento e eficiencia.',
      'Cache: hierarquia e organizacao dos niveis.',
      'RISC/CISC: complexidade do conjunto de instrucoes.',
      'ULA: operacoes matematicas e logicas.',
      'Geracoes: V/F sobre valvulas, transistores e microprocessadores.',
    ],
  },
  {
    id: 'p1-2024-b',
    title: 'P1 - Abr/2024 (Turma B)',
    bullets: [
      'Cache: papel na otimizacao, niveis e acesso.',
      'Arquitetura paralela: pelo menos dois tipos.',
      'RISC/CISC: execucao eficiente de instrucoes.',
      'RAM/ROM: volatil vs nao volatil com exemplos.',
      'Geracoes: V/F sobre circuitos integrados, internet e IA.',
    ],
  },
];
