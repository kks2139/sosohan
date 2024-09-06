export type ScrapTarget =
  | "HANA_TOUR"
  | "INTER_PARK"
  | "ONLINE_TOUR"
  | "MODE_TOUR";

export const targetToKorean: Record<ScrapTarget, string> = {
  HANA_TOUR: "하나투어",
  INTER_PARK: "인터파크",
  ONLINE_TOUR: "온라인투어",
  MODE_TOUR: "모드투어",
};
