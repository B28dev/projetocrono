import { useEffect, useMemo, useState } from 'react';
import { useMissionEngine } from '../runtime/useMissionEngine.js';
import { useProgressStore } from '../stores/ProgressStoreContext.jsx';
import MissionItemCard from './MissionItemCard.jsx';
import FeedbackToast from './FeedbackToast.jsx';

export default function CronoLabMissionPanel({ todayMission, todayItems, contentItems, loadingState }) {
  const {
    activeMissionItem,
    activeContentItem,
    isCoolingDown,
    revealState,
    openMissionItem,
    revealCurrentItem,
    resolveAttempt,
    closeMissionItem,
  } = useMissionEngine();
  const {
    todayProgress,
    isCleanDayNow,
    backlogState,
    grantBonus,
  } = useProgressStore();
  const [feedback, setFeedback] = useState(null);

  const contentMap = useMemo(
    () => Object.fromEntries(contentItems.map((item) => [item.id, item])),
    [contentItems],
  );

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  useEffect(() => {
    if (!todayMission) return;
    if (todayProgress?.percent === 100) {
      grantBonus('daily_complete_bonus', todayMission.id);
    }
  }, [grantBonus, todayMission, todayProgress?.percent]);

  useEffect(() => {
    if (!todayMission) return;
    if (isCleanDayNow) {
      grantBonus('clean_day_bonus', todayMission.id);
    }
  }, [grantBonus, isCleanDayNow, todayMission]);

  useEffect(() => {
    if (!todayMission) return;
    if ((backlogState?.totalDebtItems ?? 0) === 0 && todayProgress?.validationsToday > 0) {
      grantBonus('backlog_clear_bonus', todayMission.id);
    }
  }, [backlogState?.totalDebtItems, grantBonus, todayMission, todayProgress?.validationsToday]);

  const handleAnswer = (payload) => {
    const result = resolveAttempt(payload);
    if (!result) return;
    setFeedback(result);
  };

  return (
    <div className="lab-card flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 backdrop-blur-xl shadow-xl">
      <div className="border-b border-white/[0.04] px-6 py-5 lg:px-8 lg:py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Missão do Dia
            </p>
            <h2 className="font-display text-xl font-bold tracking-tight text-white lg:text-2xl">
              Campo de batalha de hoje
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {todayMission?.targetValidations ?? 0} validações reais • {todayMission?.targetBlocks ?? 0} blocos programados
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-xl shadow-inner sm:flex">
            🎯
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4 lg:px-6 lg:py-6">
        {feedback ? <FeedbackToast feedback={feedback} onClose={() => setFeedback(null)} /> : null}

        {loadingState === 'empty' || todayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] py-16 text-center">
            <span className="mb-4 text-3xl opacity-50">📭</span>
            <p className="text-sm font-medium text-zinc-300">Nenhum conteúdo listado para hoje.</p>
            <p className="mt-1 text-xs text-zinc-500">Seu espaçamento e backlog estão zerados na agenda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayItems.map((item) => (
              <MissionItemCard
                key={item.id}
                item={item}
                content={contentMap[item.contentItemId]}
                isActive={activeMissionItem?.id === item.id}
                isRevealed={activeMissionItem?.id === item.id && revealState === 'revealed'}
                isCoolingDown={activeMissionItem?.id === item.id && isCoolingDown}
                onOpen={() => openMissionItem(item)}
                onReveal={revealCurrentItem}
                onAnswer={handleAnswer}
                onClose={closeMissionItem}
              />
            ))}
          </div>
        )}

        {activeMissionItem && activeContentItem ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-400 dark:border-stone-300 dark:bg-stone-100/80 dark:text-stone-600">
            {isCoolingDown
              ? 'Cooldown ativo. Sem pressa: chute não entra no sistema.'
              : 'Operação ativa. Execute primeiro, avalie depois.'}
          </div>
        ) : null}
      </div>
    </div>
  );
}
