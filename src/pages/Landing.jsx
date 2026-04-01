import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import SystemNotice from '../components/SystemNotice';

const FEATURES = [
  { icon: '🗓', label: 'Cronograma', desc: 'Plano diario ate a prova' },
  { icon: '▶', label: 'Videos', desc: 'Aulas do YouTube integradas' },
  { icon: '📚', label: 'Resumos', desc: 'Conteudo estruturado por topico' },
  { icon: '✅', label: 'Banco de Questoes', desc: 'Em breve' },
];

export default function Landing({ onOpenDashboard, userName = '' }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const featRef = useRef(null);
  const noticeRef = useRef(null);
  const magneticRef = useGsapMagnetic('[data-magnetic]');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      titleRef.current?.classList.add('title-revealed');
      return () => {
        titleRef.current?.classList.remove('title-revealed');
      };
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        titleRef.current?.classList.add('title-revealed');
      },
    });

    tl.fromTo(heroRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    tl.fromTo(
      titleRef.current.querySelectorAll('.word'),
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.7, stagger: 0.06 },
      '-=0.2',
    );
    tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    tl.fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    tl.fromTo(
      featRef.current.querySelectorAll('.feat-card'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.1',
    );
    tl.fromTo(noticeRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');

    return () => {
      titleRef.current?.classList.remove('title-revealed');
      tl.kill();
    };
  }, []);

  return (
    <main
      ref={magneticRef}
      className="cyber-shell cyber-scrollbar min-h-screen flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden transition-colors duration-300 dark:bg-[#EAEAE5] dark:text-stone-900"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 cyberpunk:opacity-100"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(59,130,246,0.15), transparent)' }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-6">
        <div ref={heroRef} className="opacity-0 flex flex-col gap-3">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-zinc-100 dark:text-stone-950 cyberpunk:font-mono cyberpunk:text-white">
            Ola, Seja bem vindo(a){' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 cyberpunk:from-[#ff3ea5] cyberpunk:to-[#00e8ff]">
              {userName || 'Operador'}
            </span>
          </h1>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-3 py-1 tracking-wide uppercase dark:text-blue-700 dark:bg-blue-500/10 cyberpunk:border-white/10 cyberpunk:bg-white/[0.04] cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse cyberpunk:bg-[#ff3ea5]" />
            Engenharia de Software · 2026/1
          </span>
        </div>

        <h1 ref={titleRef} className="hero-title text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight tracking-tight overflow-hidden dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">
          {[
            { label: 'Painel' },
            { label: 'da' },
            { label: 'Turma' },
            { label: 'Adele' },
            { label: 'Engenharia', outline: true },
            { label: 'de', outline: true },
            { label: 'Software', outline: true },
          ].map((word, i) => (
            <span key={i} className="word-shell inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <span
                data-text={word.label}
                className={`word inline-block ${word.outline ? 'hero-title-outline' : ''}`}
              >
                {word.label}
              </span>
            </span>
          ))}
        </h1>

        <p ref={subRef} className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg opacity-0 dark:text-stone-600 cyberpunk:text-white/70">
          Cronograma de estudos, videos selecionados e banco de questoes em um unico painel para a turma.
        </p>

        <div ref={ctaRef} className="opacity-0">
          <button
            onClick={() => {
              onOpenDashboard?.();
              if (!onOpenDashboard) navigate('/dashboard');
            }}
            data-magnetic
            className="magnetic-el group cyber-button relative overflow-hidden inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/20 cyberpunk:border cyberpunk:border-white/15 cyberpunk:bg-[linear-gradient(135deg,rgba(0,232,255,0.18),rgba(255,62,165,0.2))] cyberpunk:font-mono cyberpunk:uppercase cyberpunk:tracking-[0.16em]"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            <span className="relative">Inicializar Sistema</span>
            <svg className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div ref={featRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-4">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="feat-card cyber-glass opacity-0 rounded-xl border border-zinc-800 bg-surface-1 px-3 py-4 flex flex-col items-center gap-1.5 text-center dark:border-stone-300 dark:bg-white/70 cyberpunk:border-white/10 cyberpunk:bg-transparent"
            >
              <span className="text-xl">{f.icon}</span>
              <span className="text-xs font-semibold text-zinc-200 dark:text-stone-900 cyberpunk:text-white">{f.label}</span>
              <span className="text-[11px] text-zinc-600 dark:text-stone-600 cyberpunk:text-white/65">{f.desc}</span>
            </div>
          ))}
        </div>

        <div ref={noticeRef} className="opacity-0 w-full">
          <SystemNotice />
        </div>
      </div>
    </main>
  );
}
