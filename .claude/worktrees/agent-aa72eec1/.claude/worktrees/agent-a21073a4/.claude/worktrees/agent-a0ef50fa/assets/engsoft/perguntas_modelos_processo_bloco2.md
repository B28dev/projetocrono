# Engenharia de Software — Bloco 2 — Perguntas de Modelos de Processo com Respostas

## Como usar
Cada item está em formato de **pergunta + resposta**, já pensado para página com botão de **ocultar/exibir**.  
Neste bloco, as respostas foram feitas em um estilo **um pouco mais desenvolvido**, sem ficarem longas demais, para facilitar revisão e também treino dissertativo.

---

## Pergunta 1
**Enunciado:** O que é um modelo de processo e por que ele é útil no estudo da Engenharia de Software?

**Resposta:** Um modelo de processo é uma **descrição geral e simplificada** de um grupo de processos que possuem **ciclos de vida semelhantes**. Em vez de estudar separadamente cada processo proposto por autores ou organizações, o modelo permite compreender a lógica comum entre eles. Essa simplificação é útil porque facilita o entendimento de como o trabalho é organizado no tempo, como as etapas se relacionam e em que situações cada abordagem tende a funcionar melhor.

**Pontos que não podem faltar:**
- é uma descrição geral e simplificada;
- agrupa processos com ciclos de vida semelhantes;
- serve para facilitar a compreensão dos processos de software.

---

## Pergunta 2
**Enunciado:** Explique por que o codifica-remenda é tratado como um “anti-modelo” de processo.

**Resposta:** O codifica-remenda é considerado um “anti-modelo” porque, na prática, ele representa a **ausência de um processo definido**. A lógica dele é começar a programar o mais rápido possível, sem planejamento adequado, sem preocupação real com análise, projeto e organização do trabalho. Isso parece acelerar a entrega no começo, mas normalmente gera correções sucessivas, retrabalho, aumento da dificuldade de manutenção e queda da qualidade do software. Ele se apoia em mitos antigos, como a ideia de que basta programar logo para terminar mais cedo.

**Pontos que não podem faltar:**
- é a ausência de um processo bem definido;
- prioriza começar a programar imediatamente;
- tende a gerar retrabalho, correções e baixa qualidade.

---

## Pergunta 3
**Enunciado:** Quais são as principais características do modelo cascata e em que situação ele tende a ser mais adequado?

**Resposta:** O modelo cascata organiza o desenvolvimento em **fases sequenciais e bem definidas**, de modo que cada atividade deve ser concluída antes da próxima começar. Isso o torna simples de entender, previsível e relativamente fácil de gerenciar quando o projeto está bem delimitado. Ele tende a ser mais adequado quando os **requisitos já são conhecidos com antecedência**, mudam pouco e o projeto exige uma estrutura mais rígida e linear. Em contextos assim, a previsibilidade do cascata deixa de ser um problema e passa a ser uma vantagem.

**Pontos que não podem faltar:**
- fases sequenciais e rígidas;
- cada etapa termina antes da próxima começar;
- funciona melhor quando os requisitos já são bem conhecidos.

---

## Pergunta 4
**Enunciado:** Por que o modelo cascata costuma falhar quando os requisitos não são bem conhecidos desde o início?

**Resposta:** Porque o cascata depende justamente de uma boa definição inicial do que será construído. Quando os requisitos ainda estão incertos, o projeto avança com base em suposições frágeis. Como o modelo tem **baixa comunicação contínua com o cliente** e **baixa reação a mudanças**, qualquer erro de entendimento no começo costuma aparecer tarde demais, quando corrigir já ficou caro. Por isso, em cenários de incerteza, o cascata tende a gerar retrabalho e decisões inadequadas.

**Pontos que não podem faltar:**
- exige conhecimento prévio dos requisitos;
- reage mal a mudanças;
- erros iniciais de entendimento custam caro depois.

---

## Pergunta 5
**Enunciado:** O que é desenvolvimento por prototipagem e qual problema ele tenta resolver?

**Resposta:** O desenvolvimento por prototipagem é uma abordagem que usa **mock-ups ou protótipos** para melhorar a comunicação com o cliente e esclarecer melhor os requisitos antes da construção do produto final. O protótipo é uma versão rápida da interface ou do comportamento esperado do software, nem sempre totalmente funcional e geralmente com qualidade reduzida, mas suficiente para permitir que o usuário teste e reaja. O principal problema que essa abordagem tenta resolver é a dificuldade de entender, logo de início, o que o cliente realmente precisa.

**Pontos que não podem faltar:**
- usa mock-ups ou protótipos rápidos;
- melhora a comunicação com o cliente;
- ajuda no levantamento e entendimento dos requisitos.

---

## Pergunta 6
**Enunciado:** Quais são as principais vantagens e desvantagens da prototipagem?

