import { Page } from "puppeteer-core";

import { getApiResponse, getBrowser } from "@/utils/api";
import { ScrapTarget, scrapTargetInfo } from "@/utils/constant";

async function evalHanaTour(contentRootSelector: string, page: Page) {
  return await page.$$eval(contentRootSelector, (els) => {
    // 브라우저 컨택스트에서 실행되므로, 외부선언된 코드는 참조하지 못함.
    // --> 콜백 내에서 직접 기능 구현하여 사용
    const trimText = (str: string) => str.replace(/\n|\//g, "").trim();
    const removeParentheses = (str: string) =>
      str.replace(/\s*\([^)]*\)\s*/g, "");

    const now = Date.now();

    return els.map((el, idx) => {
      const hasTopAlarm = el.querySelector("div.top_alarm");

      const row1 = el.querySelector("p.air:nth-of-type(1) > span");
      const row2 = el.querySelector(
        `div.item_course:nth-of-type(${hasTopAlarm ? 2 : 1})`
      );
      const departure: Record<string, string> = {
        airLine: row1?.childNodes[1]?.textContent || "",
        date: removeParentheses(
          row1?.lastChild?.firstChild?.textContent || ""
        ).replace(/\./g, "-"),
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
        date: removeParentheses(
          row3?.lastChild?.firstChild?.textContent || ""
        ).replace(/\./g, "-"),
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
        seqId: `${now}_${idx}_HANA_TOUR`,
        departure,
        back,
        price,
        member,
        scrapTarget: "HANA_TOUR" as ScrapTarget,
        landingUrl: "",
      };
    });
  });
}

async function evalModeTour(contentRootSelector: string, page: Page) {
  // 모두투어 스크래핑 보류
  return await page.$$eval(contentRootSelector, (els) => {
    return els.map(() => {
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

async function evalOnlineTour(
  contentRootSelector: string,
  page: Page,
  tabName: string
) {
  const nthDirectFlight = (i: number) =>
    `${contentRootSelector}:nth-of-type(${i}) .cell4 i`;
  const nthDetailButtonSelector = (i: number) =>
    `${contentRootSelector}:nth-of-type(${i}) .cell4 a`;
  const nthPriceSelector = (i: number) =>
    `${contentRootSelector}:nth-of-type(${i}) .cell5 strong`;
  const popupSelector = "article.layer_flight.on";

  const activeButtonIndexes = (
    await page.$$eval(contentRootSelector, (els) => {
      return els.map((el, idx) =>
        !!el.querySelector("a.btn_type3.btn_blue") ? idx + 1 : null
      );
    })
  ).filter((index) => index !== null);

  let results: {
    seqId: string;
    departure: Record<string, string>;
    back: Record<string, string>;
    price: number;
    member: string;
    scrapTarget: ScrapTarget;
    isDirectFlight: boolean;
    landingUrl: string;
  }[] = [];

  for (let i = 0; i < activeButtonIndexes.length; i++) {
    // 가격은 목록에서 get
    const price = await page.$eval(
      nthPriceSelector(activeButtonIndexes[i]),
      (el) => el?.textContent || ""
    );
    const isDirectFlight =
      (await page.$eval(
        nthDirectFlight(activeButtonIndexes[i]),
        (el) => el?.textContent || ""
      )) === "직항";

    // 상세버튼 클릭
    await page.click(nthDetailButtonSelector(activeButtonIndexes[i]));
    await page.waitForSelector(popupSelector);

    const info = await page.$eval(popupSelector, (el) => {
      const year = new Date().getFullYear();
      const SPLIT_TOKEN = "|";
      const removeParentheses = (str: string, token: string = "") =>
        str.replace(/\s*\([^)]*\)\s*/g, token);

      const now = Date.now();

      const airLine = (
        el?.querySelector(".flight strong")?.textContent || ""
      ).split(" ")[0];

      const depArea = el.querySelector("#depArea");
      const arrArea = el.querySelector("#arrArea");

      // 출국 정보
      const depStart = removeParentheses(
        depArea?.querySelector("section ol li time")?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const depEnd = removeParentheses(
        depArea?.querySelector("section ol li:last-of-type time")
          ?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const departure: Record<string, string> = {
        airLine,
        date: `${year}-${depStart[0]}`,
        startLocation:
          depArea?.querySelector("section header p strong")?.textContent || "",
        startTime: depStart[1] || "",
        endLocation:
          depArea?.querySelector("section:last-of-type header p strong")
            ?.textContent || "",
        endTime: depEnd[1] || "",
      };

      // 귀국 정보
      const backStart = removeParentheses(
        depArea?.querySelector("section ol li time")?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const backEnd = removeParentheses(
        depArea?.querySelector("section ol li:last-of-type time")
          ?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const back: Record<string, string> = {
        airLine,
        date: `${year}-${backStart[0]}`,
        startLocation:
          arrArea?.querySelector("section header p strong")?.textContent || "",
        startTime: backStart[1] || "",
        endLocation:
          arrArea?.querySelector("section:last-of-type header p strong")
            ?.textContent || "",
        endTime: backEnd[1] || "",
      };

      return {
        seqId: `${now}_ONLINE_TOUR`,
        departure,
        back,
        price: 0,
        member: "성인 1인",
        scrapTarget: "ONLINE_TOUR" as ScrapTarget,
        isDirectFlight: false,
        landingUrl: "",
      };
    });

    const { originalUrl } = scrapTargetInfo["ONLINE_TOUR"];

    info.price = Number(price.replace(/,/g, ""));
    info.isDirectFlight = isDirectFlight;
    info.landingUrl = `${originalUrl}?TabGubun=${tabName}`;

    results.push(info);

    await page.click(`${popupSelector} button[data-fn=lyClose]`);
  }

  return results;
}

// 온라인투어 - 하단 더보기가 있으면 클릭해서 더 노출(적당히 3번 정도)
async function clickMoreForOnlineTour(page: Page, clickTimes: number = 3) {
  const buttonId = "#btn_more";

  for (let i = 0; i < clickTimes; i++) {
    const hasMoreButton = await page.$eval(buttonId, (el) => !!el);

    if (!hasMoreButton) {
      break;
    }

    await page.click(buttonId);
    // 더보기 클릭 시 로딩시간 대략 1초 이하라서 기다려줌
    await new Promise((res) => setTimeout(res, 1000));
  }
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
      return await evalModeTour(contentRootSelector, page);

    case "ONLINE_TOUR":
      // AS(아시아) 탭부터 시작
      await clickMoreForOnlineTour(page);
      const AS_result = await evalOnlineTour(contentRootSelector, page, "AS");

      // AS 제외 4개 탭 스크래핑 필요 -> ?TabGubun= AS, CH, JA, EU, HN, US
      const tabs = ["CH", "JA", "EU", "HN", "US"];
      const url = new URL(scrapTargetInfo["ONLINE_TOUR"].url);
      const otherTabUrls = tabs.map((tab) => {
        url.searchParams.set("TabGubun", tab);

        return url.toString();
      });

      let otherTabResult: typeof AS_result = [];

      for (let i = 0; i < otherTabUrls.length; i++) {
        await page.goto(otherTabUrls[i], { waitUntil: "domcontentloaded" });

        try {
          await page.waitForSelector(contentRootSelector, { timeout: 2000 });

          const tabResult = await evalOnlineTour(
            contentRootSelector,
            page,
            tabs[i]
          );

          otherTabResult = [...otherTabResult, ...tabResult];
        } catch {
          //
        }
      }

      return [...AS_result, ...otherTabResult];
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
