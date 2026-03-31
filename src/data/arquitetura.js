// All structured data extracted from CRONOGRAMA_ARQT_COMP2.html

export const examDate = new Date('2026-04-07T08:00:00');

export const topics = [
  { id: 'risc-cisc',   name: 'RISC vs CISC',          frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'cache',       name: 'Memória Cache',           frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'geracoes',    name: 'Gerações (V/F)',          frequency: '3/3 provas', level: 'muito-frequente' },
  { id: 'org-memoria', name: 'Organização de Memória',  frequency: '2/3 provas', level: 'frequente'       },
  { id: 'paralela',    name: 'Arq. Paralela',           frequency: '2/3 provas', level: 'frequente'       },
  { id: 'pipeline',    name: 'Pipeline',                frequency: '1/3 provas', level: 'apareceu'        },
  { id: 'ula',         name: 'ULA',                     frequency: '1/3 provas', level: 'apareceu'        },
  { id: 'ram-rom',     name: 'RAM / ROM',               frequency: '1/3 provas', level: 'apareceu'        },
];

export const studyPlan = [
  {
    date: '2026-03-28', label: 'Sáb 28/03', topic: 'Introdução + Gerações',
    tasks: [
      'Assistir: Evolução dos Computadores (Marcel Rios)',
      'Assistir: Componentes do Computador (Marcel Rios)',
      'Responder questões V/F e justificar os FALSOS por escrito',
    ],
    videos: [
      { title: 'Marcel Rios – Evolução dos Computadores', url: 'https://www.youtube.com/embed/jNRxV5DPeTc' },
      { title: 'Marcel Rios – Componentes do Computador', url: 'https://www.youtube.com/embed/69PulYNXpzM' },
    ],
  },
  {
    date: '2026-03-29', label: 'Dom 29/03', topic: 'Sistemas de Numeração e Conversões',
    tasks: [
      'Assistir: Representação de Dados (Marcel Rios)',
      'Assistir: Aprenda Números Binários (Ewerton Salvador)',
      'Praticar conversões: decimal ↔ binário ↔ hex (10 de cada)',
    ],
    videos: [
      { title: 'Marcel Rios – Representação de Dados',  url: 'https://www.youtube.com/embed/m13GwTUw3BI' },
      { title: 'Ewerton Salvador – Números Binários',   url: 'https://www.youtube.com/embed/oSWaCuNoc6U' },
    ],
  },
  {
    date: '2026-03-30', label: 'Seg 30/03', topic: 'Operações Binárias (+, −, ×, ÷)',
    tasks: [
      'Assistir: Operações Binárias Completas',
      'Assistir: Sistemas de Numeração (Marcel Rios)',
      'Resolver questões com operações encadeadas',
    ],
    videos: [
      { title: 'Código Binário – Operações Completas', url: 'https://www.youtube.com/embed/uFh7E_dMisk' },
      { title: 'Marcel Rios – Sistemas de Numeração',  url: 'https://www.youtube.com/embed/OOxWr3aNIFw' },
    ],
  },
  {
    date: '2026-03-31', label: 'Ter 31/03', topic: 'Memória RAM, ROM e Hierarquia',
    tasks: [
      'Assistir: Memória e Tipos (Marcel Rios)',
      'Assistir: Tipos de Barramento (Prof. Santiago)',
      'Assistir: Hierarquia de Memória (Prof. Santiago)',
      'Escrever parágrafo comparando RAM vs ROM com exemplos reais',
    ],
    videos: [
      { title: 'Marcel Rios – Memória e Tipos',          url: 'https://www.youtube.com/embed/kPPcJsMKb4g' },
      { title: 'Prof. Santiago – Tipos de Barramento',   url: 'https://www.youtube.com/embed/AAidPCXPZ2A' },
      { title: 'Prof. Santiago – Hierarquia de Memória', url: 'https://www.youtube.com/embed/WcHX6Ukm15E' },
    ],
  },
  {
    date: '2026-04-01', label: 'Qua 01/04', topic: 'Memória Cache (L1, L2, L3)',
    tasks: [
      'Assistir: 3 aulas de Prof. Santiago sobre Cache',
      'Ler material ICMC/USP sobre Cache',
      'Escrever sobre: conceito, otimização e diferenças L1/L2/L3',
    ],
    videos: [
      { title: 'Prof. Santiago – Hierarquia de Memória', url: 'https://www.youtube.com/embed/WcHX6Ukm15E' },
      { title: 'Prof. Santiago – Memória Cache',         url: 'https://www.youtube.com/embed/pNUUHlWj27Y' },
      { title: 'Prof. Santiago – Otimização de Cache',   url: 'https://www.youtube.com/embed/QmsLiYVQoXE' },
    ],
  },
  {
    date: '2026-04-02', label: 'Qui 02/04', topic: 'Cálculo de Memória (T, N, M, E)',
    tasks: [
      'Assistir: vídeos de Organização de Memória (3 vídeos)',
      'Refazer 4 exemplos da Aula 07 sem consultar a solução',
      'Resolver 10 exercícios de cálculo de memória',
    ],
    videos: [
      { title: 'Largura do Barramento de Endereço',             url: 'https://www.youtube.com/embed/1VHeS6ABQrk' },
      { title: 'Organização de Memória – Espaço de Endereçamento', url: 'https://www.youtube.com/embed/ypRu1BQ0z18' },
      { title: 'Material Complementar de Memória',              url: 'https://www.youtube.com/embed/GVcQpKFNd1Q' },
    ],
  },
  {
    date: '2026-04-03', label: 'Sex 03/04', topic: 'RISC vs CISC (Tema mais cobrado)',
    tasks: [
      'Assistir: Instruction Set & Addressing (Prof. Santiago)',
      'Assistir: RISC vs CISC – Explicação',
      'Assistir: RISC-V na Prática',
      'Escrever no papel: diferenças RISC/CISC (instruções, hardware, compilador, desempenho)',
    ],
    videos: [
      { title: 'Prof. Santiago – Instruction Set & Addressing', url: 'https://www.youtube.com/embed/LfGdcjG_xTI' },
      { title: 'RISC vs CISC – Explicação',                    url: 'https://www.youtube.com/embed/CUJg6d1DDy0' },
      { title: 'RISC-V na Prática',                            url: 'https://www.youtube.com/embed/kA5QCiqhNv0' },
    ],
  },
  {
    date: '2026-04-04', label: 'Sáb 04/04', topic: 'Pipeline, ULA e Arquitetura Paralela',
    tasks: [
      'Assistir: Pipelining – Aula 14 (Prof. Santiago)',
      'Assistir: Paralelismo – Aula 21 (Prof. Santiago)',
      'Assistir: Data Path & ALU (Prof. Santiago)',
      'Escrever: Pipeline (estágios + hazards), Paralela (2+ tipos), ULA (funções)',
    ],
    videos: [
      { title: 'Prof. Santiago – Pipelining',    url: 'https://www.youtube.com/embed/FvI5Kk8jmZQ' },
      { title: 'Prof. Santiago – Paralelismo',   url: 'https://www.youtube.com/embed/NV4P_P_ZNLA' },
      { title: 'Prof. Santiago – Data Path/ALU', url: 'https://www.youtube.com/embed/4b9fsI_3FG8' },
    ],
  },
  {
    date: '2026-04-05', label: 'Dom 05/04', topic: 'Simulado Completo',
    tasks: [
      'Fazer simulado completo cronometrado – 1h40',
      'Comparar respostas e anotar pontos fracos',
      'Refazer operações binárias das provas P1/2023 e P1/2024',
    ],
    videos: [],
  },
  {
    date: '2026-04-06', label: 'Seg 06/04', topic: 'Reforço nos Pontos Fracos',
    tasks: [
      'Revisar os tópicos errados no simulado',
      'Escrever respostas dissertativas no papel (como na prova real)',
      'Fazer 5 operações binárias aleatórias para manter velocidade',
    ],
    videos: [],
  },
  {
    date: '2026-04-07', label: 'Ter 07/04 — PROVA', topic: 'Dia da Prova',
    tasks: [
      'Reler resumos: RISC/CISC, Cache, Pipeline, Gerações',
      'Revisar tabela de gerações e fórmulas T=N×M e E=log₂(N)',
      'Dormir bem — não estudar até tarde!',
    ],
    videos: [],
    isExamDay: true,
  },
];

