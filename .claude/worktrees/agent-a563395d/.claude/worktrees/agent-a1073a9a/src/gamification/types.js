/**
 * @fileoverview Gamification Type Contracts (JSDoc)
 *
 * Fonte de verdade única para todos os shapes de dados da gamificação do Crono.
 * Funciona como "interface" mesmo sem TypeScript — LLMs e devs lêem aqui primeiro.
 *
 * Regra: NUNCA instanciar objetos diretamente aqui. Este arquivo é declarativo.
 */

// ─── LAYER 1: CONTEÚDO ──────────────────────────────────────────────────────

/**
 * @typedef {'active' | 'archived' | 'upcoming'} SubjectStatus
 *
 * @typedef {Object} Subject
 * @property {string}        id               - Slug único (ex: 'arquitetura')
 * @property {string}        slug             - URL-friendly identifier
 * @property {string}        title            - Nome completo da matéria
 * @property {'p1' | 'p2'}  period           - Período letivo
 * @property {SubjectStatus} status          - Estado atual da matéria
 * @property {string}        themeColorToken  - Token de cor (ex: 'blue', 'rose')
 */

/**
 * @typedef {'lecture' | 'practice' | 'revision' | 'exam_prep'} ModuleType
 *
 * @typedef {Object} Module
 * @property {string}     id               - ID único
 * @property {string}     subjectId        - Referência ao Subject
 * @property {string}     title            - Título do módulo
 * @property {number}     order            - Ordem de exibição
 * @property {ModuleType} type             - Tipo do módulo
 * @property {boolean}    isLockedByDefault - Começa fechado?
 */

/**
 * @typedef {'flashcard' | 'assisted_question' | 'review'} ContentKind
 *
 * @typedef {Object} ContentItem
 * @property {string}      id              - ID único
 * @property {string}      subjectId       - Referência ao Subject
 * @property {string}      moduleId        - Referência ao Module
 * @property {ContentKind} kind            - Tipo de conteúdo
 * @property {string}      title           - Título do item
 * @property {string}      [front]         - Frente do flashcard
 * @property {string}      [back]          - Verso do flashcard
 * @property {string}      [prompt]        - Enunciado da questão assistida
 * @property {string}      [answerModel]   - Gabarito modelo
 * @property {string[]}    mustIncludePoints - Pontos obrigatórios no gabarito
 * @property {'easy'|'medium'|'hard'} difficulty - Dificuldade
 * @property {string}      xpProfileId     - Referência ao perfil de XP
 * @property {boolean}     isActive        - Está ativo para missões?
 */

// ─── LAYER 2: PLANO ─────────────────────────────────────────────────────────

/**
 * @typedef {'pending' | 'in_progress' | 'completed' | 'failed'} MissionSummaryStatus
 *
 * @typedef {Object} DailyMission
 * @property {string}              id               - ID único (geralmente date-userId)
 * @property {string}              date             - Data ISO YYYY-MM-DD
 * @property {number}              targetValidations - Mínimo de Validações Reais
 * @property {number}              targetBlocks     - Blocos de fogo esperados
 * @property {boolean}             isCompleted      - Meta atingida?
 * @property {boolean}             isCleanDay       - Meta + acumulado zerado?
 * @property {MissionSummaryStatus} summaryStatus   - Estado geral da missão
 */

/**
 * @typedef {'today' | 'backlog' | 'reinforcement'} MissionItemOrigin
 * @typedef {'pending' | 'completed' | 'skipped' | 'revealed_only'} MissionItemStatus
 *
 * @typedef {Object} MissionItem
 * @property {string}            id              - ID único
 * @property {string}            dailyMissionId  - Referência à DailyMission
 * @property {string}            contentItemId   - Referência ao ContentItem
 * @property {MissionItemOrigin} origin          - De onde veio o item
 * @property {number}            order           - Ordem na missão
 * @property {string}            missionType     - Tipo de tarefa na missão
 * @property {boolean}           requiredForCleanDay - Obrigatório para dia limpo?
 * @property {MissionItemStatus} status          - Estado atual do item
 * @property {string|null}       completedAt     - ISO timestamp ou null
 */

