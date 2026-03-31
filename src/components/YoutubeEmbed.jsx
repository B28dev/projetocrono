export default function YoutubeEmbed({ url, title }) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={`${url}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
