# Questões — Vetores e Matrizes em C
**Disciplina:** Algoritmo e Programação  
**Nível:** Iniciante  
**Total:** 10 questões  

---

## Questões

---

**1. Qual é a forma correta de declarar um vetor de 5 inteiros em C?**

- A) `int vetor(5);`
- B) `int vetor[5];`
- C) `vector int vetor[5];`
- D) `int[5] vetor;`

**Resposta correta:** B

---

**2. Dado o vetor `int v[5] = {10, 20, 30, 40, 50}`, qual é o valor de `v[3]`?**

- A) 30
- B) 40
- C) 50
- D) 20

**Resposta correta:** B

---

**3. Qual é a forma correta de declarar uma matriz 3x3 de inteiros em C?**

- A) `int matriz(3,3);`
- B) `int matriz[3,3];`
- C) `int matriz[3][3];`
- D) `matrix int[3][3];`

**Resposta correta:** C

---

**4. Em uma matriz `int m[4][4]`, quais posições formam a diagonal principal?**

- A) m[0][3], m[1][2], m[2][1], m[3][0]
- B) m[0][0], m[1][1], m[2][2], m[3][3]
- C) m[0][1], m[1][2], m[2][3], m[3][4]
- D) m[1][1], m[2][2], m[3][3], m[4][4]

**Resposta correta:** B

---

**5. Qual estrutura é mais adequada para percorrer todos os elementos de uma matriz?**

- A) Um único `for` com contador simples
- B) Um `while` com duas condições
- C) Dois `for` aninhados, um para linha e outro para coluna
- D) Um `do-while` com índice composto

**Resposta correta:** C

---

**6. O que imprime o trecho abaixo?**
```c
int v[4] = {5, 10, 15, 20};
printf("%d", v[0] + v[3]);
```

- A) 15
- B) 30
- C) 25
- D) 35

**Resposta correta:** C

---

**7. Qual é a condição correta para identificar a diagonal secundária de uma matriz de ordem N?**

- A) `i == j`
- B) `i + j == N`
- C) `i + j == N - 1`
- D) `i - j == 0`

**Resposta correta:** C

---

**8. Dado o código abaixo, quantas vezes o `scanf` será executado?**
```c
int m[3][3];
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        scanf("%d", &m[i][j]);
```

- A) 3
- B) 6
- C) 9
- D) 12

**Resposta correta:** C

---

**9. Qual erro está presente no código abaixo?**
```c
int v[3];
printf("%d", v[3]);
```

- A) `printf` não aceita inteiros
- B) O vetor foi declarado sem valores iniciais
- C) `v[3]` acessa uma posição fora do vetor (índice válido vai de 0 a 2)
- D) Falta o `&` no `printf`

**Resposta correta:** C

---

**10. O que acontece se você declarar `int v[5]` sem inicializar e usar `v[2]` diretamente?**

- A) O programa não compila
- B) O valor será sempre 0
- C) O programa lê um valor aleatório da memória (lixo)
- D) O compilador inicializa automaticamente com -1

**Resposta correta:** C

---

## Comentários por questão

---

**Questão 1**
- **A incorreta** — parênteses `()` são usados para chamada de funções, não para declarar arrays.
- **C incorreta** — `vector` não existe na linguagem C. Existe em C++ como estrutura da STL.
- **D incorreta** — em C o tipo vem antes do nome, não o contrário.
- **B correta** — a sintaxe padrão é `tipo nome[tamanho]`.

---

**Questão 2**
- **A incorreta** — `v[2]` vale 30, não `v[3]`.
- **C incorreta** — `v[4]` vale 50.
- **D incorreta** — `v[1]` vale 20.
- **B correta** — índices em C começam em 0. `v[3]` é o quarto elemento, que vale 40.

---

**Questão 3**
- **A incorreta** — parênteses com vírgula não são sintaxe válida em C.
- **B incorreta** — `[3,3]` não funciona em C. O compilador interpreta apenas o último valor da vírgula.
- **D incorreta** — `matrix` não é palavra reservada em C.
- **C correta** — cada dimensão precisa de seu próprio par de colchetes: `[linhas][colunas]`.

---

**Questão 4**
- **A incorreta** — essas são as posições da diagonal **secundária**, não da principal.
- **C incorreta** — `m[3][4]` nem existe numa matriz 4x4 (índice máximo é 3).
- **D incorreta** — índices em C começam em 0, não em 1. `m[4][4]` está fora da matriz.
- **B correta** — diagonal principal é onde `i == j`: [0][0], [1][1], [2][2], [3][3].

---

**Questão 5**
- **A incorreta** — um único `for` só percorre uma dimensão (linha ou coluna), não as duas.
- **B incorreta** — `while` com duas condições não é o padrão e não garante percorrer todas as combinações de linha e coluna.
- **D incorreta** — `do-while` executa pelo menos uma vez antes de verificar a condição, inadequado para matrizes.
- **C correta** — o `for` externo controla `i` (linha) e o interno controla `j` (coluna), cobrindo todos os `N²` elementos.

---

**Questão 6**
- **A incorreta** — `v[0] + v[2]` seria 5 + 15 = 20, não é o caso.
- **B incorreta** — `v[1] + v[3]` seria 10 + 20 = 30, mas a soma pedida é `v[0] + v[3]`.
- **D incorreta** — nenhum par de elementos soma 35.
- **C correta** — `v[0]` = 5 e `v[3]` = 20. Soma = 25.

---

**Questão 7**
- **A incorreta** — `i == j` identifica a diagonal **principal**.
- **B incorreta** — `i + j == N` ultrapassaria o índice válido (seria fora da matriz para a última linha).
- **D incorreta** — `i - j == 0` é equivalente a `i == j`, ou seja, diagonal principal.
- **C correta** — numa matriz de ordem N, a diagonal secundária passa pelas posições onde `i + j == N - 1`.

---

**Questão 8**
- **A incorreta** — 3 seria o resultado se houvesse apenas um `for` de 0 a 2.
- **B incorreta** — 6 seria 3x2, mas a matriz é 3x3.
- **D incorreta** — 12 ultrapassaria o total de elementos da matriz.
- **C correta** — a matriz tem 3 linhas x 3 colunas = 9 elementos. O `scanf` executa uma vez por elemento.

---

**Questão 9**
- **A incorreta** — `printf` aceita inteiros normalmente com `%d`.
- **B incorreta** — não inicializar não causa erro de compilação, apenas lixo de memória.
- **D incorreta** — `printf` não usa `&`, apenas `scanf` precisa do endereço.
- **C correta** — o vetor `v[3]` tem índices válidos de 0 a 2. Acessar `v[3]` é acesso fora dos limites — comportamento indefinido em C.

---

**Questão 10**
- **A incorreta** — o código compila normalmente. C não verifica inicialização em tempo de compilação.
- **B incorreta** — variáveis locais em C **não** são zeradas automaticamente. Apenas variáveis globais são.
- **D incorreta** — o compilador não inicializa com nenhum valor padrão para variáveis locais.
- **C correta** — variáveis locais não inicializadas contêm lixo de memória: um valor imprevisível que sobrou de uso anterior daquele espaço de memória.

