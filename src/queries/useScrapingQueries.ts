import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { apiBase, ScrapTarget } from "@/utils/constant";

import { QUERY_KEY } from "./queryKeys";

export interface Airport {
  airLine: string;
  date: string;
  startLocation: string;
  startTime: string;
  endLocation: string;
  endTime: string;
}

export interface ScrapingResultData {
  departure: Airport;
  back: Airport;
  price: number;
  member: string;
  scrapTarget: ScrapTarget;
  landingUrl?: string;
}

function scrapinpgQuery(scrapTarget: ScrapTarget) {
  return useQuery<ScrapingResultData[], Error>({
    queryKey: [QUERY_KEY.SCRAPING, scrapTarget],
    queryFn: async () => {
      const res = await fetch(
        `${apiBase}/api/scrap/contents?target=${scrapTarget}`
      );
      const data = (await res.json()) as { result: ScrapingResultData[] };

      return data.result;
    },
  });
}

export function useScrapingQueries() {
  return {
    hanaTour: scrapinpgQuery("HANA_TOUR"),
    // modeTour: scrapinpgQuery("MODE_TOUR"),
  };
}
