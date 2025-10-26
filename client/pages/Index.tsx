import type { FeedItem } from "@shared/api";
import { Banner } from "@/components/Banner";
import { Link, useSearchParams } from "react-router-dom";
import { parseDate, slugify, formatDuration } from "@/lib/utils";
import { useFeedQuery } from "@/hooks/use-feed-query";
import { useEffect, useRef, useState, forwardRef } from "react";

export default function Index() {
  const { data, isLoading, error } = useFeedQuery();

  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  const total = data?.shortFormVideos.length ?? 0;
  const [focusedIndex, setFocusedIndex] = useState(0);
  const videoRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // If searching, show flat results
  let searchResults: FeedItem[] = [];
  if (q && data?.shortFormVideos) {
    searchResults = data.shortFormVideos.filter((v) => {
      const hay =
        `${v.title} ${v.shortDescription ?? ""} ${(v.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }

  // Group by first tag (category)
  const byCategory = new Map<string, FeedItem[]>();
  if (!q && data?.shortFormVideos) {
    for (const item of data.shortFormVideos) {
      const tag = (item.tags?.[0] ?? "Other").toString();
      if (!byCategory.has(tag)) byCategory.set(tag, []);
      byCategory.get(tag)!.push(item);
    }
  }

  const categories = Array.from(byCategory.entries()).map(([name, items]) => ({
    name,
    slug: slugify(name),
    items: [...items].sort(
      (a, b) =>
        parseDate(b.content?.dateAdded) - parseDate(a.content?.dateAdded),
    ),
  }));

  const allVideos = q ? searchResults : categories.flatMap((c) => c.items.slice(0, 3));

  useEffect(() => {
    if (allVideos.length > 0 && videoRefs.current[0]) {
      videoRefs.current[0].focus();
    }
  }, [allVideos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!allVideos.length) return;

      const cols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 1;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.min(prev + 1, allVideos.length - 1);
          videoRefs.current[next]?.focus();
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          videoRefs.current[next]?.focus();
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.min(prev + cols, allVideos.length - 1);
          videoRefs.current[next]?.focus();
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = Math.max(prev - cols, 0);
          videoRefs.current[next]?.focus();
          return next;
        });
      } else if (e.key === "Enter" && videoRefs.current[focusedIndex]) {
        e.preventDefault();
        videoRefs.current[focusedIndex]?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allVideos.length, focusedIndex]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-black/20">
      <div className="container mx-auto px-4 py-6 space-y-8">
        <Banner total={total} />

        {isLoading && <div className="p-6">Loading…</div>}
        {error && (
          <div className="p-6 text-destructive">
            Failed to load feed. Please refresh. If it persists, share
            console/network logs.
          </div>
        )}

        {q && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">
                Search results for "{q}"
              </h2>
              <Link
                to="/"
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                Clear
              </Link>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No matches. Try a different keyword.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((item, idx) => (
                  <VideoCard
                    key={item.id}
                    item={item}
                    ref={(el) => (videoRefs.current[idx] = el)}
                    isFocused={idx === focusedIndex}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {!q &&
          categories.map(({ name, slug, items }, catIdx) => (
            <section key={slug} className="space-y-4">
              <div className="flex items-center justify-between rounded-md bg-black/30 px-3 py-2">
                <h2 className="text-lg md:text-xl font-bold">{name}</h2>
                <Link
                  to={`/category/${slug}`}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
                  aria-label={`View all videos in ${name}`}
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.slice(0, 3).map((item, itemIdx) => {
                  const globalIdx = categories
                    .slice(0, catIdx)
                    .reduce((sum, c) => sum + Math.min(c.items.length, 3), 0) + itemIdx;
                  return (
                    <VideoCard
                      key={item.id}
                      item={item}
                      ref={(el) => (videoRefs.current[globalIdx] = el)}
                      isFocused={globalIdx === focusedIndex}
                    />
                  );
                })}
              </div>
            </section>
          ))}
      </div>
    </main>
  );
}

const VideoCard = forwardRef<
  HTMLAnchorElement,
  { item: FeedItem; isFocused: boolean }
>(({ item, isFocused }, ref) => {
  const watchHref = `/watch/${encodeURIComponent(item.id)}`;
  return (
    <Link
      ref={ref}
      to={watchHref}
      className={`group block overflow-hidden rounded-xl border bg-card hover:shadow-lg transition relative ${
        isFocused ? "ring-4 ring-primary shadow-xl scale-105" : ""
      }`}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="aspect-video w-full object-cover group-hover:opacity-90"
      />
      <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
        {formatDuration(item.content.duration)}
      </span>
      <div className="p-3">
        <h3 className="line-clamp-2 font-medium">{item.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(item.content.dateAdded).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
});

VideoCard.displayName = "VideoCard";
