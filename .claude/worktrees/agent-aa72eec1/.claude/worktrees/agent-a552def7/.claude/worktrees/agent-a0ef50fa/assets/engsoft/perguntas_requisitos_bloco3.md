# Engenharia de Software — Bloco 3 — Perguntas de Requisitos com Respostas

## Como usar
Cada item está em formato de **pergunta + resposta**, pensado para página com botão de ocultar/exibir.

---

## Pergunta 1
**Enunciado:** O que são requisitos de software e por que eles são tão importantes no desenvolvimento?

**Resposta:** Requisitos de software são as descrições do que o sistema deve fazer e das condições que ele deve atender para ser considerado adequado. Eles são importantes porque orientam todo o restante do desenvolvimento: projeto, implementação, testes, validação e até manutenção. Quando os requisitos estão mal entendidos, incompletos ou ambíguos, a equipe corre o risco de construir um sistema tecnicamente correto, mas que não resolve o problema real do cliente.

**Pontos que não podem faltar:**
- requisitos descrevem necessidades, comportamentos e restrições do sistema;
- servem de base para as demais atividades do processo;
- erros em requisitos tendem a se espalhar pelo restante do projeto.

---

## Pergunta 2
**Enunciado:** Explique a diferença entre requisitos funcionais e requisitos não funcionais.

**Resposta:** Requisitos funcionais descrevem **o que o sistema faz**, isto é, as funções, serviços e comportamentos esperados. Já os requisitos não funcionais descrevem **como o sistema deve se comportar** ou sob quais condições deve operar, envolvendo aspectos como desempenho, segurança, disponibilidade, usabilidade e confiabilidade. Em outras palavras, o funcional trata da função entregue; o não funcional trata da qualidade ou da restrição associada a essa entrega.

**Pontos que não podem faltar:**
- funcionais = o que o sistema faz;
- não funcionais = como o sistema se comporta ou quais restrições deve cumprir;
- os dois são necessários para definir corretamente o produto.

---

## Pergunta 3
**Enunciado:** Dê exemplos de requisitos funcionais e não funcionais e explique por que eles pertencem a categorias diferentes.

**Resposta:** Um exemplo de requisito funcional seria: **“o sistema deve permitir login com e-mail e senha”**. Ele descreve uma capacidade concreta do sistema. Já um exemplo de requisito não funcional seria: **“o sistema deve responder à autenticação em até 2 segundos”** ou **“deve proteger os dados com mecanismos adequados de segurança”**. Nesse caso, não se descreve uma função nova, mas sim uma condição de qualidade, desempenho ou restrição aplicada à função.

**Pontos que não podem faltar:**
- exemplo funcional ligado a ação ou serviço do sistema;
- exemplo não funcional ligado a desempenho, segurança, disponibilidade, usabilidade ou qualidade;
- a diferença está entre capacidade e condição de operação.

---

## Pergunta 4
**Enunciado:** O que são requisitos implícitos e por que eles costumam ser problemáticos?

**Resposta:** Requisitos implícitos são necessidades que o cliente, a equipe ou os usuários assumem como óbvias, mas que **não foram explicitamente registradas ou discutidas**. Eles são problemáticos porque criam expectativas escondidas: alguém acredita que determinada funcionalidade ou comportamento “está entendido”, enquanto outra parte sequer percebe que aquilo deveria existir. O resultado costuma ser retrabalho, conflito, atraso e frustração na validação final.

**Pontos que não podem faltar:**
- são requisitos não documentados ou não verbalizados claramente;
- geram mal-entendidos entre cliente e equipe;
- costumam causar retrabalho, conflito e correções tardias.

---

## Pergunta 5
**Enunciado:** Como a equipe pode reduzir o risco de requisitos implícitos durante o projeto?

**Resposta:** A principal forma de reduzir requisitos implícitos é tornar o entendimento do sistema o mais explícito possível. Isso inclui conversar bastante com o cliente, validar exemplos concretos de uso, registrar decisões, revisar requisitos com frequência e confirmar se todos estão interpretando as necessidades da mesma maneira. Sempre que algo parecer “óbvio”, vale a pena perguntar e documentar — porque, em projetos de software, o óbvio para uma pessoa pode não ser óbvio para outra.

**Pontos que não podem faltar:**
- esclarecer dúvidas cedo e com frequência;
- validar entendimento com exemplos e revisões;
- documentar decisões para evitar suposições escondidas.

---

## Pergunta 6
**Enunciado:** O que são requisitos legais ou normativos e por que eles não podem ser ignorados?

**Resposta:** Requisitos legais ou normativos são exigências impostas por leis, regulamentos, normas técnicas ou obrigações formais do contexto em que o software será usado. Eles não podem ser ignorados porque não dependem apenas da vontade do cliente ou da equipe: muitas vezes representam obrigações externas que precisam ser cumpridas. Se forem desconsiderados, o sistema pode até funcionar do ponto de vista técnico, mas ainda assim estar inadequado, irregular ou sujeito a problemas sérios de conformidade.

