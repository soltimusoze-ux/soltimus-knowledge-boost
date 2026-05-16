import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Play, Film } from "lucide-react";
import { useState } from "react";
import { fetchPublicVideos } from "@/lib/wp-public.functions";
import { VideoPlayerModal, type PlayableVideo } from "./VideoPlayerModal";

export function RelatedVideos({
  matchText = "",
  limit = 4,
}: {
  matchText?: string;
  limit?: number;
}) {
  const fn = useServerFn(fetchPublicVideos);
  const { data } = useQuery({
    queryKey: ["wp", "videos", "hub"],
    queryFn: () => fn(),
    staleTime: 5 * 60 * 1000,
  });
  const [active, setActive] = useState<PlayableVideo | null>(null);

  const all = (data?.posts ?? []).filter((v) => v.videoId);
  if (all.length === 0) return null;

  const lower = matchText.toLowerCase();
  const scored = all
    .map((v) => {
      const hay = `${v.title} ${v.excerpt}`.toLowerCase();
      const hits = lower
        .split(/\s+/)
        .filter((w) => w.length > 4)
        .reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      return { v, hits };
    })
    .sort((a, b) => b.hits - a.hits);
  const ordered = scored.map((s) => s.v);
  const videos = ordered.slice(0, limit);

  return (
    <section className="mt-20 border-t border-black/10 pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C03B3B]">
            <Film className="h-3 w-3" />
            Soltimus Lab · Powiązane wideo
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Zobacz, jak to wygląda na żywo.
          </h3>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-black text-left transition-transform hover:-translate-y-0.5"
          >
            <img
              src={v.image ?? "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=1200&q=80"}
              alt={v.title}
              className="h-full w-full object-cover opacity-65 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5 text-black" fill="black" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#F5B800]">
                Reel · {v.readingTime ?? 3} min
              </div>
              <h4 className="mt-2 text-sm font-semibold leading-tight text-white line-clamp-3">
                {v.title}
              </h4>
            </div>
          </button>
        ))}
      </div>

      <VideoPlayerModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}
