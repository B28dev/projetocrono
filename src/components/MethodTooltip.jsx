const methods = {
  pomodoro: {
    label: 'Pomodoro',
    icon: '🍅',
    description: 'Blocos de 25 min de foco + 5 min de pausa. A cada 4 ciclos, pausa longa de 15-30 min.',
  },
  ciclo: {
    label: 'Ciclo de Estudos',
    icon: '🔄',
    description: 'Revise os conteudos em intervalos regulares para reforcar memoria e consistencia.',
  },
  outro: {
    label: 'Outro metodo',
    icon: '📖',
    description: 'Use seu proprio metodo de estudo. O importante e manter ritmo e revisao antes da prova.',
  },
};

export default function MethodTooltip({ method }) {
  const info = methods[method] || methods.outro;

  return (
    <div className="cyber-glass flex items-start gap-3 rounded-xl border border-zinc-700/60 bg-surface-2 px-4 py-3 animate-[animationIn_0.4s_ease-out_both] dark:border-stone-300 dark:bg-white/80 cyberpunk:border-white/10 cyberpunk:bg-transparent">
      <span className="text-xl flex-shrink-0 mt-0.5">{info.icon}</span>
      <div>
        <p className="text-sm font-semibold text-zinc-100 mb-0.5 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">{info.label}</p>
        <p className="text-xs text-zinc-400 leading-relaxed dark:text-stone-600 cyberpunk:text-white/65">{info.description}</p>
      </div>
    </div>
  );
}
