# StockFlow — V1 Foundation

## 1. Nome do produto
- Nome atual: `StockFlow`
- Observação: nome provisório e sujeito a revisão futura sem impacto na definição funcional desta etapa.

## 2. Descrição curta do produto
StockFlow é um sistema interno de controle de materiais e estoque que controla o saldo atual dos itens e documenta as movimentações operacionais para dar mais previsibilidade ao depósito e melhor leitura gerencial do fluxo.

## 3. Perfis de uso da V1
### Funcionário do depósito
- Responsável pelo cadastro inicial e atualização frequente do estoque.
- Precisa executar ações rápidas no celular, com baixa fricção operacional.

### Recepção
- Consulta disponibilidade de materiais e apoia movimentações simples.
- Precisa buscar itens com rapidez e entender se há alerta de estoque baixo.

### Gestor
- Acompanha situação geral do estoque e histórico de movimentações.
- Precisa de leitura objetiva do que está baixo, do que mais movimenta e do estado geral do estoque.

## 4. Reposicionamento conceitual da V1
Na V1, StockFlow não é apenas um contador de estoque atual.

O produto passa a ser definido oficialmente como um sistema de controle de estoque com registro de movimentações.

Isso significa que:
- o sistema controla o saldo atual operacional de cada item
- o sistema documenta entradas, saídas, ajustes e eventos relevantes do ciclo do item
- o saldo atual é entendido conceitualmente a partir das movimentações registradas
- a V1 ainda pode manter `quantidadeAtual` como campo materializado para leitura simples da interface e fluxos rápidos de operação
- o histórico operacional é parte central da V1, não um recurso secundário

## 5. Campos obrigatórios do produto
Definição funcional mínima de um produto na V1:

| Campo | Tipo sugerido | Obrigatório | Finalidade |
| --- | --- | --- | --- |
| `id` | string | Sim | Identificador único do produto. |
| `nome` | string | Sim | Nome curto e objetivo do material. |
| `categoria` | enum/string | Sim | Classificação do item dentro da lista inicial de categorias. |
| `unidade` | enum/string | Sim | Unidade de controle do item. Exemplos: `un`, `cx`, `pct`, `rol`, `kg`, `lt`. |
| `quantidadeAtual` | number | Sim | Saldo atual materializado para leitura rápida da interface. Conceitualmente, esse saldo deriva das movimentações registradas. |
| `estoqueMinimo` | number | Sim | Quantidade mínima aceitável antes de alerta. |
| `observacoes` | string | Não | Informação complementar útil para operação. |
| `ativo` | boolean | Sim | Indica se o item continua válido para uso no sistema. |
| `createdAt` | datetime string | Sim | Data de criação do registro. |
| `updatedAt` | datetime string | Sim | Data da última atualização do registro. |

Decisões funcionais:
- `nome`, `categoria`, `unidade`, `quantidadeAtual` e `estoqueMinimo` formam o núcleo operacional do cadastro.
- `quantidadeAtual` permanece disponível como leitura simples da interface, mas não substitui a lógica conceitual de histórico por movimentações.
- `observacoes` existe para contexto operacional, mas não deve bloquear o cadastro.
- `ativo` permite retirar itens de uso sem apagar histórico futuramente.
- `id`, `createdAt` e `updatedAt` preparam a base para sincronização, auditoria e futura autenticação.

## 6. Modelo de movimentações da V1
### 6.1 Tipos oficiais de movimentação
A V1 passa a reconhecer oficialmente os seguintes tipos de movimentação:

- `entrada` = mercadoria recebida, reposta ou entregue ao estoque
- `saida` = mercadoria distribuída, consumida ou baixada do estoque
- `ajuste` = correção manual de quantidade após conferência ou revisão operacional
- `cadastro` = criação inicial do item no sistema
- `remocao` = exclusão operacional ou inativação do item no fluxo da V1

### 6.2 Regra operacional da interface futura
A operação futura da interface deve seguir esta regra oficial:

