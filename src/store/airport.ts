import { create } from "zustand";

import { AirportData } from "@/queries/useAirportQuery";

interface AirportStore {
  selectedStartAirport: AirportData | undefined;
  selectedEndAirport: AirportData | undefined;
  setSelectedAirport: (
    type: "start" | "end",
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
