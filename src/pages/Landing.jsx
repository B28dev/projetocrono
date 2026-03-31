import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const FEATURES = [
  { icon: '📅', label: 'Cronograma',        desc: 'Plano diário até a prova' },
  { icon: '▶️', label: 'Vídeos',             desc: 'Aulas do YouTube integradas' },
  { icon: '📚', label: 'Resumos',            desc: 'Conteúdo estruturado por tópico' },
  { icon: '✅', label: 'Banco de Questões', desc: 'Em breve' },
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const titleRef = useRef(null);
  const subRef   = useRef(null);
  const ctaRef   = useRef(null);
  const featRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero label
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    // Title words stagger
    tl.fromTo(
      titleRef.current.querySelectorAll('.word'),
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.7, stagger: 0.06 },
      '-=0.2'
    );
    // Subtitle
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );
    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
    // Feature cards stagger
    tl.fromTo(
      featRef.current.querySelectorAll('.feat-card'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.1'
    );
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Subtle radial glow background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(59,130,246,0.15), transparent)' }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-6">
        {/* Label */}
        <div ref={heroRef} className="opacity-0">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-3 py-1 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Engenharia de Software · 2026/1
          </span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight tracking-tight overflow-hidden">
          {['Painel', 'da', 'Turma', '–', 'Engenharia', 'de', 'Software'].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <span className="word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg opacity-0">
          Cronograma de estudos, vídeos selecionados e banco de questões — tudo em um único painel para a turma.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative overflow-hidden inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/20"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            <span className="relative">Entrar no painel</span>
            <svg className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Feature cards */}
        <div ref={featRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-4">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="feat-card opacity-0 rounded-xl border border-zinc-800 bg-surface-1 px-3 py-4 flex flex-col items-center gap-1.5 text-center"
            >
              <span className="text-xl">{f.icon}</span>
              <span className="text-xs font-semibold text-zinc-200">{f.label}</span>
              <span className="text-[11px] text-zinc-600">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
