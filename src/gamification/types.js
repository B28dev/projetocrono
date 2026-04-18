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
 * @typedef {'flashcard' | 'theory' | 'true_false' | 'written'} InteractionType
 * @typedef {'auto' | 'self_assessed'} ValidationMode
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
 * @property {InteractionType} [interactionType] - Tipo de interação validável do item
 * @property {ValidationMode} [validationMode] - Modo de validação do item
 * @property {{bank: string, topic: string, questionId: string}|null} [sourceRef] - Origem editorial do item
 * @property {{id: string, label: string, value: string}[]} [options] - Opções para V/F ou objetiva
 * @property {string|null} [correctOptionId] - Opção correta quando houver correção automática
 * @property {Record<string, string>|null} [explanationsByOption] - Justificativas por opção
 * @property {boolean|null} [trueFalseAnswer] - Resposta correta em itens V/F
 */

// ─── LAYER 2: PLANO ─────────────────────────────────────────────────────────

/**
 * @typedef {'pending' | 'in_progress' | 'completed' | 'failed'} MissionSummaryStatus
 * @typedef {'primary' | 'pending' | 'reinforcement'} MissionRole
 *
 * @typedef {Object} DailyMission
 * @property {string}              id               - ID único (geralmente date-userId)
 * @property {string}              date             - Data ISO YYYY-MM-DD
 * @property {number}              targetValidations - Mínimo de Validações Reais
 * @property {number}              targetBlocks     - Blocos de fogo esperados
 * @property {boolean}             isCompleted      - Meta atingida?
 * @property {boolean}             isCleanDay       - Meta + acumulado zerado?
 * @property {MissionSummaryStatus} summaryStatus   - Estado geral da missão
 * @property {string|null}         sourceDisciplineId - Disciplina que originou a missão
 * @property {object|null}         primaryAction    - Ação principal derivada da trilha oficial
 * @property {object[]}            pendingActions   - Pendências oficiais abertas
 * @property {object[]}            reinforcementActions - Reforços complementares do dia
 * @property {object[]}            officialMissionItems - Itens oficiais que contam para progresso
 * @property {object[]}            completedMissionItems - Itens oficiais já concluídos
 * @property {number}              missionProgressPercent - Progresso oficial da missão do dia
 */

/**
 * @typedef {'today' | 'backlog' | 'reinforcement'} MissionItemOrigin
 * @typedef {'pending' | 'in_progress' | 'completed' | 'skipped' | 'revealed_only'} MissionItemStatus
 * @typedef {'idle' | 'validated_correct' | 'validated_partial' | 'validated_wrong' | 'validated_theory' | 'revealed_without_attempt' | 'explored_only'} MissionValidationStatus
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
 * @property {string|null}       lastAttemptAt   - ISO timestamp da última tentativa
 * @property {number}            attemptCount    - Número de tentativas registradas
 * @property {boolean}           needsSameDayReinforcement - Precisa reforço ainda hoje?
 * @property {string|null}       reviewBucket    - Bucket futuro de revisão
 * @property {string|null}       nextReviewAt    - Data futura de revisão
 * @property {'easy'|'medium'|'hard'|null} difficultyRating - Gancho para dificuldade percebida
 * @property {MissionRole|null}  missionRole     - Papel do item na missão do dia
 * @property {string|null}       sourceDisciplineId - Disciplina de origem
 * @property {string|null}       motherSubjectId - Conteúdo-mãe associado
 * @property {string|null}       layerId         - Camada oficial associada
 * @property {string|null}       layerTitle      - Título da camada oficial
 * @property {number|null}       priority        - Prioridade derivada da trilha
 * @property {string|null}       reason          - Motivo do item estar na missão
 * @property {boolean}           isRecommended   - Se é o recommended_now atual
 * @property {boolean}           isOfficial      - Se conta como missão oficial
 * @property {string|null}       generatedFrom   - Origem da geração do item
 * @property {boolean}           requiresValidation - Se o item exige validação explícita
 * @property {InteractionType|null} validationType - Tipo de validação do item
 * @property {MissionValidationStatus} validationStatus - Estado da validação do item
 * @property {string|null}       validationAttemptId - Última tentativa ligada à validação
 * @property {boolean}           isValidated     - Se houve validação real do item
 * @property {string|null}       validatedAt     - Timestamp da última validação real
 * @property {ValidationResultTier|null} lastResultTier - Último tier registrado para o item
 */

/**
 * @typedef {'validated' | 'partial' | 'invalid'} ValidationResultTier
 * @typedef {'flashcard' | 'assisted_question' | 'theory' | 'true_false' | 'written'} ValidationKind
 */

// ─── LAYER 3: EXECUÇÃO ──────────────────────────────────────────────────────

