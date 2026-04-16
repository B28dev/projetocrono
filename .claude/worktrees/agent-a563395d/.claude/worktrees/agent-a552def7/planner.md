CRONO — CONTEXTO MESTRE DO PROJETO (Gamified Edition)
Documento de contexto canónico do projeto Projeto Crono (repositório: B28dev/projetocrono).

Este arquivo foi escrito para servir como fonte de verdade para humanos, agentes de IA e LLMs.
A intenção é que qualquer executor técnico, arquiteto, product designer, engenheiro de software ou modelo de linguagem consiga entender rapidamente a arquitetura, o domínio, o estilo e as restrições inegociáveis do ecossistema.

1. IDENTIFICAÇÃO DO PROJETO
   Nome do produto:
   Projeto Crono (ou apenas Crono)

Natureza do produto:
Um ecossistema (SaaS Académico) de alta performance, gestão de tempo e aprendizagem gamificada e viciante.

Estágio atual:
Produto em transição de Protótipo/MVP (V1) para Plataforma Escalável (V2).

Fundação arquitetural definida;

Componentes core (Flashcards 3D, Acordeões, Modais) criados;

Design System duplo (Cyberpunk/Minimalista) estruturado;

Conteúdos estáticos (P1) de Empreendedorismo já integrados.

Visão estratégica:
Hoje, o Crono resolve o problema do foco e da revisão ativa para exames iminentes.
No futuro, o Crono deixará de ser um "jornal impresso com datas fixas" e evoluirá para um motor dinâmico de inteligência temporal, onde o utilizador insere a data do exame e o sistema calcula a rota diária de estudos automaticamente.

2. RESUMO EXECUTIVO
   O Crono foi concebido para substituir o estudo passivo (ler PDFs e assistir a aulas longas) por um ambiente de revisão ativa altamente engajadora e gamificada.

O objetivo do sistema é encapsular conteúdos densos e entregá-los em formatos de alta retenção visual e interativa:

Flashcards de Elite: Para memorização rápida e quebra de "rasteiras/pegadinhas", com física suave e interatividade.

Banco de Questões Estilo Exame: Como autênticas "Boss Fights", com gabarito focado em palavras-chave obrigatórias.

O produto não deve ter o aspeto de uma plataforma E-learning tradicional (aborrecida, académica, monótona).
Ele deve parecer:

Tecnológico, vivo e recompensador (estética e-sports/arcade ou sci-fi limpo);

Rápido, ágil e responsivo;

Protetor do tempo do utilizador;

Altamente focado em "entrar, testar o conhecimento, receber o feedback visual e sair".

3. FILOSOFIA E PROBLEMA DE NEGÓCIO
   A Filosofia Base: "Cão Pastor" Gamificado (Agile & Juicy UI)
   Toda a UX do Crono é guiada por esta mentalidade, mas de forma fluida. O Cão Pastor aqui não é um general militar rígido, mas sim um "companion" ágil que mantém o rebanho (o foco) em movimento constante através de recompensas visuais, dinamismo e uma interface juicy (cheia de vida). A disciplina é alcançada porque o processo de estudo se torna num estado de Flow viciante.

Problema principal que o produto resolve:
Estudantes e developers perdem o controlo do cronograma de estudos perto das provas. O Crono organiza o caos:

Corta o conteúdo inútil;

Foca no que sai no exame (Bloco 1: Base; Bloco 2: Elite/Pegadinhas);

Mantém a motivação em alta através de micro-interações prazerosas e feedback imediato.

4. UTILIZADORES E CONTEXTOS DE USO
   Utilizador Principal — O Estudante/Developer
   Perfil:

Pessoas com alta carga de trabalho/estudo;

Familiaridade com tecnologia;

Pouco tempo disponível.

Contextos de uso:

Mobile (Transportes/Filas): Uso rápido dos Flashcards 3D com apenas uma mão (onClick para virar o card), sentindo-se como um jogo de telemóvel.

Desktop (Deep Work): Leitura profunda do Banco de Questões e resoluções de provas no Hub principal.

5. PRINCÍPIOS DE EXPERIÊNCIA E UX
   5.1 Dinamismo e Micro-interações (Juicy UI)
   Cada ação do utilizador deve ter um feedback visual recompensador. Animações fluidas de entrada (fade-in-up), cards que viram com física suave e botões que dão a sensação de clique real. O estudo deve parecer dinâmico.

5.2 Mobile-First Real (Zero Hover Dependency)
Nenhuma interação crítica do Crono depende de :hover.

Flashcards viram no clique (onClick);

Acordeões expandem no clique;

Modais fecham no clique.

O sistema deve ser impecável em ecrãs de 320px.

5.3 Controlo de Carga Cognitiva e Gestão de Ritmo
Nunca lançar dezenas de itens no ecrã de uma só vez para não assoberbar o utilizador. A sensação deve ser a de "desbloquear níveis":

Paginação Obrigatória: Listas de flashcards/questões usam o estado visibleCount (iniciando em 4 a 6 itens) com botão "Carregar Mais" centralizado.

Master Accordions: Módulos inteiros (Bloco 1, Bloco 2) nascem fechados por defeito.

5.4 Dual-Theme (Dois Mundos Visuais)
O Crono suporta transição de temas e o código deve prever ambos:

Performance Black (Cyberpunk/Arcade): Fundo bg-slate-950, sombras em neon (drop-shadow-cyan-500), bordas com LED giratório (conic-gradient), textos com text-shadow. Clima de e-sports.

