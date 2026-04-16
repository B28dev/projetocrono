import CurrentRhythmCard from '../../components/CurrentRhythmCard.jsx';
import OverdueStatusCard from '../../components/OverdueStatusCard.jsx';

function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const STATUS_COPY = {
  recuperacao: 'Modo de recuperação: o laboratório priorizou limpeza e retomada.',
  acao_imediata: 'Modo de execução: há tarefa viva e o sistema já mostrou o próximo passo.',
  consolidado: 'Modo de consolidação: a base está fechada e a disciplina virou revisão fina.',
  planejado: 'Modo de preparação: a disciplina já está montada para execução assistida.',
};

export default function CronoLabSubjectOverview({ overview, backlog, theme = 'cyberpunk' }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-6 lg:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-rose-400/25 bg-rose-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-rose-200">
                EMPREENDER · piloto
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                {overview.period}
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {overview.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {overview.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span>Professor: {overview.professor}</span>
              <span>Prova: {formatDate(overview.examDate)}</span>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Progresso geral
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {overview.progressPercent}%
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {overview.completedTasks}/{overview.totalTasks} tarefas estruturadas concluídas
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff3ea5,#00e8ff)] transition-all duration-700 ease-out"
                style={{ width: `${overview.progressPercent}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/65">
              {STATUS_COPY[overview.status]}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 backdrop-blur-xl shadow-lg">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Próxima leitura operacional
          </p>
          <p className="mt-3 text-sm font-semibold text-white">
            {overview.nextActionLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            O sistema reorganizou a disciplina para reduzir interpretação manual. A próxima ação já vem destacada pelo contexto atual.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          <CurrentRhythmCard
            theme={theme}
            todayDoneCount={backlog.completedTodayTasks.length}
            todayTotalCount={backlog.completedTodayTasks.length + backlog.pendingTodayTasks.length}
            todayPendingCount={backlog.pendingTodayTasks.length}
            completedTodayTasks={backlog.completedTodayTasks}
          />
          <OverdueStatusCard
            theme={theme}
            overdueContentItems={backlog.overdueTasks}
            todayPendingTasks={backlog.pendingTodayTasks}
          />
        </div>
      </div>
    </div>
  );
}
