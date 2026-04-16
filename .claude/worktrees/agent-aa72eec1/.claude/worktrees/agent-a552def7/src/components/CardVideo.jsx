import { memo, useMemo } from 'react';

function CardVideo({ video }) {
  const href = useMemo(
    () => `https://www.youtube.com/watch?v=${video?.id || ''}`,
    [video?.id],
  );
  const thumb = useMemo(
    () => `https://img.youtube.com/vi/${video?.id || ''}/hqdefault.jpg`,
    [video?.id],
  );

  if (!video?.id) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.35)] hover:border-cyan-500/30 transition-colors"
    >
      <div className="relative">
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-40 object-cover"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#08080f]/80 border border-white/15 text-[#00e8ff]">
          YouTube
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-white/90 line-clamp-3 group-hover:text-white transition-colors">
          {video.title}
        </p>
      </div>
    </a>
  );
}

export default memo(CardVideo);
