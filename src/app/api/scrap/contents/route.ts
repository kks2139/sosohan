import { Page } from "puppeteer-core";

import { Airport, ScrapingResultData } from "@/queries/useScrapingQueries";
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
      const departure: Airport = {
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
        const k = key as keyof Airport;

        departure[k] = trimText(departure[k]);
      }

      const row3 = el.querySelector("p.air:nth-of-type(2) > span");
      const row4 = el.querySelector(
        `div.item_course:nth-of-type(${hasTopAlarm ? 3 : 2})`
      );
      const back: Airport = {
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
        const k = key as keyof Airport;

        back[k] = trimText(back[k]);
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
        scrapTarget: "HANA_TOUR",
        landingUrl: "",
        transit:
          el?.querySelector("div.item_course > span.move_arrow > span")
            ?.textContent || "",
      } as ScrapingResultData;
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

  let results: ScrapingResultData[] = [];

  for (let i = 0; i < activeButtonIndexes.length; i++) {
    // 가격은 목록에서 get
    const price = await page.$eval(
      nthPriceSelector(activeButtonIndexes[i]),
      (el) => el?.textContent || ""
    );
    const transit = await page.$eval(
      nthDirectFlight(activeButtonIndexes[i]),
      (el) => el?.textContent || ""
    );

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

      const departureSection = el.querySelector("#depArea");

      const backSection = el.querySelector("#arrArea");

      // 출국 정보
      const depStartDate = removeParentheses(
        departureSection?.querySelector("ol li time")?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const depEnd = removeParentheses(
        departureSection?.querySelector("ol li:last-of-type time")
          ?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const departure: Airport = {
        airLine,
        date: `${year}-${depStartDate[0]}`,
        startLocation:
          departureSection?.querySelector("header p strong")?.textContent || "",
        startTime: depStartDate[1] || "",
        endLocation:
          departureSection?.querySelector("header p em")?.textContent || "",
        endTime: depEnd[1] || "",
      };

      // 귀국 정보
      const backStart = removeParentheses(
        backSection?.querySelector("ol li time")?.textContent || "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const backEnd = removeParentheses(
        backSection?.querySelector("ol li:last-of-type time")?.textContent ||
          "",
        SPLIT_TOKEN
      ).split(SPLIT_TOKEN);

      const back: Airport = {
        airLine,
        date: `${year}-${backStart[0]}`,
        startLocation:
          backSection?.querySelector("header p strong")?.textContent || "",
        startTime: backStart[1] || "",
        endLocation:
          backSection?.querySelector("header p em")?.textContent || "",
        endTime: backEnd[1] || "",
      };

      return {
        seqId: `${now}_ONLINE_TOUR`,
        departure,
        back,
        price: 0,
        member: "성인 1인",
        scrapTarget: "ONLINE_TOUR",
        transit: "",
        landingUrl: "",
      } as ScrapingResultData;
    });

    const { originalUrl } = scrapTargetInfo["ONLINE_TOUR"];
    const departureDate = info.departure.date.split("-");

    info.price = Number(price.replace(/,/g, ""));
    info.transit = transit;
    info.landingUrl = `${originalUrl}?TabGubun=${tabName}&nowMonth=${departureDate[1]}&nowYear=${departureDate[0]}`;

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

// 온라인투어 - 다음달 클릭
async function clickNextMonthForOnlineTour(page: Page) {
  try {
    await page.click("div.calendar_date > button:last-of-type");
    await new Promise((res) => setTimeout(res, 1_000));

    await page.waitForSelector(
      scrapTargetInfo["ONLINE_TOUR"].contentRootSelector,
      { timeout: 500 }
    );
  } catch {
    //
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
      const AS_result1 = await evalOnlineTour(contentRootSelector, page, "AS");

      await clickNextMonthForOnlineTour(page);
      const AS_result2 = await evalOnlineTour(contentRootSelector, page, "AS");

      // AS 제외 4개 탭 스크래핑 필요 -> ?TabGubun= AS, CH, JA, EU, HN, US
      const tabs = ["CH", "JA", "EU", "HN", "US"];
      const url = new URL(scrapTargetInfo["ONLINE_TOUR"].url);
      const otherTabUrls = tabs.map((tab) => {
        url.searchParams.set("TabGubun", tab);

        return url.toString();
      });

      let otherTabResult: ScrapingResultData[] = [];

      for (let i = 0; i < otherTabUrls.length; i++) {
        await page.goto(otherTabUrls[i], { waitUntil: "domcontentloaded" });

        try {
          await page.waitForSelector(contentRootSelector, { timeout: 800 });

          const tabResult1 = await evalOnlineTour(
            contentRootSelector,
            page,
            tabs[i]
          );

          await clickNextMonthForOnlineTour(page);

          const tabResult2 = await evalOnlineTour(
            contentRootSelector,
            page,
            tabs[i]
          );

          otherTabResult = [...otherTabResult, ...tabResult1, ...tabResult2];
        } catch (e) {
          console.log(`ONLINE_TOUR for loop error ${tabs[i]} :`, e);
        }
      }

      const returnValue = [...AS_result1, ...AS_result2, ...otherTabResult];

      console.log("ONLINE_TOUR return :", returnValue);

      return returnValue;
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
