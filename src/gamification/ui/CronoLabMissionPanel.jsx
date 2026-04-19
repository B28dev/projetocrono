import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../../components/ProgressBar.jsx';
import { getSubjectById } from '../content/subjects.js';
import { useMissionEngine } from '../runtime/useMissionEngine.js';
import { useProgressStore } from '../stores/ProgressStoreContext.jsx';
import MissionItemCard from './MissionItemCard.jsx';
import FeedbackToast from './FeedbackToast.jsx';

const STATUS_META = {
  completed: {
    label: 'Missão limpa',
    badge: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100',
    helper: 'Tudo que importava hoje já foi fechado.',
  },
  in_progress: {
    label: 'Em curso',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100',
    helper: 'A trilha já está em movimento.',
  },
  pending: {
    label: 'Aguardando ação',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100',
    helper: 'Comece pela primeira frente do dia.',
  },
  failed: {
    label: 'Sem missão oficial',
    badge: 'border-white/10 bg-white/[0.04] text-zinc-300',
    helper: 'Hoje não há frente oficial aberta.',
  },
};

const PRIORITY_META = {
  now: {
    label: 'agora',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100',
  },
  today: {
    label: 'hoje',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100',
  },
  review: {
    label: 'revisão',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100',
  },
  done: {
    label: 'feito',
    badge: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100',
  },
};

const ROLE_LABEL = {
  primary: 'principal',
  pending: 'sugerida',
  reinforcement: 'relacionado',
};

const MOTHER_SUBJECT_LABELS = {
  'ms-vetores': 'Vetores',
  'ms-matrizes': 'Matrizes',
  'ms-revisao-simulado': 'Consolidação e Simulado',
};

