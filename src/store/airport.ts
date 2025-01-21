import { create } from "zustand";

import { apiOrigin } from "@/utils/constant";

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

type AirportGroupedByNation = { nationName: string; airports: AirportData[] };

interface AirportStore {
  isLoading: boolean;
  airportInfo?: AirportInfo;
  fetchAirport: () => Promise<void>;
  getAirportsGroupedByNation: () => AirportGroupedByNation[];
  getFilterdAirportsGroupedByNation: (
    airportName: string
  ) => AirportGroupedByNation[];
  getAirportData: (code: string) => AirportData | undefined;
}

export const airportStore = create<AirportStore>((set, get) => ({
  isLoading: false,
  airportInfo: undefined,
  async fetchAirport() {
    const { isLoading, airportInfo } = get();

    if (airportInfo || isLoading) {
      return;
    }

    set({ isLoading: true });

    const res = await fetch(`${apiOrigin}/api/airport`);

    if (res.ok) {
      const { result } = (await res.json()) as { result: AirportInfo };

      set({ airportInfo: result });
    }

    set({ isLoading: false });
  },
  getAirportsGroupedByNation() {
    const { airportInfo: { data = [] } = {} } = get();

    const groupedBy = Object.groupBy(data, (d) => d["한글국가명"]) as Record<
      string,
      AirportData[]
    >;

    return Object.keys(groupedBy).map((nat) => ({
      nationName: nat,
      airports: groupedBy[nat],
    }));
  },
  getFilterdAirportsGroupedByNation(airportName: string) {
    const { getAirportsGroupedByNation } = get();
    const nations = getAirportsGroupedByNation();

    if (!airportName) {
      return nations;
    }

    return nations.reduce<AirportGroupedByNation[]>((acc, nation) => {
      const results = nation.airports.filter((a) =>
        a.한글공항.includes(airportName)
      );

      if (results) {
        acc.push({ ...nation, airports: results });
      }

      return acc;
    }, []);
  },
  getAirportData(code: string) {
    const { airportInfo: { data = [] } = {} } = get();

    return data.find((d) => d["공항코드1(IATA)"] === code);
  },
}));
