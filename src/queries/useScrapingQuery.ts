import { useQuery } from "@tanstack/react-query";

import { apiOrigin } from "@/utils/constant";

export function useScrapingQuery() {
  return useQuery({
    queryKey: ["scraping"],
    queryFn: async () => {
      const res = await fetch(
        `${apiOrigin}/api/scrap/contents?target=HANA_TOUR`
      );

      if (!res.ok) {
        return;
      }

      return await res.json();
    },
  });
}
