import { useQuery } from "@tanstack/react-query";

import { apiOrigin } from "@/utils/constant";

import { QUERY_KEY } from "./queryKeys";

export interface AirportData {
  "공항코드1(IATA)": string;
  "공항코드2(ICAO)": string | null;
  영문공항명: string;
  영문국가명: string;
  영문도시명: string;
  지역: string;
  한글공항: string;
  한글국가명: string;
}

export interface AirportInfo {
  page: number;
  perPage: number;
  totalCount: number;
  currentCount: number;
  matchCount: number;
  data: AirportData[];
}

export function useAirportQuery() {
  return useQuery<AirportInfo, Error, AirportData[]>({
    queryKey: [QUERY_KEY.AIRPORT],
    queryFn: async () => {
      const res = await fetch(`${apiOrigin}/api/airport`);
      const { result } = (await res.json()) as { result: AirportInfo };

      return result;
    },
    select: (originalData) => {
      return originalData.data;
    },
  });
}
