import { memo, useState, useCallback, useEffect } from 'react';

const STATUS_MAP = {
  concluido: { label: 'Concluído', dot: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34d399' },
  em_execucao: { label: 'Em curso', dot: '#00e8ff', bg: 'rgba(0,232,255,0.08)', border: 'rgba(0,232,255,0.2)', text: '#00e8ff' },
  bloqueado: { label: 'Bloqueado', dot: '#6b7098', bg: 'rgba(107,112,152,0.06)', border: 'rgba(107,112,152,0.15)', text: '#6b7098' },
};

const EXERCISE_KIND_MAP = {
  exercise: { icon: '✏️', label: 'Exercício' },
  'external-practice': { icon: '🌐', label: 'Prática Externa' },
  track: { icon: '🎯', label: 'Trilha' },
  simulation: { icon: '🧪', label: 'Simulado' },
};

const RESOURCE_ICON_MAP = {
  pdf: '📄',
  playlist: '▶️',
  'external-practice': '🌐',
};

const ITEM_BADGE_CONFIG = {
  recommended_now: {
    label: 'Recomendado agora',
    className: 'border-cyan-400/30 bg-cyan-500/12 text-cyan-200 shadow-[0_0_18px_rgba(0,232,255,0.12)]',
  },
  completed_officially: {
    label: 'Progressão validada',
    className: 'border-emerald-400/30 bg-emerald-500/12 text-emerald-200',
  },
  completed_out_of_sequence: {
    label: 'Exploração antecipada',
    className: 'border-amber-400/30 bg-amber-500/12 text-amber-200',
  },
  coming_next: {
    label: 'Próxima da fila',
    className: 'border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200',
  },
  available_for_exploration: {
    label: 'Exploração livre',
    className: 'border-white/10 bg-white/5 text-zinc-300',
  },
  locked_contextually: {
    label: 'Fora da sequência',
    className: 'border-white/10 bg-white/[0.04] text-zinc-400',
  },
};

function getDefaultSubjectId(motherSubjects, recommendedItemId) {
  const recommendedSubject = motherSubjects.find(
    (subject) => subject.theoryItems.some((item) => item.id === recommendedItemId) || subject.practiceCycleItems.some((item) => item.id === recommendedItemId),
  );

  return recommendedSubject?.id ?? motherSubjects[0]?.id ?? null;
}

function getItemBadges(item) {
  const badges = [];

  if (item.isRecommendedNow) badges.push(ITEM_BADGE_CONFIG.recommended_now);
  if (item.isOfficialCompleted) badges.push(ITEM_BADGE_CONFIG.completed_officially);
  if (item.isCompletedOutOfSequence) badges.push(ITEM_BADGE_CONFIG.completed_out_of_sequence);
  if (!item.isRecommendedNow && item.isComingNext && !item.isOfficialCompleted) badges.push(ITEM_BADGE_CONFIG.coming_next);
  if (!item.isOfficialCompleted && !item.isCompletedOutOfSequence && !item.isRecommendedNow && !item.isComingNext && !item.isLocked) {
    badges.push(ITEM_BADGE_CONFIG.available_for_exploration);
  }
  if (!item.isOfficialCompleted && !item.isCompletedOutOfSequence && item.isLocked) {
    badges.push(ITEM_BADGE_CONFIG.locked_contextually);
  }

  return badges;
}

function getItemHint(item) {
  if (item.isRecommendedNow && item.isCompletedOutOfSequence) {
    return 'Você já explorou este bloco. Agora falta validar na trilha oficial para mover a disciplina.';
  }
  if (item.isRecommendedNow) {
    return 'Próxima camada recomendada. Siga por aqui para manter a progressão oficial.';
  }
  if (item.isOfficialCompleted) {
    return 'Progressão validada. A trilha oficial já reconheceu este bloco.';
  }
  if (item.isCompletedOutOfSequence) {
    return 'Conteúdo consultado antes da hora. Isso não substitui a próxima ação principal.';
  }
  if (item.isComingNext) {
    return 'Está logo depois da etapa atual. Pode explorar, mas a recomendação principal continua no bloco anterior.';
  }
  if (item.isLocked) {
    return 'Exploração liberada sem bloquear você, mas este bloco ainda está fora da sequência oficial.';
  }
  return 'Disponível para exploração. O progresso principal continua separado da navegação livre.';
}

function getItemAction(item, onCompleteOfficial, onToggleExploration) {
  if (item.isOfficialCompleted) {
    return {
      label: 'Progressão validada',
      icon: '✓',
      onClick: null,
      disabled: true,
      className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    };
  }

  if (item.isRecommendedNow) {
    return {
      label: item.isCompletedOutOfSequence ? 'Validar na trilha oficial' : 'Concluir na trilha oficial',
      icon: item.isCompletedOutOfSequence ? '↺' : '⚡',
      onClick: () => onCompleteOfficial(item.id),
      disabled: false,
      className: 'border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-[0_0_18px_rgba(0,232,255,0.14)] ring-1 ring-cyan-400/50',
    };
  }

  if (item.isEligibleNow) {
    return {
      label: 'Concluir nesta etapa',
      icon: '◎',
      onClick: () => onCompleteOfficial(item.id),
      disabled: false,
      className: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20',
    };
  }

  if (item.isCompletedOutOfSequence) {
    return {
      label: 'Exploração registrada',
      icon: '↗',
      onClick: null,
      disabled: true,
      className: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    };
  }

  return {
    label: item.isComingNext ? 'Explorar antecipadamente' : 'Marcar como explorado',
    icon: '↗',
    onClick: () => onToggleExploration(item.id),
    disabled: false,
    className: 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10',
  };
}

const StatusBadge = memo(function StatusBadge({ children, className }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${className}`}>
      {children}
    </span>
  );
});

const ItemStateBlock = memo(function ItemStateBlock({ item, onCompleteOfficial, onToggleExploration }) {
  const badges = getItemBadges(item);
  const action = getItemAction(item, onCompleteOfficial, onToggleExploration);
  const hint = getItemHint(item);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <StatusBadge key={badge.label} className={badge.className}>{badge.label}</StatusBadge>
        ))}
      </div>

      <div className={`rounded-2xl border px-4 py-3 text-[11px] leading-relaxed transition-all duration-300 ${
        item.isRecommendedNow
          ? 'border-cyan-400/20 bg-cyan-500/[0.07] text-cyan-100/85'
          : item.isCompletedOutOfSequence
          ? 'border-amber-400/20 bg-amber-500/[0.07] text-amber-100/85'
          : 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
      }`}>
        {hint}
      </div>

      <button
        type="button"
        onClick={action.onClick ?? undefined}
        disabled={action.disabled}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 sm:w-auto ${action.className} ${action.disabled ? 'cursor-default opacity-85' : ''}`}
      >
        <span className="text-base leading-none">{action.icon}</span>
        {action.label}
      </button>
    </div>
  );
});

