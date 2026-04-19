import FlashcardValidationFlow from './FlashcardValidationFlow.jsx';
import AssistedQuestionFlow from './AssistedQuestionFlow.jsx';
import MissionTheoryValidation from './MissionTheoryValidation.jsx';
import MissionTrueFalseValidation from './MissionTrueFalseValidation.jsx';
import MissionWrittenValidation from './MissionWrittenValidation.jsx';

const ORIGIN_META = {
  today: {
    label: 'hoje',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100',
  },
  backlog: {
    label: 'pendência',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100',
  },
  reinforcement: {
    label: 'reforço',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100',
  },
};

const ROLE_META = {
  primary: {
    label: 'Ação principal',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100',
    accent: 'border-fuchsia-400/24 bg-fuchsia-500/[0.06] shadow-[0_0_28px_rgba(217,70,239,0.08)]',
    cta: 'abrir',
  },
  pending: {
    label: 'Pendência',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100',
    accent: 'border-amber-400/24 bg-amber-500/[0.05] shadow-[0_0_24px_rgba(245,158,11,0.08)]',
    cta: 'resolver',
  },
  reinforcement: {
    label: 'Reforço',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100',
    accent: 'border-cyan-400/24 bg-cyan-500/[0.05] shadow-[0_0_24px_rgba(0,232,255,0.08)]',
    cta: 'revisar',
  },
};

const STATUS_META = {
  pending: 'Pendente',
  in_progress: 'Em curso',
  completed: 'Concluído',
  revealed_only: 'Revelado sem validar',
  skipped: 'Ignorado',
};

const VALIDATION_META = {
  idle: { label: 'Aguardando validação', badge: 'border-white/10 bg-white/[0.04] text-zinc-300' },
  validated_theory: { label: 'Teoria validada', badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100' },
  validated_correct: { label: 'Validado', badge: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100' },
  validated_partial: { label: 'Parcial', badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100' },
  validated_wrong: { label: 'Erro útil', badge: 'border-rose-400/20 bg-rose-500/10 text-rose-100' },
  revealed_without_attempt: { label: 'Revelado sem tentar', badge: 'border-rose-400/20 bg-rose-500/10 text-rose-100' },
  explored_only: { label: 'Explorado', badge: 'border-white/10 bg-white/[0.04] text-zinc-300' },
};

function MetaBadge({ tone, children }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${tone}`}>
      {children}
    </span>
  );
}

function renderValidationFlow({ content, isRevealed, isCoolingDown, onReveal, onAnswer }) {
  const interactionType = content?.interactionType ?? (content?.kind === 'assisted_question' ? 'written' : 'flashcard');

  if (interactionType === 'theory') {
    return (
      <MissionTheoryValidation
        content={content}
        isCoolingDown={isCoolingDown}
        onAnswer={onAnswer}
      />
    );
  }

  if (interactionType === 'true_false') {
    return (
      <MissionTrueFalseValidation
        content={content}
        isCoolingDown={isCoolingDown}
        onAnswer={onAnswer}
      />
    );
  }

  if (interactionType === 'written') {
    return (
      <MissionWrittenValidation
        content={content}
        isRevealed={isRevealed}
        isCoolingDown={isCoolingDown}
        onReveal={onReveal}
        onAnswer={onAnswer}
      />
    );
  }

  if (content?.kind === 'assisted_question') {
    return (
      <AssistedQuestionFlow
        content={content}
        isRevealed={isRevealed}
        isCoolingDown={isCoolingDown}
        onReveal={onReveal}
        onAnswer={onAnswer}
      />
    );
  }

  return (
    <FlashcardValidationFlow
      content={content}
      isRevealed={isRevealed}
      isCoolingDown={isCoolingDown}
      onReveal={onReveal}
      onAnswer={onAnswer}
    />
  );
}

function getInteractionLabel(content) {
  if (content?.interactionType === 'true_false') return 'V/F interativo';
  if (content?.interactionType === 'written') return 'Questão escrita';
  if (content?.interactionType === 'theory') return 'Teoria validável';
  if (content?.kind === 'assisted_question') return 'Questão assistida';
  return 'Flashcard operacional';
}

function getStatusLabel(status) {
  return STATUS_META[status] ?? 'Missão';
}

function getMissionItemTitle(item, content) {
  return content?.title ?? item.layerTitle ?? item.contentItemId;
}

export default function MissionItemCard({
  item,
  content,
  isActive,
  isRevealed,
  isCoolingDown,
  onOpen,
  onReveal,
  onAnswer,
  onClose,
}) {
  const originMeta = ORIGIN_META[item.origin] ?? ORIGIN_META.today;
  const roleMeta = ROLE_META[item.missionRole] ?? ROLE_META.pending;
  const validationMeta = VALIDATION_META[item.validationStatus] ?? VALIDATION_META.idle;
  const isCompleted = item.status === 'completed';
  const showOriginBadge = item.origin !== 'today' && !item.isRecommended;
  const showValidationBadge = item.validationStatus !== 'idle' || isCompleted;
  const secondaryMeta = [getInteractionLabel(content), getStatusLabel(item.status)].join(' · ');
  const ctaTone = isCompleted
    ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100'
    : isActive
      ? 'border-white/12 bg-white/[0.05] text-white'
      : 'border-white/10 bg-white/[0.03] text-zinc-300';
  const ctaLabel = isCompleted ? 'feito' : isActive ? 'em foco' : roleMeta.cta;

  return (
    <div className={`rounded-[26px] border bg-[#0D0D16]/88 shadow-lg backdrop-blur-xl transition-all duration-300 ${isActive ? roleMeta.accent : 'border-white/[0.08]'}`}>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <MetaBadge tone={roleMeta.badge}>{roleMeta.label}</MetaBadge>
            {item.isRecommended ? <MetaBadge tone="border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100">agora</MetaBadge> : null}
            {showOriginBadge ? <MetaBadge tone={originMeta.badge}>{originMeta.label}</MetaBadge> : null}
            {showValidationBadge ? <MetaBadge tone={validationMeta.badge}>{validationMeta.label}</MetaBadge> : null}
          </div>

          <p className="mt-3 text-sm font-semibold leading-relaxed text-white">
            {getMissionItemTitle(item, content)}
          </p>
          <p className="mt-1 text-xs text-zinc-300">
            {secondaryMeta}
          </p>
          {item.reason ? (
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {item.reason}
            </p>
          ) : null}
        </div>

        <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${ctaTone}`}>
          {ctaLabel}
        </span>
      </button>

      {isActive ? (
        <div className="border-t border-white/[0.08] px-5 py-5 animate-in fade-in duration-300">
          {renderValidationFlow({
            content,
            isRevealed,
            isCoolingDown,
            onReveal,
            onAnswer,
          })}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/15 hover:text-white"
            >
              fechar item
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
