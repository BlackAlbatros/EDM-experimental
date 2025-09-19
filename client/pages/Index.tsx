import { useQuery } from "@tanstack/react-query";
import type { FeedResponse, FeedItem } from "@shared/api";
import { Banner } from "@/components/Banner";
import { Link } from "react-router-dom";
import { parseDate, slugify } from "@/lib/utils";

export default function Index() {
  const { data, isLoading, error } = useQuery<FeedResponse>({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await fetch("/api/feed");
      if (!res.ok) throw new Error("Failed to load feed");
      return (await res.json()) as FeedResponse;
    },
  });

  const total = data?.shortFormVideos.length ?? 0;

  // Group by first tag (category)
  const byCategory = new Map<string, FeedItem[]>();
  if (data?.shortFormVideos) {
    for (const item of data.shortFormVideos) {
      const tag = (item.tags?.[0] ?? "Other").toString();
      if (!byCategory.has(tag)) byCategory.set(tag, []);
      byCategory.get(tag)!.push(item);
    }
  }

  const categories = Array.from(byCategory.entries()).map(([name, items]) => ({
    name,
    slug: slugify(name),
    items: [...items].sort((a, b) => parseDate(b.content?.dateAdded) - parseDate(a.content?.dateAdded)),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-black/5">
      <div className="container mx-auto px-4 py-6 space-y-8">
        <Banner total={total} />

        {isLoading && <div className="p-6">Loading…</div>}
        {error && <div className="p-6 text-destructive">Failed to load feed.</div>}

        {categories.map(({ name, slug, items }) => (
          <section key={slug} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">{name}</h2>
              <Link
                to={`/category/${slug}`}
                className="text-primary hover:underline"
                aria-label={`View all videos in ${name}`}
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items.slice(0, 3).map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function VideoCard({ item }: { item: FeedItem }) {
  const videoUrl = item.content.videos?.[0]?.url;
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl border bg-card hover:shadow-lg transition"
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="aspect-video w-full object-cover group-hover:opacity-90"
      />
      <div className="p-3">
        <h3 className="line-clamp-2 font-medium">{item.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(item.content.dateAdded).toLocaleDateString()}
        </p>
      </div>
    </a>
  );
}
