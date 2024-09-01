import puppeteer, { Browser } from "puppeteer";

// browser.newPage 기본메서드
// $ -> querySelector
// $ -> querySelectorAll
// $eval -> $ + evaluate()
// $$eval -> $$ + evaluate()

export type Target = "HANA_TOUR" | "INTER_PARK" | "ONLINE_TOUR" | "MODE_TOUR";
export const targetToKorean: Record<Target, string> = {
  HANA_TOUR: "하나투어",
  INTER_PARK: "인터파크",
  ONLINE_TOUR: "온라인투어",
  MODE_TOUR: "모드투어",
};

interface Info {
  url: string;
  selector: string;
}

interface ScrapResult {
  isError?: boolean;
  result: string[][];
}

const targetMap: Record<Target, Info> = {
  HANA_TOUR: {
    url: "https://m.hanatour.com/trp/air/CHPC0AIR0233M100",
    selector:
      "#container > div > div.js_tabs.v-tabs > div > div > div.sp_list_wrap > ul > li",
  },
  INTER_PARK: {
    url: "https://search-travel.interpark.com/search?q=%ED%95%AD%EA%B3%B5%EA%B6%8C&cateCode=tourE",
    selector: "#boxList > li",
  },
  ONLINE_TOUR: {
    url: "https://www.onlinetour.co.kr/flight/w/international/dcair/dcairList",
    selector: "#data_list > li",
  },
  MODE_TOUR: {
    url: "https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22%22%2C%22arrivalCity%22%3A%22%22%2C%22continentCode%22%3A%22ASIA%22%2C%22departureDate%22%3A%222024-09-02%22%2C%22arrivalDate%22%3A%222024-10-02%22%7D",
    selector:
      "#main-layout-pc > main > div > div > div > div:nth-child(6) > div:nth-child(2) > div > div > div > div > div > div",
  },
} as const;

export class Scrap {
  private target: Target;

  constructor(target: Target) {
    this.target = target;
  }

  async getData(): Promise<ScrapResult> {
    let browser: Browser | undefined;

    try {
      browser = await puppeteer.launch({
        headless: true, // false: 브라우저 창을 띄워서 처리과정을 볼 수 있음 (기본값: true)
      });
      const page = await browser.newPage();
      const { url, selector } = targetMap[this.target];

      await page.goto(url, { waitUntil: "domcontentloaded" });
      // 원하는 셀렉터를 찾을때까지 기다린다
      await page.waitForSelector(selector);

      const result: string[][] = await page.$$eval(selector, (els) =>
        els.map((el) => {
          const info = Array.from(el.childNodes)
            .map(({ textContent }) =>
              textContent ? textContent.trim().replace("BEST", "") : "",
            )
            .filter((text) => text);

          return info;
        }),
      );

      // TODO: 로깅용
      console.log(result[0][0]);

      return {
        result,
      };
    } catch {
      return {
        isError: true,
        result: [],
      };
    } finally {
      await browser?.close();
    }
  }
}
