import type { RequestHandler } from "express";

// Simple in-memory cache for the feed to avoid frequent upstream hits
let cached: { data: unknown; fetchedAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export const handleFeed: RequestHandler = async (_req, res) => {
  try {
    if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
      return res.status(200).json(cached.data);
    }

    const upstream = await fetch(
      "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json",
      { headers: { "cache-control": "no-cache" } },
    );
    if (!upstream.ok) {
      return res.status(502).json({ error: "Failed to fetch upstream feed" });
    }
    const data = await upstream.json();
    cached = { data, fetchedAt: Date.now() };
    res.status(200).json(data);
  } catch (err) {
    console.error("/api/feed error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
