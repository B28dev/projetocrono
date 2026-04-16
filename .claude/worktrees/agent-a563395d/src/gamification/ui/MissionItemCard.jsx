import FlashcardValidationFlow from './FlashcardValidationFlow.jsx';
import AssistedQuestionFlow from './AssistedQuestionFlow.jsx';

const ORIGIN_META = {
  today: {
    label: 'today',
    badge: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-300 dark:bg-cyan-100 dark:text-cyan-800',
  },
  backlog: {
    label: 'backlog',
    badge: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-300 dark:bg-amber-100 dark:text-amber-800',
  },
  reinforcement: {
    label: 'reinforcement',
    badge: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100 dark:border-fuchsia-300 dark:bg-fuchsia-100 dark:text-fuchsia-800',
  },
};

const STATUS_META = {
  pending: 'Pendente',
  in_progress: 'Em curso',
  completed: 'Concluído',
  revealed_only: 'Revelado sem validar',
  skipped: 'Ignorado',
};

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

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isActive ? 'border-cyan-400/20 bg-white/[0.04] shadow-[0_0_24px_rgba(0,232,255,0.08)]' : 'border-white/[0.06] bg-white/[0.02]'}`}>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${originMeta.badge}`}>
              {originMeta.label}
            </span>
            {item.requiredForCleanDay ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 dark:text-stone-500">
                obrigatório
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-white dark:text-stone-900">
            {content?.title ?? item.contentItemId}
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-stone-600">
            {content?.kind === 'assisted_question' ? 'Questão de prova assistida' : 'Flashcard operacional'} · {STATUS_META[item.status] ?? item.status}
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 dark:text-stone-500">
          {isActive ? 'aberto' : 'abrir'}
        </div>
      </button>

      {isActive ? (
        <div className="border-t border-white/[0.06] px-4 py-4">
          {content?.kind === 'assisted_question' ? (
            <AssistedQuestionFlow
              content={content}
              isRevealed={isRevealed}
              isCoolingDown={isCoolingDown}
              onReveal={onReveal}
              onAnswer={onAnswer}
            />
          ) : (
            <FlashcardValidationFlow
              content={content}
              isRevealed={isRevealed}
              isCoolingDown={isCoolingDown}
              onReveal={onReveal}
              onAnswer={onAnswer}
            />
          )}

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
