export default function SupportSection({ section }) {
  const insights = section.data;

  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.018] p-4 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white dark:text-stone-950">{insights.title}</h3>
          <p className="mt-1 text-sm text-zinc-400 dark:text-stone-600">{insights.modeLabel}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {insights.items.map((item) => (
          <article key={item.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 dark:border-stone-200 dark:bg-stone-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 dark:text-cyan-700">{item.label}</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-white dark:text-stone-950">{item.value}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
