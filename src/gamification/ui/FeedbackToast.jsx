import { MISSION_EVENT_COPY } from './missionEventCopy.js';
import { VALIDATION_FEEDBACK_CONFIG } from './validationFeedbackConfig.js';

export default function FeedbackToast({ feedback, onClose }) {
  if (!feedback) return null;

  const copy = MISSION_EVENT_COPY[feedback.eventType] ?? MISSION_EVENT_COPY.mission_progress;
  const config = VALIDATION_FEEDBACK_CONFIG[feedback.tone] ?? VALIDATION_FEEDBACK_CONFIG.info;

  return (
    <div className={`rounded-2xl border px-4 py-4 backdrop-blur-xl transition-all duration-300 ${config.border} ${config.bg} ${config.text} ${config.glow}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black">
          {config.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{copy.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/75 dark:text-stone-700">
                {copy.body}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white dark:text-stone-500 dark:hover:text-stone-900"
            >
              ok
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono uppercase tracking-[0.18em]">
              +{feedback.xpGranted ?? 0} XP
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono uppercase tracking-[0.18em]">
              {feedback.countedAsRealValidation ? 'validação real' : 'sem validação real'}
            </span>
            {feedback.validationStatus ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono uppercase tracking-[0.18em]">
                {feedback.validationStatus.replaceAll('_', ' ')}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