**Pontos que não podem faltar:**
- vêm de leis, normas ou exigências externas ao projeto;
- não dependem apenas da preferência do cliente;
- seu descumprimento pode tornar o sistema inadequado mesmo que funcione.

---

## Pergunta 7
**Enunciado:** Situação prática: o cliente diz que determinada exigência legal “não precisa ser seguida”. Como a equipe deve enxergar isso?

**Resposta:** A equipe não deve tratar essa fala como autorização automática para ignorar o requisito. Quando a exigência é legal ou normativa, ela ultrapassa a simples preferência do cliente. Nesse caso, o papel da equipe é deixar claro que existe uma obrigação externa que precisa ser considerada no produto. Aceitar a exclusão sem análise pode levar à entrega de um sistema que falha justamente em um ponto crítico de conformidade.

**Pontos que não podem faltar:**
- requisito legal não pode ser tratado como opcional apenas porque o cliente quer;
- a equipe precisa reconhecer a obrigação externa envolvida;
- ignorar esse tipo de requisito pode comprometer o sistema como um todo.

---

## Pergunta 8
**Enunciado:** Qual é a diferença entre levantamento de requisitos e análise de requisitos?

**Resposta:** O levantamento de requisitos está ligado à **coleta de informações**: entender o contexto, ouvir o cliente, observar usuários, descobrir necessidades e identificar problemas. Já a análise de requisitos vai além da coleta; ela procura **organizar, interpretar, esclarecer e estruturar** o que foi levantado para que fique compreensível e útil ao desenvolvimento. Em resumo, levantar é descobrir; analisar é transformar essa descoberta em entendimento consistente sobre o que o software deve fazer.

**Pontos que não podem faltar:**
- levantamento = coletar informações e necessidades;
- análise = interpretar, organizar e esclarecer o que foi levantado;
- a análise transforma dados brutos em entendimento do sistema.

---

## Pergunta 9
**Enunciado:** O que significa dizer que a análise de requisitos procura entender o problema e como o software irá resolvê-lo?

**Resposta:** Significa que a equipe não deve apenas listar funcionalidades soltas. Antes disso, precisa compreender qual problema real existe no contexto do cliente, por que esse problema importa e de que forma o software pode atuar como solução. Essa visão evita que o projeto vire apenas um acúmulo de pedidos desconexos. Um bom trabalho de análise conecta necessidade, objetivo e funcionalidade, dando coerência ao produto final.

**Pontos que não podem faltar:**
- a análise não é só listar funções;
- é preciso entender o problema do cliente;
- o software deve ser pensado como solução para esse problema.

---

## Pergunta 10
**Enunciado:** O que é especificação ou documentação de requisitos e qual é seu papel no projeto?

**Resposta:** Especificação ou documentação de requisitos é o registro organizado do que foi entendido sobre o sistema: suas funções, restrições, expectativas e condições de operação. Seu papel é servir como referência compartilhada entre cliente, analistas, desenvolvedores, testadores e demais envolvidos. Ela não existe para burocratizar o processo, mas para reduzir ambiguidades, preservar decisões importantes e permitir que o time trabalhe com uma visão comum do que precisa ser construído.

**Pontos que não podem faltar:**
- é o registro estruturado dos requisitos;
- ajuda a alinhar todos os envolvidos no projeto;
- reduz ambiguidades e serve de base para desenvolvimento e testes.

---

## Pergunta 11
**Enunciado:** O que é validação de requisitos e por que ela é necessária antes de avançar demais no desenvolvimento?

**Resposta:** Validação de requisitos é a atividade de verificar se aquilo que foi levantado e analisado realmente representa o que o cliente precisa e o que o sistema deve atender. Ela é necessária porque um requisito pode estar bem escrito e ainda assim estar errado do ponto de vista do negócio. Validar cedo evita que a equipe invista tempo em projetar, codificar e testar uma solução baseada em um entendimento incorreto.

**Pontos que não podem faltar:**
- validação confirma se o requisito está correto para o problema real;
- um requisito pode estar claro e mesmo assim estar errado;
- validar cedo evita retrabalho caro no restante do projeto.

---

## Pergunta 12
**Enunciado:** O que é gerenciamento de requisitos e por que ele se torna especialmente importante quando há mudanças?

**Resposta:** Gerenciamento de requisitos é o conjunto de cuidados usados para acompanhar, controlar e manter os requisitos coerentes ao longo do projeto. Isso inclui registrar mudanças, revisar impactos, manter consistência entre decisões e evitar que o time trabalhe com versões contraditórias do que deve ser construído. Ele se torna especialmente importante quando há mudanças porque, sem esse controle, o projeto perde referência, surgem conflitos entre partes do sistema e aumenta o risco de cada membro estar seguindo uma ideia diferente do produto.

