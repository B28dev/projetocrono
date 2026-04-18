export default function SupportSection({ section }) {
  const insights = section.data;

  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="max-w-3xl space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300 dark:text-fuchsia-700">{insights.eyebrow}</p>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-white dark:text-stone-950">{insights.title}</h3>
          <span className="inline-flex min-h-9 items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-100 dark:border-fuchsia-500/25 dark:bg-fuchsia-500/10 dark:text-fuchsia-700">
            {insights.modeLabel}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{insights.description}</p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {insights.items.map((item) => (
          <article key={item.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300 dark:text-fuchsia-700">{item.label}</p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-white dark:text-stone-950">{item.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{item.body}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
