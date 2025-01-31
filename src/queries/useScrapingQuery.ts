import { useQuery } from "@tanstack/react-query";

import { apiOrigin, ScrapTarget } from "@/utils/constant";

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
}

interface ResponseData {
  result: ScrapingResultData[];
}

export function useScrapingQuery() {
  return useQuery<ScrapingResultData[], Error>({
    queryKey: [QUERY_KEY.SCRAPING],
    queryFn: async () => {
      const res = await fetch(
        `${apiOrigin}/api/scrap/contents?target=HANA_TOUR`
      );

      const data = (await res.json()) as ResponseData;

      return data.result;
    },
  });
}