// ─── LAYER 3: EXECUÇÃO ──────────────────────────────────────────────────────

/**
 * @typedef {'flashcard_flip' | 'assisted_question' | 'review_mark'} AttemptType
 * @typedef {'easy' | 'good' | 'hard' | 'failed'} SelfAssessment
 *
 * @typedef {Object} AnswerAttempt
 * @property {string}           id                   - ID único
 * @property {string}           missionItemId        - Referência ao MissionItem
 * @property {string}           contentItemId        - Referência ao ContentItem
 * @property {AttemptType}      attemptType          - Tipo de tentativa
 * @property {boolean}          answeredBeforeReveal - Tentou antes de revelar?
 * @property {SelfAssessment}   selfAssessment       - Autoavaliação
 * @property {boolean}          detectedAsSpeedClick - Anti-exploit: clique rápido?
 * @property {number}           xpGranted            - XP concedido nesta tentativa
 * @property {boolean}          needsReinforcement   - Deve voltar como reforço?
 * @property {string}           attemptedAt          - ISO timestamp
 */

// ─── LAYER 4: PROGRESSÃO ────────────────────────────────────────────────────

/**
 * @typedef {Object} UserProgress
 * @property {string} userId                  - UID do usuário (Firebase Auth)
 * @property {number} level                   - Nível atual
 * @property {number} totalXp                 - XP total acumulado
 * @property {number} xpToday                 - XP ganho hoje
 * @property {number} xpThisWeek              - XP ganho esta semana
 * @property {number} completedValidationsToday - Validações Reais hoje
 * @property {number} completedBlocksToday    - Blocos de fogo hoje
 * @property {string} lastActiveAt            - ISO timestamp da última atividade
 */

/**
 * @typedef {'active' | 'at_risk' | 'broken' | 'recovering'} StreakStatus
 *
 * @typedef {Object} StreakState
 * @property {string}       userId          - UID do usuário
 * @property {number}       currentStreak   - Dias consecutivos ativos
 * @property {number}       highestStreak   - Maior ofensiva histórica
 * @property {string|null}  lastActiveDate  - Data ISO do último dia ativo
 * @property {number}       streakMultiplier - Multiplicador de XP (1.0 a 2.0)
 * @property {StreakStatus} streakStatus    - Estado da ofensiva
 */

/**
 * @typedef {'none' | 'low' | 'medium' | 'high' | 'critical'} DebtSeverity
 *
 * @typedef {Object} BacklogState
 * @property {string}       userId          - UID do usuário
 * @property {number}       totalDebtItems  - Itens obrigatórios em aberto
 * @property {string|null}  oldestDebtDate  - Data ISO do débito mais antigo
 * @property {DebtSeverity} debtSeverity    - Severidade do acumulado
 * @property {string|null}  backlogClearedAt - Quando foi zerado pela última vez
 */

/**
 * @typedef {'validation' | 'streak_bonus' | 'level_bonus' | 'clean_day_bonus' | 'manual'} XpSourceType
 *
 * @typedef {Object} XpLedger
 * @property {string}      id          - ID único
 * @property {string}      userId      - UID do usuário
 * @property {string}      reason      - Descrição legível
 * @property {number}      amount      - XP concedido (positivo)
 * @property {XpSourceType} sourceType - Origem do XP
 * @property {string}      sourceId    - ID da origem (attemptId, etc.)
 * @property {string}      createdAt   - ISO timestamp
 */

// ─── DERIVED STATES ─────────────────────────────────────────────────────────

/**
 * @typedef {'idle' | 'warming' | 'momentum' | 'locked'} MomentumState
 * - idle:     sem atividade hoje
 * - warming:  tem atividade mas abaixo da meta
 * - momentum: meta atingida, ofensiva ativa
 * - locked:   dia bloqueado por inatividade / streak quebrado
 */

/**
 * @typedef {Object} LevelProgress
 * @property {number} level           - Nível atual
 * @property {number} xpInLevel      - XP acumulado dentro do nível atual
 * @property {number} xpForNextLevel - XP necessário para o próximo nível
 * @property {number} percent        - Porcentagem de progresso (0–100)
 */
