---
name: dashboard-cleanup-overview
description: Use esta skill quando a tarefa for simplificar dashboards e overviews densas, especialmente em dark UI, reduzindo texto, aumentando protagonismo de gráficos e melhorando legibilidade sem alterar a lógica do produto.
---

# Dashboard Cleanup Overview

## Quando usar
Use esta skill quando a página:
- estiver verborrágica
- tiver muitos cards competindo
- tiver gráficos pequenos ou sem protagonismo
- tiver textos secundários escuros, pequenos ou apagados
- parecer relatório comentado em vez de central de comando
- tiver boxes dentro de boxes
- precisar ficar mais clean, premium e escaneável

## Quando não usar
Não use esta skill se a tarefa for:
- alterar engine ou regras de negócio
- criar novos fluxos complexos
- construir dashboards do zero sem contexto existente
- mexer primariamente em backend

## Objetivo
Transformar a overview em uma interface:
- mais silenciosa
- mais visual
- mais legível
- mais orientada por gráfico e número
- menos dependente de texto explicativo

## Workflow obrigatório

### Passo 1 — Diagnóstico rápido
Antes de editar, identifique:
- quais blocos falam demais
- quais gráficos não têm protagonismo
- onde há caixas dentro de caixas
- onde o contraste está fraco
- quais KPIs parecem mini-cards descritivos

### Passo 2 — Corte de texto
Aplique redução agressiva:
- remova textos redundantes
- remova explicações do óbvio
- mova detalhes para áreas rebaixadas
- deixe a first fold compacta de verdade

### Passo 3 — Reforço de hierarquia
Garanta:
- gráfico principal como bloco-herói
- KPIs com leitura de placar
- hero contextual, não verborrágica
- detalhe rebaixado

### Passo 4 — Limpeza visual
Reduza:
- bordas redundantes
- boxes internos
- chips em excesso
- subdivisões artificiais

Substitua por:
- respiro
- alinhamento
- contraste
- escala tipográfica

### Passo 5 — Legibilidade
Corrija:
- textos pequenos demais
- helper text apagado
- contraste baixo
- excesso de uppercase decorativo

### Passo 6 — Revisão final
Antes de encerrar, cheque:
- a página ficou mais clean
- há menos texto visível
- os gráficos mandam mais na tela
- o usuário entende a overview em 3 a 5 segundos
- a interface ficou mais premium

## Regras de design
- gráfico vence card
- número vence legenda
- estado vence explicação
- espaço em branco trabalha a favor
- cor é foco, não enfeite

## Regras de implementação
- preservar arquitetura existente sempre que possível
- preservar dashboardViewModel e origem dos dados
- evitar reescrever tudo se o problema for visual
- simplificar antes de embelezar
- preferir remoção real de nós longos na first fold, não apenas esconder via CSS

## Entregável esperado
A mesma página, mas com:
- menos ruído textual
- mais clareza
- melhor contraste
- gráficos maiores e mais protagonistas
- menos fragmentação
- melhor escaneabilidade