export const summaries = [
  {
    id: 'geracoes',
    title: 'Gerações dos Computadores',
    bullets: [
      '1ª (1940–50): Válvulas eletrônicas — enormes, lentas, alto consumo. Ex: ENIAC',
      '2ª (1950–60): Transistores — menores, mais rápidos, mais confiáveis',
      '3ª (1960–70): Circuitos Integrados (CIs) — múltiplos transistores em um chip',
      '4ª (1970–hoje): Microprocessadores — CPU inteira em um único chip; surge o PC',
      '5ª (em desenvolvimento): IA — sistemas capazes de aprender e raciocinar',
      '⚠ Erro clássico: a 5ª geração NÃO está consolidada — evite afirmações absolutas sobre ela (V/F)',
    ],
  },
  {
    id: 'risc-cisc',
    title: 'RISC vs CISC',
    bullets: [
      'RISC: poucas instruções simples, tamanho fixo, 1 ciclo cada. Compilador faz a combinação. Hardware simples. Ex: ARM, RISC-V',
      'CISC: muitas instruções complexas, pode fazer várias operações por instrução, múltiplos ciclos. Hardware complexo. Código compacto. Ex: x86 (Intel/AMD)',
      'RISC: favorece alta frequência de clock e pipeline eficiente',
      'CISC: favorece compatibilidade e densidade de código',
      'Modos de endereçamento: RISC usa poucos (registrador, imediato); CISC suporta muitos (indireto, indexado)',
      'Mencionar sempre: nº de instruções, complexidade de hardware, papel do compilador, impacto no desempenho',
    ],
  },
  {
    id: 'cache',
    title: 'Memória Cache',
    bullets: [
      'Definição: memória de alta velocidade entre processador e RAM, armazena dados/instruções de uso frequente',
      'Melhoria de desempenho: mantém dados mais usados perto do processador, evita acesso lento à RAM, reduz latência',
      'L1: dentro do núcleo, menor (8–64 KB), mais rápida (1–4 ciclos)',
      'L2: ainda no chip, maior (256 KB–1 MB), ligeiramente mais lenta',
      'L3: compartilhada entre núcleos, maior (4–32 MB), mais lenta que L1/L2 mas muito mais rápida que RAM',
      'Regra geral: mais perto do processador = menor e mais rápida. Mais longe = maior e mais lenta',
    ],
  },
  {
    id: 'pipeline',
    title: 'Pipeline',
    bullets: [
      'Definição: divide a execução de instruções em estágios independentes, permitindo que múltiplas instruções sejam processadas simultaneamente',
      'Estágios clássicos: IF (busca) → ID (decodifica) → EX (executa) → MEM (memória) → WB (escrita)',
      'Melhoria de desempenho: aumenta o throughput (instruções por unidade de tempo)',
      'Hazard de Dados: instrução depende de resultado ainda não pronto → mitigado com forwarding ou stall',
      'Hazard de Controle: desvios condicionais interrompem o fluxo → mitigado com predição de desvio',
      'Hazard Estrutural: dois estágios precisam do mesmo recurso → mitigado com duplicação de hardware',
    ],
  },
  {
    id: 'ula',
    title: 'ULA (Unidade Lógica e Aritmética)',
    bullets: [
      'Definição: componente do processador responsável por todos os cálculos numéricos e operações lógicas',
      'Operações aritméticas: adição, subtração, multiplicação, divisão, comparação de valores',
      'Operações lógicas: AND, OR, NOT, XOR — usadas em condições, mascaramento de bits, controle de fluxo',
      'Funcionamento: recebe dois operandos dos registradores, executa a operação indicada pelo opcode, retorna o resultado para registrador ou memória',
    ],
  },
  {
    id: 'ram-rom',
    title: 'RAM e ROM',
    bullets: [
      'RAM (volátil): perde dados ao desligar. Rápida, armazena programas e dados em execução. Ex: navegador aberto, editor de texto',
      'ROM (não-volátil): retém dados sem energia. Armazena informações permanentes. Ex: BIOS/UEFI, firmware de dispositivos',
      'Analogia: RAM = mesa de trabalho (rápida, temporária). ROM = livro impresso (permanente, não apaga)',
      'Hierarquia completa: registradores → cache → RAM → disco (do mais rápido ao mais lento)',
      'Dica: seja específico nos exemplos — exemplos genéricos perdem pontos na prova',
    ],
  },
  {
    id: 'paralela',
    title: 'Arquitetura Paralela',
    bullets: [
      'Definição: organização de sistemas que permite execução simultânea de tarefas/instruções para aumentar o desempenho',
      'Tipo 1 – Multiprocessadores: múltiplos processadores independentes compartilhando memória. Ex: servidores com múltiplas CPUs',
      'Tipo 2 – SIMD (Single Instruction, Multiple Data): uma instrução aplicada a múltiplos dados simultaneamente. Ex: SSE/AVX em Intel',
      'Princípio geral: dividir o trabalho entre múltiplas unidades de processamento reduz o tempo total de execução',
      'Foco na prova (2024-B): conhecer ao menos 2 tipos diferentes com explicação',
    ],
  },
];
