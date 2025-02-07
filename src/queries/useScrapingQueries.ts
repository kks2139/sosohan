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

type OnlineTourTab = "AS" | "CH" | "JA" | "EU" | "HN" | "US";
export const ONLINE_TOUR_TAB_1: OnlineTourTab[] = ["AS", "CH", "JA"];
export const ONLINE_TOUR_TAB_2: OnlineTourTab[] = ["EU", "HN", "US"];
const ONLINE_TOUR_TAB_GROUPS = [ONLINE_TOUR_TAB_1, ONLINE_TOUR_TAB_2];

const SCRAP_URL = `${apiBase}/api/scrap/contents`;

async function fetchScrapingData(scrapTarget: ScrapTarget) {
  const res = await fetch(`${SCRAP_URL}?target=${scrapTarget}`);

  return (await res.json()) as { result: ScrapingResultData[] };
}

async function fetchOnlineTour(group: OnlineTourTab[]) {
  const res = await fetch(
    `${SCRAP_URL}?target=ONLINE_TOUR&online_tour_group=${group.join(",")}`
  );

  return (await res.json()) as { result: ScrapingResultData[] };
}

function useScrapinpgQuery(scrapTarget: ScrapTarget) {
  return useQuery<ScrapingResultData[], Error>({
    queryKey: [QUERY_KEY.SCRAPING, scrapTarget],
    queryFn: async () => {
      let result: ScrapingResultData[] = [];

      if (scrapTarget === "ONLINE_TOUR") {
        const promises = ONLINE_TOUR_TAB_GROUPS.map((group) =>
          fetchOnlineTour(group)
        );
        const tabResults = await Promise.all(promises);

        result = tabResults.reduce<ScrapingResultData[]>(
          (acc, now) => [...acc, ...now.result],
          []
        );
      } else {
        result = (await fetchScrapingData(scrapTarget)).result;
      }

      return result;
    },
  });
}

export function useScrapingQueries() {
  return {
    hanaTour: useScrapinpgQuery("HANA_TOUR"),
    onlineTour: useScrapinpgQuery("ONLINE_TOUR"),
  };
}
