import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFeedQuery } from "@/hooks/use-feed-query";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { EngageAds } from "@/components/EngageAds";
import { Capacitor } from "@capacitor/core";

export default function WatchPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const videoId = params.id ? decodeURIComponent(params.id) : "";
  const [showControls, setShowControls] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const { isUSA, loading: geoLoading, error: geoError } = useGeoLocation();

  useEffect(() => {
    if (!geoLoading) {
      if (isUSA) {
        setShowAds(true);
      } else {
        navigate("/watch/" + encodeURIComponent(videoId), { replace: true });
      }
    }
  }, [isUSA, geoLoading, videoId, navigate]);

  useEffect(() => {
    const handleBackButton = async () => {
      if (Capacitor?.isNativePlatform?.()) {
        try {
          const core = await import("@capacitor/core");
          const AppClass = (core as any).App;
          if (AppClass?.addListener) {
            const listener = AppClass.addListener("backButton", () => {
              navigate(-1);
              listener?.remove?.();
            });
          }
        } catch (err) {
          console.warn("Back button handler setup failed", err);
        }
      }
    };
    handleBackButton();
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Fire TV remote center/select button (Enter key)
      if (e.key === "Enter" || e.key === " ") {
        setShowControls((prev) => !prev);
      }
      // ESC to hide controls
      if (e.key === "Escape") {
        setShowControls(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  if (geoLoading) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (showAds && isUSA) {
    return (
      <div className="fixed inset-0 z-50">
        <EngageAds onAdClose={() => setShowAds(false)} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {source ? (
        <>
          <video
            key={video.id}
            controls
            autoPlay
            playsInline
            poster={video.thumbnail ?? undefined}
            className="h-full w-full"
            src={source}
          >
            Your browser does not support HTML5 video.
          </video>
          {showControls && (
            <div className="absolute bottom-16 left-0 right-0 flex items-center gap-2 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pb-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                ← Back
              </button>
              <Link
                to="/"
                className="rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Home
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-white">No video source available for this item.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md bg-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-white/30"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
