import puppeteer, { Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ScrapTarget } from "@/utils/types";
import { isDev } from "@/utils/constant";

interface Info {
  url: string;
  rootSelector: string;
}

const targetMap: Record<ScrapTarget, Info> = {
  HANA_TOUR: {
    url: "https://m.hanatour.com/trp/air/CHPC0AIR0233M100",
    rootSelector:
      "#container > div > div.js_tabs.v-tabs > div > div > div.sp_list_wrap > ul > li",
  },
  INTER_PARK: {
    url: "https://search-travel.interpark.com/search?q=%ED%95%AD%EA%B3%B5%EA%B6%8C&cateCode=tourE",
    rootSelector: "#boxList > li",
  },
  ONLINE_TOUR: {
    url: "https://www.onlinetour.co.kr/flight/w/international/dcair/dcairList",
    rootSelector: "#data_list > li",
  },
  MODE_TOUR: {
    url: "https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22%22%2C%22arrivalCity%22%3A%22%22%2C%22continentCode%22%3A%22ASIA%22%2C%22departureDate%22%3A%222024-09-02%22%2C%22arrivalDate%22%3A%222024-10-02%22%7D",
    rootSelector:
      "#main-layout-pc > main > div > div > div > div:nth-child(6) > div:nth-child(2) > div > div > div > div > div > div",
  },
} as const;

async function scrapPageByTarget(target: ScrapTarget, page: Page) {
  const { rootSelector } = targetMap[target];

  await page.waitForSelector(rootSelector);

  switch (target) {
    case "HANA_TOUR":
      return await page.$$eval(rootSelector, (els) => {
        // 브라우저 컨택스트에서 실행되므로, 코드를 import 해오면 참조하지 못함.
        // --> 콜백 내에서 직접 기능 구현하여 사용
        const trimText = (str: string) => str.replace(/\n|\//g, "").trim();

        return els.map((el) => {
          const row1 = el.querySelector("p:nth-child(2) > span");
          const row2 = el.querySelector("div:nth-child(3)");
          const departure: Record<string, string> = {
            airLine: row1?.childNodes[1]?.textContent || "",
            date: row1?.lastChild?.firstChild?.textContent || "",
            startLocation: row2?.firstChild?.firstChild?.textContent || "",
            startTime:
              row2?.firstChild?.lastChild?.firstChild?.textContent || "",
            endLocation: row2?.lastChild?.firstChild?.textContent || "",
            endTime: row2?.lastChild?.lastChild?.firstChild?.textContent || "",
          };

          for (const key in departure) {
            departure[key] = trimText(departure[key]);
          }

          const row3 = el.querySelector("p:nth-child(4)");
          const row4 = el.querySelector("div:nth-child(5)");
          const back: Record<string, string> = {
            airLine: row3?.childNodes[1]?.textContent || "",
            date: row3?.lastChild?.firstChild?.textContent || "",
            startLocation: row4?.firstChild?.firstChild?.textContent || "",
            startTime:
              row4?.firstChild?.lastChild?.firstChild?.textContent || "",
            endLocation: row4?.lastChild?.firstChild?.textContent || "",
            endTime: row4?.lastChild?.lastChild?.firstChild?.textContent || "",
          };

          for (const key in back) {
            back[key] = trimText(back[key]);
          }

          const row5 = el.querySelector("div.flight_price > div > a");
          const price = trimText(
            row5?.querySelector("em > span")?.firstChild?.textContent || "",
          );
          const member = trimText(
            row5?.lastChild?.firstChild?.textContent || "",
          );

          return {
            departure,
            back,
            price,
            member,
          };
        });
      });
    // TODO: 나머지 페이지들 스크랩 세분화
    case "ONLINE_TOUR":
      break;
    case "MODE_TOUR":
      break;
    case "INTER_PARK":
      break;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("target") as ScrapTarget;
  const errorResponse = new Response(null, {
    status: 500,
    headers: { "content-type": "application/json" },
  });

  if (!targetMap[target]) {
    return errorResponse;
  }

  chromium.setGraphicsMode = false;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: isDev
      ? await puppeteer.executablePath("chrome")
      : await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const { url } = targetMap[target];
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const result = await scrapPageByTarget(target, page);

    console.log("성공!");

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
