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
  departureCode: string;
  departureDate?: string;
  arrivalCode?: string;
  arrivalDate?: string;
  members: Member[];
  setDepartureCode: (value: string) => void;
  setDepartureDate: (value: string) => void;
  setArrivalCode: (value: string) => void;
  setArrivalDate: (value: string) => void;
  setMembers: (value: Member[]) => void;
  getIsInfoComplete: () => boolean;
}

export const tourStore = create<TourStore>()(
  immer((set, get) => ({
    departureCode: "ICN",
    departureDate: undefined,
    arrivalCode: undefined,
    arrivalDate: undefined,
    members: [],
    setDepartureCode(value) {
      set({ departureCode: value });
    },
    setDepartureDate(value) {
      set({ departureDate: value });
    },
    setArrivalCode(value) {
      set({ arrivalCode: value });
    },
    setArrivalDate(value) {
      set({ arrivalDate: value });
    },
    setMembers(value) {
      set({ members: value });
    },
    getIsInfoComplete() {
      const {
        departureCode,
        departureDate,
        arrivalCode,
        arrivalDate,
        members,
      } = get();

      return (
        !!departureCode &&
        !!departureDate &&
        !!arrivalCode &&
        !!arrivalDate &&
        !!members.length
      );
    },
  }))
);