function formatLabel(value) {
  if (!value) return 'Missão';

  const subject = getSubjectById(value);
  if (subject?.title) return subject.title;
  if (MOTHER_SUBJECT_LABELS[value]) return MOTHER_SUBJECT_LABELS[value];

  return value
    .replace(/^ms-/, '')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sortMissionItems(items) {
  return [...items].sort((a, b) => {
    const priorityA = a.priority ?? a.order ?? Number.MAX_SAFE_INTEGER;
    const priorityB = b.priority ?? b.order ?? Number.MAX_SAFE_INTEGER;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

function getMissionItemTitle(item, contentMap) {
  return contentMap[item.contentItemId]?.title ?? item.layerTitle ?? item.contentItemId;
}

function getDisciplineTitle(items, useMotherSubjectBuckets) {
  const [firstItem] = items;
  if (!firstItem) return 'Missão';
  return formatLabel(
    useMotherSubjectBuckets
      ? (firstItem.motherSubjectId ?? firstItem.sourceDisciplineId)
      : (firstItem.sourceDisciplineId ?? firstItem.motherSubjectId),
  );
}

function getBucketStatusLine(bucket) {
  if (bucket.primaryItem && bucket.primaryItem.status !== 'completed') {
    return bucket.primaryItem.reason ?? 'Esta é a frente que move o dia agora.';
  }
  if (bucket.officialRemainingCount > 0) {
    return `${bucket.officialRemainingCount} item(ns) oficial(is) ainda pedem validação.`;
  }
  if (bucket.relatedItems.length > 0) {
    return 'Restou apenas revisão complementar.';
  }
  return 'Frente limpa por hoje.';
}

function getBucketReviewCue(bucket) {
  const errorItem = bucket.items.find((item) => ['validated_partial', 'validated_wrong'].includes(item.validationStatus));
  if (errorItem?.reason) return errorItem.reason;
  if (bucket.relatedItems[0]?.reason) return bucket.relatedItems[0].reason;
  return null;
}

function getBucketPriorityTone(bucket) {
  if (bucket.primaryItem && bucket.primaryItem.status !== 'completed') return PRIORITY_META.now;
  if (bucket.officialRemainingCount > 0) return PRIORITY_META.today;
  if (bucket.relatedItems.length > 0) return PRIORITY_META.review;
  return PRIORITY_META.done;
}

function buildDisciplineBuckets(todayItems) {
  const sourceDisciplineIds = new Set(todayItems.map((item) => item.sourceDisciplineId).filter(Boolean));
  const motherSubjectIds = new Set(todayItems.map((item) => item.motherSubjectId).filter(Boolean));
  const useMotherSubjectBuckets = sourceDisciplineIds.size <= 1 && motherSubjectIds.size > 1;
  const grouped = new Map();

  for (const item of sortMissionItems(todayItems)) {
    const key = useMotherSubjectBuckets && item.motherSubjectId
      ? item.motherSubjectId
      : item.sourceDisciplineId ?? item.motherSubjectId ?? 'mission-hub';

    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }

  return [...grouped.entries()]
    .map(([key, items]) => {
      const itemIds = new Set();
      const suggestedItems = [];
      const relatedItems = [];
      let primaryItem = null;
      let completedOfficialCount = 0;
      let officialRemainingCount = 0;
      let totalOfficialCount = 0;
      let nextActionItem = null;

      for (const item of items) {
        itemIds.add(item.id);

        if (!primaryItem && item.missionRole === 'primary') {
          primaryItem = item;
        }

        if (item.isOfficial) {
          totalOfficialCount += 1;
          if (item.status === 'completed') {
            completedOfficialCount += 1;
          } else {
            officialRemainingCount += 1;
          }
          if (suggestedItems.length < 5) {
            suggestedItems.push(item);
          }
        }

        if ((!item.isOfficial || item.missionRole === 'reinforcement') && relatedItems.length < 2) {
          relatedItems.push(item);
        }

        if (!nextActionItem && item.status !== 'completed') {
          nextActionItem = item;
        }
      }

      const resolvedNextActionItem = primaryItem
        ?? nextActionItem
        ?? items[0]
        ?? null;
      const progressPercent = totalOfficialCount > 0
        ? Math.round((completedOfficialCount / totalOfficialCount) * 100)
        : 100;

      const bucket = {
        id: key,
        title: getDisciplineTitle(items, useMotherSubjectBuckets),
        items,
        itemIds,
        primaryItem,
        suggestedItems,
        relatedItems,
        nextActionItem: resolvedNextActionItem,
        completedOfficialCount,
        officialRemainingCount,
        totalOfficialCount,
        progressPercent,
      };

      return {
        ...bucket,
        previewCountLabel: `${suggestedItems.length} questão${suggestedItems.length === 1 ? '' : 'ões'} · ${relatedItems.length} conteúdo${relatedItems.length === 1 ? '' : 's'}`,
        statusLine: getBucketStatusLine(bucket),
        reviewCue: getBucketReviewCue(bucket),
        priorityTone: getBucketPriorityTone(bucket),
      };
    })
    .sort((a, b) => {
      const rankA = a.nextActionItem?.priority ?? a.nextActionItem?.order ?? Number.MAX_SAFE_INTEGER;
      const rankB = b.nextActionItem?.priority ?? b.nextActionItem?.order ?? Number.MAX_SAFE_INTEGER;
      if (rankA !== rankB) return rankA - rankB;
      return a.title.localeCompare(b.title, 'pt-BR');
    });
}

function MissionPreviewButton({ item, content, index, onOpen }) {
  const tone = item.missionRole === 'primary'
    ? 'border-fuchsia-400/20 bg-fuchsia-500/[0.08] text-fuchsia-100'
    : item.status === 'completed'
      ? 'border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-100'
      : 'border-white/10 bg-white/[0.03] text-zinc-100';

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 hover:border-white/16 hover:bg-white/[0.05] ${tone}`}
    >
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-mono font-bold text-zinc-200">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-relaxed text-white">
          {content?.title ?? item.layerTitle ?? item.contentItemId}
        </span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-zinc-300">
          {ROLE_LABEL[item.missionRole] ?? 'missão'}
        </span>
      </span>
    </button>
  );
}

function DisciplineCard({
  bucket,
  index,
  isOpen,
  activeMissionItem,
  revealState,
  isCoolingDown,
  contentMap,
  onToggle,
  onOpenMissionItem,
  onAnswer,
  onReveal,
  onClose,
}) {
  const activeItem = activeMissionItem && bucket.itemIds.has(activeMissionItem.id)
    ? activeMissionItem
    : null;
  const activeContent = activeItem ? contentMap[activeItem.contentItemId] : null;
  const cardTone = index === 0
    ? 'border-fuchsia-400/20 bg-[linear-gradient(180deg,rgba(17,12,27,0.88),rgba(11,11,19,0.8))] shadow-[0_0_34px_rgba(217,70,239,0.06)]'
    : 'border-white/[0.09] bg-[rgba(13,13,20,0.72)]';

  return (
    <div className={`overflow-hidden rounded-[30px] border backdrop-blur-xl transition-all duration-300 ${cardTone}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left lg:px-6"
        aria-expanded={isOpen}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${bucket.priorityTone.badge}`}>
              {bucket.priorityTone.label}
            </span>
            {index === 0 ? (
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-200">
                primeira frente
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white lg:text-[22px]">
            {bucket.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-200">
            {bucket.statusLine}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[rgba(192,199,227,0.82)]">
            <span>{bucket.previewCountLabel}</span>
            <span>{bucket.completedOfficialCount}/{bucket.totalOfficialCount} oficial</span>
          </div>

          <div className="mt-3 max-w-md">
            <ProgressBar value={bucket.progressPercent} color={index === 0 ? 'rose' : 'blue'} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 pt-0.5">
          {bucket.nextActionItem ? (
            <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-200 sm:inline-flex">
              {bucket.nextActionItem.status === 'completed' ? 'concluído' : 'abrir missão'}
            </span>
          ) : null}
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-zinc-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-white/[0.08] px-5 py-5 lg:px-6 lg:py-6 animate-in fade-in duration-300">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
            <div className="space-y-4">
              <div className="rounded-[26px] border border-white/[0.11] bg-white/[0.035] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">
                      Próxima ação
                    </p>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-white">
                      {bucket.nextActionItem ? getMissionItemTitle(bucket.nextActionItem, contentMap) : 'Sem ação aberta'}
                    </p>
                    <p className="mt-1 text-sm text-[rgba(192,199,227,0.82)]">
                      {bucket.nextActionItem?.reason ?? 'Abra a frente mais útil e siga.'}
                    </p>
                  </div>
                  {bucket.nextActionItem ? (
                    <button
                      type="button"
                      onClick={() => onOpenMissionItem(bucket.nextActionItem)}
                      className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:border-cyan-300/30 hover:bg-cyan-500/14"
                    >
                      {bucket.nextActionItem.status === 'completed' ? 'reabrir foco' : 'abrir agora'}
                    </button>
                  ) : null}
                </div>
              </div>

              {bucket.suggestedItems.length > 0 ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
                      Questões sugeridas
                    </p>
                    <p className="mt-1 text-sm text-[rgba(192,199,227,0.82)]">
                      Só o essencial para avançar nesta frente.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {bucket.suggestedItems.map((item, itemIndex) => (
                      <MissionPreviewButton
                        key={item.id}
                        item={item}
                        content={contentMap[item.contentItemId]}
                        index={itemIndex}
                        onOpen={() => onOpenMissionItem(item)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {activeItem && activeContent ? (
                <MissionItemCard
                  item={activeItem}
                  content={activeContent}
                  isActive
                  isRevealed={revealState === 'revealed'}
                  isCoolingDown={isCoolingDown}
                  onOpen={() => onOpenMissionItem(activeItem)}
                  onReveal={onReveal}
                  onAnswer={onAnswer}
                  onClose={onClose}
                />
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="rounded-[26px] border border-white/[0.11] bg-white/[0.035] p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
                  Conteúdos relacionados
                </p>
                {bucket.relatedItems.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {bucket.relatedItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onOpenMissionItem(item)}
                        className="flex w-full items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors duration-200 hover:border-white/16 hover:bg-white/[0.05]"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-relaxed text-white">
                            {getMissionItemTitle(item, contentMap)}
                          </span>
                          <span className="mt-1 block text-xs text-zinc-300">
                            {item.reason ?? 'Conteúdo complementar do dia.'}
                          </span>
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-200">
                          abrir
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-[rgba(192,199,227,0.82)]">
                    Nada além do núcleo principal nesta frente.
                  </p>
                )}
              </div>

              {bucket.reviewCue ? (
                <div className="rounded-[26px] border border-amber-400/16 bg-amber-500/[0.05] p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200">
                    Cue de revisão
                  </p>
                  <p className="mt-2 text-sm text-amber-50/90">
                    {bucket.reviewCue}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CronoLabMissionPanel({
  todayMission,
  todayItems,
  contentItems,
  loadingState,
  embedded = false,
}) {
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
  const { todayProgress, userProgress } = useProgressStore();
  const [feedback, setFeedback] = useState(null);
  const [openBucketId, setOpenBucketId] = useState();

  const contentMap = useMemo(
    () => Object.fromEntries(contentItems.map((item) => [item.id, item])),
    [contentItems],
  );

  const disciplineBuckets = useMemo(
    () => buildDisciplineBuckets(todayItems),
    [todayItems],
  );

  const statusMeta = STATUS_META[todayMission?.summaryStatus] ?? STATUS_META.pending;
  const progressPercent = userProgress?.todayProgressPercent ?? todayMission?.missionProgressPercent ?? todayProgress?.percent ?? 0;
  const completedOfficialCount = todayMission?.completedMissionItems?.length ?? todayItems.filter((item) => item.isOfficial && item.status === 'completed').length;
  const officialCount = todayMission?.officialMissionItems?.length ?? todayItems.filter((item) => item.isOfficial).length;

  useEffect(() => {
    if (!disciplineBuckets.length) {
      setOpenBucketId(null);
      return;
    }

    if (activeMissionItem) {
      const activeBucket = disciplineBuckets.find((bucket) => bucket.itemIds.has(activeMissionItem.id));
      if (activeBucket && activeBucket.id !== openBucketId) {
        setOpenBucketId(activeBucket.id);
        return;
      }
    }

    if (openBucketId === undefined) {
      setOpenBucketId(disciplineBuckets[0].id);
      return;
    }

    if (openBucketId && !disciplineBuckets.some((bucket) => bucket.id === openBucketId)) {
      setOpenBucketId(disciplineBuckets[0].id);
    }
  }, [disciplineBuckets, activeMissionItem, openBucketId]);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const handleAnswer = (payload) => {
    const result = resolveAttempt(payload);
    if (!result) return;
    setFeedback(result);
  };

  return (
    <div className="lab-card flex-1 overflow-hidden rounded-[32px] border border-white/[0.09] bg-[rgba(11,11,18,0.76)] shadow-[0_18px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className={`border-b border-white/[0.07] ${embedded ? 'px-5 py-5 lg:px-6' : 'px-6 py-6 lg:px-8 lg:py-7'}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Missão diária
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white lg:text-[28px]">
              {embedded ? 'Launcher do dia' : 'Hub disciplinado do dia'}
            </h2>
            <p className="mt-2 text-sm text-[rgba(205,211,234,0.84)]">
              {statusMeta.helper}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${statusMeta.badge}`}>
              {statusMeta.label}
            </span>
            <span className="rounded-full border border-white/[0.11] bg-white/[0.045] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[rgba(205,211,234,0.84)]">
              {completedOfficialCount}/{officialCount} oficial
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
          <div>
            <div className="mb-2 flex items-center justify-between text-[11px] text-[rgba(192,199,227,0.82)]">
              <span>O que realmente move hoje</span>
              <span>{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} color="blue" />
          </div>
          <p className="text-sm text-[rgba(192,199,227,0.82)] lg:text-right">
            {disciplineBuckets.length} frente{disciplineBuckets.length === 1 ? '' : 's'} prioritária{disciplineBuckets.length === 1 ? '' : 's'} para abrir.
          </p>
        </div>
      </div>

      <div className={`space-y-4 ${embedded ? 'px-4 py-4 lg:px-5' : 'px-4 py-5 lg:px-6 lg:py-6'}`}>
        {feedback ? <FeedbackToast feedback={feedback} onClose={() => setFeedback(null)} /> : null}

        {loadingState === 'empty' || todayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
            <span className="mb-4 text-3xl opacity-50">📭</span>
            <p className="text-sm font-medium text-zinc-100">Nenhuma frente oficial aberta para hoje.</p>
            <p className="mt-1 text-xs text-zinc-400">Quando a trilha abrir algo novo, ele aparece aqui.</p>
          </div>
        ) : (
          disciplineBuckets.map((bucket, index) => (
            <DisciplineCard
              key={bucket.id}
              bucket={bucket}
              index={index}
              isOpen={openBucketId === bucket.id}
              activeMissionItem={activeMissionItem}
              revealState={revealState}
              isCoolingDown={activeMissionItem && bucket.itemIds.has(activeMissionItem.id) ? isCoolingDown : false}
              contentMap={contentMap}
              onToggle={() => setOpenBucketId((current) => (current === bucket.id ? null : bucket.id))}
              onOpenMissionItem={(item) => {
                setOpenBucketId(bucket.id);
                openMissionItem(item);
              }}
              onAnswer={handleAnswer}
              onReveal={revealCurrentItem}
              onClose={closeMissionItem}
            />
          ))
        )}

        {activeMissionItem && activeContentItem ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-300">
            {isCoolingDown ? 'Cooldown ativo. Sem pressa.' : 'Foco aberto. Execute e valide.'}
          </div>
        ) : null}
      </div>
    </div>
  );
}
