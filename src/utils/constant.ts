import { StaticImageData } from "next/image";

import LogoAirasia from "@/assets/img/airline-logo/logo_airasia.png";
import LogoAirbusan from "@/assets/img/airline-logo/logo_airbusan.png";
import LogoAirpremia from "@/assets/img/airline-logo/logo_airpremia.png";
import LogoAirseoul from "@/assets/img/airline-logo/logo_airseoul.png";
import LogoAsiana from "@/assets/img/airline-logo/logo_asiana.png";
import LogoBasic from "@/assets/img/airline-logo/logo_basic.png";
import LogoCatar from "@/assets/img/airline-logo/logo_catar.png";
import LogoChinanambang from "@/assets/img/airline-logo/logo_chinanambang.png";
import LogoDeahan from "@/assets/img/airline-logo/logo_deahan.png";
import LogoEsta from "@/assets/img/airline-logo/logo_esta.png";
import LogoEtihard from "@/assets/img/airline-logo/logo_etihard.png";
import LogoFinland from "@/assets/img/airline-logo/logo_finland.png";
import LogoGba from "@/assets/img/airline-logo/logo_gba.png";
import LogoHawaian from "@/assets/img/airline-logo/logo_hawaian.png";
import LogoHongkong from "@/assets/img/airline-logo/logo_hongkong.png";
import LogoJeju from "@/assets/img/airline-logo/logo_jeju.png";
import LogoJetstar from "@/assets/img/airline-logo/logo_jetstar.png";
import LogoJinair from "@/assets/img/airline-logo/logo_jinair.png";
import LogoJunghuwa from "@/assets/img/airline-logo/logo_junghuwa.png";
import LogoSwiss from "@/assets/img/airline-logo/logo_swiss.png";
import LogoTurkey from "@/assets/img/airline-logo/logo_turkey.png";
import LogoTway from "@/assets/img/airline-logo/logo_tway.png";

export const isDev = process.env.NODE_ENV === "development";

export const apiBase = isDev
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
  MODE_TOUR: "모두투어",
};

export const scrapTargetInfo: Record<
  ScrapTarget,
  {
    url: string;
    originalUrl?: string;
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
    // 파라미터 TabGubun -> AS, CH, JA, EU, HN, US
    url: "https://www.onlinetour.co.kr/flight/w/international/dcair/dcairList?TabGubun=AS",
    originalUrl:
      "https://www.onlinetour.co.kr/flight/w/international/dcair/dcairList",
    contentRootSelector: "#data_list > li",
  },
  MODE_TOUR: {
    url: "https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22%22%2C%22arrivalCity%22%3A%22%22%2C%22continentCode%22%3A%22ASIA%22%2C%22departureDate%22%3A%222024-09-02%22%2C%22arrivalDate%22%3A%222024-10-02%22%7D",
    contentRootSelector:
      "#main-layout-pc > main .ant-spin-container > div > div > div",
  },
};

export function getAirLineLogo(str: string) {
  const logoMap: Record<string, StaticImageData> = {
    대한항공: LogoDeahan,
    아시아나항공: LogoAsiana,
    티웨이항공: LogoTway,
    제주공항: LogoJeju,
    에어부산: LogoAirbusan,
    진에어: LogoJinair,
    이스타항공: LogoEsta,
    에어서울: LogoAirseoul,
    에어아시아: LogoAirasia,
    젯스타항공: LogoJetstar,
    제트스타: LogoJetstar,
    에티하드항공: LogoEtihard,
    카타르항공: LogoCatar,
    터키항공: LogoTurkey,
    에어프레미아: LogoAirpremia,
    스위스항공: LogoSwiss,
    핀란드항공: LogoFinland,
    중국남방항공: LogoChinanambang,
    GBA항공: LogoGba,
    홍콩에어: LogoHongkong,
    중화항공: LogoJunghuwa,
    하와이안항공: LogoHawaian,
  };

  const filteredKey = Object.keys(logoMap).filter((key) =>
    key.includes(str.replace(/\s+/g, ""))
  )[0];

  return filteredKey ? logoMap[filteredKey] : LogoBasic;
}
