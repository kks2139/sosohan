import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { addDays } from "date-fns/addDays";

import { apiBase } from "@/utils/constant";

import { QUERY_KEY } from "./queryKeys";
import { ScrapingResultData } from "./useScrapingQueries";

export type ModeTourContinentCode = "ASIA" | "JPN" | "SOPA" | "EUR" | "CHI";

interface Location {
  code: string;
  value: string;
}

interface Schedule {
  week: number;
  sTime: string; // "HH:mm" 형식의 시간
  eTime: string; // "HH:mm" 형식의 시간
  value: string; // "YYYY-MM-DD" 형식의 날짜
}

interface FlightStart {
  flyingTime: string; // "HH:mm" 형식의 비행시간
  time: string; // 출발 시간 ("HH:mm")
  value: string; // 출발 날짜 ("YYYY-MM-DD")
  via: string; // 경유 여부 ("Y" 또는 "N")
  eft: string; // 예상 비행 시간 ("HH:mm")
}

interface Seat {
  web: number;
  value: number;
}

interface Fare {
  normal?: number; // 성인 요금만 존재함
  tax: number;
  tax2: number;
  value: number;
}

interface Airline {
  code: string;
  dfln: string; // 출발 항공편 번호
  afln: string; // 도착 항공편 번호
  dcsfln: string;
  dcsf: string;
  acsfln: string;
  acsf: string;
  value: string; // 항공사 이름
}

export interface ModeTourResult {
  id: number;
  webBookingDate: string; // "YYYY-MM-DD" 형식의 날짜
  day: number;
  promotion: string;
  arrival: Location;
  sDate: Schedule;
  start: FlightStart;
  eDate: Schedule;
  rSeat: Seat;
  adult: Fare;
  child: Fare;
  infant: Fare;
  air: Airline;
  departure: Location;
  localDeparture: Location;
  koreanArrival: Location;
  continentCode: ModeTourContinentCode;
}

interface ModeTourResponse {
  infos: ModeTourResult[];
  allDepartures: Record<string, string>;
}

export function useModeTourQuery() {
  const departureDate = addDays(new Date(), 1);
  const arrivalDate = addDays(departureDate, 30);
  const formattedDeparture = format(departureDate, "yyyy-MM-dd");
  const formattedArrival = format(arrivalDate, "yyyy-MM-dd");

  return useQuery<ModeTourResponse, Error, ScrapingResultData[]>({
    queryKey: [QUERY_KEY.MODE_TOUR],
    queryFn: async () => {
      // TODO: count 100개 이상으로 변경 & 최적화처리
      const res = await fetch(
        `${apiBase}/api/mode?count=20&departure_date=${formattedDeparture}&arrival_date=${formattedArrival}`
      );
      const { result } = (await res.json()) as { result: ModeTourResponse };

      return result;
    },
    select: (data) => {
      return data.infos.map(
        ({ air, sDate, eDate, departure, arrival, adult, continentCode }) => {
          // 가격: 성인1인 기준
          const price = adult.tax + adult.tax2 + adult.value;
          const landingUrl = `https://www.modetour.com/flights/discount-flight?query=${encodeURIComponent(
            `{"departureCity":"${departure.code}","arrivalCity":"","continentCode":"${continentCode}","departureDate":"${formattedDeparture}","arrivalDate":"${formattedArrival}"}`
          )}`;

          return {
            departure: {
              airLine: air.value,
              date: sDate.value,
              startLocation: `${departure.value}(${departure.code})`,
              startTime: sDate.sTime,
              endLocation: `${arrival.value}(${arrival.code})`,
              endTime: sDate.eTime,
            },
            back: {
              airLine: air.value,
              date: eDate.value,
              startLocation: `${arrival.value}(${arrival.code})`,
              startTime: eDate.sTime,
              endLocation: `${departure.value}(${departure.code})`,
              endTime: eDate.eTime,
            },
            price,
            member: "성인 1인",
            scrapTarget: "MODE_TOUR",
            landingUrl,
          };
        }
      );
    },
  });
}
