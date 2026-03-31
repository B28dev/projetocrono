import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isLightTheme, onToggleTheme }) {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-surface/80 backdrop-blur-md transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/85">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 transition-colors hover:text-white dark:text-stone-900 dark:hover:text-stone-950">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white dark:bg-stone-900 dark:text-stone-50">P</span>
          Painel da Turma
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" active={pathname.startsWith('/dashboard') || pathname.startsWith('/materia')}>
            Dashboard
          </NavLink>
          <ThemeToggle isLightTheme={isLightTheme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
        active
          ? 'bg-zinc-800 text-zinc-100 dark:bg-stone-900 dark:text-stone-50'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 dark:text-stone-600 dark:hover:text-stone-900 dark:hover:bg-stone-200/80'
      }`}
    >
      {children}
    </Link>
  );
}

function ThemeToggle({ isLightTheme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLightTheme ? 'Ativar tema padrao' : 'Ativar tema claro'}
      aria-pressed={isLightTheme}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-surface-2 text-zinc-300 transition-all duration-300 hover:border-[#ccff00]/60 hover:text-[#ccff00] dark:border-stone-300 dark:bg-white/80 dark:text-stone-700 dark:hover:border-stone-900 dark:hover:text-stone-950"
    >
      <span className="relative block h-4 w-4">
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isLightTheme ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
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
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isLightTheme ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
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
      </span>
    </button>
  );
}
