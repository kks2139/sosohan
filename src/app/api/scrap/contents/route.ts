import { Page } from "puppeteer-core";
import { ScrapTarget, scrapTargetInfo } from "@/utils/constant";
import { getBrowser, getScrapResponse } from "@/utils/api";

async function scrapPageByTarget(target: ScrapTarget, page: Page) {
  const { contentRootSelector } = scrapTargetInfo[target];

  await page.waitForSelector(contentRootSelector);

  switch (target) {
    case "HANA_TOUR":
      return await page.$$eval(contentRootSelector, (els) => {
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
  const errorRes = getScrapResponse("ERROR", null);

  if (!scrapTargetInfo[target]) {
    return errorRes;
  }

  const browser = await getBrowser();

  try {
    const { url } = scrapTargetInfo[target];
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const result = await scrapPageByTarget(target, page);

    console.log("성공!");

    return getScrapResponse("OK", result);
  } catch {
    return errorRes;
  } finally {
    await browser.close();
  }
}
