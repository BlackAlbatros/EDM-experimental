import type { FeedResponse } from "@shared/api";

const UPSTREAM =
  "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json";

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
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(t);
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
    const reason = proxyError instanceof Error ? `: ${proxyError.message}` : "";
    throw new Error(`Feed request failed${reason}`);
  }

  const upstream = await fetchWithTimeout(UPSTREAM, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return await ensureJsonResponse(upstream, "Upstream feed");
}
