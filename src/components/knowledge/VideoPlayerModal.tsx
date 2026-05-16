import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export type PlayableVideo = {
  id: number | string;
  title: string;
  videoId?: string | null;
  videoProvider?: "youtube" | "vimeo" | null;
  link?: string;
};

export function VideoPlayerModal({
  video,
  onClose,
}: {
  video: PlayableVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  const src =
    video?.videoProvider === "vimeo" && video.videoId
      ? `https://player.vimeo.com/video/${video.videoId}?autoplay=1&title=0&byline=0&portrait=0`
      : video?.videoId
        ? `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`
        : null;

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Zamknij"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white hover:text-black md:right-8 md:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 8, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-[0_60px_180px_-30px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full bg-black">
              {src ? (
                <iframe
                  key={String(video.id)}
                  src={src}
                  title={video.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/70">
                  Wideo niedostępne.
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black px-5 py-4">
              <h3 className="text-sm font-medium text-white md:text-base">{video.title}</h3>
              {video.link && (
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener"
                  className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white"
                >
                  Otwórz na YouTube ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
