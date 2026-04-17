import { memo, useState, useCallback, useEffect } from 'react';

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────

const STATUS_MAP = {
  concluido:  { label: 'Concluído',   dot: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34d399' },
  em_execucao:{ label: 'Em curso',    dot: '#00e8ff', bg: 'rgba(0,232,255,0.08)',  border: 'rgba(0,232,255,0.2)',  text: '#00e8ff' },
  bloqueado:  { label: 'Bloqueado',   dot: '#6b7098', bg: 'rgba(107,112,152,0.06)',border: 'rgba(107,112,152,0.15)',text: '#6b7098' },
};

const EXERCISE_KIND_MAP = {
  exercise:          { icon: '✏️', label: 'Exercício'        },
  'external-practice': { icon: '🌐', label: 'Prática Externa' },
  track:             { icon: '🎯', label: 'Trilha'            },
  simulation:        { icon: '🧪', label: 'Simulado'          },
};

const RESOURCE_ICON_MAP = {
  pdf:              '📄',
  playlist:         '▶️',
  'external-practice': '🌐',
};

// ─── UTILS ────────────────────────────────────────────────────────────────

// Botão de Toggle Universal do Ciclo (usado em Teoria e Prática)
const CycleToggleAction = memo(function CycleToggleAction({ item, onToggle }) {
  // Free movement: All toggles are always available.
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={`mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        item.isCompleted
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
          : 'border-cyan-500/25 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
      }`}
    >
      {item.isCompleted ? (
        <><span className="text-base leading-none">✓</span> Concluído — desfazer</>
      ) : (
        <><span className="text-base leading-none">◎</span> Marcar como concluído</>
      )}
    </button>
  );
});

// ─── MOTHER SUBJECT SIDEBAR ITEM ──────────────────────────────────────────

const MotherSubjectListItem = memo(function MotherSubjectListItem({ subject, isActive, onClick }) {
  const status = STATUS_MAP[subject.status] ?? STATUS_MAP.bloqueado;

  return (
    <button
      type="button"
      onClick={() => onClick(subject.id)}
      aria-current={isActive ? 'true' : undefined}
      className={`group flex w-full flex-col gap-2 rounded-xl p-3 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        isActive
          ? 'bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(0,232,255,0.2)]'
          : 'hover:bg-white/[0.04]'
      }`}
    >
      <div className="flex items-start gap-3 w-full">
        {/* Indicator dot + order */}
        <div className="flex flex-col items-center gap-1 pt-0.5">
          <span
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: status.dot, boxShadow: isActive ? `0 0 8px ${status.dot}` : 'none' }}
          />
          <span className="font-mono text-[9px] text-zinc-600 leading-none">{String(subject.order).padStart(2, '0')}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-bold leading-tight ${isActive ? 'text-cyan-200' : 'text-zinc-100'}`}>
            {subject.title}
          </p>
          <p className="mt-1 truncate text-[10px] uppercase font-mono tracking-wider text-zinc-500">
            {subject.completedCount} de {subject.totalCount} blocos
          </p>
        </div>
        
        {subject.progressPercent === 100 && (
          <span className="flex-shrink-0 text-emerald-400 text-sm">✓</span>
        )}
      </div>

      {/* Progress Bar Simplificada */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-black/40 mt-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${subject.progressPercent}%`,
            background: subject.progressPercent === 100 ? '#34d399' : 'linear-gradient(90deg, #ff3ea5, #00e8ff)',
          }}
        />
      </div>
    </button>
  );
});

// ─── LAYER 1: OVERVIEW ────────────────────────────────────────────────────