- botão `+` registra `entrada`
- botão `-` registra `saida`
- edição manual do número registra `ajuste`

Essas ações não devem ser entendidas apenas como alteração direta de campo, mas como gatilhos para registro de movimentação.

### 6.3 Estrutura mínima de uma movimentação
Definição funcional mínima de uma movimentação na V1:

| Campo | Tipo sugerido | Obrigatório | Finalidade |
| --- | --- | --- | --- |
| `id` | string | Sim | Identificador único da movimentação. |
| `productId` | string | Sim | Produto afetado pela movimentação. |
| `type` | enum/string | Sim | Tipo oficial da movimentação na V1. |
| `quantityChanged` | number | Sim | Quantidade alterada na operação. |
| `previousQuantity` | number | Sim | Saldo anterior ao registro. |
| `resultingQuantity` | number | Sim | Saldo resultante após a movimentação. |
| `reason` | string | Não | Motivo objetivo da operação, quando necessário. |
| `note` | string | Não | Observação complementar livre para contexto operacional. |
| `createdAt` | datetime string | Sim | Data e hora do registro da movimentação. |

Campos previstos para evolução futura, mas fora do requisito ativo da V1:
- `companyId`
- `performedBy`
- `source`

### 6.4 Relação entre produto e movimentação
Regra conceitual da base:
- o produto guarda o estado atual operacional visível para uso rápido
- a movimentação guarda a trilha histórica que explica como esse estado foi formado
- o saldo atual do item é entendido a partir de entradas, saídas e ajustes acumulados
- o dashboard futuro dependerá das movimentações para consolidar fluxo e leitura gerencial
- o histórico futuro exibirá essa trilha ao gestor e à operação

## 7. Regra de estoque baixo
Regra funcional da V1:
- Um item entra em estado de estoque baixo quando `quantidadeAtual <= estoqueMinimo`.

Regras complementares:
- Quando `quantidadeAtual` for maior que `estoqueMinimo`, o item permanece em estado normal.
- Quando `quantidadeAtual` for `0`, o item continua sendo tratado como estoque baixo, com prioridade máxima na leitura operacional.
- A regra deve ser aplicada de forma consistente em listagens, dashboard e consultas.

## 8. Navegação da V1
A navegação da V1 será composta por 4 áreas principais.

### Estoque
Ponto principal de uso diário.

Responsabilidades:
- listar produtos cadastrados
- buscar produto por nome
- visualizar categoria, unidade, saldo atual e status de estoque
- executar ações rápidas que futuramente registrarão movimentações
- acessar edição e remoção de item

### Cadastrar
Área dedicada ao registro de novos produtos.

Responsabilidades:
- cadastrar produto com os campos obrigatórios da V1
- garantir padronização de categoria e unidade
- iniciar item já com saldo atual conhecido
- permitir que a criação do item gere evento de `cadastro`
- permitir que edição/remoção futura se conecte à trilha de movimentações

### Histórico
Área de consulta das movimentações realizadas.

Responsabilidades:
- exibir eventos de `entrada`, `saida`, `ajuste`, `cadastro` e `remocao`
- permitir leitura cronológica das alterações
- apoiar conferência operacional e acompanhamento gerencial

### Dashboard
Área de visão resumida do estoque.

Responsabilidades:
- apresentar total de itens cadastrados
- destacar itens com estoque baixo
- resumir movimentações recentes
- oferecer leitura rápida para gestor e operação
- consolidar fluxo e situação atual do estoque

## 9. Ações obrigatórias da V1
### 9.1 Cadastrar produto
Deve permitir criar um novo item com os campos obrigatórios definidos para a V1.

Requisitos funcionais:
- registrar `nome`, `categoria`, `unidade`, `quantidadeAtual`, `estoqueMinimo`
- aceitar `observacoes` como campo opcional
- gerar `id`, `createdAt` e `updatedAt`
- iniciar `ativo` como `true`
- preparar a base para geração do evento de `cadastro`

### 9.2 Buscar produto
Deve permitir localizar itens com rapidez no uso diário.

