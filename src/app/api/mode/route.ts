import {
  ModeTourContinentCode,
  ModeTourResult,
} from "@/queries/useModeTourQuery";
import { getApiResponse } from "@/utils/api";

interface ResultParams {
  count: string;
  arrivalDate: string;
  departureDate: string;
}

async function fetchDepartures() {
  const res = await fetch(
    `https://b2c-api.modetour.com/CheapTicket/GetDepartures`
  );
  const result = (await res.json()) as { result: Record<string, string> };

  return result.result.allDepartures;
}

async function fetchResults(params: ResultParams) {
  const moduTourContinentCodes: ModeTourContinentCode[] = [
    "ASIA",
    "JPN",
    "SOPA",
    "EUR",
    "CHI",
  ];
  const apis = moduTourContinentCodes.map((code) =>
    fetch(
      `https://b2c-api.modetour.com/CheapTicket/GetList?Page=1&ItemCount=${params.count}&DepartureCity=&ContinentCode=${code}&ArrivalCity=&DepartureDate=${params.departureDate}&ArrivalDate=${params.arrivalDate}`
    )
  );

  const responses = await Promise.all(apis);
  const results = (await Promise.all(responses.map((res) => res.json()))) as {
    result: ModeTourResult[];
  }[];

  // 각 티켓마다 대륙코드 추가 (landingUrl 세팅을 위함)
  results.forEach((res, idx) => {
    res.result.forEach(
      (obj) => (obj.continentCode = moduTourContinentCodes[idx])
    );
  });

  return results.reduce<ModeTourResult[]>((acc, now) => {
    return [...acc, ...now.result];
  }, []);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const count = url.searchParams.get("count");
  const departureDate = url.searchParams.get("departure_date");
  const arrivalDate = url.searchParams.get("arrival_date");

  if (!count || !departureDate || !arrivalDate) {
    return getApiResponse("ERROR");
  }

  const [res1, res2] = await Promise.all([
    fetchDepartures(),
    fetchResults({ count, departureDate, arrivalDate }),
  ]);

  return getApiResponse("OK", {
    allDepartures: res1,
    infos: res2,
  });
}
