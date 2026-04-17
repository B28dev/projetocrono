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
];

const DisciplineCatalogPage = memo(function DisciplineCatalogPage() {
  return (
    <div className="space-y-6 lg:space-y-8" style={{ animation: 'animationIn 0.3s ease-out both' }}>
      <div className="lab-card overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-6 lg:p-8 backdrop-blur-xl shadow-xl">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Disciplinas piloto
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">
          Catálogo do Laboratório
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Escolha uma disciplina para entrar. O sistema carregará a sua mesa de estudos específica sem misturar o dashboard raiz.
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
