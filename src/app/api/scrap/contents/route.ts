import { Page } from "puppeteer-core";

import { getApiResponse, getBrowser } from "@/utils/api";
import { ScrapTarget, scrapTargetInfo } from "@/utils/constant";

async function evalHanaTour(contentRootSelector: string, page: Page) {
  return await page.$$eval(contentRootSelector, (els) => {
    // 브라우저 컨택스트에서 실행되므로, 코드를 import 해오면 참조하지 못함.
    // --> 콜백 내에서 직접 기능 구현하여 사용
    const trimText = (str: string) => str.replace(/\n|\//g, "").trim();
    const removeParentheses = (str: string) =>
      str.replace(/\s*\([^)]*\)\s*/g, "");

    return els.map((el) => {
      const hasTopAlarm = el.querySelector("div.top_alarm");

      const row1 = el.querySelector("p.air:nth-of-type(1) > span");
      const row2 = el.querySelector(
        `div.item_course:nth-of-type(${hasTopAlarm ? 2 : 1})`
      );
      const departure: Record<string, string> = {
        airLine: row1?.childNodes[1]?.textContent || "",
        date: removeParentheses(row1?.lastChild?.firstChild?.textContent || ""),
        startLocation: row2?.firstChild?.firstChild?.textContent || "",
        startTime: row2?.firstChild?.lastChild?.firstChild?.textContent || "",
        endLocation: row2?.lastChild?.firstChild?.textContent || "",
        endTime: row2?.lastChild?.lastChild?.firstChild?.textContent || "",
      };

      for (const key in departure) {
        departure[key] = trimText(departure[key]);
      }

      const row3 = el.querySelector("p.air:nth-of-type(2) > span");
      const row4 = el.querySelector(
        `div.item_course:nth-of-type(${hasTopAlarm ? 3 : 2})`
      );
      const back: Record<string, string> = {
        airLine: row3?.childNodes[1]?.textContent || "",
        date: removeParentheses(row3?.lastChild?.firstChild?.textContent || ""),
        startLocation: row4?.firstChild?.firstChild?.textContent || "",
        startTime: row4?.firstChild?.lastChild?.firstChild?.textContent || "",
        endLocation: row4?.lastChild?.firstChild?.textContent || "",
        endTime: row4?.lastChild?.lastChild?.firstChild?.textContent || "",
      };

      for (const key in back) {
        back[key] = trimText(back[key]);
      }

      const row5 = el.querySelector("div.flight_price > div > a");
      const price = Number(
        trimText(
          row5?.querySelector("em > span")?.firstChild?.textContent || ""
        ).replace(/,/g, "")
      );
      const member = trimText(row5?.lastChild?.firstChild?.textContent || "");

      return {
        departure,
        back,
        price,
        member,
        scrapTarget: "HANA_TOUR" as ScrapTarget,
      };
    });
  });
}

async function evalModeTour(contentRootSelector: string, page: Page) {
  // 모두투어 스크래핑 보류
  return await page.$$eval(contentRootSelector, (els) => {
    return els.map((el) => {
      return {
        departure: {},
        back: {},
        price: 0,
        member: "",
        scrapTarget: "MODE_TOUR" as ScrapTarget,
      };
    });
  });
}

async function scrapPageByTarget(target: ScrapTarget, page: Page) {
  const { contentRootSelector } = scrapTargetInfo[target];

  await page.waitForSelector(contentRootSelector);

  switch (target) {
    case "HANA_TOUR":
      // 2개 탭으로 구성돼있음. 2번째 탭 클릭 필요
      const tab1 = await evalHanaTour(contentRootSelector, page);
      await page.click(
        "div#container > div > div:nth-of-type(3) > ul > li:nth-of-type(2) > a"
      );
      const tab2 = await evalHanaTour(contentRootSelector, page);

      return [...tab1, ...tab2];
    case "MODE_TOUR":
      const result = await evalModeTour(contentRootSelector, page);

      return result;
    case "ONLINE_TOUR":
      break;
    case "INTER_PARK":
      break;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("target") as ScrapTarget;
  const errorRes = getApiResponse("ERROR", null);
  const browser = await getBrowser();

  if (!scrapTargetInfo[target] || !browser) {
    return errorRes;
  }

  try {
    const { url } = scrapTargetInfo[target];
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const result = await scrapPageByTarget(target, page);

    return getApiResponse("OK", result);
  } catch {
    return errorRes;
  } finally {
    await browser.close();
  }
}