/**
 * @typedef {'flashcard_flip' | 'assisted_question' | 'review_mark' | 'theory_validation' | 'true_false_answer' | 'written_reflection'} AttemptType
 * @typedef {'easy' | 'good' | 'hard' | 'failed' | 'partial' | 'revealed' | 'theory_done'} SelfAssessment
 *
 * @typedef {Object} AnswerAttempt
 * @property {string}           id                   - ID único
 * @property {string}           missionItemId        - Referência ao MissionItem
 * @property {string}           contentItemId        - Referência ao ContentItem
 * @property {AttemptType}      attemptType          - Tipo de tentativa
 * @property {ValidationKind}   validationKind       - Fluxo que originou a tentativa
 * @property {boolean}          answeredBeforeReveal - Tentou antes de revelar?
 * @property {SelfAssessment}   selfAssessment       - Autoavaliação
 * @property {boolean}          detectedAsSpeedClick - Anti-exploit: clique rápido?
 * @property {number}           thinkTimeMs          - Tempo entre abrir e submeter
 * @property {number}           xpGranted            - XP concedido nesta tentativa
 * @property {boolean}          needsReinforcement   - Deve voltar como reforço?
 * @property {ValidationResultTier} resultTier       - Classificação operacional do resultado
 * @property {string}           feedbackKey          - Chave da microcopy de feedback
 * @property {string}           attemptedAt          - ISO timestamp
 * @property {string|null}      disciplineId         - Disciplina vinculada à tentativa
 * @property {string|null}      motherSubjectId      - Assunto-mãe vinculado à tentativa
 * @property {string|null}      layerId              - Camada oficial vinculada à tentativa
 * @property {unknown}          responsePayload      - Resposta registrada para comparação/telemetria
 * @property {'auto' | 'self_assessed' | null} validationSource - Fonte da validação
 * @property {boolean}          isValidatedExecution - Se conta como execução validada
 * @property {'correct' | 'incorrect' | null} objectiveCorrectness - Resultado em questões objetivas
 * @property {string|null}      nextReviewHint       - Gancho de revisão futura
 */

/**
 * @typedef {'validation_success' | 'validation_partial' | 'validation_failed' | 'revealed_without_attempt' | 'speed_click' | 'mission_completed' | 'mission_progress' | 'mission_clean' | 'debt_opened' | 'streak_saved' | 'streak_at_risk' | 'backlog_cleared'} MissionEventType
 * @typedef {'success' | 'warning' | 'danger' | 'info'} ValidationFeedbackTone
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
 * @property {number} officialCompletedToday  - Itens oficiais concluídos hoje
 * @property {string|null} lastValidatedDate  - Data local da última validação real
 * @property {'idle'|'in_progress'|'partial'|'clean'|'debt'|'reinforcement_pending'} todayState - Estado operacional do dia
 * @property {number} todayProgressPercent    - Percentual do progresso oficial do dia
 * @property {string} lastActiveAt            - ISO timestamp da última atividade
 */

/**
 * @typedef {'idle' | 'in_progress' | 'partial' | 'clean' | 'debt' | 'reinforcement_pending'} TodayState
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
 * @property {number}       pendingMissionItems - Quantidade operacional de pendências oficiais
 * @property {number}       reinforcementPendingCount - Quantidade de reforços ainda em aberto
 * @property {string|null}  lastDebtUpdateAt - Última atualização do estado de dívida
 */

/**
 * @typedef {Object} EventFeedback
 * @property {MissionEventType} eventType
 * @property {string} messageKey
 * @property {ValidationFeedbackTone} tone
 * @property {string} visualState
 */

/**
 * @typedef {Object} OfficialProgressSummary
 * @property {number} officialCompletedToday
 * @property {number} totalOfficialToday
 * @property {number} validationsToday
 * @property {number} accumulatedDebtCount
 * @property {number} reinforcementPendingCount
 * @property {TodayState} todayState
 */

/**
 * @typedef {Object} MissionInteractionResult
 * @property {import('./types').AnswerAttempt | null} attempt
 * @property {number} xpGranted
 * @property {boolean} countedAsRealValidation
 * @property {boolean} shouldCompleteItem
 * @property {boolean} needsReinforcement
 * @property {MissionEventType} eventType
 * @property {ValidationFeedbackTone} tone
 * @property {string} feedbackKey
 * @property {MissionValidationStatus | null} validationStatus
 * @property {TodayState|null} todayState
 * @property {string|null} streakImpact
 * @property {string|null} backlogImpact
 * @property {string} visualState
 */

/**
 * @typedef {Object} ValidationResolution
 * @property {import('./types').AnswerAttempt} attempt
 * @property {import('./types').MissionItem} missionItemPatch
 * @property {import('./types').StreakState} streakState
 * @property {import('./types').BacklogState} backlogState
 * @property {OfficialProgressSummary} officialProgressSummary
 * @property {{sourceType: string, sourceId: string}[]} bonusTriggers
 * @property {MissionInteractionResult} feedback
 */

/**
 * @typedef {Object} DayStateSummary
 * @property {TodayState} todayState
 * @property {number} validationsToday
 * @property {number} officialCompletedToday
 * @property {number} totalOfficialToday
 * @property {number} reinforcementPendingCount
 * @property {number} accumulatedDebtCount
 * @property {number} percent
 */

/**
 * @typedef {'validation' | 'streak_bonus' | 'level_bonus' | 'clean_day_bonus' | 'daily_complete_bonus' | 'backlog_clear_bonus' | 'manual'} XpSourceType
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
