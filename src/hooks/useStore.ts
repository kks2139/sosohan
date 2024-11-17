import { airportStore } from "@/store/airport";
import { tourStore } from "@/store/tour";
import { toastStore } from "@/store/ui";

export function useStore() {
  return {
    tourStore: tourStore(),
    airportStore: airportStore(),
    toastStore: toastStore(),
  };
}
