import { getAllVideos } from "@/lib/resources-data";

export default function VideoLibrary() {
  const videos = getAllVideos();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {videos.map((video) => (
        <div key={video.youtubeId} className="hover-glow overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="aspect-video">
            <iframe
              className="size-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-foreground">{video.title}</p>
            <p className="mt-1 text-xs text-brand-grey">
              {video.durationLabel} — used in{" "}
              <span className="text-brand-purple">{video.moduleTitle}</span>
            </p>
            <p className="mt-1 text-xs text-brand-grey">
              Captions available via YouTube&apos;s CC control. Source: external
              publisher — check licence before reuse or download.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
