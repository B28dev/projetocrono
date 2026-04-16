import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

/* ─── ATK Dragonfly color tokens ─────────────────────────────── */
const PINK  = '#ff3ea5';
const CYAN  = '#00e8ff';
const PINK_GLOW = 'rgba(255,62,165,0.45)';
const CYAN_GLOW = 'rgba(0,232,255,0.35)';

/* ─── Particle config ─────────────────────────────────────────── */
const PARTICLE_COUNT = 72;
const COLORS = [PINK, CYAN, '#ffffff', '#ff80c8', '#7fffff'];

function rand(min, max) { return Math.random() * (max - min) + min; }

/* ─── Inline styles that Tailwind can't cover (glassmorphism / neon strokes) ─ */
const styles = {
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(8,8,15,0.55)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  },
  card: {
    position: 'relative',
    width: 'min(520px, 92vw)',
    borderRadius: '24px',
    padding: '3.5rem 3rem 3rem',
    background: 'linear-gradient(145deg, rgba(26,26,39,0.82) 0%, rgba(8,8,15,0.90) 100%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: `0 0 0 1px rgba(255,62,165,0.12),
                0 32px 80px rgba(0,0,0,0.6),
                0 0 80px rgba(255,62,165,0.10),
                inset 0 1px 0 rgba(255,255,255,0.07)`,
    backdropFilter: 'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    overflow: 'hidden',
  },
  levelUpText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 'clamp(4.5rem, 16vw, 7.5rem)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    color: 'transparent',
    WebkitTextStroke: `2.5px ${PINK}`,
    textShadow: `0 0 40px ${PINK_GLOW}, 0 0 80px rgba(255,62,165,0.15)`,
    userSelect: 'none',
  },
  levelNumStroke: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 'clamp(3rem, 10vw, 5.5rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: 'transparent',
    WebkitTextStroke: `2px ${CYAN}`,
    textShadow: `0 0 40px ${CYAN_GLOW}, 0 0 80px rgba(0,232,255,0.15)`,
    userSelect: 'none',
  },
  closeBtn: {
    position: 'absolute', top: '1.2rem', right: '1.2rem',
    width: 36, height: 36,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer', fontSize: '1.1rem',
    transition: 'background 0.2s, color 0.2s',
  },
  /* top edge beam line */
  topBeam: {
    position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
    background: `linear-gradient(90deg, transparent, ${PINK}, ${CYAN}, transparent)`,
    opacity: 0.7,
  },
  /* corner ornaments */
  cornerTL: {
    position: 'absolute', top: 12, left: 12,
    width: 18, height: 18,
    borderTop: `1px solid ${CYAN}`, borderLeft: `1px solid ${CYAN}`,
    opacity: 0.6,
  },
  cornerBR: {
    position: 'absolute', bottom: 12, right: 12,
    width: 18, height: 18,
    borderBottom: `1px solid ${PINK}`, borderRight: `1px solid ${PINK}`,
    opacity: 0.6,
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: CYAN,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)`,
    margin: '1.5rem 0',
  },
  triggerBtn: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9998,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
    padding: '0.8rem 1.6rem', borderRadius: '9999px',
    background: PINK, color: '#fff', border: 'none', cursor: 'pointer',
    boxShadow: `0 0 24px ${PINK_GLOW}`,
    transition: 'transform 0.22s, box-shadow 0.22s',
  },
};

