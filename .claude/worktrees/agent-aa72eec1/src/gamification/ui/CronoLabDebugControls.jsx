export default function CronoLabDebugControls({ onSimulateValidation, onSimulateBreakStreak, onSimulateBacklog, onReset }) {
  return (
    <div className="lab-card rounded-2xl border border-pink-500/10 bg-pink-500/[0.02] p-6 lg:p-8 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">⚙️</span>
        <h3 className="font-display text-lg font-bold tracking-tight text-pink-400/90">Crono Engine Test</h3>
      </div>
      <p className="mb-6 text-xs font-medium leading-relaxed text-zinc-500">
        Controles laboratoriais isolados da engine principal. Use apenas para validar o núcleo sem tocar o dashboard oficial.
      </p>
      <div className="flex flex-col gap-3">
        <button type="button" onClick={onSimulateValidation} className="min-h-11 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-left text-sm font-semibold text-cyan-200">+ Executar Validação Real</button>
        <button type="button" onClick={onSimulateBreakStreak} className="min-h-11 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-left text-sm font-semibold text-rose-100">Simular Quebra de Streak</button>
        <button type="button" onClick={onSimulateBacklog} className="min-h-11 rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-left text-sm font-semibold text-amber-100">Injetar Dívida no Backlog</button>
        <div className="mt-4 border-t border-white/[0.04] pt-4">
          <button type="button" onClick={onReset} className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-zinc-300">Resetar Servidor Local</button>
        </div>
      </div>
    </div>
  );
}