Requisitos funcionais:
- buscar pelo nome do produto
- retornar resultados objetivos para consulta e ação imediata
- funcionar como ação central dentro da área de Estoque

### 9.3 Registrar entrada
Deve registrar reposição, recebimento ou chegada de material ao estoque.

Requisitos funcionais:
- atualizar o saldo atual materializado
- atualizar `updatedAt`
- gerar movimentação do tipo `entrada`

### 9.4 Registrar saída
Deve registrar saída, consumo ou baixa de material.

Requisitos funcionais:
- atualizar o saldo atual materializado
- atualizar `updatedAt`
- gerar movimentação do tipo `saida`
- impedir que a operação deixe a quantidade abaixo de zero

### 9.5 Registrar ajuste manual
Deve permitir correção direta do saldo quando houver conferência ou revisão operacional.

Requisitos funcionais:
- atualizar o saldo atual materializado para o novo valor informado
- atualizar `updatedAt`
- gerar movimentação do tipo `ajuste`
- registrar valor anterior e valor resultante, preparando base para auditoria futura

### 9.6 Remover produto
Deve retirar o item do fluxo operacional da V1.

Requisitos funcionais:
- remover ou inativar o produto da visão principal de uso
- gerar movimentação ou evento operacional compatível com `remocao`
- manter a decisão compatível com futura estratégia de inativação por `ativo`

Decisão estrutural:
- Na V1, a ação é tratada funcionalmente como remoção do item da operação.
- A modelagem já prevê `ativo` para permitir evolução futura para exclusão lógica sem quebrar a base.

### 9.7 Ver histórico
Deve permitir consulta clara das mudanças feitas no estoque.

Requisitos funcionais:
- listar movimentações e alterações relevantes
- mostrar tipo de movimentação realizada
- mostrar produto afetado
- mostrar data da ação
- preparar base para futura associação com usuário responsável, sem exigir autenticação agora

## 10. Itens fora da V1
Ficam explicitamente fora do escopo desta etapa e da V1 inicial:
- login
- perfis de acesso
- múltiplos depósitos
- relatórios avançados
- exportação complexa
- notificações automáticas
- controle por usuário responsável

Observação:
- A base funcional desta etapa deve facilitar a entrada desses recursos depois, sem adicioná-los agora.

## 11. Critérios de pronto da Etapa 0.1
A Etapa 0.1 é considerada pronta quando existir:
- reposicionamento explícito do produto como sistema de estoque com registro de movimentações
- definição clara da relação entre saldo atual e histórico operacional
- tipos oficiais de movimentação da V1 documentados
- regra operacional `+ = entrada`, `- = saida`, edição manual = `ajuste` documentada
- estrutura mínima de movimentação definida
- impacto nas áreas principais registrado sem mudar a navegação
- base documental suficiente para iniciar a Etapa 2 sem retrabalho estrutural

## 12. Base estrutural para as próximas etapas
Esta definição deve orientar as próximas decisões de arquitetura e frontend.

Princípios para continuidade:
- priorizar fluxo rápido para operação em celular
- manter leitura simples e direta para o gestor
- evitar excesso de campos e decisões complexas na operação diária
- manter nomenclatura, navegação e regras consistentes com este documento
- preparar estrutura compatível com autenticação futura, histórico mais robusto e controle por responsável
- derivar o saldo operacional a partir das movimentações quando a camada funcional da Etapa 2 for conectada

## 13. Checklist de qualidade
- [x] A documentação base agora reflete o conceito de movimentações
- [x] Os tipos de movimentação da V1 foram definidos
- [x] A regra `+ = entrada`, `- = saida`, `edição manual = ajuste` foi documentada
- [x] Os campos obrigatórios de uma movimentação foram definidos
- [x] A relação entre saldo atual e histórico foi explicada
- [x] Os itens fora da V1 foram registrados
- [x] Nenhuma interface foi criada nesta etapa
- [x] A base ficou pronta para a Etapa 2 — Estoque / Prateleira
