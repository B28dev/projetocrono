import ValidationResultActions from './ValidationResultActions.jsx';

export default function MissionTheoryValidation({ content, isCoolingDown, onAnswer }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.06] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Base teórica validável
        </p>
        <p className="mt-3 text-base font-semibold text-white">
          {content.front}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          {content.answerModel}
        </p>
        {content.mustIncludePoints?.length ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Base que precisa ficar clara
            </p>
            <ul className="mt-2 space-y-1 text-sm text-white/75">
              {content.mustIncludePoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <ValidationResultActions
        disabled={isCoolingDown}
        actions={[
          {
            id: 'theory-done',
            label: 'Concluir estudo desta camada',
            caption: 'Base revisada oficialmente',
            className: 'border-cyan-400/25 bg-cyan-500/10 text-cyan-100',
            onClick: () => onAnswer({
              attemptType: 'theory_validation',
              validationKind: 'theory',
              answeredBeforeReveal: true,
              selfAssessment: 'theory_done',
              resultTier: 'validated',
              feedbackKey: 'validated_theory',
              validationSource: 'self_assessed',
              responsePayload: { action: 'complete_theory' },
            }),
          },
        ]}
      />
    </div>
  );
}
