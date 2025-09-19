import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  try {
    const res = await fetch(
      "https://clickseffect.com/r7o1k1u130elect/electronicrocksr7o1k1u1303/feed/feed.json",
      { headers: { "cache-control": "no-cache" } },
    );
    const data = await res.json();
    const items = Array.isArray(data?.shortFormVideos)
      ? data.shortFormVideos
      : [];
    const count = items.length;
    const latest = items
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(b?.content?.dateAdded ?? 0).getTime() -
          new Date(a?.content?.dateAdded ?? 0).getTime(),
      )[0];

    console.log(
      JSON.stringify(
        {
          sampledAt: new Date().toISOString(),
          count,
          latestId: latest?.id,
          latestDate: latest?.content?.dateAdded,
        },
        null,
        2,
      ),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, count }),
    };
  } catch (e) {
    console.error("weekly-feed error", e);
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};