const LayerOverview = memo(function LayerOverview({ subject }) {
  const status = STATUS_MAP[subject.status] ?? STATUS_MAP.bloqueado;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-7 backdrop-blur-xl shadow-xl">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
          style={{ background: status.bg, borderColor: status.border, color: status.text }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
          {status.label}
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400">
          Assunto-Mãe
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
          Ciclos: {subject.cycleIds.join(', ')}
        </span>
      </div>

      <h2 className="font-display text-3xl font-bold text-white tracking-tight leading-tight">
        {subject.title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-zinc-300 max-w-3xl">
        {subject.description}
      </p>

    </div>
  );
});

// ─── LAYER 2: TEORIA / SUBTÓPICOS ──────────────────────────────────────────

const LayerTheory = memo(function LayerTheory({ items, onToggle }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-2 border-b border-white/[0.05] pb-4 mb-5">
        <span className="text-xl" aria-hidden="true">📖</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Teoria e Base</h3>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="transition-opacity duration-300">
            <h4 className="font-bold text-cyan-100 flex items-center gap-2">
              <span className="font-mono text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">CIC {item.cycle}</span>
              {item.title}
            </h4>
            
            <ul className="mt-3 space-y-2.5">
              {item.theoryPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-500/50" aria-hidden="true" />
                  <span className="text-[13px] leading-relaxed text-zinc-400 font-mono" dangerouslySetInnerHTML={{ __html: point.replace(/`(.*?)`/g, '<code class="text-cyan-300 bg-cyan-900/30 px-1 py-0.5 rounded">$1</code>') }} />
                </li>
              ))}
            </ul>
            
            <CycleToggleAction item={item} onToggle={onToggle} />
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── LAYER 3: PRÁTICA ─────────────────────────────────────────────────────

const LayerPractice = memo(function LayerPractice({ items, onToggle }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-2 border-b border-white/[0.05] pb-4 mb-5">
        <span className="text-xl" aria-hidden="true">⚡</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Carga Prática</h3>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-5">
             <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="font-bold text-pink-100">{item.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">{item.description}</p>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 border border-white/10 bg-black/40 px-2 py-1 rounded-full whitespace-nowrap">CIC {item.cycle}</span>
             </div>

             {/* Tabela/Lista de Exercícios */}
             {item.exercises.length > 0 && (
               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                 {item.exercises.map((ex) => {
                    const kind = EXERCISE_KIND_MAP[ex.resourceType] ?? EXERCISE_KIND_MAP.exercise;
                    return (
                      <div key={ex.id} className="flex items-start gap-3 rounded-lg bg-black/30 p-3">
                        <span className="text-base mt-0.5" aria-hidden="true">{kind.icon}</span>
                        <div>
                           <p className="text-[13px] font-semibold text-zinc-200 leading-snug">{ex.title}</p>
                           <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2">{ex.description}</p>
                        </div>
                      </div>
                    );
                 })}
               </div>
             )}

             <CycleToggleAction item={item} onToggle={onToggle} />
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── LAYER 4: RECURSOS ────────────────────────────────────────────────────

const LayerResources = memo(function LayerResources({ items }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/60 p-5 lg:p-7 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-2 border-b border-white/[0.05] pb-4 mb-5">
        <span className="text-xl" aria-hidden="true">🗂️</span>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">Recursos e Apoio</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((resource) => {
          const icon = RESOURCE_ICON_MAP[resource.resourceType] ?? '📎';
          return (
            <div
              key={resource.id}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06] cursor-pointer"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-zinc-100 leading-tight">{resource.title}</p>
                {resource.status === 'referenciado' && (
                  <span className="mt-2 inline-block rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-amber-500/80">
                    Acesso pendente
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ─── MOTHER SUBJECT VIEWER (PANEL) ────────────────────────────────────────

const MotherSubjectViewer = memo(function MotherSubjectViewer({ subject, onToggle }) {
  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-8 border border-dashed border-white/10 rounded-3xl bg-black/20">
        <p className="text-5xl mb-6 opacity-30" aria-hidden="true">🌌</p>
        <h3 className="text-xl font-bold text-white mb-2">Selecione um Assunto</h3>
        <p className="text-sm text-zinc-400 max-w-md">
          Acesse os macro-temas à esquerda para visualizar sua visão geral, teorias-base, práticas e recursos interligados.
        </p>
      </div>
    );
  }

  return (
    <div key={subject.id} className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <LayerOverview subject={subject} />
      <LayerTheory items={subject.theoryItems} onToggle={onToggle} />
      <LayerPractice items={subject.practiceCycleItems} onToggle={onToggle} />
      <LayerResources items={subject.resourceItems} />
    </div>
  );
});

// ─── CONTENTS MAIN LAYOUT — Cebola / Split ────────────────────────────────

export default function DisciplineTopicContents({ motherSubjects, onToggle }) {
  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Default first element instead of "unlocked" only
  const firstUnlocked = motherSubjects[0];
  const [activeSubjectId, setActiveSubjectId] = useState(firstUnlocked?.id ?? null);

  const activeSubject = motherSubjects.find((t) => t.id === activeSubjectId) ?? null;

  const handleSelect = useCallback((id) => {
    setActiveSubjectId(id);
    setIsDrawerOpen(false); // Fecha drawer no mobile ao selecionar
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[700px] gap-0 relative items-start">
      
      {/* ── MOBILE: CONTROL BAR ── */}
      <div className="lg:hidden w-full flex items-center justify-between rounded-2xl border border-white/10 bg-[#0A0A12]/80 p-4 mb-6 sticky top-20 z-30 shadow-lg backdrop-blur-xl">
         <div className="min-w-0 pr-4">
             <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-500 mb-0.5">Assunto Atual</p>
             <p className="font-bold text-white text-[15px] truncate">{activeSubject?.title || 'Conteúdos'}</p>
         </div>
         <button 
           onClick={() => setIsDrawerOpen(true)}
           className="shrink-0 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 transition-colors hover:bg-cyan-500/20 active:scale-95"
         >
           Navegar
         </button>
      </div>

      {/* ── MOBILE OVERLAY BACKDROP ── */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity animate-in fade-in duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── SIDEBAR: LISTA DE ASSUNTOS (Drawer no Mobile) ── */}
      <aside className={`
        fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/10 bg-[#0A0A12] p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
        transform transition-transform duration-300 ease-out
        lg:static lg:w-[300px] xl:w-[320px] lg:flex-shrink-0 lg:border-t-0 lg:border-r lg:border-white/[0.05] lg:p-0 lg:pr-4 lg:rounded-none lg:shadow-none lg:bg-transparent lg:translate-y-0
        ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        {/* Mobile handle & close tip */}
        <div className="lg:hidden flex items-center justify-center mb-6">
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>

        <div className="lg:sticky lg:top-8 max-h-[70vh] lg:max-h-[calc(100vh-100px)] overflow-y-auto w-full scrollbar-thin pb-4">
          <p className="mb-4 lg:mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 lg:px-2">
            Navegação (Camada 1)
          </p>
          <div className="space-y-2 lg:space-y-1.5">
            {motherSubjects.map((subject) => (
              <MotherSubjectListItem
                key={subject.id}
                subject={subject}
                isActive={activeSubjectId === subject.id}
                onClick={handleSelect}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* ── PAINEL PRINCIPAL (Conteúdo Cebola) ── */}
      <main className="flex-1 min-w-0 w-full lg:pl-6 xl:pl-8">
        <MotherSubjectViewer
          subject={activeSubject}
          onToggle={onToggle}
        />
      </main>

    </div>
  );
}
