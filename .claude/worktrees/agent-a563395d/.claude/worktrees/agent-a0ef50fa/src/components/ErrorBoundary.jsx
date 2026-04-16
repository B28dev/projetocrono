import { Component } from 'react';

/**
 * ErrorBoundary — Camada Anti-Crash (React Class Component)
 *
 * Captura qualquer exceção JavaScript não tratada na árvore de componentes filhos
 * e exibe uma UI de fallback amigável ao invés de deixar a tela em branco.
 *
 * Uso:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
    this.handleReload = this.handleReload.bind(this);
  }

  // Chamado durante o render quando um filho lança um erro
  static getDerivedStateFromError(error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Erro inesperado no sistema.';

    return { hasError: true, errorMessage: message };
  }

  // Chamado após o render para efeitos colaterais (logging, Sentry, etc.)
  componentDidCatch(error, info) {
    // Em produção, envie para um serviço de monitoring (ex: Sentry.captureException)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Exceção capturada:', error, info.componentStack);
    }
  }

  handleReload() {
    // Tenta limpar o estado antes de recarregar
    this.setState({ hasError: false, errorMessage: '' });
    window.location.reload();
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        aria-live="assertive"
        className="fixed inset-0 z-[9999] flex min-h-screen flex-col items-center justify-center bg-[#05050a] px-6 py-12 text-center"
      >
        {/* Grid de fundo cyberpunk */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,232,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Brilho de fundo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3ea5]/10 blur-[100px]"
        />

        <div className="relative z-10 flex max-w-md flex-col items-center gap-6">
          {/* Ícone de erro */}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#ff3ea5]/30 bg-[#ff3ea5]/10 shadow-[0_0_40px_rgba(255,62,165,0.25)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-[#ff3ea5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 9v4M12 17h.01" />
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>

          {/* Label de sistema */}
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#00e8ff]/70">
            FALHA CRITICA DO SISTEMA
          </p>

          {/* Título */}
          <h1
            className="font-mono text-4xl font-extrabold uppercase leading-none tracking-tight text-transparent"
            style={{ WebkitTextStroke: '1.5px #ff3ea5' }}
          >
            OPS.
          </h1>

          {/* Mensagem principal */}
          <p className="text-sm leading-relaxed text-white/60">
            Um erro inesperado travou o sistema. Seus dados estão seguros.
            <br />
            Recarregue a página para continuar.
          </p>

          {/* Detalhe técnico (visível apenas em dev) */}
          {import.meta.env.DEV && this.state.errorMessage ? (
            <pre className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-3 text-left font-mono text-[0.65rem] text-[#ff3ea5]/80">
              {this.state.errorMessage}
            </pre>
          ) : null}

          {/* Botão de reload */}
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-2 rounded-full border border-transparent bg-gradient-to-r from-[#ff3ea5] to-[#c2006a] px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(255,62,165,0.4)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ff3ea5]/50"
          >
            Recarregar Sistema
          </button>
        </div>
      </div>
    );
  }
}
