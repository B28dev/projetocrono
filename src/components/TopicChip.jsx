const levelStyles = {
  'muito-frequente': {
    chip: 'border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 cyberpunk:border-[#ff3ea5]/35 cyberpunk:bg-[#ff3ea5]/10 cyberpunk:hover:bg-[#ff3ea5]/16',
    dot: 'bg-red-400 cyberpunk:bg-[#ff3ea5]',
    tag: 'text-red-400 cyberpunk:text-[#ff8dcb]',
  },
  frequente: {
    chip: 'border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/60 cyberpunk:border-[#00e8ff]/30 cyberpunk:bg-[#00e8ff]/8 cyberpunk:hover:bg-[#00e8ff]/14',
    dot: 'bg-amber-400 cyberpunk:bg-[#00e8ff]',
    tag: 'text-amber-400 cyberpunk:text-[#67f3ff]',
  },
  apareceu: {
    chip: 'border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60 cyberpunk:border-emerald-400/25 cyberpunk:bg-emerald-400/8 cyberpunk:hover:bg-emerald-400/14',
    dot: 'bg-green-400 cyberpunk:bg-emerald-300',
    tag: 'text-green-400 cyberpunk:text-emerald-300',
  },
};

export default function TopicChip({ topic, onClick }) {
  const styles = levelStyles[topic.level] || levelStyles.apareceu;

  return (
    <button
      onClick={() => onClick?.(topic)}
      data-magnetic
      className={`topic-chip cyber-glass group flex items-center gap-2 px-3.5 py-2 rounded-lg border text-left transition-all duration-150 cursor-pointer hover:scale-105 hover:-translate-y-0.5 dark:shadow-sm dark:shadow-black/5 cyberpunk:border-white/10 cyberpunk:bg-transparent ${styles.chip}`}
    >
      <div className="topic-chip-content flex w-full min-w-0 items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
        <span className="min-w-0 text-sm font-medium text-zinc-200 dark:text-stone-800 cyberpunk:text-white">{topic.name}</span>
        <span className={`ml-auto flex-shrink-0 text-[11px] font-semibold cyberpunk:font-mono ${styles.tag}`}>{topic.frequency}</span>
      </div>
    </button>
  );
}
