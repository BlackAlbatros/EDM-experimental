import type { FeedResponse } from "@shared/api";

const UPSTREAM =
  "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json";

let fallbackCache: FeedResponse | null = null;

async function loadFallbackFeed() {
  if (fallbackCache) return fallbackCache;

  try {
    const mod = await import("@/lib/feed-fallback.json");
    fallbackCache =
      (mod as { default?: FeedResponse }).default ?? (mod as FeedResponse);
    return fallbackCache;
  } catch (err) {
    throw new Error(
      `Feed failed and local fallback could not load: ${String(
        (err as Error)?.message ?? err,
      )}`,
    );
  }
}

function canUseDirectUpstream() {
  if (typeof window === "undefined") return true;
  const cap = (window as unknown as { Capacitor?: any })?.Capacitor;
  if (!cap) return false;

  if (typeof cap.isNativePlatform === "function") {
    try {
      return Boolean(cap.isNativePlatform());
    } catch {}
  }

  try {
    const platform =
      typeof cap.getPlatform === "function" ? cap.getPlatform() : cap.platform;
    return platform && platform !== "web";
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {},
  ms = 12_000,
) {
  if (typeof AbortController === "undefined" || ms <= 0) {
    return fetch(url, opts);
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);

  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } catch (err: any) {
    if (err?.name === "AbortError") {
      return await fetch(url, opts);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function ensureJsonResponse(res: Response, context: string) {
  if (!res.ok) {
    let body: string | undefined;
    try {
      body = await res.text();
    } catch {}
    throw new Error(
      `${context} responded ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`,
    );
  }
  return (await res.json()) as FeedResponse;
}

export async function getFeed(): Promise<FeedResponse> {
  let proxyError: unknown;

  try {
    const res = await fetchWithTimeout("/api/feed", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    return await ensureJsonResponse(res, "/api/feed");
  } catch (err) {
    proxyError = err;
  }

  if (!canUseDirectUpstream()) {
    if (proxyError) {
      console.warn("/api/feed failed, using baked fallback", proxyError);
    }
    return await loadFallbackFeed();
  }

  const upstream = await fetchWithTimeout(UPSTREAM, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  try {
    return await ensureJsonResponse(upstream, "Upstream feed");
  } catch (err) {
    console.warn("Upstream feed failed, using baked fallback", err);
    return await loadFallbackFeed();
  }
}
