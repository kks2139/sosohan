import { create } from "zustand";

import { AirportData } from "@/queries/useAirportQuery";

export type InputAirportType = "start" | "end";

interface AirportStore {
  selectedStartAirport: AirportData | undefined;
  selectedEndAirport: AirportData | undefined;
  setSelectedAirport: (
    type: InputAirportType,
    airport: AirportData | undefined
  ) => void;
}

export const airportStore = create<AirportStore>((set) => ({
  selectedStartAirport: undefined,
  selectedEndAirport: undefined,
  setSelectedAirport: (type, airport) => {
    if (type === "start") {
      set({ selectedStartAirport: airport });
    } else {
      set({ selectedEndAirport: airport });
    }
  },
}));
