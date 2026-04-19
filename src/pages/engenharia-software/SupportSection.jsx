export default function SupportSection({ section }) {
  const insights = section.data;

  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="max-w-3xl space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold tracking-tight text-white dark:text-stone-950">{insights.title}</h3>
          <span className="inline-flex items-center rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-300 dark:bg-fuchsia-500/10 dark:text-fuchsia-700">
            {insights.modeLabel}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {insights.items.map((item) => (
          <article key={item.id} className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300 dark:text-fuchsia-700">{item.label}</p>
            <p className="text-base font-semibold leading-snug text-white dark:text-stone-950">{item.value}</p>
            <p className="text-[13px] leading-relaxed text-zinc-400 dark:text-stone-500">{item.body}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
