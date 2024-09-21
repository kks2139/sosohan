import { getBrowser, getScrapResponse } from "@/utils/api";
import { Page } from "puppeteer-core";

const MODE_TOUR_AREAS_URL =
  "https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22%22%2C%22arrivalCity%22%3A%22%22%2C%22continentCode%22%3A%22JPN%22%2C%22departureDate%22%3A%222024-09-16%22%2C%22arrivalDate%22%3A%222024-10-16%22%7D";

const ROOT_SELECTOR =
  "div[id='main-layout-pc'] > main > div > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > div:nth-of-type(2)";

async function scrapAreas(page: Page) {
  await page.waitForSelector(ROOT_SELECTOR);

  const result = await page.$eval(ROOT_SELECTOR, (container) => {
    const els = container.querySelectorAll("div > span");

    return Array.from(els).map((el) => {
      const text = (el?.textContent || "").replace(/\n|\//g, "").trim();
      const formatted = text
        .replace(/\(([^()]*)\)(?!.*\([^()]*\))/, "_$1")
        .split("_");

      return {
        name: formatted[0],
        code: formatted[1],
      };
    });
  });

  return result;
}

export async function GET() {
  const errorRes = getScrapResponse("ERROR", null);
  const browser = await getBrowser();

  try {
    const page = await browser.newPage();

    await page.goto(MODE_TOUR_AREAS_URL, { waitUntil: "domcontentloaded" });

    const result = await scrapAreas(page);

    return getScrapResponse("OK", result);
  } catch {
    return errorRes;
  } finally {
    await browser.close();
  }
}
