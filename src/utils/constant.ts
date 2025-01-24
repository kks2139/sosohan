export const isDev = process.env.NODE_ENV === "development";

export const apiOrigin = isDev
  ? "http://localhost:3000"
  : "https://sosohan.vercel.app";

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

export const scrapTargetInfo: Record<
  ScrapTarget,
  {
    url: string;
    contentRootSelector: string;
  }
> = {
  HANA_TOUR: {
    url: "https://m.hanatour.com/trp/air/CHPC0AIR0233M100",
    contentRootSelector:
      "#container > div > div.js_tabs.v-tabs > div > div > div.sp_list_wrap > ul > li",
  },
  INTER_PARK: {
    url: "https://search-travel.interpark.com/search?q=%ED%95%AD%EA%B3%B5%EA%B6%8C&cateCode=tourE",
    contentRootSelector: "#boxList > li",
  },
  ONLINE_TOUR: {
    url: "https://www.onlinetour.co.kr/flight/w/international/dcair/dcairList",
    contentRootSelector: "#data_list > li",
  },
  MODE_TOUR: {
    url: "https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22%22%2C%22arrivalCity%22%3A%22%22%2C%22continentCode%22%3A%22ASIA%22%2C%22departureDate%22%3A%222024-09-02%22%2C%22arrivalDate%22%3A%222024-10-02%22%7D",
    contentRootSelector:
      "#main-layout-pc > main > div > div > div > div:nth-child(6) > div:nth-child(2) > div > div > div > div > div > div",
  },
};
