import { useState } from 'react';
import ValidationResultActions from './ValidationResultActions.jsx';

export default function AssistedQuestionFlow({
  content,
  isRevealed,
  isCoolingDown,
  onReveal,
  onAnswer,
}) {
  const [answeredBeforeReveal, setAnsweredBeforeReveal] = useState(false);

  const handleAnswered = () => {
    setAnsweredBeforeReveal(true);
    onReveal();
  };

  const handleRevealWithoutAnswer = () => {
    setAnsweredBeforeReveal(false);
    onReveal();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 dark:border-stone-300 dark:bg-stone-100/80">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">
          Questão de prova assistida
        </p>
        <p className="mt-3 text-base font-semibold text-white dark:text-stone-900">
          {content.prompt}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">
          Responda no caderno ou no computador. O Crono só libera o gabarito depois do seu comando.
        </p>
      </div>

      {!isRevealed ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAnswered}
            className="min-h-11 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:border-cyan-400/35 hover:bg-cyan-500/15 dark:border-cyan-300 dark:bg-cyan-100 dark:text-cyan-800"
          >
            Já respondi
          </button>
          <button
            type="button"
            onClick={handleRevealWithoutAnswer}
            className="min-h-11 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition-all duration-200 hover:border-rose-400/35 hover:bg-rose-500/15 dark:border-rose-300 dark:bg-rose-100 dark:text-rose-800"
          >
            Ver resposta sem responder
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 dark:border-emerald-300 dark:bg-emerald-100/80">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300 dark:text-emerald-700">
              Resposta-modelo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80 dark:text-stone-800">
              {content.answerModel}
            </p>
            {content.mustIncludePoints?.length ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 dark:border-stone-300 dark:bg-white/70">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300 dark:text-amber-700">
                  Pontos que não podem faltar
                </p>
                <ul className="mt-2 space-y-1 text-sm text-white/75 dark:text-stone-700">
                  {content.mustIncludePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300 dark:bg-amber-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {answeredBeforeReveal ? (
            <ValidationResultActions
              disabled={isCoolingDown}
              actions={[
                {
                  id: 'assisted-correct',
                  label: 'Acertei',
                  caption: 'Domínio real',
                  className: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100 dark:border-emerald-300 dark:bg-emerald-100 dark:text-emerald-800',
                  onClick: () => onAnswer({
                    attemptType: 'assisted_question',
                    validationKind: 'assisted_question',
                    answeredBeforeReveal: true,
                    selfAssessment: 'good',
                    resultTier: 'validated',
                    feedbackKey: 'validated',
                  }),
                },
                {
                  id: 'assisted-partial',
                  label: 'Parcial',
                  caption: 'Ajuste necessário',
                  className: 'border-amber-400/25 bg-amber-500/10 text-amber-100 dark:border-amber-300 dark:bg-amber-100 dark:text-amber-800',
                  onClick: () => onAnswer({
                    attemptType: 'assisted_question',
                    validationKind: 'assisted_question',
                    answeredBeforeReveal: true,
                    selfAssessment: 'partial',
                    resultTier: 'partial',
                    feedbackKey: 'partial',
                  }),
                },
                {
                  id: 'assisted-failed',
                  label: 'Errei',
                  caption: 'Dado útil',
                  className: 'border-rose-400/25 bg-rose-500/10 text-rose-100 dark:border-rose-300 dark:bg-rose-100 dark:text-rose-800',
                  onClick: () => onAnswer({
                    attemptType: 'assisted_question',
                    validationKind: 'assisted_question',
                    answeredBeforeReveal: true,
                    selfAssessment: 'failed',
                    resultTier: 'partial',
                    feedbackKey: 'validation_failed',
                  }),
                },
              ]}
            />
          ) : (
            <ValidationResultActions
              disabled={isCoolingDown}
              actions={[
                {
                  id: 'assisted-revealed',
                  label: 'Revelei sem responder',
                  caption: 'Sem validação real',
                  className: 'border-rose-400/25 bg-rose-500/10 text-rose-100 dark:border-rose-300 dark:bg-rose-100 dark:text-rose-800',
                  onClick: () => onAnswer({
                    attemptType: 'assisted_question',
                    validationKind: 'assisted_question',
                    answeredBeforeReveal: false,
                    selfAssessment: 'revealed',
                    resultTier: 'invalid',
                    feedbackKey: 'revealed_without_attempt',
                  }),
                },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
}
