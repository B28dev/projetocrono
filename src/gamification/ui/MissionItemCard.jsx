import FlashcardValidationFlow from './FlashcardValidationFlow.jsx';
import AssistedQuestionFlow from './AssistedQuestionFlow.jsx';
import MissionTheoryValidation from './MissionTheoryValidation.jsx';
import MissionTrueFalseValidation from './MissionTrueFalseValidation.jsx';
import MissionWrittenValidation from './MissionWrittenValidation.jsx';

const ORIGIN_META = {
  today: {
    label: 'hoje',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-300 dark:bg-cyan-100 dark:text-cyan-800',
  },
  backlog: {
    label: 'pendência',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-300 dark:bg-amber-100 dark:text-amber-800',
  },
  reinforcement: {
    label: 'reforço',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100 dark:border-fuchsia-300 dark:bg-fuchsia-100 dark:text-fuchsia-800',
  },
};

const ROLE_META = {
  primary: {
    label: 'Ação principal',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-200',
    accent: 'border-fuchsia-400/20 shadow-[0_0_28px_rgba(217,70,239,0.08)]',
    cta: 'iniciar foco',
  },
  pending: {
    label: 'Pendência',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-200',
    accent: 'border-amber-400/20 shadow-[0_0_24px_rgba(245,158,11,0.08)]',
    cta: 'resolver',
  },
  reinforcement: {
    label: 'Reforço',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200',
    accent: 'border-cyan-400/20 shadow-[0_0_24px_rgba(0,232,255,0.08)]',
    cta: 'reforçar',
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
  idle: { label: 'Aguardando validação', badge: 'border-white/10 bg-white/5 text-white/60' },
  validated_theory: { label: 'Teoria validada', badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200' },
  validated_correct: { label: 'Validado', badge: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' },
  validated_partial: { label: 'Parcial', badge: 'border-amber-400/20 bg-amber-500/10 text-amber-200' },
  validated_wrong: { label: 'Erro útil', badge: 'border-rose-400/20 bg-rose-500/10 text-rose-200' },
  revealed_without_attempt: { label: 'Revelado sem tentar', badge: 'border-rose-400/20 bg-rose-500/10 text-rose-200' },
  explored_only: { label: 'Explorado', badge: 'border-white/10 bg-white/5 text-white/60' },
};

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
  const interactionLabel = content?.interactionType === 'true_false'
    ? 'V/F interativo'
    : content?.interactionType === 'written'
      ? 'Questão escrita'
      : content?.interactionType === 'theory'
        ? 'Teoria validável'
        : content?.kind === 'assisted_question'
          ? 'Questão de prova assistida'
          : 'Flashcard operacional';

  return (
    <div className={`rounded-2xl border bg-white/[0.02] transition-all duration-300 ${isActive ? `${roleMeta.accent} bg-white/[0.04]` : 'border-white/[0.06]'}`}>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${roleMeta.badge}`}>
              {roleMeta.label}
            </span>
            <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${originMeta.badge}`}>
              {originMeta.label}
            </span>
            <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${validationMeta.badge}`}>
              {validationMeta.label}
            </span>
            {item.isRecommended ? (
              <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-fuchsia-100">
                recomendado agora
              </span>
            ) : null}
            {item.isOfficial ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 dark:text-stone-500">
                oficial
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-white dark:text-stone-900">
            {content?.title ?? item.layerTitle ?? item.contentItemId}
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-stone-600">
            {interactionLabel} · {STATUS_META[item.status] ?? item.status}
          </p>
          {item.reason ? (
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              {item.reason}
            </p>
          ) : null}
          {content?.sourceRef ? (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              {content.sourceRef.topic.replaceAll('-', ' ')} · {content.sourceRef.bank}
            </p>
          ) : null}
        </div>
        <div className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${isCompleted ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/55 dark:text-stone-500'}`}>
          {isCompleted ? 'feito' : isActive ? 'aberto' : roleMeta.cta}
        </div>
      </button>

      {isActive ? (
        <div className="border-t border-white/[0.06] px-4 py-4 animate-in fade-in duration-300">
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
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white dark:text-stone-500 dark:hover:text-stone-900"
            >
              fechar item
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
