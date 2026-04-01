import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroMark from '../assets/hero.png';

const THEME_LABELS = {
  dark: 'Ativar tema claro',
  light: 'Ativar tema cyberpunk',
  cyberpunk: 'Ativar tema escuro',
};

const SHIFT_OPTIONS = [
  { value: 'vespertino-snyder', label: 'Vespertino (Snyder)' },
  { value: 'noturno-adele', label: 'Noturno (Adele)' },
];

export default function Navbar({ theme, onToggleTheme, shift, onShiftChange, onOpenDashboard }) {
  const { pathname } = useLocation();
  const brandLinkClass = 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors border border-white/10 bg-white/5 text-zinc-100 hover:text-white hover:border-[#00e8ff]/40 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-200/50 dark:text-stone-900 dark:hover:border-stone-400 dark:hover:text-stone-950 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:text-white cyberpunk:hover:border-[#ff3ea5]/40';

  return (
    <header
      className="cyber-glass fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#08080f]/70 backdrop-blur-md transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/85 cyberpunk:border-white/10 cyberpunk:bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className={brandLinkClass}
          style={{ transform: 'none' }}
        >
          <img src={heroMark} alt="" className="h-7 w-7 object-cover" />
          <span className="font-semibold">Painel</span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/dashboard"
            active={pathname.startsWith('/dashboard') || pathname.startsWith('/materia')}
            onClick={onOpenDashboard}
          >
            Terminal
          </NavLink>
          <ShiftSelect value={shift} onChange={onShiftChange} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition-colors border border-white/10 bg-white/5 hover:border-[#00e8ff]/40 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-200/50 dark:hover:border-stone-400 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#ff3ea5]/40 ${active
        ? 'text-zinc-100 bg-white/10 border-[#00e8ff]/30 dark:bg-stone-300 dark:text-stone-900 cyberpunk:border-[#00e8ff]/40 cyberpunk:text-white'
        : 'text-zinc-400 hover:text-zinc-100 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/70 cyberpunk:hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}

function ShiftSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = useMemo(
    () => SHIFT_OPTIONS.find((option) => option.value === value) || SHIFT_OPTIONS[1],
    [value],
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="cyber-glass min-w-[220px] text-xs rounded-lg px-3 py-2 border border-white/10 bg-[#08080f]/85 text-zinc-100 transition-colors dark:border-stone-300 dark:bg-stone-100 dark:text-stone-900 cyberpunk:border-[#00e8ff]/30 cyberpunk:text-white"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="truncate">{selected.label}</span>
          <svg
            className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 12 8"
          >
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#08080f]/95 p-1.5 backdrop-blur-xl shadow-[0_14px_40px_rgba(0,0,0,0.45)] dark:border-stone-300 dark:bg-stone-100 cyberpunk:border-white/10"
        >
          {SHIFT_OPTIONS.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`relative flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'text-zinc-100 bg-white/5 dark:text-stone-900 dark:bg-white/70 cyberpunk:text-white cyberpunk:bg-white/[0.06]'
                      : 'text-zinc-200 hover:text-white dark:text-stone-700 dark:hover:text-stone-900'
                  } hover:bg-gradient-to-r hover:from-pink-500/40 hover:to-cyan-500/40 dark:hover:from-pink-500/15 dark:hover:to-cyan-500/20`}
                >
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const baseClass = theme === 'cyberpunk'
    ? 'group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#00e8ff]/50 bg-[#12122b] text-[#00e8ff] transition-all duration-300 hover:border-[#ff3ea5] hover:text-[#ff3ea5]'
    : 'group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-surface-2 text-zinc-300 transition-all duration-300 hover:border-[#ccff00]/60 hover:text-[#ccff00] dark:border-stone-300 dark:bg-white/80 dark:text-stone-700 dark:hover:border-stone-900 dark:hover:text-stone-950';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={THEME_LABELS[theme]}
      className={`${baseClass} cyber-button cyberpunk:border-white/15 cyberpunk:bg-transparent`}
    >
      <span className="relative block h-4 w-4">
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.9 2.1a5.8 5.8 0 1 0 3 10.8A6.4 6.4 0 0 1 10.9 2.1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${theme === 'cyberpunk' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M9.5 1.5L4.5 8.5H8L6.5 14.5L11.5 7.5H8L9.5 1.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
