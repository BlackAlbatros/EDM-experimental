import type { FeedResponse } from "@shared/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFeedQuery } from "@/hooks/use-feed-query";

export default function WatchPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const videoId = params.id ? decodeURIComponent(params.id) : "";

  const { data, isLoading, error } = useFeedQuery();

  if (!videoId) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4">
        <p className="text-destructive">Missing video identifier.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Loading…</div>;
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4">
        <p className="text-destructive">Failed to load video.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  const video = data.shortFormVideos.find((item) => item.id === videoId);
  if (!video) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4">
        <p className="text-destructive">Video not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  const source = video.content?.videos?.[0]?.url;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          ← Back
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Home
        </Link>
      </div>

      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl bg-black">
          {source ? (
            <video
              key={video.id}
              controls
              autoPlay
              playsInline
              poster={video.thumbnail ?? undefined}
              className="aspect-video w-full"
              src={source}
            >
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <div className="p-6 text-destructive">
              No video source available for this item.
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold md:text-3xl">{video.title}</h1>
          {video.shortDescription && (
            <p className="text-sm text-muted-foreground md:text-base">
              {video.shortDescription}
            </p>
          )}
          <div className="text-xs text-muted-foreground md:text-sm">
            <span className="font-medium">Published:</span>{" "}
            {new Date(video.content?.dateAdded ?? Date.now()).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