const MotherSubjectListItem = memo(function MotherSubjectListItem({ subject, isActive, onClick }) {
  const status = STATUS_MAP[subject.status] ?? STATUS_MAP.bloqueado;

  return (
    <button
      type="button"
      onClick={() => onClick(subject.id)}
      aria-current={isActive ? 'true' : undefined}
      className={`group flex w-full flex-col gap-2 rounded-xl p-3 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        isActive
          ? 'bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(0,232,255,0.2)]'
          : 'hover:bg-white/[0.04]'
      } ${subject.containsRecommendedNow ? 'border border-cyan-400/20 bg-cyan-500/[0.05]' : ''}`}
    >
      <div className="flex items-start gap-3 w-full">
        <div className="flex flex-col items-center gap-1 pt-0.5">
          <span
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: status.dot, boxShadow: isActive || subject.containsRecommendedNow ? `0 0 8px ${status.dot}` : 'none' }}
          />
          <span className="font-mono text-[9px] text-zinc-600 leading-none">{String(subject.order).padStart(2, '0')}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-bold leading-tight ${isActive ? 'text-cyan-200' : 'text-zinc-100'}`}>
            {subject.title}
          </p>
          <p className="mt-1 truncate text-[10px] uppercase font-mono tracking-wider text-zinc-500">
            {subject.officialCompletedCount}/{subject.totalCount} oficiais
            {subject.exploredOutOfSequenceCount > 0 ? ` • +${subject.exploredOutOfSequenceCount} explorados` : ''}
          </p>
        </div>

        {subject.progressPercent === 100 ? (
          <span className="flex-shrink-0 text-emerald-400 text-sm">✓</span>
        ) : subject.containsRecommendedNow ? (
          <span className="flex-shrink-0 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-200">
            agora
          </span>
        ) : null}
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-black/40 mt-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${subject.progressPercent}%`,
            background: subject.progressPercent === 100 ? '#34d399' : 'linear-gradient(90deg, #ff3ea5, #00e8ff)',
          }}
        />
      </div>
    </button>
  );
});