**Resposta:** Entre as principais vantagens da prototipagem estão a **redução de erros de entendimento**, a **maior comunicação com o cliente** e a **visibilidade antecipada do resultado final**, já que o usuário consegue testar algo antes da construção definitiva. Por outro lado, ela também tem desvantagens: pode tornar o processo mais longo, o cliente pode confundir o mock-up com o produto real e a equipe pode acabar se apegando demais a decisões tomadas no protótipo, mesmo quando elas não são as melhores para o sistema final.

**Pontos que não podem faltar:**
- vantagens: menos erro, mais comunicação, mais visibilidade antecipada;
- desvantagens: pode ser longo;
- risco de confundir protótipo com produto final e de se prender ao mock-up.

---

## Pergunta 7
**Enunciado:** Explique o modelo incremental e diga por que ele costuma ser uma boa alternativa quando os requisitos não estão totalmente fechados.

**Resposta:** O modelo incremental divide o desenvolvimento em **partes menores chamadas incrementos**, entregando o software aos poucos, em vez de esperar tudo ficar pronto para só então apresentar o resultado. Isso permite que o cliente acompanhe a evolução do produto, valide entregas parciais e ajude a ajustar o rumo do projeto ao longo do tempo. Ele costuma ser uma boa alternativa quando os requisitos não estão totalmente fechados porque reduz o risco de apostar tudo em uma visão inicial ainda imatura. Em vez de tentar acertar tudo de uma vez, o sistema evolui por entregas sucessivas.

**Pontos que não podem faltar:**
- entrega o software em partes;
- permite acompanhamento e validação progressiva;
- é mais adequado quando os requisitos ainda não estão completamente definidos.

---

## Pergunta 8
**Enunciado:** O que diferencia o modelo espiral dos outros modelos clássicos e por que ele costuma ser associado ao controle de riscos?

**Resposta:** O modelo espiral se diferencia por organizar o desenvolvimento em **ciclos iterativos** que combinam planejamento, construção, avaliação e replanejamento contínuo. Ele mantém **alta comunicação com o cliente**, reage bem a mudanças e permite corrigir erros ao longo do processo. Sua associação com o controle de riscos vem do fato de que cada volta da espiral serve não apenas para desenvolver parte do produto, mas também para reavaliar incertezas, custos e decisões antes de avançar. É um modelo mais robusto para contextos complexos, embora também mais caro e mais documentado.

**Pontos que não podem faltar:**
- funciona em ciclos iterativos;
- tem alta comunicação com o cliente e alta reação a mudanças;
- facilita o controle de custos e riscos.

---

## Pergunta 9
**Enunciado:** Por que um cronograma completamente fechado no início é incompatível com o modelo espiral?

**Resposta:** Porque o espiral foi pensado para um desenvolvimento em que **o planejamento é revisado continuamente** a cada ciclo. Como o projeto avança por iterações e incorpora avaliação constante de riscos, custos, mudanças e correções, não faz sentido congelar todo o cronograma logo no início como se nada relevante pudesse mudar. O próprio material destaca como desvantagem do espiral a **ausência de um planejamento geral rígido**. Por isso, um cronograma fechado combina muito mais com modelos lineares, como o cascata, do que com o espiral.

**Pontos que não podem faltar:**
- o espiral revisa o planejamento ao longo do processo;
- incorpora mudanças e reavaliações sucessivas;
- é incompatível com um cronograma totalmente rígido desde o começo.

---

## Pergunta 10
**Enunciado:** O que são ferramentas de 4ª geração e qual é a lógica por trás do modelo RAD?

**Resposta:** As ferramentas de 4ª geração partem da ideia de que desenvolvimento não se resume à programação manual e de que muitos erros acontecem justamente na implementação. Por isso, elas buscam **gerar código a partir de um projeto detalhado**, automatizando parte do trabalho e reduzindo erro humano de codificação. O RAD, ou Rapid Application Development, é o modelo mais tradicional ligado a essa lógica. Ele combina conceitos das ferramentas de 4ª geração com a ideia incremental, podendo funcionar de forma iterativa ou até em paralelo entre módulos.

**Pontos que não podem faltar:**
- ferramentas de 4ª geração automatizam parte do desenvolvimento;
- geram código a partir do projeto;
- o RAD combina 4ª geração com conceitos incrementais.

---

## Pergunta 11
**Enunciado:** Quais são as principais vantagens e limitações do modelo RAD?

**Resposta:** O RAD tem como vantagens a **codificação rápida**, a possibilidade de **reduzir erros de implementação** e, em certos casos, o uso **paralelo** de equipes ou módulos, o que acelera a produção. Porém, ele também apresenta limitações importantes: pode gerar código de menor qualidade, exige software bem modularizável e, quando usado em paralelo, depende de várias equipes trabalhando ao mesmo tempo. Em outras palavras, ele pode ser muito eficiente em certos contextos, mas não é uma solução universal.

**Pontos que não podem faltar:**
- vantagens: rapidez, menos erro de implementação, possibilidade de paralelismo;
- desvantagens: código de menor qualidade;
- exige modularização e, em paralelo, muitas equipes.

---

