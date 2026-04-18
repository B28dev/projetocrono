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
import { getLocalDateString } from '../plan/dailyMissions.js';
import { generateMissionItemsFromOfficialMission } from '../plan/missionItems.js';
import {
  ALGORITHM_PILOT_PROGRESS_EVENT,
  generateDailyMission,
  getAlgorithmMissionContentItems,
  getMissionProgress,
  getMissionSummaryStatus,
  readAlgorithmPilotProgress,
} from '../pilots/algorithmPilot.js';
import {
  readTodayMission, writeTodayMission,
  readMissionItems, writeMissionItems,
} from '../persistence.js';

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const StudyStoreContext = createContext(null);

// ─── INITIAL STATE ───────────────────────────────────────────────────────────

/** @returns {{ missions: [], missionItems: [], loadingState: string, contentItems: [] }} */
function getInitialState() {
  return {
    missions: [],
    missionItems: [],
    loadingState: 'idle', // 'idle' | 'loading' | 'ready' | 'error' | 'empty'
    contentItems: [],
  };
}

// ─── PROVIDER ────────────────────────────────────────────────────────────────

/**
 * @param {{ userId: string | null, children: React.ReactNode }} props
 */
export function StudyStoreProvider({ userId, children }) {
  const [state, setState] = useState(getInitialState);
  const initializedRef = useRef(false);

  const buildTodayMissionState = useCallback((previousItems = []) => {
    const progressSnapshot = readAlgorithmPilotProgress();
    const baseMission = generateDailyMission(progressSnapshot);
    const contentItems = getAlgorithmMissionContentItems(progressSnapshot);
    const mission = {
      ...baseMission,
      date: getLocalDateString(),
      targetValidations: baseMission.officialMissionItems?.length ?? 0,
      targetBlocks: Math.max(1, Math.min(2, (baseMission.pendingActions?.length ?? 0) + (baseMission.primaryAction ? 1 : 0))),
      summaryStatus: getMissionSummaryStatus(progressSnapshot),
      missionProgressPercent: getMissionProgress(progressSnapshot).percent,
    };
    const missionItems = generateMissionItemsFromOfficialMission(mission, contentItems, previousItems);

    return {
      mission,
      missionItems,
      contentItems,
    };
  }, []);

  const loadTodayMission = useCallback(async (uid) => {
    if (!uid) return;

    setState((prev) => ({ ...prev, loadingState: 'loading' }));

    try {
      const cachedMission = readTodayMission();
      const cachedItems = readMissionItems();
      const today = getLocalDateString();
      const previousItems = cachedMission && cachedMission.date === today ? cachedItems : [];
      const { mission, missionItems, contentItems } = buildTodayMissionState(previousItems);

      writeTodayMission(mission);
      writeMissionItems(missionItems);

      setState({
        missions: [mission],
        missionItems,
        contentItems,
        loadingState: missionItems.length > 0 ? 'ready' : 'empty',
      });
    } catch (err) {
      console.error('[StudyStore] Erro ao carregar missão do dia:', err);
      setState((prev) => ({ ...prev, loadingState: 'error' }));
    }
  }, [buildTodayMissionState]);

  const syncMissionFromPilot = useCallback(() => {
    setState((prev) => {
      try {
        const previousItems = prev.missionItems ?? [];
        const { mission, missionItems, contentItems } = buildTodayMissionState(previousItems);
        writeTodayMission(mission);
        writeMissionItems(missionItems);
        return {
          missions: [mission],
          missionItems,
          contentItems,
          loadingState: missionItems.length > 0 ? 'ready' : 'empty',
        };
      } catch (err) {
        console.error('[StudyStore] Erro ao sincronizar missão com piloto:', err);
        return { ...prev, loadingState: 'error' };
      }
    });
  }, [buildTodayMissionState]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handlePilotProgressChange = () => {
      syncMissionFromPilot();
    };
    window.addEventListener(ALGORITHM_PILOT_PROGRESS_EVENT, handlePilotProgressChange);
    return () => window.removeEventListener(ALGORITHM_PILOT_PROGRESS_EVENT, handlePilotProgressChange);
  }, [syncMissionFromPilot]);

  useEffect(() => {
    if (!userId) {
      initializedRef.current = false;
      setState(getInitialState());
    }
  }, [userId]);

  const contentItems = state.contentItems;

  useEffect(() => {
    if (!contentItems.length || state.missionItems.length === 0) return;
    const hasMissingContent = state.missionItems.some(
      (item) => !contentItems.find((contentItem) => contentItem.id === item.contentItemId),
    );
    if (hasMissingContent) {
      syncMissionFromPilot();
    }
  }, [contentItems, state.missionItems, syncMissionFromPilot]);

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
      contentItems: state.contentItems,
      patchMissionItem,
      refreshMission,
      syncMissionFromPilot,
    }),
    [state, patchMissionItem, refreshMission, syncMissionFromPilot],
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
