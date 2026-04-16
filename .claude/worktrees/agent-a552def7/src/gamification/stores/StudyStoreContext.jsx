/**
 * @fileoverview Store — Study Store (Context API)
 *
 * Responsabilidade: conteúdo + missão do dia + itens da missão.
 *
 * Estados gerenciados:
 * - missions[]         — lista de DailyMissions (histórico + hoje)
 * - missionItems[]     — lista de MissionItems (histórico + hoje)
 * - loadingState       — 'idle' | 'loading' | 'ready' | 'error' | 'empty'
 *
 * @backend-ready: Trocar loadTodayMission() por chamada REST.
 * O restante da lógica permanece igual.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CONTENT_ITEMS } from '../content/contentItems.js';
import { getMockTodayMission, getAvailableContentForMission, getLocalDateString } from '../plan/dailyMissions.js';
import { generateMissionItems } from '../plan/missionItems.js';
import {
  readTodayMission, writeTodayMission,
  readMissionItems, writeMissionItems,
} from '../persistence.js';

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const StudyStoreContext = createContext(null);

// ─── INITIAL STATE ───────────────────────────────────────────────────────────

/** @returns {{ missions: [], missionItems: [], loadingState: string }} */
function getInitialState() {
  return {
    missions: [],
    missionItems: [],
    loadingState: 'idle', // 'idle' | 'loading' | 'ready' | 'error' | 'empty'
  };
}

// ─── PROVIDER ────────────────────────────────────────────────────────────────

/**
 * @param {{ userId: string | null, children: React.ReactNode }} props
 */
export function StudyStoreProvider({ userId, children }) {
  const [state, setState] = useState(getInitialState);
  const initializedRef = useRef(false);

  const loadTodayMission = useCallback(async (uid) => {
    if (!uid) return;

    setState((prev) => ({ ...prev, loadingState: 'loading' }));

    try {
      // 1. Tenta recuperar do localStorage
      const cachedMission = readTodayMission();
      const cachedItems = readMissionItems();
      const today = getLocalDateString();

      // Cache válido = missão de hoje já existe
      if (cachedMission && cachedMission.date === today && cachedItems.length > 0) {
        setState({
          missions: [cachedMission],
          missionItems: cachedItems,
          loadingState: cachedItems.length > 0 ? 'ready' : 'empty',
        });
        return;
      }

      // 2. Gera nova missão do dia
      // @backend-ready: substituir por api.get('/missions/today')
      const mission = getMockTodayMission(uid);
      const availableContent = getAvailableContentForMission();

      if (availableContent.length === 0) {
        setState({ missions: [mission], missionItems: [], loadingState: 'empty' });
        return;
      }

      const items = generateMissionItems(mission, availableContent, []);

      // 3. Persiste
      writeTodayMission(mission);
      writeMissionItems(items);

      setState({
        missions: [mission],
        missionItems: items,
        loadingState: items.length > 0 ? 'ready' : 'empty',
      });
    } catch (err) {
      console.error('[StudyStore] Erro ao carregar missão do dia:', err);
      setState((prev) => ({ ...prev, loadingState: 'error' }));
    }
  }, []);

  // Inicializa quando userId estiver disponível
  useEffect(() => {
    if (!userId || initializedRef.current) return;
    initializedRef.current = true;
    loadTodayMission(userId);
  }, [userId, loadTodayMission]);

  /**
   * Atualiza o status de um MissionItem (ex: após uma tentativa).
   * @param {string} itemId
   * @param {Partial<import('../types').MissionItem>} patch
   */
  const patchMissionItem = useCallback((itemId, patch) => {
    setState((prev) => {
      const updated = prev.missionItems.map((item) =>
        item.id === itemId ? { ...item, ...patch } : item,
      );
      writeMissionItems(updated);
      return { ...prev, missionItems: updated };
    });
  }, []);

  /**
   * Recarrega a missão do dia (ex: após meia-noite).
   */
  const refreshMission = useCallback(() => {
    initializedRef.current = false;
    if (userId) {
      initializedRef.current = true;
      loadTodayMission(userId);
    }
  }, [userId, loadTodayMission]);

  const value = useMemo(
    () => ({
      missions: state.missions,
      missionItems: state.missionItems,
      loadingState: state.loadingState,
      contentItems: CONTENT_ITEMS,
      patchMissionItem,
      refreshMission,
    }),
    [state, patchMissionItem, refreshMission],
  );

  return (
    <StudyStoreContext.Provider value={value}>
      {children}
    </StudyStoreContext.Provider>
  );
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

/**
 * Hook para consumir o StudyStore.
 * @returns {ReturnType<typeof useMemo>}
 */
export function useStudyStore() {
  const ctx = useContext(StudyStoreContext);
  if (!ctx) {
    throw new Error('[useStudyStore] Deve ser usado dentro de <StudyStoreProvider>.');
  }
  return ctx;
}
