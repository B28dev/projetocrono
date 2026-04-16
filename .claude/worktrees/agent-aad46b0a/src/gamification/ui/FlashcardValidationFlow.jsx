import ValidationResultActions from './ValidationResultActions.jsx';

export default function FlashcardValidationFlow({
  content,
  isRevealed,
  isCoolingDown,
  onReveal,
  onAnswer,
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 dark:border-stone-300 dark:bg-stone-100/80">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">
          Flashcard operacional
        </p>
        <p className="mt-3 text-base font-semibold text-white dark:text-stone-900">
          {content.front}
        </p>
        {!isRevealed ? (
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">
            Pense primeiro. O Crono só reconhece execução real quando existe tentativa antes da revelação.
          </p>
        ) : (
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 dark:border-emerald-300 dark:bg-emerald-100/80">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300 dark:text-emerald-700">
              Resposta
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80 dark:text-stone-800">
              {content.back}
            </p>
          </div>
        )}
      </div>

      {!isRevealed ? (
        <button
          type="button"
          onClick={onReveal}
          className="min-h-11 w-full rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:border-cyan-400/35 hover:bg-cyan-500/15 dark:border-cyan-300 dark:bg-cyan-100 dark:text-cyan-800"
        >
          Revelar resposta
        </button>
      ) : (
        <ValidationResultActions
          disabled={isCoolingDown}
          actions={[
            {
              id: 'flashcard-correct',
              label: 'Acertei',
              caption: 'Execução validada',
              className: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100 dark:border-emerald-300 dark:bg-emerald-100 dark:text-emerald-800',
              onClick: () => onAnswer({
                attemptType: 'flashcard_flip',
                validationKind: 'flashcard',
                answeredBeforeReveal: true,
                selfAssessment: 'good',
                resultTier: 'validated',
                feedbackKey: 'validated',
              }),
            },
            {
              id: 'flashcard-adjusted',
              label: 'Errei mas ajustei',
              caption: 'Erro útil',
              className: 'border-amber-400/25 bg-amber-500/10 text-amber-100 dark:border-amber-300 dark:bg-amber-100 dark:text-amber-800',
              onClick: () => onAnswer({
                attemptType: 'flashcard_flip',
                validationKind: 'flashcard',
                answeredBeforeReveal: true,
                selfAssessment: 'hard',
                resultTier: 'partial',
                feedbackKey: 'partial',
              }),
            },
            {
              id: 'flashcard-revealed',
              label: 'Revelei sem tentar',
              caption: 'Sem reward',
              className: 'border-rose-400/25 bg-rose-500/10 text-rose-100 dark:border-rose-300 dark:bg-rose-100 dark:text-rose-800',
              onClick: () => onAnswer({
                attemptType: 'flashcard_flip',
                validationKind: 'flashcard',
                answeredBeforeReveal: false,
                selfAssessment: 'revealed',
                resultTier: 'invalid',
                feedbackKey: 'revealed_without_attempt',
              }),
            },
          ]}
        />
      )}
    </div>
  );
}