const LayerOverview = memo(function LayerOverview({ subject }) {
  const status = STATUS_MAP[subject.status] ?? STATUS_MAP.bloqueado;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-7 backdrop-blur-xl shadow-xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
          style={{ background: status.bg, borderColor: status.border, color: status.text }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
          {status.label}
        </span>
        <StatusBadge className="border-white/10 bg-white/5 text-zinc-400">Assunto-mãe</StatusBadge>
        <StatusBadge className="border-white/10 bg-white/5 text-zinc-500">Ciclos: {subject.cycleIds.join(', ')}</StatusBadge>
        {subject.containsRecommendedNow && (
          <StatusBadge className="border-cyan-400/25 bg-cyan-500/10 text-cyan-200">Recomendado agora</StatusBadge>
        )}
      </div>

      <h2 className="font-display text-3xl font-bold text-white tracking-tight leading-tight">
        {subject.title}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-300">
        {subject.description}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Progresso oficial</p>
          <p className="mt-2 text-2xl font-black text-white">{subject.officialProgressPercent}%</p>
          <p className="mt-1 text-[11px] text-zinc-500">{subject.officialCompletedCount}/{subject.totalCount} blocos validados</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Exploração extra</p>
          <p className="mt-2 text-2xl font-black text-white">{subject.exploredOutOfSequenceCount}</p>
          <p className="mt-1 text-[11px] text-zinc-500">Blocos estudados fora da ordem principal</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300">Próxima camada</p>
          <p className="mt-2 text-sm font-semibold text-white leading-relaxed">{subject.nextOfficialLayerTitle ?? 'Sem pendências neste bloco'}</p>
          <p className="mt-1 text-[11px] text-zinc-500">A recomendação principal desta parte da disciplina.</p>
        </div>
      </div>
    </div>
  );
});

const LayerTheory = memo(function LayerTheory({ items, onCompleteOfficial, onToggleExploration }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="mb-5 flex items-center gap-2 border-b border-white/[0.05] pb-4">
        <span className="text-xl" aria-hidden="true">📖</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Teoria e Base</h3>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300">
            <h4 className="flex items-center gap-2 font-bold text-cyan-100">
              <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500">CIC {item.cycle}</span>
              {item.title}
            </h4>

            <ul className="mt-3 space-y-2.5">
              {item.theoryPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-500/50" aria-hidden="true" />
                  <span className="font-mono text-[13px] leading-relaxed text-zinc-400" dangerouslySetInnerHTML={{ __html: point.replace(/`(.*?)`/g, '<code class="text-cyan-300 bg-cyan-900/30 px-1 py-0.5 rounded">$1</code>') }} />
                </li>
              ))}
            </ul>

            <ItemStateBlock item={item} onCompleteOfficial={onCompleteOfficial} onToggleExploration={onToggleExploration} />
          </div>
        ))}
      </div>
    </div>
  );
});

const LayerPractice = memo(function LayerPractice({ items, onCompleteOfficial, onToggleExploration }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="mb-5 flex items-center gap-2 border-b border-white/[0.05] pb-4">
        <span className="text-xl" aria-hidden="true">⚡</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Carga Prática</h3>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 transition-all duration-300">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-pink-100">{item.title}</h4>
                <p className="mt-1 max-w-xl text-xs text-zinc-400">{item.description}</p>
              </div>
              <span className="whitespace-nowrap rounded-full border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] text-zinc-500">CIC {item.cycle}</span>
            </div>

            {item.exercises.length > 0 && (
              <div className="mb-4 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {item.exercises.map((exercise) => {
                  const kind = EXERCISE_KIND_MAP[exercise.resourceType] ?? EXERCISE_KIND_MAP.exercise;
                  return (
                    <div key={exercise.id} className="flex items-start gap-3 rounded-lg bg-black/30 p-3">
                      <span className="mt-0.5 text-base" aria-hidden="true">{kind.icon}</span>
                      <div>
                        <p className="text-[13px] font-semibold leading-snug text-zinc-200">{exercise.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-500">{exercise.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <ItemStateBlock item={item} onCompleteOfficial={onCompleteOfficial} onToggleExploration={onToggleExploration} />
          </div>
        ))}
      </div>
    </div>
  );
});

