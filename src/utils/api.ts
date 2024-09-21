import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { isDev } from "./constant";

export function getScrapResponse(type: "ERROR" | "OK", result?: unknown) {
  if (type === "OK") {
    return new Response(result ? JSON.stringify({ result }) : null, {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(null, {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

export async function getBrowser() {
  chromium.setGraphicsMode = false;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: isDev
      ? await puppeteer.executablePath("chrome")
      : await chromium.executablePath(),
    headless: chromium.headless,
  });

  return browser;
}
