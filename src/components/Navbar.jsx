import { Link, useLocation } from 'react-router-dom';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';

const THEME_LABELS = {
  dark: 'Ativar tema claro',
  light: 'Ativar tema cyberpunk',
  cyberpunk: 'Ativar tema escuro',
};

export default function Navbar({ theme, onToggleTheme }) {
  const { pathname } = useLocation();
  const magneticRef = useGsapMagnetic('[data-magnetic]', { strength: 10, scale: 1.03 });

  return (
    <header
      ref={magneticRef}
      className="cyber-glass fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-surface/80 backdrop-blur-md transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/85 cyberpunk:border-white/10 cyberpunk:bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          data-magnetic
          className="flex items-center gap-2 text-sm font-semibold text-zinc-100 transition-colors hover:text-white dark:text-stone-900 dark:hover:text-stone-950 cyberpunk:text-white cyberpunk:hover:text-[#00e8ff]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white dark:bg-stone-900 dark:text-stone-50 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-[linear-gradient(135deg,rgba(0,232,255,0.18),rgba(255,62,165,0.24))]">
            P
          </span>
          Painel
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" active={pathname.startsWith('/dashboard') || pathname.startsWith('/materia')}>
            Dashboard
          </NavLink>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      data-magnetic
      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${active
        ? 'bg-zinc-800 text-zinc-100 dark:bg-stone-900 dark:text-stone-50 cyberpunk:border cyberpunk:border-[#00e8ff]/30 cyberpunk:bg-white/[0.08] cyberpunk:text-white'
        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 dark:text-stone-600 dark:hover:text-stone-900 dark:hover:bg-stone-200/80 cyberpunk:border cyberpunk:border-transparent cyberpunk:text-white/70 cyberpunk:hover:border-white/10 cyberpunk:hover:bg-white/[0.05] cyberpunk:hover:text-[#00e8ff]'
        }`}
    >
      {children}
    </Link>
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
      data-magnetic
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