const LayerResources = memo(function LayerResources({ items }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="mb-5 flex items-center gap-2 border-b border-white/[0.05] pb-4">
        <span className="text-xl" aria-hidden="true">🗂️</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Recursos e Apoio</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((resource) => {
          const icon = RESOURCE_ICON_MAP[resource.resourceType] ?? '📎';
          return (
            <div
              key={resource.id}
              className="cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-100">{resource.title}</p>
                  {resource.status === 'referenciado' && (
                    <span className="mt-2 inline-block rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-amber-500/80">
                      Acesso pendente
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const MotherSubjectViewer = memo(function MotherSubjectViewer({ subject, onCompleteOfficial, onToggleExploration }) {
  if (!subject) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 px-8 text-center">
        <p className="mb-6 text-5xl opacity-30" aria-hidden="true">🌌</p>
        <h3 className="mb-2 text-xl font-bold text-white">Selecione um Assunto</h3>
        <p className="max-w-md text-sm text-zinc-400">
          Acesse os macro-temas à esquerda para visualizar visão geral, teorias-base, práticas e recursos interligados.
        </p>
      </div>
    );
  }

  return (
    <div key={subject.id} className="animate-in fade-in slide-in-from-bottom-4 space-y-6 pb-16 duration-500 lg:space-y-8">
      <LayerOverview subject={subject} />
      <LayerTheory items={subject.theoryItems} onCompleteOfficial={onCompleteOfficial} onToggleExploration={onToggleExploration} />
      <LayerPractice items={subject.practiceCycleItems} onCompleteOfficial={onCompleteOfficial} onToggleExploration={onToggleExploration} />
      <LayerResources items={subject.resourceItems} />
    </div>
  );
});

export default function DisciplineTopicContents({ motherSubjects, onCompleteOfficial, onToggleExploration, recommendedItemId }) {
  const [showMobileList, setShowMobileList] = useState(true);
  const [activeSubjectId, setActiveSubjectId] = useState(() => getDefaultSubjectId(motherSubjects, recommendedItemId));

  useEffect(() => {
    setActiveSubjectId(getDefaultSubjectId(motherSubjects, recommendedItemId));
  }, [motherSubjects, recommendedItemId]);

  const activeSubject = motherSubjects.find((subject) => subject.id === activeSubjectId) ?? null;

  const handleSelect = useCallback((id) => {
    setActiveSubjectId(id);
    setShowMobileList(false);
  }, []);

  return (
    <div className="relative flex h-full min-h-[700px] flex-col items-start gap-0 lg:flex-row">
      <aside className={`
        w-full lg:w-[300px] xl:w-[320px] lg:flex-shrink-0 lg:border-r lg:border-white/[0.05] lg:pr-4
        ${showMobileList ? 'block' : 'hidden lg:block'}
      `}>
        <div className="w-full pb-4 lg:sticky lg:top-8">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 lg:mb-5 lg:px-2">
            Catálogo de Assuntos
          </p>
          <div className="space-y-2 lg:space-y-1.5">
            {motherSubjects.map((subject) => (
              <MotherSubjectListItem
                key={subject.id}
                subject={subject}
                isActive={activeSubjectId === subject.id}
                onClick={handleSelect}
              />
            ))}
          </div>
        </div>
      </aside>

      <main className={`
        flex-1 min-w-0 w-full lg:pl-6 xl:pl-8
        ${!showMobileList ? 'block' : 'hidden lg:block'}
      `}>
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setShowMobileList(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar aos Assuntos
          </button>
        </div>

        <MotherSubjectViewer
          subject={activeSubject}
          onCompleteOfficial={onCompleteOfficial}
          onToggleExploration={onToggleExploration}
        />
      </main>
    </div>
  );
}
