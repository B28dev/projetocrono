import { useEffect, useMemo, useState } from 'react';
import {
  CURRENT_VERSION,
  RELEASE_NOTES_HISTORY,
  RELEASE_SEEN_STORAGE_KEY,
} from '../constants/releaseNotes';

const UPDATE_TYPE_STYLES = {
  novo: {
    label: 'NOVO',
    cyber: 'border-emerald-300/70 bg-emerald-400/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.45)]',
    clean: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 dark:border-emerald-300 dark:bg-emerald-50 dark:text-emerald-700',
  },
  melhoria: {
    label: 'MELHORIA',
    cyber: 'border-cyan-400/50 bg-cyan-400/15 text-cyan-200',
    clean: 'border-sky-500/40 bg-sky-500/10 text-sky-300 dark:border-sky-300 dark:bg-sky-50 dark:text-sky-700',
  },
  correcao: {
    label: 'CORRECAO',
    cyber: 'border-amber-400/50 bg-amber-400/15 text-amber-200',
    clean: 'border-amber-500/40 bg-amber-500/10 text-amber-300 dark:border-amber-300 dark:bg-amber-50 dark:text-amber-700',
  },
};

function normalizeType(type) {
  if (!type) return 'novo';
  const normalized = type
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (normalized === 'correcao') return 'correcao';
  if (normalized === 'melhoria') return 'melhoria';
  return 'novo';
}

export default function ReleaseNotesModal({ theme = 'dark', enabled = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const isCyber = theme === 'cyberpunk';

  const releaseData = useMemo(
    () =>
      RELEASE_NOTES_HISTORY.find((entry) => entry.version === CURRENT_VERSION)
      ?? RELEASE_NOTES_HISTORY[0],
    [],
  );

  useEffect(() => {
    if (!enabled) {
      setIsOpen(false);
      return;
    }

    if (typeof window === 'undefined') return;

    try {
      const seenVersion = window.localStorage.getItem(RELEASE_SEEN_STORAGE_KEY);
      setIsOpen(seenVersion !== CURRENT_VERSION);
    } catch {
      setIsOpen(true);
    }
  }, [enabled]);

  const closeModal = () => {
    setIsOpen(false);
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(RELEASE_SEEN_STORAGE_KEY, CURRENT_VERSION);
    } catch {
      // Ignora falhas de escrita no localStorage.
    }
  };

  if (!enabled || !isOpen || !releaseData) return null;

  return (
    <section
      className={`fixed inset-0 z-[1000] flex items-center justify-center px-4 py-8 ${
        isCyber ? 'bg-[#030510]/80 backdrop-blur-sm' : 'bg-black/70 backdrop-blur-sm'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Notas de atualizacao ${releaseData.version}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        className={`relative w-full max-w-2xl ${
          isCyber
            ? 'relative overflow-hidden rounded-xl p-[2px] drop-shadow-[0_0_28px_rgba(6,182,212,0.78)] drop-shadow-[0_0_44px_rgba(236,72,153,0.58)]'
            : 'rounded-xl border border-zinc-800/70 bg-zinc-950 text-zinc-100 shadow-2xl dark:border-stone-300 dark:bg-white dark:text-stone-900'
        }`}
      >
        {isCyber ? (
          <div
            className="pointer-events-none absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_62%,#ec4899_76%,#06b6d4_90%,#00000000_100%)] [filter:saturate(1.45)_blur(0.35px)]"
            aria-hidden="true"
          />
        ) : null}

        <div
          className={`relative h-full w-full rounded-xl p-6 ${
            isCyber
              ? 'bg-slate-950 text-white'
              : 'bg-zinc-950 text-zinc-100 dark:bg-white dark:text-stone-900'
          }`}
        >
          <button
            type="button"
            onClick={closeModal}
            className={`absolute right-4 top-4 h-8 w-8 rounded-full border text-sm transition-colors ${
              isCyber
                ? 'border-cyan-300/60 bg-cyan-500/12 text-cyan-100 hover:bg-cyan-500/20'
                : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 dark:hover:bg-stone-200'
            }`}
            aria-label="Fechar notas de atualizacao"
          >
            x
          </button>

          <div className="space-y-2 pr-10">
            <div>
              <p
                className={`text-xs font-mono uppercase tracking-[0.2em] ${
                  isCyber
                    ? 'neon-pink-cyan-blink [animation-duration:5.2s]'
                    : 'text-zinc-400 dark:text-stone-500'
                }`}
              >
                {`RELEASE ${releaseData.version.toUpperCase()} - ${releaseData.date.toUpperCase()}`}
              </p>
            </div>
            <h2
              className={`text-2xl font-bold leading-tight ${
                isCyber
                  ? 'neon-pink-cyan-blink [animation-duration:4.8s]'
                  : 'text-zinc-100 dark:text-stone-900'
              }`}
            >
              {releaseData.title}
            </h2>
          </div>

          <ul className="mt-5 space-y-2.5">
            {releaseData.updates.map((update, index) => {
              const normalizedType = normalizeType(update.type);
              const style = UPDATE_TYPE_STYLES[normalizedType] || UPDATE_TYPE_STYLES.novo;
              return (
                <li key={`${releaseData.version}-${index}`} className="flex items-start gap-3">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                      isCyber ? style.cyber : style.clean
                    }`}
                  >
                    {style.label}
                  </span>
                  <p
                    className={`pt-0.5 text-sm leading-relaxed ${
                      isCyber ? 'text-white/85' : 'text-zinc-300 dark:text-stone-700'
                    }`}
                  >
                    {update.text}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isCyber
                  ? 'border border-cyan-300/60 bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_18px_rgba(6,182,212,0.6)]'
                  : 'border border-zinc-700 bg-zinc-100 text-zinc-900 hover:bg-white dark:border-stone-300 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Entendi / Fechar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
