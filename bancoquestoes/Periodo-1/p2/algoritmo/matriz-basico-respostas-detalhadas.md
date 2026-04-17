# Matrizes em C — Gabarito Completo
**Nível:** básico | **Total:** 10 múltipla escolha + 5 dissertativas

---

## Questão 1 — Múltipla Escolha

**✅ Resposta correta: b)**

**Por que cada alternativa:**
- **a) Errado** — Matrizes armazenam elementos do mesmo tipo. Misturar tipos diferentes na mesma estrutura não corresponde ao conceito apresentado no material.
- **b) Correto** — A matriz é uma estrutura bidimensional, organizada em linhas e colunas, formada por elementos homogêneos.
- **c) Errado** — A matriz não é usada apenas para resultados matemáticos. Ela pode armazenar diversos conjuntos de dados do mesmo tipo.
- **d) Errado** — Uma estrutura com apenas uma dimensão e vários elementos é um vetor, não uma matriz.

---

## Questão 2 — Múltipla Escolha

**✅ Resposta correta: d)**

**Por que cada alternativa:**
- **a) Errado** — Em C, a declaração de matriz não usa parênteses para definir dimensões.
- **b) Errado** — A sintaxe está invertida. Em C, primeiro vem o tipo, depois o nome da variável e, em seguida, as dimensões.
- **c) Errado** — Essa forma não existe na linguagem C. O nome da matriz deve vir logo após o tipo.
- **d) Correto** — Essa é a forma correta de declarar uma matriz de inteiros com 3 linhas e 3 colunas em C.

---

## Questão 3 — Múltipla Escolha

**✅ Resposta correta: b)**

**Por que cada alternativa:**
- **a) Errado** — Confunde a ordem da declaração. No material, o primeiro valor representa linhas e o segundo representa colunas.
- **b) Correto** — Em `int matriz[4][2];`, o 4 indica a quantidade de linhas e o 2 indica a quantidade de colunas.
- **c) Errado** — Os números na declaração não indicam sinal dos valores armazenados.
- **d) Errado** — A declaração define uma única matriz bidimensional, não várias matrizes nem vetores.

---

## Questão 4 — Múltipla Escolha

**✅ Resposta correta: c)**

**Por que cada alternativa:**
- **a) Errado** — Informar apenas a linha não basta, porque ainda faltaria a coluna para localizar o elemento exato.
- **b) Errado** — Informar apenas a coluna também não identifica a posição completa do elemento.
- **c) Correto** — Como a matriz é bidimensional, é preciso indicar linha e coluna para acessar um valor específico.
- **d) Errado** — O tamanho total ajuda a entender a estrutura, mas não serve para acessar diretamente um único elemento.

---

## Questão 5 — Múltipla Escolha

**✅ Resposta correta: b)**

**Por que cada alternativa:**
- **a) Errado** — Um `if` apenas testa uma condição. Ele não percorre automaticamente todos os elementos da matriz.
- **b) Correto** — O uso de dois laços `for` é o mais comum: um percorre as linhas e o outro percorre as colunas.
- **c) Errado** — `printf` apenas exibe valores. Ele não faz o percurso completo da matriz sozinho.
- **d) Errado** — `switch` serve para seleção de casos, não para varrer todos os elementos da estrutura.

---

## Questão 6 — Múltipla Escolha

**✅ Resposta correta: c)**

**Por que cada alternativa:**
- **a) Errado** — `a11` representa 1ª linha e 1ª coluna, não a posição central pedida.
- **b) Errado** — `a13` representa 1ª linha e 3ª coluna.
- **c) Correto** — `a22` representa exatamente a 2ª linha e a 2ª coluna.
- **d) Errado** — `a32` representa 3ª linha e 2ª coluna.

---

## Questão 7 — Múltipla Escolha

**✅ Resposta correta: a)**

**Por que cada alternativa:**
- **a) Correto** — A diagonal principal é formada pelos elementos em que a linha e a coluna têm a mesma posição: `a11`, `a22` e `a33`.
- **b) Errado** — Esses elementos formam a diagonal secundária em uma matriz 3x3, não a principal.
- **c) Errado** — Essa sequência mistura posições de linhas e colunas sem formar uma diagonal completa correta.
- **d) Errado** — Esses elementos pertencem à segunda linha, não à diagonal principal.

