const MATRIX_BANK_ID = 'matriz-basico';
const MATRIX_TOPIC = 'matrizes-em-c';

const MATRIX_THEORY_ITEMS = [
  {
    id: 'matrix-theory-definition',
    title: 'Base de matrizes — estrutura bidimensional',
    statement: 'Revise a ideia de matriz como estrutura bidimensional organizada em linhas e colunas.',
    answerModel: 'Matriz é uma estrutura bidimensional formada por elementos do mesmo tipo, organizada em linhas e colunas e acessada por dois índices.',
    mustIncludePoints: [
      'estrutura bidimensional',
      'linhas e colunas',
      'acesso por dois índices',
    ],
    explanation: 'Essa é a base conceitual para não confundir vetor com matriz e para manter a leitura correta das questões do bloco.',
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
  },
  {
    id: 'matrix-theory-loops',
    title: 'Base de matrizes — dois for aninhados',
    statement: 'Revise por que normalmente usamos dois laços `for` para percorrer matrizes em C.',
    answerModel: 'Usamos dois laços porque a matriz tem duas dimensões: um `for` percorre as linhas e o outro percorre as colunas.',
    mustIncludePoints: [
      'duas dimensões',
      'um for para linhas',
      'um for para colunas',
    ],
    explanation: 'Esse bloco sustenta leitura, impressão, diagonais e transformação de matrizes no restante da trilha.',
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
  },
];

const MATRIX_TRUE_FALSE_ITEMS = [
  {
    id: 'matrix-tf-lines-columns',
    title: 'V/F — linhas e colunas em C',
    statement: 'Em `int matriz[4][2];`, o número 4 representa as linhas e o número 2 representa as colunas.',
    trueFalseAnswer: true,
    explanationsByOption: {
      true: 'Correto. Na declaração em C, o primeiro índice indica a quantidade de linhas e o segundo a quantidade de colunas.',
      false: 'Incorreto. Essa afirmação está certa: em `int matriz[4][2];`, temos 4 linhas e 2 colunas.',
    },
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
  },
  {
    id: 'matrix-tf-access',
    title: 'V/F — acesso a elementos',
    statement: 'Para acessar um elemento específico de uma matriz em C, basta informar apenas a linha.',
    trueFalseAnswer: false,
    explanationsByOption: {
      true: 'Incorreto. Em matriz é necessário informar linha e coluna para localizar um elemento específico.',
      false: 'Correto. Como a matriz é bidimensional, o acesso exige dois índices: linha e coluna.',
    },
    difficulty: 'easy',
    xpProfileId: 'flashcard_easy',
  },
  {
    id: 'matrix-tf-diagonal',
    title: 'V/F — diagonal principal',
    statement: 'Na diagonal principal de uma matriz 3x3, os elementos seguem a lógica de mesma linha e mesma coluna, como `a11`, `a22` e `a33`.',
    trueFalseAnswer: true,
    explanationsByOption: {
      true: 'Correto. A diagonal principal reúne os elementos em que a posição da linha coincide com a da coluna.',
      false: 'Incorreto. Essa descrição corresponde exatamente à diagonal principal.',
    },
    difficulty: 'medium',
    xpProfileId: 'flashcard_medium',
  },
  {
    id: 'matrix-tf-positive-filter',
    title: 'V/F — filtro de positivos',
    statement: 'Para imprimir somente os números positivos de uma matriz, o algoritmo precisa verificar se cada elemento é maior que zero antes de exibir.',
    trueFalseAnswer: true,
    explanationsByOption: {
      true: 'Correto. O filtro depende de testar cada elemento antes da impressão.',
      false: 'Incorreto. Sem esse teste, o algoritmo não separa positivos de negativos ou zero.',
    },
    difficulty: 'medium',
    xpProfileId: 'flashcard_medium',
  },
];

const MATRIX_WRITTEN_ITEMS = [
  {
    id: 'matrix-written-bidimensional',
    title: 'Escrita — por que matriz é bidimensional?',
    prompt: 'Explique por que uma matriz é considerada uma estrutura bidimensional e como isso muda a forma de acessar seus elementos em comparação com uma estrutura de uma única dimensão.',
    answerModel: 'Uma matriz é bidimensional porque organiza elementos em duas direções: linhas e colunas. Diferente de um vetor, o acesso exige dois índices, como `matriz[i][j]`, em vez de apenas um.',
    mustIncludePoints: [
      'estrutura bidimensional',
      'linhas e colunas',
      'dois índices',
      'comparação com vetor',
    ],
    difficulty: 'medium',
    xpProfileId: 'assisted_medium',
  },
  {
    id: 'matrix-written-diagonals',
    title: 'Escrita — diagonal principal e secundária',
    prompt: 'Explique como identificar os elementos da diagonal principal e da diagonal secundária de uma matriz 3x3, destacando a diferença entre elas.',
    answerModel: 'A diagonal principal vai do canto superior esquerdo ao inferior direito e reúne `a11`, `a22` e `a33`. A diagonal secundária vai do canto superior direito ao inferior esquerdo e reúne `a13`, `a22` e `a31`.',
    mustIncludePoints: [
      'diagonal principal: a11, a22, a33',
      'diagonal secundária: a13, a22, a31',
      'direção das diagonais',
    ],
    difficulty: 'medium',
    xpProfileId: 'assisted_medium',
  },
  {
    id: 'matrix-written-derived',
    title: 'Escrita — matriz B ao quadrado',
    prompt: 'Descreva como você organizaria a lógica de um algoritmo que recebe uma matriz A e gera uma matriz B com os elementos de A ao quadrado.',
    answerModel: 'A lógica começa declarando as matrizes A e B. Depois, lê a matriz A com dois laços `for`, percorre novamente cada posição, calcula o quadrado de cada elemento de A e grava o resultado correspondente em B, imprimindo B ao final.',
    mustIncludePoints: [
      'criação da matriz A e B',
      'leitura da matriz A',
      'cálculo do quadrado de cada elemento',
      'armazenamento do resultado em B',
      'impressão final de B',
    ],
    difficulty: 'hard',
    xpProfileId: 'assisted_hard',
  },
];

function buildMatrixSourceRef(questionId) {
  return {
    bank: MATRIX_BANK_ID,
    topic: MATRIX_TOPIC,
    questionId,
  };
}

export function getAlgorithmMatrixTheoryItems() {
  return MATRIX_THEORY_ITEMS.map((item) => ({
    ...item,
    interactionType: 'theory',
    validationMode: 'self_assessed',
    sourceRef: buildMatrixSourceRef(item.id),
  }));
}

export function getAlgorithmMatrixTrueFalseItems() {
  return MATRIX_TRUE_FALSE_ITEMS.map((item) => ({
    ...item,
    interactionType: 'true_false',
    validationMode: 'auto',
    sourceRef: buildMatrixSourceRef(item.id),
    options: [
      { id: 'true', label: 'Verdadeiro', value: 'true' },
      { id: 'false', label: 'Falso', value: 'false' },
    ],
    correctOptionId: item.trueFalseAnswer ? 'true' : 'false',
  }));
}

export function getAlgorithmMatrixWrittenItems() {
  return MATRIX_WRITTEN_ITEMS.map((item) => ({
    ...item,
    interactionType: 'written',
    validationMode: 'self_assessed',
    sourceRef: buildMatrixSourceRef(item.id),
  }));
}

export function getAlgorithmMatrixMissionBank() {
  return {
    theory: getAlgorithmMatrixTheoryItems(),
    trueFalse: getAlgorithmMatrixTrueFalseItems(),
    written: getAlgorithmMatrixWrittenItems(),
  };
}
