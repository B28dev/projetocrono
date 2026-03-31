import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 hover:text-white transition-colors">
          <span className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-xs font-bold">P</span>
          Painel da Turma
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard" active={pathname.startsWith('/dashboard') || pathname.startsWith('/materia')}>
            Dashboard
          </NavLink>
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
          ? 'bg-zinc-800 text-zinc-100'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
      }`}
    >
      {children}
    </Link>
  );
}
