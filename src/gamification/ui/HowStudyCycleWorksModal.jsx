import { useEffect, useRef } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SECTIONS_CONTENT = [
  {
    id: 'what-is-cycle',
    icon: '🗂️',
    title: 'O que é um ciclo?',
    body: 'Um ciclo é um bloco de conteúdos relacionados, organizados numa sequência que faz sentido pedagogicamente. Você não precisa seguir datas — só precisa avançar pela fila certa.',
  },
  {
    id: 'eligible-now',
    icon: '✅',
    title: 'O que está disponível agora?',
    body: 'São os conteúdos que você já pode estudar. O sistema verifica se o pré-requisito foi concluído antes de liberar o próximo item. Assim você nunca fica navegando no escuro.',
  },
  {
    id: 'why-not-open',
    icon: '🔒',
    title: 'Por que nem tudo está aberto?',
    body: 'Abrir tudo de uma vez cria caos visual e convida ao salto aleatório. A ordem existe para ajudar — não para prender. Cada conteúdo preparada o terreno para o que vem depois.',
  },
  {
    id: 'how-to-choose',
    icon: '🧭',
    title: 'Como eu escolho?',
    body: 'Entre os conteúdos disponíveis agora, você escolhe livremente. Se houver mais de um elegível, o sistema já aponta o mais recomendado — mas a decisão é sua.',
  },
  {
    id: 'alternation',
    icon: '🔄',
    title: 'E a alternância entre matérias?',
    body: 'O sistema avisa quando vale dar uma pausa em uma disciplina e visitar outra. Isso não é uma regra rígida — é uma sugestão para manter o ritmo geral sem afundar numa só frente.',
  },
];

const SECTIONS_DATE_BASED = [
  {
    id: 'what-is-cycle',
    icon: '📅',
    title: 'Como este piloto funciona?',
    body: 'Este piloto ainda usa datas como referência de organização. As tarefas são agrupadas por dia para facilitar a execução imediata. A migração para ciclos por conteúdo acontece na próxima versão.',
  },
  {
    id: 'eligible-now',
    icon: '⚡',
    title: 'O que fazer agora?',
    body: 'O sistema prioriza o que está atrasado primeiro, depois o que vence hoje, e por último o que já está preparado para o futuro. Assim você nunca precisa decidir por onde começar.',
  },
  {
    id: 'why-not-open',
    icon: '🧹',
    title: 'Por que limpar antes de avançar?',
    body: 'Pendências antigas criam uma dívida que vai pesando sem aparecer. O Crono mostra isso de forma clara — sem dramatizar, mas sem esconder.',
  },
  {
    id: 'alternation',
    icon: '🔄',
    title: 'Alternância entre matérias',
    body: 'Alternar entre disciplinas faz parte da estratégia. O sistema sugere quando isso faz sentido para manter o equilíbrio geral do estudo.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HowStudyCycleWorksModal({ isOpen, onClose, variant = 'content-based' }) {
  const overlayRef = useRef(null);
  const sections = variant === 'date-based' ? SECTIONS_DATE_BASED : SECTIONS_CONTENT;

  // Fechar com Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Bloquear scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Como o ciclo de estudos funciona"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      style={{ animation: 'fadeIn 0.18s ease-out both' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] border border-white/[0.08] bg-[#0D0D1A] shadow-2xl"
        style={{
          animation: 'animationIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both',
          maxHeight: '90svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              Ciclo de estudos
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              Como o ciclo funciona
            </h2>
          </div>
          <button
            id="btn-close-cycle-modal"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body scroll */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-4"
              style={{ animationDelay: `${0.15 + index * 0.06}s`, animation: 'animationIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                aria-hidden="true"
              >
                {section.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{section.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-400">{section.body}</p>
              </div>
            </div>
          ))}

          {/* Frase-guia footer */}
          <div className="rounded-2xl border border-cyan-400/[0.12] bg-cyan-500/[0.06] px-4 py-3">
            <p className="text-[11px] italic leading-relaxed text-cyan-200/80">
              {variant === 'date-based'
                ? 'Este piloto valida o formato de datas. O ciclo por conteúdo chega em breve.'
                : '"O aluno escolhe dentro do que faz sentido — não dentro do caos."'}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-white/[0.06] px-6 py-4">
          <button
            id="btn-got-it-cycle-modal"
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/10 py-3 text-sm font-semibold text-cyan-200 transition-colors active:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
