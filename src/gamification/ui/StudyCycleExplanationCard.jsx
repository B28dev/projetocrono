import { memo, useState } from 'react';
import HowStudyCycleWorksModal from './HowStudyCycleWorksModal.jsx';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: '🗂️',
    title: 'Organizado por progressão',
    copy: 'Os conteúdos seguem uma ordem pedagógica. Cada bloco prepara o próximo.',
  },
  {
    icon: '✅',
    title: 'Você escolhe entre o que está liberado',
    copy: 'Não tem data fixa. Você avança no seu tempo — dentro do que faz sentido estudar agora.',
  },
  {
    icon: '🔓',
    title: 'Concluiu? O próximo abre',
    copy: 'Ao marcar um bloco como estudado, o Crono libera o conteúdo seguinte da fila.',
  },
  {
    icon: '🔄',
    title: 'Alternância sugerida',
    copy: 'O sistema avisa quando vale dar uma volta em outra matéria para não travar num único ponto.',
  },
];

const STEPS_DATE_BASED = [
  {
    icon: '📅',
    title: 'Organizado por datas neste piloto',
    copy: 'Ainda usa datas como referência. A migração para ciclos por conteúdo vem na próxima iteração.',
  },
  {
    icon: '✅',
    title: 'Foque na próxima ação',
    copy: 'O sistema destaca o que precisa ser feito agora — atrasado primeiro, depois o de hoje.',
  },
  {
    icon: '🧹',
    title: 'Limpeza antes de avançar',
    copy: 'Pendências antigas bloqueiam o ritmo. O Crono aponta isso sem dramatizar.',
  },
  {
    icon: '🔄',
    title: 'Alternância sugerida',
    copy: 'Alternar entre disciplinas é parte da estratégia — não uma fuga do estudo.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const StudyCycleExplanationCard = memo(function StudyCycleExplanationCard({
  /** 'content-based' | 'date-based' */
  variant = 'content-based',
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const steps = variant === 'date-based' ? STEPS_DATE_BASED : STEPS;

  return (
    <>
      <section
        className="lab-card rounded-[28px] border border-white/[0.07] bg-[#0A0A12]/75 p-5 shadow-xl backdrop-blur-xl lg:p-6 animate-animation-in"
        aria-label="Como o ciclo de estudos funciona"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
              style={{ background: 'linear-gradient(135deg, rgba(255,62,165,0.18), rgba(0,232,255,0.18))' }}
              aria-hidden="true"
            >
              🧭
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                Como o ciclo funciona
              </p>
              <h3 className="mt-0.5 text-base font-semibold leading-snug text-white">
                {variant === 'date-based'
                  ? 'Este piloto ainda usa datas'
                  : 'Liberdade com ordem — sem calendário fixo'}
              </h3>
            </div>
          </div>

          <button
            id="btn-how-cycle-works"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Entender mais
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
        </div>

        {/* Steps grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-4 transition-colors"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-base"
                aria-hidden="true"
              >
                {step.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold leading-snug text-white">{step.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Frase-guia */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-400/[0.12] bg-cyan-500/[0.06] px-4 py-3">
          <div
            className="h-1 w-1 shrink-0 rounded-full bg-cyan-400"
            aria-hidden="true"
            style={{ boxShadow: '0 0 8px #00e8ff' }}
          />
          <p className="text-[11px] italic leading-relaxed text-cyan-200/80">
            {variant === 'date-based'
              ? 'Este piloto ainda valida o formato de datas. O ciclo por conteúdo chega na próxima versão.'
              : 'Você escolhe dentro do que faz sentido — não dentro do caos.'}
          </p>
        </div>
      </section>

      <HowStudyCycleWorksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={variant}
      />
    </>
  );
});

export default StudyCycleExplanationCard;
