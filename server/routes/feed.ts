import type { RequestHandler } from "express";

// Simple in-memory cache for the feed to avoid frequent upstream hits
let cached: { data: unknown; fetchedAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export const handleFeed: RequestHandler = async (_req, res) => {
  try {
    if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
      return res.status(200).json(cached.data);
    }

    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10_000);
    const upstream = await fetch(
      "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json",
      {
        headers: {
          "cache-control": "no-cache",
          Accept: "application/json",
          "User-Agent": "MuziqRocks/1.0 (+https://muziq.rocks)",
        },
        signal: ctrl.signal,
      },
    ).finally(() => clearTimeout(t));
    if (!upstream.ok) {
      const txt = await upstream.text();
      return res
        .status(502)
        .json({
          error: "Failed to fetch upstream feed",
          status: upstream.status,
          body: txt?.slice(0, 500),
        });
    }
    const data = await upstream.json();
    cached = { data, fetchedAt: Date.now() };
    res.status(200).json(data);
  } catch (err: any) {
    console.error("/api/feed error", err);
    res
      .status(500)
      .json({
        error: "Internal server error",
        message: String(err?.message || err),
      });
  }
};
