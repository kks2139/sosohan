import puppeteer from "puppeteer";
import { ScrapTarget } from "@/utils/types";

interface Info {
  url: string;
  selector: string;
}

const targetMap: Record<ScrapTarget, Info> = {
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("target") as ScrapTarget;
  const errorResponse = new Response(null, {
    status: 500,
    headers: { "content-type": "application/json" },
  });

  // console.log("타겟: ", target, isDev);

  if (!targetMap[target]) {
    return errorResponse;
  }

  const browser = await puppeteer.launch({
    executablePath: await puppeteer.executablePath(),
    headless: true,
  });

  try {
    // browser.newPage 기본메서드
    // $ -> querySelector
    // $$ -> querySelectorAll
    // $eval -> $ + evaluate()
    // $$eval -> $$ + evaluate()

    const page = await browser.newPage();
    const { url, selector } = targetMap[target];

    await page.goto(url);
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

    console.log("스크랩 로깅: ", result[0][0]);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return errorResponse;
  } finally {
    await browser.close();
  }
}
