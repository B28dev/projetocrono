import { memo, useState } from 'react';

// ─── KIND LABELS ─────────────────────────────────────────────────────────────

const KIND_LABEL = {
  theory: 'Teoria',
  practice: 'Prática',
  review: 'Revisão',
};

const DIFFICULTY_CONFIG = {
  easy:   { label: 'Fácil',  color: '#34d399', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.20)' },
  medium: { label: 'Médio',  color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.20)' },
  hard:   { label: 'Difícil',color: '#f87171', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.20)' },
};

// ─── ELIGIBLE ITEM CARD ───────────────────────────────────────────────────────

const EligibleItemCard = memo(function EligibleItemCard({ item, index, onToggle, isCompleting }) {
  const diff = DIFFICULTY_CONFIG[item.difficulty] ?? DIFFICULTY_CONFIG.easy;

  return (
    <button
      id={`eligible-item-${item.id}`}
      type="button"
      aria-pressed={item.status === 'completed'}
      onClick={() => onToggle(item.id)}
      disabled={isCompleting}
      className="w-full text-left rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        animationDelay: `${0.1 + index * 0.07}s`,
        animation: 'animationIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        background: 'rgba(0,232,255,0.06)',
        borderColor: 'rgba(0,232,255,0.18)',
        boxShadow: '0 0 20px rgba(0,232,255,0.05)',
        opacity: isCompleting ? 0.6 : 1,
        transform: isCompleting ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      <div className="flex items-start gap-3 px-4 py-4">
        {/* Index / check */}
        <span
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-300"
          style={{
            background: 'rgba(0,232,255,0.10)',
            border: '1px solid rgba(0,232,255,0.22)',
            color: '#00e8ff',
          }}
          aria-hidden="true"
        >
          {index + 1}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <span
              className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ background: diff.bg, borderColor: diff.border, color: diff.color }}
            >
              {diff.label}
            </span>
            {item.kind && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
                {KIND_LABEL[item.kind] ?? item.kind}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.description}</p>
        </div>

        {/* Elegível badge + tap hint */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200">
            elegível
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
            toque para marcar
          </span>
        </div>
      </div>
    </button>
  );
});

// ─── COMING NEXT ITEM ────────────────────────────────────────────────────────

const ComingNextItemRow = memo(function ComingNextItemRow({ item, index }) {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5"
      style={{
        animationDelay: `${0.05 + index * 0.06}s`,
        animation: 'fadeIn 0.5s ease-out both',
      }}
    >
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold text-zinc-600"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-zinc-300">{item.title}</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-600">{item.description}</p>
      </div>
      <span className="shrink-0 rounded-full border border-amber-400/15 bg-amber-500/08 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-amber-300/70">
        próximo
      </span>
    </div>
  );
});

// ─── LOCKED ITEM ─────────────────────────────────────────────────────────────

const LockedItemRow = memo(function LockedItemRow({ item, index }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3 opacity-50"
      style={{ animationDelay: `${index * 0.04}s`, animation: 'fadeIn 0.5s ease-out both' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-600" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <p className="min-w-0 flex-1 truncate text-[11px] text-zinc-600">{item.title}</p>
    </div>
  );
});

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function EligibleContentPanel({ eligibleItems = [], comingNextItems = [], lockedItems = [], currentCycle, onToggle }) {
  const [completingId, setCompletingId] = useState(null);

  const handleToggle = async (itemId) => {
    setCompletingId(itemId);
    // Pequeno delay para animação de feedback antes de atualizar estado
    await new Promise((r) => setTimeout(r, 220));
    onToggle(itemId);
    setCompletingId(null);
  };

  const hasEligible = eligibleItems.length > 0;
  const hasComingNext = comingNextItems.length > 0;
  const hasLocked = lockedItems.length > 0;

  return (
    <section
      className="lab-card space-y-5 rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-xl backdrop-blur-xl lg:p-6"
      aria-label="Conteúdos de estudo por disponibilidade"
    >
      {/* ── ZONA 1: ELEGÍVEIS AGORA ─────────────────────────────────────────── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              Disponível agora
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
              O que você pode estudar sem quebrar a progressão
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Só aparecem aqui os conteúdos realmente liberados neste momento. Escolha um para começar.
            </p>
          </div>
          {currentCycle && (
            <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
              {currentCycle.title}
            </span>
          )}
        </div>

        {hasEligible ? (
          <div className="grid gap-3">
            {eligibleItems.map((item, index) => (
              <EligibleItemCard
                key={item.id}
                item={item}
                index={index}
                onToggle={handleToggle}
                isCompleting={completingId === item.id}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-6 text-center">
            <p className="text-sm font-semibold text-zinc-300">
              Nenhum conteúdo elegível agora
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600">
              Isso indica que o ciclo atual foi concluído. Veja o que vem a seguir abaixo.
            </p>
          </div>
        )}
      </div>

      {/* ── SEPARADOR ────────────────────────────────────────────────────────── */}
      {(hasComingNext || hasLocked) && (
        <div className="h-px w-full bg-white/[0.05]" aria-hidden="true" />
      )}

      {/* ── ZONA 2: VINDO A SEGUIR ───────────────────────────────────────────── */}
      {hasComingNext && (
        <div>
          <div className="mb-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
              Vindo a seguir
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Conteúdos do próximo ciclo. Ficam visíveis como contexto — ainda não são ação.
            </p>
          </div>
          <div className="grid gap-2.5">
            {comingNextItems.map((item, index) => (
              <ComingNextItemRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* ── SEPARADOR ────────────────────────────────────────────────────────── */}
      {hasComingNext && hasLocked && (
        <div className="h-px w-full bg-white/[0.05]" aria-hidden="true" />
      )}

      {/* ── ZONA 3: BLOQUEADOS ──────────────────────────────────────────────── */}
      {hasLocked && (
        <div>
          <div className="mb-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600">
              Ainda bloqueado
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-600">
              A ordem existe para ajudar — não para prender. Chegará a hora certa de cada um.
            </p>
          </div>
          <div className="grid gap-1.5">
            {lockedItems.map((item, index) => (
              <LockedItemRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
