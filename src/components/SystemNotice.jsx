const NOTICE_TEXT = 'Projeto independente desenvolvido por alunos com auxilio de Inteligencia Artificial. Nao possui vinculo oficial com a faculdade ou professores. O conteudo e as verificacoes estao sujeitos a erros de ambas as partes. Este painel serve como um alicerce para construir uma base geral de conhecimento, mas nao garante que o assunto sera cobrado na prova exatamente da forma como esta estruturado aqui.';

function InfoIcon({ compact = false }) {
  return (
    <svg
      className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10.25v5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="7.25" r="1" fill="currentColor" />
    </svg>
  );
}

export default function SystemNotice({ compact = false }) {
  if (compact) {
    return (
      <footer className="border-t border-white/5 bg-stone-950/70 px-3 py-2 backdrop-blur-sm transition-colors duration-300 dark:border-stone-300/70 dark:bg-stone-100/85 cyberpunk:border-white/10 cyberpunk:bg-[#08080f]/80">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 dark:text-stone-500 cyberpunk:text-[#b8f7ff]/70">
          <span className="flex-shrink-0 text-white/35 dark:text-stone-400 cyberpunk:text-[#00e8ff]">
            <InfoIcon compact />
          </span>
          <p className="max-w-4xl leading-relaxed">
            Projeto independente com apoio de IA, sem vinculo oficial. Conteudo e verificacoes sujeitos a erro.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <section className="cyber-glass mx-auto mt-6 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center backdrop-blur-sm transition-colors duration-300 dark:border-stone-300 dark:bg-white/70 cyberpunk:border-white/10 cyberpunk:bg-white/[0.04]">
      <div className="mb-2 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 dark:text-stone-500 cyberpunk:text-[#00e8ff]">
        <InfoIcon />
        <span>System Notice</span>
      </div>
      <p className="mx-auto max-w-[70ch] text-[11px] leading-5 text-zinc-400 dark:text-stone-600 cyberpunk:text-white/62">
        {NOTICE_TEXT}
      </p>
    </section>
  );
}

export { NOTICE_TEXT };
