import { useState } from 'react';

export default function StudyResourcesPanel({ resources }) {
  const [openVideoSectionId, setOpenVideoSectionId] = useState(resources.videoSections[0]?.id ?? null);
  const [isPdfOpen, setIsPdfOpen] = useState(true);

  return (
    <section className="lab-card h-full rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {resources.eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {resources.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {resources.description}
      </p>

      <div className="mt-5 space-y-3">
        {resources.videoSections.map((section) => {
          const isOpen = openVideoSectionId === section.id;
          return (
            <div key={section.id} className="rounded-xl border border-white/10 bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setOpenVideoSectionId(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{section.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{section.description}</p>
                </div>
                <span className="text-xs text-cyan-300">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen ? (
                <div className="space-y-2 border-t border-white/10 px-4 py-3">
                  {section.items.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 transition-colors hover:border-cyan-400/25 hover:bg-white/[0.05]"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{video.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">{video.description}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
                        {video.kind}
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="rounded-xl border border-white/10 bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setIsPdfOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <div>
              <p className="text-sm font-semibold text-white">PDFs da disciplina</p>
              <p className="mt-1 text-xs text-zinc-500">Materiais oficiais para leitura e revisão.</p>
            </div>
            <span className="text-xs text-cyan-300">{isPdfOpen ? '−' : '+'}</span>
          </button>
          {isPdfOpen ? (
            <div className="space-y-2 border-t border-white/10 px-4 py-3">
              {resources.pdfs.map((pdf) => (
                <a
                  key={pdf.id}
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 transition-colors hover:border-fuchsia-400/25 hover:bg-white/[0.05]"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{pdf.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{pdf.description}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-fuchsia-200">
                    pdf
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}