---

## Questão 8 — Múltipla Escolha

**✅ Resposta correta: a)**

**Por que cada alternativa:**
- **a) Correto** — Para imprimir somente os números positivos, o algoritmo precisa testar se cada elemento é maior que zero antes de exibi-lo.
- **b) Errado** — Comparar linha e coluna pode ser útil em outros contextos, como diagonais, mas não identifica números positivos.
- **c) Errado** — Multiplicar por dois altera o valor, mas não resolve o critério de selecionar apenas positivos.
- **d) Errado** — Trocar linha por coluna muda a posição analisada e não tem relação direta com o teste de positividade.

---

## Questão 9 — Múltipla Escolha

**✅ Resposta correta: b)**

**Por que cada alternativa:**
- **a) Errado** — O enunciado fala da matriz A inteira, não apenas da diagonal principal.
- **b) Correto** — Multiplicar a matriz A por 2 significa aplicar esse fator a cada um de seus elementos.
- **c) Errado** — Somar 2 na última coluna é uma operação diferente da pedida.
- **d) Errado** — Multiplicar por 2 não altera a quantidade de linhas da matriz.

---

## Questão 10 — Múltipla Escolha

**✅ Resposta correta: a)**

**Por que cada alternativa:**
- **a) Correto** — Uma matriz de ordem 3, ou 3x3, possui 3 linhas e 3 colunas.
- **b) Errado** — Uma matriz 3x3 possui 9 elementos no total, não apenas 3.
- **c) Errado** — O termo 3x3 se refere às dimensões da matriz, e não à quantidade de diagonais ou índices.
- **d) Errado** — Matrizes não são definidas pela quantidade de tipos de dados diferentes, mas pela organização de linhas e colunas.

---

## Questão 11 — Dissertativa

**Resposta esperada:**

Uma matriz é considerada uma estrutura bidimensional porque seus elementos são organizados em duas direções: linhas e colunas. Diferente de uma estrutura de uma única dimensão, como o vetor, a matriz não usa apenas uma posição para localizar um valor. Em vez disso, cada elemento precisa ser identificado por duas referências, indicando em que linha e em que coluna ele está armazenado.

Na prática, isso muda a forma de acesso aos dados. Em um vetor, basta um índice para encontrar um elemento. Já em uma matriz, é necessário usar dois índices, como em `matriz[i][j]`, em que `i` representa a linha e `j` representa a coluna. Por exemplo, em uma matriz 3x3, o elemento central pode ser representado pela posição da 2ª linha e 2ª coluna. Essa organização torna a matriz útil para representar tabelas, grades e estruturas semelhantes.

**Pontos que não podem faltar:**
- matriz é uma estrutura bidimensional;
- seus elementos são organizados em linhas e colunas;
- o acesso exige dois índices ou duas posições;
- comparação com estrutura de uma dimensão, como vetor

---

## Questão 12 — Dissertativa

**Resposta esperada:**

Os laços `for` ajudam na leitura e na impressão de uma matriz porque permitem percorrer seus elementos de forma organizada e repetitiva. Como a matriz possui linhas e colunas, o algoritmo precisa visitar várias posições até completar toda a estrutura. O primeiro `for` costuma controlar as linhas, enquanto o segundo controla as colunas. Assim, o programa consegue passar por cada elemento da matriz sem precisar escrever um comando separado para cada posição.

Normalmente são usados dois laços porque a matriz tem duas dimensões. Um único laço seria suficiente para percorrer um vetor, mas não representa de forma clara a divisão entre linhas e colunas. Por isso, em C, é comum usar uma estrutura como `for(i...)` e, dentro dela, outra como `for(j...)`, tanto para ler com `scanf` quanto para imprimir com `printf`. Esse modelo aparece diretamente no material do professor e facilita a leitura e a exibição completa da matriz.

