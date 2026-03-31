export default function YoutubeEmbed({ url, title }) {
  const embedUrl = toEmbedUrl(url);

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 dark:bg-white dark:border-stone-300" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function toEmbedUrl(url) {
  try {
    const parsed = new URL(url);

    if (parsed.pathname.includes('/embed/')) {
      return parsed.toString();
    }

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '');
      return `https://www.youtube.com/embed/${videoId}`;
    }

    const videoId = parsed.searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    const playlistId = parsed.searchParams.get('list');
    if (playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    }
  } catch {
    return url;
  }

  return url;
}
