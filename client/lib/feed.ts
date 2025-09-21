import type { FeedResponse } from "@shared/api";

const UPSTREAM =
  "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json";

async function fetchWithTimeout(url: string, opts: RequestInit = {}, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

export async function getFeed(): Promise<FeedResponse> {
  // Try local proxy first
  try {
    const r = await fetchWithTimeout("/api/feed", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (r.ok) return (await r.json()) as FeedResponse;
  } catch {}

  // Fallback to upstream (works on device/CAP apps without CORS)
  const up = await fetchWithTimeout(UPSTREAM, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  }, 12000);
  if (!up.ok) throw new Error(`Upstream feed failed: ${up.status}`);
  return (await up.json()) as FeedResponse;
}
