import { memo } from 'react';
import DisciplineCatalogCard from './DisciplineCatalogCard.jsx';

const CATALOG_DATA = [
  {
    slug: 'algoritmo',
    title: 'Algoritmo e Programação',
    description: 'Disciplina-piloto adaptada para ciclos guiados por conteúdo e progressão pedagógica estruturada. Focada em repetição e ritmo.',
    status: 'em_execucao',
    icon: '💻',
  },
  {
    slug: 'empreendedorismo',
    title: 'Empreendedorismo',
    description: 'Disciplina focada em planejamento, inovação e análise de mercado. Utiliza organização inicial com foco em data para priorização tática.',
    status: 'em_execucao',
    icon: '🚀',
  },
  {
    slug: 'engenharia-software',
    title: 'Introdução à Engenharia de Software',
    description: 'Disciplina reorganizada no Crono-Lab com visão geral mais limpa, conteúdos por bloco-mãe e universo próprio de exercícios.',
    status: 'em_execucao',
    icon: '🧠',
  },
];

const DisciplineCatalogPage = memo(function DisciplineCatalogPage() {
  return (
    <div className="space-y-6 lg:space-y-8" style={{ animation: 'animationIn 0.3s ease-out both' }}>
      <div className="lab-card overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-6 lg:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
            Catálogo de Matérias
          </p>
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">
          Sua Grade de Estudos
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Selecione uma disciplina disponível. Você entrará na plataforma de execução exclusiva daquela matéria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {CATALOG_DATA.map((subject, idx) => (
          <div key={subject.slug} style={{ animationDelay: `${0.1 + idx * 0.05}s`, animation: 'fadeIn 0.5s ease-out both' }}>
            <DisciplineCatalogCard subject={subject} slug={subject.slug} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default DisciplineCatalogPage;
