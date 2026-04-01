import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroMark from '../../assets/styles/fundoquad.png';
import useProfileHub from '../hooks/useProfileHub';

const THEME_LABELS = {
  dark: 'Ativar tema claro',
  light: 'Ativar tema cyberpunk',
  cyberpunk: 'Ativar tema escuro',
};

const SHIFT_OPTIONS = [
  { value: 'vespertino-snyder', label: 'Vespertino (Snyder)' },
  { value: 'noturno-adele', label: 'Noturno (Adele)' },
];

function Navbar({ theme, onToggleTheme, shift, onShiftChange, onNavigate }) {
  const { pathname } = useLocation();
  const profileHubRef = useRef(null);
  const fileInputRef = useRef(null);
  const {
    isProfileOpen,
    isEditingName,
    editNameValue,
    isSavingName,
    isUploading,
    newPassword,
    isUpdatingPassword,
    passwordFeedback,
    profileError,
    profileNotice,
    profileData,
    displayName,
    email,
    avatarInitial,
    isEmailUser,
    maxAvatarSizeMb,
    setEditNameValue,
    setNewPassword,
    handleToggleProfile,
    handleToggleEditingName,
    handleSaveName,
    handleUpdatePassword,
    handleLogout,
    handleTriggerFilePicker,
    handleImageChange,
  } = useProfileHub({ profileHubRef, fileInputRef });

  const brandLinkClass = 'flex items-center gap-1.5 rounded-xl border border-transparent px-2.5 py-1.5 text-xs text-zinc-100 transition-colors hover:bg-white/5 md:gap-2 md:px-4 md:py-2 md:text-sm dark:text-stone-900 dark:hover:bg-stone-200/50 cyberpunk:text-white';

  return (
    <header
      className="sticky top-0 z-[40] border-b border-white/[0.05] bg-[#08080f]/70 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-300 dark:border-stone-300/80 dark:bg-stone-50/85 dark:shadow-[0_4px_24px_rgba(120,113,108,0.16)] cyberpunk:border-white/[0.08] cyberpunk:bg-[#08080f]/70"
    >
      <div className="max-w-6xl mx-auto px-3 py-2 md:px-6 md:py-3 flex items-center justify-between">
        <Link
          to="/"
          className={brandLinkClass}
          style={{ transform: 'none' }}
        >
          <img src={heroMark} alt="" className="h-7 w-7 md:h-9 md:w-9 object-cover drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
          <span className="font-semibold">Inicio</span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          <NavButton
            active={pathname.startsWith('/dashboard') || pathname.startsWith('/materia')}
            onClick={() => onNavigate?.('dashboard')}
          >
            Hub
          </NavButton>
          <ShiftSelect value={shift} onChange={onShiftChange} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <div ref={profileHubRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              onClick={handleToggleProfile}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:border-cyan-400 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-stone-400 dark:bg-stone-200/60 dark:text-stone-900 dark:hover:border-cyan-500"
            >
              {profileData.photoURL ? (
                <img
                  src={profileData.photoURL}
                  alt="Avatar do usuario"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span>{avatarInitial}</span>
              )}
            </button>

            <div
              role="menu"
              className={`absolute right-0 top-full mt-3 z-[999] w-[min(92vw,18rem)] md:w-72 rounded-2xl border border-white/10 bg-[#08080f]/95 p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-4 origin-top-right transition-all duration-300 ease-out ${isProfileOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-sm md:text-base font-semibold text-white">
                  {profileData.photoURL ? (
                    <img
                      src={profileData.photoURL}
                      alt="Avatar do usuario"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{avatarInitial}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                  <p className="truncate text-xs text-white/50">{email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleToggleEditingName}
                  className="w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Editar Perfil
                </button>

                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editNameValue}
                      onChange={(event) => setEditNameValue(event.target.value)}
                      disabled={isSavingName}
                      placeholder="Digite seu nome"
                      className="h-9 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_18px_rgba(0,232,255,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                    />
                    <button
                      type="submit"
                      disabled={isSavingName}
                      className="h-9 rounded-lg border border-cyan-500/40 bg-cyan-500/15 px-3 text-xs font-semibold uppercase tracking-wide text-cyan-200 transition-colors hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSavingName ? 'Salvando...' : 'Salvar'}
                    </button>
                  </form>
                ) : null}

                {profileError ? (
                  <p className="text-xs text-rose-400">{profileError}</p>
                ) : null}

                {profileNotice ? (
                  <p className="text-xs text-amber-300/90">{profileNotice}</p>
                ) : null}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <button
                  type="button"
                  onClick={handleTriggerFilePicker}
                  disabled={isUploading}
                  className="w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploading ? 'Enviando imagem...' : 'Alterar Foto'}
                </button>

                <p className="text-[11px] text-white/45">
                  Limite de upload: {maxAvatarSizeMb}MB por imagem.
                </p>
              </div>

              {isEmailUser ? (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-white/50 font-mono">
                    Seguranca
                  </p>

                  <form onSubmit={handleUpdatePassword} className="space-y-2">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      disabled={isUpdatingPassword}
                      placeholder="Nova senha (minimo 6 caracteres)"
                      className="h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_18px_rgba(0,232,255,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                    />

                    <button
                      type="submit"
                      disabled={isUpdatingPassword}
                      className="w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isUpdatingPassword ? 'Atualizando senha...' : 'Alterar Senha'}
                    </button>
                  </form>

                  {passwordFeedback ? (
                    <p className={`text-xs ${passwordFeedback.type === 'success' ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {passwordFeedback.message}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <hr className="border-white/10 my-1" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-500 transition-all duration-200 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3H4.5A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M10 11.5 13.5 8 10 4.5M13.2 8H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sair do Sistema
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default memo(Navbar);

function NavButton({ active, children, onClick }) {
  const className = `inline-flex h-9 items-center rounded-lg border px-2.5 sm:px-4 text-xs sm:text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${active
    ? 'border-cyan-400/40 bg-white/10 text-white dark:border-cyan-500/45 dark:bg-stone-200/85 dark:text-stone-900'
    : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white dark:border-stone-300 dark:bg-stone-200/55 dark:text-stone-700 dark:hover:border-stone-400 dark:hover:bg-stone-100 dark:hover:text-stone-900'
    }`;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

function ShiftSelect({ value, onChange }) {
  const [isShiftMenuOpen, setIsShiftMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = useMemo(
    () => SHIFT_OPTIONS.find((option) => option.value === value) || SHIFT_OPTIONS[1],
    [value],
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsShiftMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsShiftMenuOpen(false);
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
        aria-expanded={isShiftMenuOpen}
        onClick={() => setIsShiftMenuOpen((current) => !current)}
        className="inline-flex h-9 min-w-[108px] sm:min-w-[172px] md:min-w-[220px] items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3 text-[11px] sm:text-xs text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-stone-300 dark:bg-stone-100/70 dark:text-stone-800 dark:hover:border-stone-400"
      >
        <span className="truncate max-w-[120px] sm:max-w-none">{selected.label}</span>
        <span className="flex items-center">
          <svg
            className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isShiftMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 12 8"
          >
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isShiftMenuOpen && (
        <ul
          role="listbox"
          className="absolute top-full right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#05050a]/95 p-1.5 shadow-2xl backdrop-blur-xl dark:border-stone-300 dark:bg-stone-100 cyberpunk:border-white/10"
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
                    setIsShiftMenuOpen(false);
                  }}
                  className={`relative flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${isActive
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
  const baseClass = 'group inline-flex h-9 w-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-2 text-[#00e8ff] transition-all duration-300 hover:border-cyan-300/60 hover:bg-white/10 hover:shadow-[0_0_12px_rgba(0,232,255,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 sm:w-auto sm:rounded-lg sm:px-3 sm:py-2 dark:border-stone-300 dark:bg-stone-100/70 dark:text-cyan-700 dark:hover:border-cyan-500';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={THEME_LABELS[theme]}
      className={baseClass}
    >
      <span className="relative block h-4 w-4 shrink-0">
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
      <span className="hidden text-xs font-medium text-white/80 sm:inline-block dark:text-stone-700">
        Tema
      </span>
    </button>
  );
}
