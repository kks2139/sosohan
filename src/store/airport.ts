import { create } from "zustand";

import { AirportData } from "@/queries/useAirportQuery";

interface AirportStore {
  selectedStartAirport: AirportData | undefined;
  selectedEndAirport: AirportData | undefined;
  getIsSelectedAirport: () => boolean;
  setSelectedAirport: (
    type: "start" | "end",
    airport: AirportData | undefined
  ) => void;
}

export const airportStore = create<AirportStore>((set, get) => ({
  selectedStartAirport: undefined,
  selectedEndAirport: undefined,
  getIsSelectedAirport: () => {
    const { selectedStartAirport, selectedEndAirport } = get();

    return !!(
      selectedStartAirport?.["공항코드1(IATA)"] &&
      selectedEndAirport?.["공항코드1(IATA)"]
    );
  },
  setSelectedAirport: (type, airport) => {
    if (type === "start") {
      set({ selectedStartAirport: airport });
    } else {
      set({ selectedEndAirport: airport });
    }
  },
}));
