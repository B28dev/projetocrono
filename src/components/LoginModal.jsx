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
    isResetting,
    isLoading,
    errorMessage,
    successMsg,
    handleSubmit,
    handlePasswordReset,
    handleGoogleLogin,
    enterResetMode,
    backToLoginMode,
    toggleRegisterMode,
  } = useLoginAuth(onLogin);

  if (!asPage && !open) return null;

  const handleBackdropClick = (event) => {
    if (!closeOnBackdrop || !onClose) return;
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <section
      className={
        asPage
          ? 'relative flex min-h-screen w-full items-center justify-center px-4 py-10'
          : 'fixed inset-0 z-[999] flex items-center justify-center bg-[#08080f]/80 px-4 py-8 backdrop-blur-xl'
      }
      onClick={handleBackdropClick}
      role={!asPage ? 'dialog' : undefined}
      aria-modal={!asPage ? 'true' : undefined}
      aria-label="Tela de login"
    >
      <div className="relative w-full max-w-[32rem] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(26,26,39,0.82)_0%,rgba(8,8,15,0.9)_100%)] p-7 shadow-[0_0_0_1px_rgba(255,62,165,0.12),0_32px_80px_rgba(0,0,0,0.6),0_0_80px_rgba(255,62,165,0.10),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl sm:p-10">
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
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/12 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            x
          </button>
        ) : null}

        <div className="relative z-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#00e8ff]/85">
            SISTEMA RESTRITO
          </p>

          <h1
            className="mt-2 font-mono text-[clamp(2.8rem,9vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-transparent"
            style={{
              WebkitTextStroke: `2.2px ${NEON_PINK}`,
              textShadow: '0 0 32px rgba(255,62,165,0.35), 0 0 70px rgba(0,232,255,0.12)',
            }}
          >
            {isResetting ? (
              <>
                <span className="block">RECUPERACAO</span>
                <span className="block">DE ACESSO</span>
              </>
            ) : isRegistering ? (
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

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <form className="space-y-4" onSubmit={isResetting ? handlePasswordReset : handleSubmit}>
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
                placeholder="operador@terminal.dev"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_28px_rgba(0,232,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            {!isResetting ? (
              <div className="space-y-2">
                <label htmlFor="login-password" className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/65">
                  Senha
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  placeholder="**********"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_28px_rgba(0,232,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            ) : null}

            {!isResetting ? (
              <button
                type="button"
                disabled={isLoading}
                onClick={enterResetMode}
                className="self-end text-xs text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Esqueci minha senha
              </button>
            ) : null}

            {successMsg ? (
              <p className="font-mono text-sm text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.35)]">
                {successMsg}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-full border border-transparent bg-gradient-to-r from-[#ff3ea5] to-[#c2006a] px-6 py-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_44px_rgba(255,62,165,0.52),0_8px_28px_rgba(255,62,165,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:hover:shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)]"
            >
              {isLoading
                ? 'Autenticando...'
                : isResetting
                  ? 'Enviar Link de Recuperacao'
                  : isRegistering
                    ? 'Criar Acesso'
                    : ctaLabel}
            </button>

            {isResetting ? (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={backToLoginMode}
                  className="text-xs text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Voltar para o Login
                </button>
              </div>
            ) : (
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
            )}
          </form>

          {!isResetting ? (
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">OU</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          ) : null}

          {!isResetting ? (
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white transition hover:border-cyan-500/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false">
                <path d="M21.35 11.1H12v2.93h5.33c-.23 1.5-1.08 2.77-2.3 3.62v2.41h3.72c2.18-2 3.45-4.95 3.45-8.11 0-.74-.07-1.46-.2-2.15Z" fill="currentColor" />
                <path d="M12 22c3.03 0 5.58-1 7.44-2.71l-3.72-2.41c-1.03.69-2.34 1.1-3.72 1.1-2.86 0-5.28-1.93-6.14-4.52H2.02v2.48A10 10 0 0 0 12 22Z" fill="currentColor" />
                <path d="M5.86 13.46a6 6 0 0 1 0-3.82V7.16H2.02a10 10 0 0 0 0 8.78l3.84-2.48Z" fill="currentColor" />
                <path d="M12 5.98c1.52 0 2.88.52 3.95 1.54l2.96-2.96A9.9 9.9 0 0 0 12 2a10 10 0 0 0-9.98 5.16l3.84 2.48C6.72 7.91 9.14 5.98 12 5.98Z" fill="currentColor" />
              </svg>
              {isLoading ? 'Autenticando...' : 'Continuar com o Google'}
            </button>
          ) : null}

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
