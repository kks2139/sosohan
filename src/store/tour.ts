import { AreaCode } from "@/utils/constant";
import { create } from "zustand";

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

interface TourInfo {
  departureArea: AreaCode;
  departureDate?: string;
  arrivalArea?: AreaCode;
  arrivalDate?: string;
  members: Member[];
}

interface TourInfoAction {
  setDepartureArea: (value: AreaCode) => void;
  setDepartureDate: (value: string) => void;
  setArrivalArea: (value: AreaCode) => void;
  setArrivalDate: (value: string) => void;
  setMembers: (value: Member[]) => void;
}

export const tourStore = create<TourInfo & TourInfoAction>((set) => ({
  departureArea: "ICN",
  departureDate: undefined,
  arrivalArea: undefined,
  arrivalDate: undefined,
  members: [],
  setDepartureArea: (value) => {
    set({ departureArea: value });
  },
  setDepartureDate: (value) => {
    set({ departureDate: value });
  },
  setArrivalArea: (value) => {
    set({ arrivalArea: value });
  },
  setArrivalDate: (value) => {
    set({ arrivalDate: value });
  },
  setMembers: (value) => {
    set({ members: [...value] });
  },
}));
