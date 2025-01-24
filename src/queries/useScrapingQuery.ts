import { useQuery } from "@tanstack/react-query";

import { apiOrigin } from "@/utils/constant";

import { QUERY_KEY } from "./queryKeys";

interface Airport {
  airLine: string;
  date: string;
  startLocation: string;
  startTime: string;
  endLocation: string;
  endTime: string;
}

interface ResponseData {
  departure: Airport;
  back: Airport;
  price: string;
  member: string;
}

export function useScrapingQuery() {
  return useQuery<ResponseData>({
    queryKey: [QUERY_KEY.SCRAPING],
    queryFn: async () => {
      const res = await fetch(
        `${apiOrigin}/api/scrap/contents?target=HANA_TOUR`
      );

      return (await res.json()) as ResponseData;
    },
  });
}
