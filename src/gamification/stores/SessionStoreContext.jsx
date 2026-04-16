/* eslint-disable react-refresh/only-export-components, react-hooks/purity */
/**
 * @fileoverview Store — Session Store (Context API)
 *
 * Responsabilidade: estado temporário de execução (uma sessão de estudo).
 * O SessionStore é volátil — não é persistido entre recarregamentos.
 *
 * Estados gerenciados:
 * - currentItemId     — ID do MissionItem em execução agora
 * - revealState       — 'hidden' | 'revealed'
 * - sessionStartedAt  — timestamp de quando o item atual foi aberto
 * - cooldownUntil     — timestamp anti-exploit (bloqueia nova tentativa)
 * - sessionAttempts[] — tentativas desta sessão (em memória)
 *
 * FÍSICA DO CRONO:
 * - Revelar sem tentar → revealState: 'revealed' + answeredBeforeReveal: false
 * - Anti-exploit: cooldownUntil bloqueia submit rápido
 * - sessionAttempts serve para feedback imediato da UI
 *
 * @backend-ready: Nada deste store precisa de backend — é 100% client-side.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  createAttempt,
  isRealValidation,
  MIN_THINK_MS,
} from '../execution/answerAttempts.js';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

/** Cooldown mínimo em ms após um submit antes de permitir outra tentativa */
const SUBMIT_COOLDOWN_MS = 1500;

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const SessionStoreContext = createContext(null);

// ─── PROVIDER ────────────────────────────────────────────────────────────────

/**
 * @param {{ children: React.ReactNode }} props
 */
export function SessionStoreProvider({ children }) {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [revealState, setRevealState] = useState('hidden'); // 'hidden' | 'revealed'
  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState([]);

  // ── COMPUTED ──────────────────────────────────────────────────────────────

  const isCoolingDown = useMemo(() => Date.now() < cooldownUntil, [cooldownUntil]);

  // ── ACTIONS ───────────────────────────────────────────────────────────────

  /**
   * Abre um item para o aluno interagir.
   * Reseta o estado da sessão para o item.
   * @param {string} missionItemId
   */
  const startItem = useCallback((missionItemId) => {
    setCurrentItemId(missionItemId);
    setRevealState('hidden');
    setSessionStartedAt(Date.now());
    setCooldownUntil(0);
    setSessionAttempts([]);
  }, []);

  /**
   * Revela o conteúdo sem o aluno ter tentado.
   * Marca como revealed_only — não conta como progresso.
   */
  const revealWithoutAttempt = useCallback(() => {
    setRevealState('revealed');
  }, []);

  /**
   * Submete uma tentativa com autoavaliação.
   * Retorna o AnswerAttempt criado para o chamador persistir.
   *
   * @param {object} params
   * @param {string} params.contentItemId
   * @param {import('../types').AttemptType} params.attemptType
   * @param {import('../types').ValidationKind} [params.validationKind]
   * @param {import('../types').SelfAssessment} params.selfAssessment
   * @param {import('../types').ValidationResultTier} [params.resultTier]
   * @param {string} [params.feedbackKey]
   * @param {boolean} [params.answeredBeforeReveal] - Padrão: revealState === 'hidden'
   * @returns {import('../types').AnswerAttempt | null}
   */
  const submitAttempt = useCallback(
    ({ contentItemId, attemptType, validationKind, selfAssessment, resultTier, feedbackKey, answeredBeforeReveal }) => {
      if (!currentItemId) return null;
      if (isCoolingDown) return null;

      const isBeforeReveal =
        answeredBeforeReveal !== undefined
          ? answeredBeforeReveal
          : revealState === 'hidden';

      const thinkTimeMs = sessionStartedAt ? Date.now() - sessionStartedAt : 0;

      const attempt = createAttempt({
        missionItemId: currentItemId,
        contentItemId,
        attemptType,
        validationKind,
        answeredBeforeReveal: isBeforeReveal,
        selfAssessment,
        thinkTimeMs,
        resultTier,
        feedbackKey,
      });

      // Revela após a tentativa
      setRevealState('revealed');

      // Aplica cooldown anti-exploit
      setCooldownUntil(Date.now() + SUBMIT_COOLDOWN_MS);

      // Acumula tentativas da sessão
      setSessionAttempts((prev) => [...prev, attempt]);

      return attempt;
    },
    [currentItemId, revealState, sessionStartedAt, isCoolingDown],
  );

  /**
   * Avança para o próximo item (limpa o estado do atual).
   */
  const advanceItem = useCallback(() => {
    setCurrentItemId(null);
    setRevealState('hidden');
    setSessionStartedAt(null);
    setCooldownUntil(0);
  }, []);

  /**
   * Limpa toda a sessão (ex: ao sair da missão).
   */
  const clearSession = useCallback(() => {
    setCurrentItemId(null);
    setRevealState('hidden');
    setSessionStartedAt(null);
    setCooldownUntil(0);
    setSessionAttempts([]);
  }, []);

  // ── DERIVED ───────────────────────────────────────────────────────────────

  const lastAttempt = sessionAttempts[sessionAttempts.length - 1] ?? null;
  const lastAttemptIsValid = lastAttempt ? isRealValidation(lastAttempt) : null;

  const value = useMemo(
    () => ({
      // State
      currentItemId,
      revealState,
      isCoolingDown,
      sessionAttempts,
      lastAttempt,
      lastAttemptIsValid,
      // Timing
      MIN_THINK_MS,
      SUBMIT_COOLDOWN_MS,
      // Actions
      startItem,
      revealWithoutAttempt,
      submitAttempt,
      advanceItem,
      clearSession,
    }),
    [
      currentItemId,
      revealState,
      isCoolingDown,
      sessionAttempts,
      lastAttempt,
      lastAttemptIsValid,
      startItem,
      revealWithoutAttempt,
      submitAttempt,
      advanceItem,
      clearSession,
    ],
  );

  return (
    <SessionStoreContext.Provider value={value}>
      {children}
    </SessionStoreContext.Provider>
  );
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

export function useSessionStore() {
  const ctx = useContext(SessionStoreContext);
  if (!ctx) {
    throw new Error('[useSessionStore] Deve ser usado dentro de <SessionStoreProvider>.');
  }
  return ctx;
}
