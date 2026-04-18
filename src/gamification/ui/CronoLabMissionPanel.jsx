import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../../components/ProgressBar.jsx';
import { useMissionEngine } from '../runtime/useMissionEngine.js';
import { useProgressStore } from '../stores/ProgressStoreContext.jsx';
import MissionItemCard from './MissionItemCard.jsx';
import FeedbackToast from './FeedbackToast.jsx';

const STATUS_META = {
  completed: {
    label: 'Missão limpa',
    badge: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200',
    helper: 'Tudo que era oficial para hoje foi resolvido.',
  },
  in_progress: {
    label: 'Em curso',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200',
    helper: 'A missão está reagindo ao que você conclui na trilha oficial.',
  },
  pending: {
    label: 'Aguardando ação',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-200',
    helper: 'Comece pela ação principal para avançar sem bagunçar a trilha.',
  },
  failed: {
    label: 'Sem missão oficial',
    badge: 'border-white/10 bg-white/5 text-white/60',
    helper: 'Hoje não há camada oficial aberta nesta disciplina piloto.',
  },
};

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-base font-semibold tracking-tight text-white lg:text-lg">
        {title}
      </h3>
      {subtitle ? <p className="mt-1 text-xs leading-relaxed text-zinc-500">{subtitle}</p> : null}
    </div>
  );
}

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

  const primaryItem = useMemo(
    () => todayItems.find((item) => item.missionRole === 'primary') ?? null,
    [todayItems],
  );
  const pendingItems = useMemo(
    () => todayItems.filter((item) => item.missionRole === 'pending'),
    [todayItems],
  );
  const reinforcementItems = useMemo(
    () => todayItems.filter((item) => item.missionRole === 'reinforcement'),
    [todayItems],
  );

  const statusMeta = STATUS_META[todayMission?.summaryStatus] ?? STATUS_META.pending;
  const missionPercent = todayMission?.missionProgressPercent ?? todayProgress?.percent ?? 0;
  const completedOfficialCount = todayMission?.completedMissionItems?.length ?? todayItems.filter((item) => item.isOfficial && item.isValidated).length;
  const officialCount = todayMission?.officialMissionItems?.length ?? todayItems.filter((item) => item.isOfficial).length;
  const partialCount = todayItems.filter((item) => item.validationStatus === 'validated_partial').length;
  const wrongCount = todayItems.filter((item) => item.validationStatus === 'validated_wrong').length;
  const revealOnlyCount = todayItems.filter((item) => item.validationStatus === 'revealed_without_attempt').length;

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Missão do Dia
            </p>
            <h2 className="font-display text-xl font-bold tracking-tight text-white lg:text-2xl">
              O que fazer hoje para avançar sem bagunçar a trilha
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {statusMeta.helper}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${statusMeta.badge}`}>
              {statusMeta.label}
            </span>
            <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-xl shadow-inner sm:flex">
              🎯
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 animate-in fade-in duration-500">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Progresso oficial</p>
            <p className="mt-2 text-2xl font-black text-white">{missionPercent}%</p>
            <p className="mt-1 text-[11px] text-zinc-500">{completedOfficialCount}/{officialCount} itens oficiais concluídos</p>
            <ProgressBar value={missionPercent} color="blue" className="mt-3" />
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300">Ação principal</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{primaryItem?.layerTitle ?? primaryItem?.contentItemId ?? 'Sem ação principal aberta'}</p>
            <p className="mt-1 text-[11px] text-zinc-500">{primaryItem?.reason ?? 'Se houver nova recomendação oficial, ela aparece aqui.'}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Camadas secundárias</p>
            <p className="mt-2 text-2xl font-black text-white">{pendingItems.length + reinforcementItems.length}</p>
            <p className="mt-1 text-[11px] text-zinc-500">{pendingItems.length} pendência(s) • {reinforcementItems.length} reforço(s)</p>
            <p className="mt-2 text-[11px] text-zinc-500">{partialCount} parcial • {wrongCount} erro • {revealOnlyCount} revelado sem tentar</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4 lg:px-6 lg:py-6">
        {feedback ? <FeedbackToast feedback={feedback} onClose={() => setFeedback(null)} /> : null}

        {loadingState === 'empty' || todayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] py-16 text-center">
            <span className="mb-4 text-3xl opacity-50">📭</span>
            <p className="text-sm font-medium text-zinc-300">Nenhuma missão oficial aberta para hoje.</p>
            <p className="mt-1 text-xs text-zinc-500">Quando a trilha oficial apontar uma nova camada, ela nasce aqui.</p>
          </div>
        ) : (
          <>
            {primaryItem ? (
              <div className="rounded-[28px] border border-fuchsia-400/18 bg-fuchsia-500/[0.07] p-4 shadow-[0_0_18px_rgba(217,70,239,0.08)] animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionHeader
                  eyebrow="Ação principal"
                  title={primaryItem.layerTitle ?? contentMap[primaryItem.contentItemId]?.title ?? 'Missão principal'}
                  subtitle={primaryItem.reason}
                />
              </div>
            ) : null}

            {pendingItems.length > 0 ? (
              <div className="space-y-3 rounded-2xl border border-amber-400/12 bg-amber-500/[0.04] p-4 animate-in fade-in duration-500">
                <SectionHeader
                  eyebrow="Pendências"
                  title="Custos visíveis da trilha oficial"
                  subtitle="Entram abaixo da ação principal e não roubam o foco do que foi recomendado agora."
                />
                <div className="space-y-3">
                  {pendingItems.map((item) => (
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
              </div>
            ) : null}

            {reinforcementItems.length > 0 ? (
              <div className="space-y-3 rounded-2xl border border-cyan-400/12 bg-cyan-500/[0.04] p-4 animate-in fade-in duration-500">
                <SectionHeader
                  eyebrow="Reforço"
                  title="Complementos do dia"
                  subtitle="Aparecem como camada auxiliar e nunca tomam o lugar da ação principal."
                />
                <div className="space-y-3">
                  {reinforcementItems.map((item) => (
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
              </div>
            ) : null}

            <div className="space-y-3">
              <SectionHeader
                eyebrow="Operação do dia"
                title="Fila completa da missão"
                subtitle="A execução reage sozinha quando uma camada oficial é validada."
              />
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
          </>
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
