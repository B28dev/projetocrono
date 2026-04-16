/**
 * @fileoverview Content Layer — ContentItems
 *
 * Unidades atômicas de conteúdo. Cada item pode ser:
 * - flashcard: frente/verso
 * - assisted_question: enunciado + gabarito com pontos obrigatórios
 * - review: bloco de revisão livre
 *
 * xpProfileId referencia um perfil em xpEngine.js para calcular o XP ganho.
 *
 * @backend-ready: Trocar por `api.get('/content-items?moduleId=X')`.
 */

/** @type {import('../types').ContentItem[]} */
export const CONTENT_ITEMS = [
  // ── ARQUITETURA: Fundamentos ─────────────────────────────────────────────
  {
    id: 'arq-c1',
    subjectId: 'arquitetura',
    moduleId: 'arq-m1',
    kind: 'flashcard',
    title: 'O que é uma ISA?',
    front: 'O que é ISA (Instruction Set Architecture)?',
    back: 'É o conjunto de instruções que uma CPU entende e executa. Define a interface entre hardware e software — incluindo tipos de dados, registradores, modos de endereçamento e operações suportadas.',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
    isActive: true,
  },
  {
    id: 'arq-c2',
    subjectId: 'arquitetura',
    moduleId: 'arq-m1',
    kind: 'flashcard',
    title: 'RISC vs CISC',
    front: 'Qual a diferença fundamental entre RISC e CISC?',
    back: 'RISC (Reduced Instruction Set Computer) usa poucas instruções simples de tamanho fixo, executando 1 instrução por ciclo. CISC (Complex Instruction Set Computer) tem instruções complexas que fazem mais trabalho por instrução, mas levam mais ciclos.',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'medium',
    xpProfileId: 'flashcard_medium',
    isActive: true,
  },
  {
    id: 'arq-c3',
    subjectId: 'arquitetura',
    moduleId: 'arq-m2',
    kind: 'assisted_question',
    title: 'Pipeline de Instruções',
    front: null,
    back: null,
    prompt: 'Explique o conceito de pipeline em processadores e cite os principais hazards que podem ocorrer.',
    answerModel: 'Pipeline é a técnica de dividir a execução de instruções em estágios simultâneos (busca, decodificação, execução, acesso à memória, write-back). Os principais hazards são: structural hazard (conflito de recurso), data hazard (dependência de dados entre instruções consecutivas) e control hazard (desvios condicionais que invalidam instruções já buscadas).',
    mustIncludePoints: [
      'Divisão em estágios simultâneos',
      'Structural hazard',
      'Data hazard',
      'Control hazard',
    ],
    difficulty: 'hard',
    xpProfileId: 'assisted_hard',
    isActive: true,
  },
  {
    id: 'arq-c4',
    subjectId: 'arquitetura',
    moduleId: 'arq-m3',
    kind: 'flashcard',
    title: 'Princípio da Localidade',
    front: 'O que é o Princípio da Localidade e como ele justifica o uso de cache?',
    back: 'É a tendência dos programas de acessar dados e instruções próximos no espaço (localidade espacial) e no tempo (localidade temporal). A cache explora isso armazenando blocos próximos ao último acesso, reduzindo a latência média de acesso à memória.',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'medium',
    xpProfileId: 'flashcard_medium',
    isActive: true,
  },

  // ── ENGENHARIA DE SOFTWARE ────────────────────────────────────────────────
  {
    id: 'es-c1',
    subjectId: 'intro-eng-software',
    moduleId: 'es-m1',
    kind: 'flashcard',
    title: 'Modelo Cascata',
    front: 'Quais são as fases do Modelo em Cascata e qual sua principal limitação?',
    back: 'Fases: Requisitos → Design → Implementação → Verificação → Manutenção. A principal limitação é a rigidez sequencial: mudanças em fases anteriores são custosas e o cliente só vê o produto no final, tornando-o inadequado para projetos com requisitos instáveis.',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
    isActive: true,
  },
  {
    id: 'es-c2',
    subjectId: 'intro-eng-software',
    moduleId: 'es-m1',
    kind: 'assisted_question',
    title: 'Scrum vs Cascata',
    front: null,
    back: null,
    prompt: 'Compare o modelo Scrum com o modelo Cascata, destacando 3 diferenças fundamentais.',
    answerModel: 'Scrum é iterativo e incremental (sprints de 2–4 semanas), enquanto Cascata é sequencial e linear. No Scrum, o cliente participa ativamente e vê entregas funcionais ao final de cada sprint; no Cascata, o produto é entregue somente ao fim. O Scrum abraça mudanças de requisitos; o Cascata resiste a elas após a fase de requirements.',
    mustIncludePoints: [
      'Iterativo vs sequencial',
      'Participação do cliente',
      'Flexibilidade a mudanças',
    ],
    difficulty: 'medium',
    xpProfileId: 'assisted_medium',
    isActive: true,
  },
  {
    id: 'es-c3',
    subjectId: 'intro-eng-software',
    moduleId: 'es-m2',
    kind: 'flashcard',
    title: 'Requisitos Funcionais vs Não-Funcionais',
    front: 'Qual a diferença entre requisitos funcionais e não-funcionais?',
    back: 'Requisitos funcionais descrevem O QUE o sistema faz (funcionalidades, comportamentos). Requisitos não-funcionais descrevem COMO ele faz (performance, segurança, usabilidade, escalabilidade, disponibilidade).',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
    isActive: true,
  },

  // ── EMPREENDEDORISMO ─────────────────────────────────────────────────────
  {
    id: 'emp-c1',
    subjectId: 'empreendedorismo',
    moduleId: 'emp-m1',
    kind: 'flashcard',
    title: 'O que é Empreendedorismo?',
    front: 'Defina empreendedorismo segundo Schumpeter.',
    back: 'Para Schumpeter, empreendedorismo é o processo de "destruição criativa" — o empreendedor é o agente que introduz inovações disruptivas que destroem modelos antigos e criam novos mercados, produto, processos ou formas de organização.',
    prompt: null,
    answerModel: null,
    mustIncludePoints: [],
    difficulty: 'medium',
    xpProfileId: 'flashcard_medium',
    isActive: true,
  },
  {
    id: 'emp-c2',
    subjectId: 'empreendedorismo',
    moduleId: 'emp-m2',
    kind: 'assisted_question',
    title: 'Canvas de Proposta de Valor',
    front: null,
    back: null,
    prompt: 'Explique o que é o Business Model Canvas e cite seus 9 blocos.',
    answerModel: 'O BMC é uma ferramenta visual de planejamento estratégico que descreve o modelo de negócio em uma única página. Seus 9 blocos são: Segmentos de Clientes, Proposta de Valor, Canais, Relacionamento com Clientes, Fontes de Receita, Recursos Principais, Atividades-Chave, Parcerias Principais e Estrutura de Custos.',
    mustIncludePoints: [
      'Segmentos de Clientes',
      'Proposta de Valor',
      'Fontes de Receita',
      'Estrutura de Custos',
    ],
    difficulty: 'hard',
    xpProfileId: 'assisted_hard',
    isActive: true,
  },
];

/**
 * @param {string} moduleId
 * @returns {import('../types').ContentItem[]}
 */
export function getContentItemsByModule(moduleId) {
  return CONTENT_ITEMS.filter((c) => c.moduleId === moduleId && c.isActive);
}

/**
 * @param {string} subjectId
 * @returns {import('../types').ContentItem[]}
 */
export function getContentItemsBySubject(subjectId) {
  return CONTENT_ITEMS.filter((c) => c.subjectId === subjectId && c.isActive);
}

/**
 * @param {string} id
 * @returns {import('../types').ContentItem | undefined}
 */
export function getContentItemById(id) {
  return CONTENT_ITEMS.find((c) => c.id === id);
}

/**
 * Retorna itens por tipo de conteúdo.
 * @param {'flashcard' | 'assisted_question' | 'review'} kind
 * @returns {import('../types').ContentItem[]}
 */
export function getContentItemsByKind(kind) {
  return CONTENT_ITEMS.filter((c) => c.kind === kind && c.isActive);
}
