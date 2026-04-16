export default function CronoLabAlgorithmPilotNotice({ notice }) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-4 backdrop-blur-xl shadow-[0_0_18px_rgba(34,211,238,0.08)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 dark:text-cyan-700">
        {notice.label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white dark:text-stone-900">
        {notice.title}
      </p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72 dark:text-stone-700">
        {notice.body}
      </p>
    </div>
  );
}