## Pergunta 12
**Enunciado:** Compare prototipagem e RAD. Apesar de ambos buscarem acelerar ou facilitar o desenvolvimento, qual é a diferença central entre eles?

**Resposta:** A diferença central é que a **prototipagem** existe principalmente para **entender melhor o problema e os requisitos**, enquanto o **RAD** busca **acelerar a construção do sistema** por meio de automação e organização modular. Na prototipagem, o foco é validar ideias com o cliente antes da produção real; no RAD, o foco é transformar rapidamente um projeto em aplicação. Assim, um ajuda mais na descoberta e refinamento do que deve ser feito, enquanto o outro atua mais na velocidade de implementação.

**Pontos que não podem faltar:**
- prototipagem foca em entender e validar requisitos;
- RAD foca em acelerar a implementação;
- um atua mais na descoberta do problema, o outro na rapidez da construção.

---

## Pergunta 13
**Enunciado:** Situação prática: Elisa está usando o modelo cascata, mas o cliente ainda não sabe bem o que quer e os requisitos mudam com frequência. O processo é adequado? Qual modelo tende a ser mais apropriado?

**Resposta:** Não, o cascata não é o modelo mais adequado nessa situação. Como ele depende de requisitos bem definidos logo no início e reage mal a mudanças, usar cascata nesse contexto aumenta a chance de erro e retrabalho. Se o maior problema for o cliente ainda não conseguir expressar claramente o que deseja, a **prototipagem** tende a ser a melhor saída inicial, porque melhora a comunicação e o entendimento do software. Se o projeto já puder avançar por entregas sucessivas mesmo com alguma incerteza, o **incremental** também se torna uma alternativa forte.

**Pontos que não podem faltar:**
- cascata não é adequado com requisitos incertos;
- prototipagem ajuda quando o cliente não sabe bem o que quer;
- incremental é boa opção quando o sistema pode evoluir em partes.

---

## Pergunta 14
**Enunciado:** Situação prática: Elisa usa o modelo espiral, mas o cliente exige um cronograma fechado logo no início do projeto. Isso é compatível? Para qual modelo ela poderia migrar?

**Resposta:** Não é totalmente compatível. O espiral pressupõe reavaliação contínua, ajustes ao longo dos ciclos e planejamento progressivo, o que entra em choque com a ideia de um cronograma totalmente congelado desde o começo. Se o cliente realmente quer previsibilidade rígida e os requisitos estiverem bem definidos, a migração mais coerente tende a ser para o **modelo cascata**, que trabalha com fases sequenciais e planejamento mais estável. Se os requisitos ainda tiverem alguma incerteza, o **incremental** pode ser um meio-termo melhor que o cascata.

**Pontos que não podem faltar:**
- espiral não combina com cronograma totalmente fechado;
- cascata faz mais sentido quando há previsibilidade e requisitos claros;
- incremental pode ser alternativa se ainda houver alguma incerteza.

---

## Pergunta 15
**Enunciado:** Situação prática: um sistema pode ser dividido claramente em módulos independentes, a empresa tem várias equipes disponíveis e quer acelerar ao máximo a implementação. Qual modelo passa a fazer mais sentido e por quê?

**Resposta:** Nesse cenário, o **RAD** passa a fazer bastante sentido. O material mostra que ele pode funcionar em paralelo, acelera a codificação e aproveita ferramentas automatizadas de desenvolvimento. Como o sistema é modularizável e existem várias equipes, duas das principais exigências do RAD estão sendo atendidas. Ainda assim, a resposta completa deve reconhecer a limitação: essa velocidade pode vir acompanhada de menor qualidade de código se o projeto não for muito bem conduzido.

**Pontos que não podem faltar:**
- RAD é adequado quando há modularização e várias equipes;
- permite acelerar a implementação e até trabalhar em paralelo;
- deve-se mencionar o risco de código de menor qualidade.

---

## Pergunta 16
**Enunciado:** Em uma comparação geral, como escolher entre cascata, prototipagem, incremental, espiral e RAD sem decorar tudo mecanicamente?

**Resposta:** A melhor forma de escolher é pensar no **tipo de problema do projeto**. Se os requisitos são claros e a previsibilidade é prioridade, o **cascata** faz mais sentido. Se o cliente não sabe bem o que quer, a **prototipagem** ajuda a descobrir. Se o sistema pode evoluir em entregas sucessivas, o **incremental** é forte candidato. Se o projeto envolve incerteza alta, necessidade de revisão contínua e atenção a riscos, o **espiral** tende a ser melhor. Se o objetivo é acelerar a implementação com apoio de automação e modularização, o **RAD** se destaca. Em resumo, a escolha correta nasce do cenário, não da decoração isolada do nome do modelo.

**Pontos que não podem faltar:**
- a escolha depende do cenário do projeto;
- cascata = previsibilidade e requisitos claros;
- prototipagem = descoberta de requisitos;
- incremental = entregas em partes;
- espiral = risco e revisão contínua;
- RAD = velocidade com automação e modularização.