**Pontos que não podem faltar:**
- laços `for` percorrem os elementos da matriz;
- um laço controla linhas e o outro controla colunas;
- dois laços são usados porque a matriz tem duas dimensões;
- aplicação na leitura com `scanf` e na impressão com `printf`

---

## Questão 13 — Dissertativa

**Resposta esperada:**

A diagonal principal de uma matriz 3x3 é formada pelos elementos que ficam da parte superior esquerda até a parte inferior direita. No modelo apresentado no material, ela é composta por `a11`, `a22` e `a33`. Esses elementos têm em comum o fato de a posição da linha ser igual à posição da coluna, o que facilita sua identificação em exercícios e algoritmos.

Já a diagonal secundária é formada pelos elementos que vão da parte superior direita até a parte inferior esquerda. Em uma matriz 3x3, ela é composta por `a13`, `a22` e `a31`. A diferença central entre as duas diagonais está na direção em que os elementos aparecem na matriz. Enquanto a principal segue da esquerda para a direita ao descer, a secundária segue da direita para a esquerda. Saber distinguir as duas é importante porque muitos exercícios pedem impressão ou operações apenas sobre uma delas.

**Pontos que não podem faltar:**
- diagonal principal: `a11`, `a22`, `a33`;
- diagonal secundária: `a13`, `a22`, `a31`;
- a principal vai do canto superior esquerdo ao inferior direito;
- a secundária vai do canto superior direito ao inferior esquerdo

---

## Questão 14 — Dissertativa

**Resposta esperada:**

Um algoritmo que lê uma matriz e imprime somente os números positivos precisa seguir uma sequência simples de etapas. Primeiro, ele declara a matriz e as variáveis de controle. Depois, usa dois laços `for` para ler os elementos, normalmente com `scanf`, preenchendo linha por linha e coluna por coluna. Essa etapa garante que todos os valores digitados pelo usuário sejam armazenados corretamente.

Em seguida, o algoritmo percorre novamente a matriz com dois laços e, antes de imprimir cada elemento, testa se ele é maior que zero. Se a condição for verdadeira, o valor é exibido; caso contrário, ele é ignorado. Essa lógica combina duas ideias importantes do conteúdo: o percurso completo da matriz e o uso de condição para selecionar apenas os elementos desejados. Um exemplo simples seria o programa ler números positivos, negativos e zero, mas mostrar apenas aqueles que são positivos.

**Pontos que não podem faltar:**
- declarar a matriz e variáveis de controle;
- usar dois `for` para leitura dos elementos;
- percorrer novamente a matriz para testar cada valor;
- imprimir apenas os elementos maiores que zero

---

## Questão 15 — Dissertativa

**Resposta esperada:**

Para gerar uma matriz B com os elementos da matriz A ao quadrado, a lógica começa com a criação das duas matrizes, normalmente com as mesmas dimensões. Depois disso, o algoritmo lê os valores da matriz A usando dois laços `for`, armazenando cada elemento em sua posição correspondente. Essa etapa é necessária porque a matriz B será construída a partir dos dados já presentes em A.

Na próxima fase, o algoritmo percorre novamente as posições da matriz A e, para cada elemento, calcula seu quadrado e armazena o resultado na mesma posição da matriz B. Assim, se `A[1][2]` tiver valor 4, então `B[1][2]` receberá 16. Depois, basta imprimir a matriz B com outro percurso. Essa organização é importante porque mostra a ideia de matriz derivada: uma nova matriz criada a partir de operações feitas elemento por elemento sobre a matriz original.

**Pontos que não podem faltar:**
- criação da matriz A e da matriz B;
- leitura dos valores da matriz A;
- cálculo do quadrado de cada elemento de A;
- armazenamento do resultado correspondente em B;
- impressão final da matriz B

---

📊 BANCO GERADO
├── Tema: matrizes em C
├── Nível: básico
├── Questões: 10 múltipla escolha + 5 dissertativas
├── Conceitos cobertos: definição de matriz, declaração em C, linhas e colunas, acesso por índice, uso de `for`, identificação de elementos, diagonais, filtragem de positivos, multiplicação por escalar e matriz derivada
└── Próximo: revisar, expandir ou gerar um segundo bloco
