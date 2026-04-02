import { useMemo, useState } from 'react';
import { ALLOWED_EMAIL_DOMAINS_LABEL, hasAllowedEmailDomain } from '../constants/authDomains';
import useLoginAuth from '../hooks/useLoginAuth';

const NEON_PINK = '#ff3ea5';

export default function LoginModal({
  open = true,
  asPage = false,
  onLogin,
  onClose,
  closeOnBackdrop = true,
  ctaLabel = 'Acessar Terminal',
  showCloseButton = true,
}) {
  const {
    isRegistering,
    isLoading,
    errorMessage,
    handleSubmit,
    toggleRegisterMode,
  } = useLoginAuth(onLogin);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (!asPage && !open) return null;

  const emailHasAllowedDomain = useMemo(
    () => hasAllowedEmailDomain(emailValue),
    [emailValue],
  );
  const submitDisabled = isLoading || (isRegistering && !emailHasAllowedDomain);
  const titleClassName = isRegistering
    ? 'mt-1 font-mono text-3xl font-bold uppercase leading-[0.96] tracking-tight text-transparent sm:text-[2.25rem]'
    : 'mt-2 font-mono text-[clamp(2.8rem,9vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-transparent';
  const titleStyle = isRegistering
    ? {
        WebkitTextStroke: `1.6px ${NEON_PINK}`,
        textShadow: '0 0 18px rgba(255,62,165,0.22), 0 0 36px rgba(0,232,255,0.08)',
      }
    : {
        WebkitTextStroke: `2.2px ${NEON_PINK}`,
        textShadow: '0 0 32px rgba(255,62,165,0.35), 0 0 70px rgba(0,232,255,0.12)',
      };

  const handleBackdropClick = (event) => {
    if (!closeOnBackdrop || !onClose) return;
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <section
      className={
        asPage
          ? 'relative flex min-h-screen w-full items-start justify-center overflow-hidden px-2 py-2 sm:items-center sm:px-4 sm:py-10'
          : 'fixed inset-0 z-[999] flex items-start justify-center overflow-hidden bg-[#08080f]/80 px-2 py-2 backdrop-blur-xl sm:items-center sm:px-4 sm:py-8'
      }
      onClick={handleBackdropClick}
      role={!asPage ? 'dialog' : undefined}
      aria-modal={!asPage ? 'true' : undefined}
      aria-label="Tela de login"
    >
      <div className="relative w-full max-w-md origin-top scale-[0.84] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(26,26,39,0.82)_0%,rgba(8,8,15,0.9)_100%)] p-4 shadow-[0_0_0_1px_rgba(255,62,165,0.12),0_32px_80px_rgba(0,0,0,0.6),0_0_80px_rgba(255,62,165,0.10),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl sm:scale-100 sm:p-8">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-[#ff3ea5] to-transparent opacity-70" />
        <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#00e8ff]/70" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#ff3ea5]/70" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#ff3ea5]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#00e8ff]/12 blur-3xl" />

        {!asPage && onClose && showCloseButton ? (
          <button
            type="button"
            aria-label="Fechar login"
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/12 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:right-5 sm:top-5 sm:h-9 sm:w-9"
          >
            x
          </button>
        ) : null}

        <div className="relative z-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#00e8ff]/85">
            SISTEMA RESTRITO
          </p>

          <h1
            className={titleClassName}
            style={titleStyle}
          >
            {isRegistering ? (
              <>
                <span className="block">CRIAR CONTA</span>
                <span className="block">RESTRITA</span>
              </>
            ) : (
              <>
                <span className="block">INICIAR</span>
                <span className="block">SESSAO</span>
              </>
            )}
          </h1>

          <div className="my-2.5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:my-5" />

          <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="login-email" className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/65">
                E-mail
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                disabled={isLoading}
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
                placeholder="operador@terminal.dev"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 transition focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_28px_rgba(0,232,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/65">
                Senha
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  disabled={isLoading}
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  placeholder="**********"
                  className="hide-password-native-toggle w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-12 text-white placeholder:text-white/40 transition focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_28px_rgba(0,232,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
                />
                <button
                  type="button"
                  aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  disabled={isLoading}
                  onClick={() => setIsPasswordVisible((current) => !current)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-white/45 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPasswordVisible ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path d="M10.6 10.7a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path d="M9.5 5.4A10.9 10.9 0 0 1 12 5c5.2 0 8.7 4.4 9.7 6-0.4 0.6-1.2 1.8-2.4 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.2 6.3C4.2 7.6 2.8 9.5 2.3 11c1 1.6 4.5 6 9.7 6 1.6 0 3-.4 4.1-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2.3 12C3.3 10.4 6.8 6 12 6s8.7 4.4 9.7 6c-1 1.6-4.5 6-9.7 6S3.3 13.6 2.3 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {isRegistering ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 cyberpunk:border-amber-500/50 cyberpunk:bg-amber-500/10 cyberpunk:text-amber-400 cyberpunk:drop-shadow-[0_0_12px_rgba(251,191,36,0.18)]">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm leading-none text-zinc-400 dark:text-stone-500 cyberpunk:text-amber-300 cyberpunk:drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]">
                    !
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-zinc-100 dark:text-stone-900 cyberpunk:text-amber-200">
                      Atencao: voce pode usar um e-mail @gmail.com ficticio.
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-400 dark:text-stone-600 cyberpunk:text-amber-100/85">
                      Nao esqueca sua senha. Como a conta pode ser ficticia, nao ha garantia de recuperacao por e-mail.
                      Memorize sua senha para evitar contas desnecessarias e manter o sistema organizado.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {isRegistering && emailValue && !emailHasAllowedDomain ? (
              <p className="text-xs text-amber-300 dark:text-amber-700 cyberpunk:text-amber-200">
                Cadastre-se usando apenas {ALLOWED_EMAIL_DOMAINS_LABEL}.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitDisabled}
              className="mt-1 w-full rounded-full border border-transparent bg-gradient-to-r from-[#ff3ea5] to-[#c2006a] px-6 py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_44px_rgba(255,62,165,0.52),0_8px_28px_rgba(255,62,165,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:hover:shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)] sm:mt-2 sm:py-3"
            >
              {isLoading
                ? 'Autenticando...'
                : isRegistering
                    ? 'Criar Acesso'
                    : ctaLabel}
            </button>

            <div className="pt-1 text-center">
              <button
                type="button"
                disabled={isLoading}
                onClick={toggleRegisterMode}
                className="text-xs text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRegistering ? 'Ja possui acesso? Entrar' : 'Nao tem conta? Criar acesso'}
              </button>
            </div>
          </form>

          <div className="mt-4 min-h-[44px]">
            <p
              className={`rounded-xl border px-3 py-2 text-sm transition-opacity ${
                errorMessage
                  ? 'border-[#ff3ea5]/45 bg-[#ff3ea5]/10 text-[#ffd0eb] shadow-[0_0_18px_rgba(255,62,165,0.35)] opacity-100'
                  : 'border-transparent bg-transparent text-transparent opacity-0'
              }`}
              aria-live="polite"
            >
              {errorMessage || 'placeholder'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
