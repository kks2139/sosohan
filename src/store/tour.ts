import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type MemberType = "ADULT" | "CHILD" | "BABY";

export interface Member {
  type: MemberType;
  count: number;
}

export const memberTypeToKorean: Record<MemberType, string> = {
  ADULT: "성인",
  CHILD: "유아",
  BABY: "소아",
};

interface TourStore {
  departureArea: string;
  departureDate?: string;
  arrivalArea?: string;
  arrivalDate?: string;
  members: Member[];
  setDepartureArea: (value: string) => void;
  setDepartureDate: (value: string) => void;
  setArrivalArea: (value: string) => void;
  setArrivalDate: (value: string) => void;
  setMembers: (value: Member[]) => void;
  isInfoComplete: boolean;
}

export const tourStore = create<TourStore>()(
  immer((set, get) => ({
    departureArea: "ICN",
    departureDate: undefined,
    arrivalArea: undefined,
    arrivalDate: undefined,
    members: [],
    setDepartureArea(value) {
      set({ departureArea: value });
    },
    setDepartureDate(value) {
      set({ departureDate: value });
    },
    setArrivalArea(value) {
      set({ arrivalArea: value });
    },
    setArrivalDate(value) {
      set({ arrivalDate: value });
    },
    setMembers(value) {
      set({ members: value });
    },
    get isInfoComplete() {
      const {
        departureArea,
        departureDate,
        arrivalArea,
        arrivalDate,
        members,
      } = get();

      return (
        !!departureArea &&
        !!departureDate &&
        !!arrivalArea &&
        !!arrivalDate &&
        !!members.length
      );
    },
  }))
);
