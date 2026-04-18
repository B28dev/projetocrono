import { useState } from 'react';
import ValidationResultActions from './ValidationResultActions.jsx';

export default function MissionWrittenValidation({
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Questão escrita validável
        </p>
        <p className="mt-3 text-base font-semibold text-white">
          {content.prompt}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Pense e responda fora da tela. Só depois peça a resposta-modelo.
        </p>
      </div>

      {!isRevealed ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAnswered}
            className="min-h-11 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:border-cyan-400/35 hover:bg-cyan-500/15"
          >
            Já respondi · Mostrar resposta
          </button>
          <button
            type="button"
            onClick={handleRevealWithoutAnswer}
            className="min-h-11 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition-all duration-200 hover:border-rose-400/35 hover:bg-rose-500/15"
          >
            Revelei sem responder
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Resposta-modelo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {content.answerModel}
            </p>
            {content.mustIncludePoints?.length ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Pontos que não podem faltar
                </p>
                <ul className="mt-2 space-y-1 text-sm text-white/75">
                  {content.mustIncludePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
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
                  id: 'written-correct',
                  label: 'Acertei',
                  caption: 'Validação oficial',
                  className: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
                  onClick: () => onAnswer({
                    attemptType: 'written_reflection',
                    validationKind: 'written',
                    answeredBeforeReveal: true,
                    selfAssessment: 'good',
                    resultTier: 'validated',
                    feedbackKey: 'validated',
                    validationSource: 'self_assessed',
                    responsePayload: { selfAssessment: 'good' },
                  }),
                },
                {
                  id: 'written-partial',
                  label: 'Parcial',
                  caption: 'Reforço depois',
                  className: 'border-amber-400/25 bg-amber-500/10 text-amber-100',
                  onClick: () => onAnswer({
                    attemptType: 'written_reflection',
                    validationKind: 'written',
                    answeredBeforeReveal: true,
                    selfAssessment: 'partial',
                    resultTier: 'partial',
                    feedbackKey: 'partial',
                    validationSource: 'self_assessed',
                    responsePayload: { selfAssessment: 'partial' },
                  }),
                },
                {
                  id: 'written-failed',
                  label: 'Errei',
                  caption: 'Erro útil',
                  className: 'border-rose-400/25 bg-rose-500/10 text-rose-100',
                  onClick: () => onAnswer({
                    attemptType: 'written_reflection',
                    validationKind: 'written',
                    answeredBeforeReveal: true,
                    selfAssessment: 'failed',
                    resultTier: 'partial',
                    feedbackKey: 'validation_failed',
                    validationSource: 'self_assessed',
                    responsePayload: { selfAssessment: 'failed' },
                  }),
                },
              ]}
            />
          ) : (
            <ValidationResultActions
              disabled={isCoolingDown}
              actions={[
                {
                  id: 'written-revealed',
                  label: 'Revelei sem responder',
                  caption: 'Não conta como validação',
                  className: 'border-rose-400/25 bg-rose-500/10 text-rose-100',
                  onClick: () => onAnswer({
                    attemptType: 'written_reflection',
                    validationKind: 'written',
                    answeredBeforeReveal: false,
                    selfAssessment: 'revealed',
                    resultTier: 'invalid',
                    feedbackKey: 'revealed_without_attempt',
                    validationSource: 'self_assessed',
                    responsePayload: { selfAssessment: 'revealed' },
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
