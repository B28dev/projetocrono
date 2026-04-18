import { useMemo, useState } from 'react';
import ValidationResultActions from './ValidationResultActions.jsx';

export default function MissionTrueFalseValidation({ content, isCoolingDown, onAnswer }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const selectedExplanation = useMemo(
    () => (selectedOptionId ? content.explanationsByOption?.[selectedOptionId] ?? null : null),
    [content.explanationsByOption, selectedOptionId],
  );

  const handleChoose = (optionId) => {
    setSelectedOptionId(optionId);
    const isCorrect = optionId === content.correctOptionId;

    onAnswer({
      attemptType: 'true_false_answer',
      validationKind: 'true_false',
      answeredBeforeReveal: true,
      selfAssessment: isCorrect ? 'good' : 'failed',
      resultTier: isCorrect ? 'validated' : 'partial',
      feedbackKey: isCorrect ? 'validated' : 'validation_failed',
      validationSource: 'auto',
      responsePayload: { selectedOptionId: optionId },
      objectiveCorrectness: isCorrect ? 'correct' : 'incorrect',
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
          V/F interativo
        </p>
        <p className="mt-3 text-base font-semibold text-white">
          {content.front}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Escolha uma opção. A missão só avança com execução validada, não com leitura passiva.
        </p>
      </div>

      <ValidationResultActions
        disabled={isCoolingDown}
        actions={(content.options ?? []).map((option) => ({
          id: option.id,
          label: option.label,
          caption: option.id === selectedOptionId ? 'Selecionado' : 'Responder agora',
          className: option.id === selectedOptionId
            ? 'border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100'
            : 'border-white/10 bg-white/5 text-white/80',
          onClick: () => handleChoose(option.id),
        }))}
      />

      {selectedOptionId ? (
        <div className={`rounded-2xl border p-4 transition-all duration-300 ${selectedOptionId === content.correctOptionId ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100' : 'border-rose-400/20 bg-rose-500/10 text-rose-100'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            {selectedOptionId === content.correctOptionId ? 'Leitura correta' : 'Ajuste de rota'}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            {selectedExplanation}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(content.options ?? []).filter((option) => option.id !== selectedOptionId).map((option) => (
              <button
                key={option.id}
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-white/75 transition-colors hover:bg-white/10"
                onClick={() => setSelectedOptionId(option.id)}
              >
                <span className="block font-semibold">Ver justificativa: {option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
