const methods = {
  pomodoro: {
    label: 'Pomodoro',
    icon: '🍅',
    description: 'Blocos de 25 min de foco + 5 min de pausa. A cada 4 ciclos, pausa longa de 15–30 min. Mantém concentração e evita fadiga.',
  },
  ciclo: {
    label: 'Ciclo de Estudos',
    icon: '🔄',
    description: 'Revise os conteúdos em intervalos regulares (dia 1, 3, 7, 14). O intervalo aumenta gradualmente, reforçando a memória de longo prazo.',
  },
  outro: {
    label: 'Outro método',
    icon: '📖',
    description: 'Use seu próprio método de estudo. O importante é consistência e revisar o conteúdo antes da prova.',
  },
};

export default function MethodTooltip({ method }) {
  const info = methods[method] || methods.outro;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-700/60 bg-surface-2 px-4 py-3
      animate-[animationIn_0.4s_ease-out_both]">
      <span className="text-xl flex-shrink-0 mt-0.5">{info.icon}</span>
      <div>
        <p className="text-sm font-semibold text-zinc-100 mb-0.5">{info.label}</p>
        <p className="text-xs text-zinc-400 leading-relaxed">{info.description}</p>
      </div>
    </div>
  );
}
