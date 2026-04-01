import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const NEON_PINK = '#ff3ea5';

export default function NamePromptModal({
  open = true,
  onSubmitName,
  closeOnBackdrop = false,
  ctaLabel = 'Prosseguir',
}) {
  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!open) return null;

  const handleBackdropClick = (event) => {
    if (!closeOnBackdrop) return;
    if (event.target === event.currentTarget) event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSaving) return;

    const normalizedName = fullName.trim().replace(/\s+/g, ' ');
    const firstName = normalizedName.split(' ')[0] || '';

    if (firstName.length < 2) {
      setErrorMessage('Digite um nome valido.');
      return;
    }

    if (!auth.currentUser) {
      setErrorMessage('Sessao invalida. Faca login novamente.');
      return;
    }

    setErrorMessage('');
    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: firstName });
      onSubmitName?.(firstName);
    } catch {
      setErrorMessage('Falha ao salvar nome. Tente novamente.');
      setIsSaving(false);
    }
  };

  return (
    <section
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#08080f]/80 px-4 py-8 backdrop-blur-xl"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Identificacao de usuario"
    >
      <div className="relative w-full max-w-[32rem] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(26,26,39,0.82)_0%,rgba(8,8,15,0.9)_100%)] p-7 shadow-[0_0_0_1px_rgba(255,62,165,0.12),0_32px_80px_rgba(0,0,0,0.6),0_0_80px_rgba(255,62,165,0.10),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl sm:p-10">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-[#ff3ea5] to-transparent opacity-70" />
        <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#00e8ff]/70" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#ff3ea5]/70" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#ff3ea5]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#00e8ff]/12 blur-3xl" />

        <div className="relative z-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#00e8ff]/85">
            IDENTIFICACAO DE USUARIO
          </p>

          <h1
            className="mt-2 font-mono text-[clamp(2rem,8vw,4.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-transparent"
            style={{
              WebkitTextStroke: `2.2px ${NEON_PINK}`,
              textShadow: '0 0 32px rgba(255,62,165,0.35), 0 0 70px rgba(0,232,255,0.12)',
            }}
          >
            <span className="block">IDENTIFIQUE</span>
            <span className="block">SE</span>
          </h1>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name-prompt-input" className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/65">
                Nome
              </label>
              <input
                id="name-prompt-input"
                name="fullName"
                type="text"
                autoComplete="name"
                autoFocus
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                disabled={isSaving}
                placeholder="Digite seu nome..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-[#00e8ff] focus:outline-none focus:shadow-[0_0_0_1px_rgba(0,232,255,0.35),0_0_28px_rgba(0,232,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-2 w-full rounded-full border border-transparent bg-gradient-to-r from-[#ff3ea5] to-[#c2006a] px-6 py-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_44px_rgba(255,62,165,0.52),0_8px_28px_rgba(255,62,165,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:hover:shadow-[0_0_32px_rgba(255,62,165,0.42),0_4px_16px_rgba(255,62,165,0.25)]"
            >
              {isSaving ? 'Salvando...' : ctaLabel}
            </button>
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
