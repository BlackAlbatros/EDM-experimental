import { useQuery } from "@tanstack/react-query";
import type { FeedResponse } from "@shared/api";

export function useFeedQuery() {
  return useQuery<FeedResponse>({
    queryKey: ["feed"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => await (await import("@/lib/feed")).getFeed(),
  });
}
