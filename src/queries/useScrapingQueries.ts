import { useQuery } from "@tanstack/react-query";

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
  seqId: string;
  departure: Airport;
  back: Airport;
  price: number;
  member: string;
  scrapTarget: ScrapTarget;
  landingUrl?: string;
  transit?: string; // 직항, 경유 문자열
}

function useScrapinpgQuery(scrapTarget: ScrapTarget) {
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
    hanaTour: useScrapinpgQuery("HANA_TOUR"),
    onlineTour: useScrapinpgQuery("ONLINE_TOUR"),
  };
}
