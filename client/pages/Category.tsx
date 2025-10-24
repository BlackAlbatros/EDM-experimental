import { Link, useParams } from "react-router-dom";
import type { FeedItem } from "@shared/api";
import { slugify, formatDuration } from "@/lib/utils";
import { useFeedQuery } from "@/hooks/use-feed-query";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [activeVideoId, setActiveVideoId] = useState<string>("");
  const params = useParams();
  const slug = params.slug ?? "";
  const { data, isLoading, error } = useFeedQuery();

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (error || !data) return <div className="p-6">Failed to load.</div>;

  const items = data.shortFormVideos.filter((v) => {
    const tag = (v.tags?.[0] ?? "").toString();
    return slugify(tag) === slug;
  });

  // Set active video to first item on mount
  if (!activeVideoId && items.length > 0) {
    setActiveVideoId(items[0].id);
  }

  return (
    <div className="container mx-auto px-4 py-6 pt-20">
      <div className="mb-6 flex items-center justify-between rounded-md bg-black/30 px-3 py-2">
        <h2 className="text-xl md:text-2xl font-bold capitalize">
          {slug.replace(/-/g, " ")}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          ← Back
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <VideoCard
            key={item.id}
            item={item}
            isActive={index === 0}
            onHover={() => setActiveVideoId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function VideoCard({
  item,
  isActive = false,
  onHover
}: {
  item: FeedItem
  isActive?: boolean
  onHover?: () => void
}) {
  const watchHref = `/watch/${encodeURIComponent(item.id)}`;
  return (
    <Link
      to={watchHref}
      onMouseEnter={onHover}
      className={`group block overflow-hidden rounded-xl border bg-card transition-all duration-200 relative ${
        isActive
          ? 'border-primary shadow-lg ring-2 ring-primary ring-offset-2'
          : 'border-border hover:border-primary hover:shadow-lg'
      }`}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className={`aspect-video w-full object-cover transition-all duration-200 ${
          isActive
            ? 'opacity-95 brightness-110'
            : 'group-hover:opacity-95 group-hover:brightness-105'
        }`}
      />
      <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
        {formatDuration(item.content.duration)}
      </span>
      {isActive && (
        <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
          Featured
        </span>
      )}
      <div className="p-3">
        <h3 className="line-clamp-2 font-medium">{item.title}</h3>
      </div>
    </Link>
  );
}