/* ══════════════════════════════════════════════════════════════ */
export default function LevelUpModal({
  level = 12,
  title = 'Mestre da Arquitetura',
  message = 'Você dominou todos os tópicos desta fase. Continue avançando.',
  enabled = false,
}) {
  if (!enabled) return null;

  const [visible, setVisible]   = useState(false);
  const backdropRef  = useRef(null);
  const cardRef      = useRef(null);
  const particlesRef = useRef(null);
  const contentRefs  = useRef([]);
  const tlRef        = useRef(null);

  /* ── spawn particle DOM nodes ─────────────────────────────── */
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('span');
      const size = rand(3, 9);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      Object.assign(el.style, {
        position: 'absolute',
        width: `${size}px`, height: `${size}px`,
        borderRadius: size > 5 ? '50%' : '2px',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        top: '50%', left: '50%',
        pointerEvents: 'none',
        opacity: 0,
      });
      container.appendChild(el);
    }
  }, []);

  /* ── open animation ───────────────────────────────────────── */
  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const backdrop = backdropRef.current;
    const card     = cardRef.current;
    const particles = particlesRef.current?.children;
    const items    = contentRefs.current.filter(Boolean);

    /* kill previous */
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tlRef.current = tl;

    /* backdrop fade */
    tl.fromTo(backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );

    /* card scale + blur rise */
    tl.fromTo(card,
      { scale: 0.82, opacity: 0, filter: 'blur(18px)', y: 24 },
      { scale: 1,    opacity: 1, filter: 'blur(0px)',  y: 0, duration: 0.75, ease: 'expo.out' },
      '<+0.05'
    );

    /* top beam width sweep */
    tl.fromTo(card.querySelector('[data-beam]'),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.7, duration: 0.6, ease: 'expo.out', transformOrigin: 'center' },
      '<+0.15'
    );

    /* content stagger cascade */
    tl.fromTo(items,
      { opacity: 0, y: 22, filter: 'blur(8px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.55, stagger: 0.1, ease: 'expo.out' },
      '<+0.1'
    );

    /* particle explosion */
    if (particles && particles.length) {
      Array.from(particles).forEach((p) => {
        const angle  = rand(0, 360) * (Math.PI / 180);
        const dist   = rand(80, 260);
        const tx     = Math.cos(angle) * dist;
        const ty     = Math.sin(angle) * dist;
        const delay  = rand(0.2, 0.55);

        tl.fromTo(p,
          { x: 0, y: 0, opacity: 0, scale: 0 },
          {
            x: tx, y: ty, opacity: 1, scale: rand(0.8, 1.4),
            duration: rand(0.55, 0.9), delay, ease: 'expo.out',
          },
          0 /* all start together at position 0 in timeline */
        );
        /* fade out */
        tl.to(p,
          { opacity: 0, scale: 0, duration: 0.4, ease: 'power2.in', delay: delay + 0.4 },
          0
        );
      });
    }

    /* pulse glow on the LEVEL UP text */
    tl.to(card.querySelector('[data-levelup]'), {
      textShadow: `0 0 60px ${PINK_GLOW}, 0 0 120px rgba(255,62,165,0.25)`,
      WebkitTextStroke: `2.5px #ff80c8`,
      repeat: 3, yoyo: true, duration: 0.3, ease: 'power1.inOut',
    }, 0.5);

  }, [visible]);

  /* ── close animation ──────────────────────────────────────── */
  const closeModal = useCallback(() => {
    const backdrop = backdropRef.current;
    const card     = cardRef.current;
    if (!backdrop || !card) { setVisible(false); return; }

    gsap.to(card,     { scale: 0.88, opacity: 0, filter: 'blur(14px)', y: -16, duration: 0.4, ease: 'power3.in' });
    gsap.to(backdrop, { opacity: 0, duration: 0.45, ease: 'power2.in', onComplete: () => setVisible(false) });
  }, []);

  /* ── close on backdrop click ──────────────────────────────── */
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) closeModal();
  };

  return (
    <>
      {/* ── TEST TRIGGER BUTTON (remove in production) ── */}
      <button
        style={styles.triggerBtn}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${PINK_GLOW}`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 0 24px ${PINK_GLOW}`; }}
        onClick={openModal}
      >
        ⚡ Level Up!
      </button>

      {/* ── MODAL OVERLAY ── */}
      {visible && (
        <div
          ref={backdropRef}
          style={styles.backdrop}
          onClick={handleBackdropClick}
        >
          <div ref={cardRef} style={styles.card}>

            {/* decorative lines */}
            <div data-beam style={styles.topBeam} />
            <div style={styles.cornerTL} />
            <div style={styles.cornerBR} />

            {/* particles container — centered */}
            <div
              ref={particlesRef}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
            />

            {/* close button */}
            <button
              style={styles.closeBtn}
              onClick={closeModal}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              ✕
            </button>

            {/* ── content (each child gets a ref for stagger) ── */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

              {/* label */}
              <p ref={el => contentRefs.current[0] = el} style={styles.label}>
                conquista desbloqueada
              </p>

              {/* LEVEL UP */}
              <div
                ref={el => contentRefs.current[1] = el}
                data-levelup
                style={{ ...styles.levelUpText, margin: '0.4rem 0 0.1rem' }}
              >
                LEVEL UP
              </div>

              {/* level number */}
              <div ref={el => contentRefs.current[2] = el} style={styles.levelNumStroke}>
                {String(level).padStart(2, '0')}
              </div>

              {/* divider */}
              <div ref={el => contentRefs.current[3] = el} style={styles.divider} />

              {/* title */}
              <p
                ref={el => contentRefs.current[4] = el}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
                  letterSpacing: '-0.01em',
                  color: '#f0f0f8',
                  margin: '0 0 0.6rem',
                }}
              >
                {title}
              </p>

              {/* message */}
              <p
                ref={el => contentRefs.current[5] = el}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'rgba(176,176,210,0.75)',
                  maxWidth: 360,
                  margin: '0 auto 2rem',
                }}
              >
                {message}
              </p>

              {/* CTA */}
              <button
                ref={el => contentRefs.current[6] = el}
                onClick={closeModal}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '0.85rem 2.4rem', borderRadius: '9999px',
                  background: `linear-gradient(90deg, ${PINK}, #c2006a)`,
                  color: '#fff', border: 'none', cursor: 'pointer',
                  boxShadow: `0 0 32px ${PINK_GLOW}, 0 4px 16px rgba(255,62,165,0.25)`,
                  position: 'relative', overflow: 'hidden',
                  transition: 'transform 0.22s, box-shadow 0.22s, filter 0.22s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 0 50px ${PINK_GLOW}, 0 8px 28px rgba(255,62,165,0.35)`;
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = `0 0 32px ${PINK_GLOW}, 0 4px 16px rgba(255,62,165,0.25)`;
                  e.currentTarget.style.filter = '';
                }}
              >
                Continuar →
              </button>

              {/* subtle bottom mono tag */}
              <p
                ref={el => contentRefs.current[7] = el}
                style={{ ...styles.label, marginTop: '1.6rem', opacity: 0.35, color: '#fff' }}
              >
                sistema de gamificação · Painel de Turma
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