**Pontos que não podem faltar:**
- gerenciar requisitos é acompanhar e controlar sua evolução;
- mudanças precisam ser registradas e avaliadas;
- sem gerenciamento, o projeto perde consistência e direção.

---

## Pergunta 13
**Enunciado:** Quais são as vantagens das técnicas observacionais no levantamento de requisitos?

**Resposta:** As técnicas observacionais têm a vantagem de mostrar como o trabalho ou o uso do sistema acontece **na prática**, e não apenas como as pessoas dizem que acontece. Muitas vezes o usuário esquece detalhes, omite etapas ou descreve uma rotina idealizada quando responde perguntas. Ao observar diretamente o contexto real, a equipe consegue identificar necessidades escondidas, dificuldades concretas e comportamentos que talvez nunca aparecessem apenas em entrevistas.

**Pontos que não podem faltar:**
- mostram a prática real, não só o discurso do usuário;
- ajudam a encontrar detalhes que o usuário pode esquecer ou omitir;
- tendem a gerar compreensão mais concreta do contexto.

---

## Pergunta 14
**Enunciado:** Quais são as limitações ou desvantagens das técnicas observacionais em comparação com entrevistas?

**Resposta:** Apesar de serem mais realistas em muitos casos, técnicas observacionais também têm limitações. Elas podem consumir mais tempo, exigir maior presença da equipe no ambiente do usuário e nem sempre revelam bem intenções, justificativas e expectativas futuras. Observar mostra muito do comportamento real, mas não substitui totalmente perguntar. Por isso, em muitos projetos, o melhor resultado vem da combinação entre observação e entrevista.

**Pontos que não podem faltar:**
- podem ser mais lentas e exigir mais esforço de campo;
- nem sempre revelam motivações ou expectativas futuras com clareza;
- costumam funcionar melhor quando combinadas com outras técnicas.

---

## Pergunta 15
**Enunciado:** Situação prática: durante a entrega, o cliente reclama de algo que “era óbvio”, mas isso não estava documentado. Que problema de requisitos aconteceu aí?

**Resposta:** Esse é um caso clássico de requisito implícito. Algo que uma das partes considerava evidente não foi explicitado, validado nem registrado, e por isso acabou ficando fora da solução. O problema não está apenas no cliente ou apenas na equipe: ele revela falha de comunicação e de validação. Em situações assim, a lição principal é que aquilo que parece óbvio precisa ser tornado visível e verificável antes da implementação avançar.

**Pontos que não podem faltar:**
- trata-se de um requisito implícito;
- houve falha de comunicação e de validação do entendimento;
- o “óbvio” precisa ser explicitado e registrado.

---

## Pergunta 16
**Enunciado:** Situação prática: a equipe levantou muitos requisitos, mas eles estão vagos, misturados e contraditórios. Qual etapa precisa ser fortalecida e por quê?

**Resposta:** Nesse caso, a etapa que precisa ser fortalecida é a **análise de requisitos**. O problema não parece ser apenas falta de informação, mas falta de tratamento adequado da informação coletada. A análise serve justamente para separar, interpretar, esclarecer, organizar prioridades e resolver ambiguidades ou contradições. Sem isso, o projeto segue adiante com uma base instável e qualquer decisão posterior fica comprometida.

**Pontos que não podem faltar:**
- a etapa central aqui é a análise de requisitos;
- o objetivo é organizar, esclarecer e resolver contradições;
- seguir sem análise sólida compromete projeto, implementação e testes.

---

## Pergunta 17
**Enunciado:** Explique por que requisitos de software aparecem como um dos temas mais cobrados da prova.

**Resposta:** Requisitos aparecem muito porque eles estão no começo da cadeia de decisões do desenvolvimento. Se a equipe entende mal o que deve ser construído, todas as demais atividades ficam comprometidas: projeto, implementação, testes, validação e entrega. Além disso, o tema permite ao professor cobrar tanto definição quanto comparação e cenário prático, como requisitos funcionais versus não funcionais, requisitos implícitos, exigências legais e técnicas de levantamento.

**Pontos que não podem faltar:**
- requisitos influenciam todas as etapas seguintes do processo;
- erros de requisitos geram impacto amplo no projeto;
- o tema permite cobrar definição, comparação e aplicação prática.

---

## Pergunta 18
**Enunciado:** Faça uma síntese: quais são as etapas principais do trabalho com requisitos apresentadas no material da disciplina?

**Resposta:** O material organiza o trabalho com requisitos em um fluxo que passa por **levantamento e análise de requisitos**, depois **especificação e documentação**, seguido por **validação** e **gerenciamento de requisitos**. A lógica é simples: primeiro descobrir e entender o que o sistema precisa atender; depois registrar isso de forma clara; em seguida confirmar se está correto; e, por fim, acompanhar mudanças e manter a consistência ao longo do projeto.

**Pontos que não podem faltar:**
- levantamento e análise;
- especificação/documentação;
- validação;
- gerenciamento para acompanhar mudanças e manter consistência.