Bio-Tech Clean (Minimalista): Fundo branco ou cinza claro estéril, bordas finas, sombras que dão sensação de flutuação, minimalismo extremo focado em tipografia (estilo sci-fi/Linear).

6. PRINCÍPIOS ESTRATÉGICOS DE ARQUITETURA (ENGINE)
   6.1 Arquitetura Data-Driven (Regra de Ouro)
   NENHUM texto longo, lista de flashcards ou banco de questões deve ser feito em "hardcode" dentro do JSX.

O componente React atua apenas como o "Motor do Jogo" (Shell).

Os dados vivem em Arrays/Objetos externos (ex: const questoesEmpreendBloco1 = [...]).

A renderização é feita dinamicamente via .map().

6.2 O Método de Injeção em 4 Passos (.MD)
Para garantir que o layout nunca quebra ao receber muito conteúdo, a injeção segue a regra assíncrona dos 4 passos:

Passo 1: Master Acordeão Bloco 1 + Array de Flashcards.

Passo 2: Aba de Questões Bloco 1.

Passo 3: Master Acordeão Bloco 2 (Lote Elite/Pegadinhas) iniciando fechado.

Passo 4: Aba de Questões Bloco 2 + Formatações de Gabarito.

6.3 Persistência de Estado (LocalStorage)
Avisos, onboarding e Modais de Release Notes usam o padrão efémero persistido:

Guardar a versão no localStorage (ex: v1.1.0).

Só mostrar a nota de atualização se a versão guardada for diferente da atual.

7. REGRAS DE DOMÍNIO E NEGÓCIO
   7.1 Regra do Gabarito Obrigatório (Alerta Amarelo)
   Em todos os Bancos de Questões dissertativas, a resposta deve ser dividida em duas partes:

Explicação principal fluida.

Duas quebras de linha (<br /><br />).

Uma tag OBRIGATÓRIA formatada exatamente assim, funcionando como o "Loot" crítico da questão:
<span class="text-amber-500 font-bold">⚠️ Pontos que não podem faltar:</span> [lista]

7.2 Estrutura de Dados
Todo Flashcard deve ter a estrutura: { id, frente, verso }
Toda Questão deve ter a estrutura: { id, pergunta, resposta }

8. ROADMAP (ESTADO ATUAL E FUTURO)
   Etapas Concluídas (V1 Base)

[x] Definição da Tech Stack (React + Tailwind).

[x] Criação dos Componentes Primitivos (Acordeões, Flashcards 3D).

[x] Injeção do Bloco 1 de Empreendedorismo.

[x] Injeção do Bloco 2 (Pegadinhas/Prova) de Empreendedorismo.

[x] Modal de Release Notes (Neon v1.1.0).

Próximos Passos Imediatos (Backlog Ativo)

[ ] Injeção do Módulo de Inglês: Usar o método dos 4 MDs para o conteúdo da P1 de Inglês.

[ ] Refatoração do Hub (Switcher P1/P2): Criar a chave de alternância que esconde os conteúdos da P1 e abre espaço para a P2 sem apagar os dados antigos.

Visão de Futuro (V2 - SaaS)

[ ] Motor Algorítmico de Tempo: Separar o conteúdo temporal da renderização. O utilizador informará a data de início e a data do exame, e a UI distribuirá os módulos dinamicamente ignorando fins de semana.

[ ] Backend Readiness: Substituir as constantes locais (MOCK_DATA) por requisições assíncronas preparadas para Supabase/Firebase (useEffect + estados de isLoading).

9. REGRAS PARA LLMs E EXECUTORES DE CÓDIGO (LEITURA CRÍTICA)
   Se és um agente de Inteligência Artificial (ChatGPT, Claude, Gemini, Antigravity, Codex) a ler este documento, ESTÁS PROIBIDO DE VIOLAR AS SEGUINTES REGRAS:

Separação UI / Dados: Nunca coloques os textos dos flashcards diretamente dentro das tags <div>. Cria um array fora da função.

Mobile Interactivity: Nunca uses classes como hover:rotate-y-180 para ações críticas. Usa um estado do React (isFlipped) ativado via onClick.

Escopo Cirúrgico: Ao atualizar uma secção (ex: adicionar o Bloco 2), NÃO removas, alteres ou simplifiques o código do Bloco 1 que já está a funcionar.

Tailwind Inteligente: Usa classes utilitárias modernas para gerar micro-interações (transition-all, duration-300, ease-out) e nunca definas cores hexadecimais soltas no estilo inline.

Estética da Marca: Mantém as bordas finas, fundos escuros (se no modo Cyberpunk) e espaçamentos consistentes (gap-4, p-6). O interface deve parecer um jogo moderno ou uma app nativa premium, nunca um "template padrão de bootstrap".

10. LEITURA RÁPIDA (TL;DR PARA CONTEXT WINDOWS)
    Projeto: Crono.

O que é: Hub de estudos gamificado de alta performance focado num estado de Flow viciante (Cão Pastor Gamificado).

Core Tech: React + Tailwind.

Core UI: Flashcards 3D (onClick), Master Acordeões, Paginação (visibleCount), Animações fluidas (Juicy UI).

Regra de Ouro do Código: Arquitetura Data-Driven (Zero hardcode de textos no JSX).

Regra de Ouro do Conteúdo: Gabaritos de exames TÊM SEMPRE a badge <span class="text-amber-500 font-bold">⚠️ Pontos que não podem faltar:</span>.

Status atual: MVP a rodar. Próximo passo é adicionar conteúdo de Inglês e criar o Switcher P1/P2 no Hub.
