"use client";

import classNames from "classnames/bind";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { ArrowRight } from "react-feather";

import { ScrapingResultData } from "@/queries/useScrapingQueries";
import {
  getAirLineLogo,
  ScrapTarget,
  scrapTargetInfo,
  targetToKorean,
} from "@/utils/constant";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);
const FORMAT_STR_1 = "yyyy.MM.dd";
const FORMAT_STR_2 = "yyyy-MM-dd";

interface Prop {
  departureAndBackInfo: ScrapingResultData;
}

function Ticket({ departureAndBackInfo }: Prop) {
  const now = new Date();
  const { departure, back, price, scrapTarget, member, landingUrl } =
    departureAndBackInfo;
  const isHanaTour = scrapTarget === "HANA_TOUR";

  const infos = ["departure", "back"].map((type) => {
    const isDeparture = type === "departure";
    const departureDate = isHanaTour
      ? parse(departure.date, FORMAT_STR_1, now)
      : parse(departure.date, FORMAT_STR_2, now);
    const backDate = isHanaTour
      ? parse(back.date, FORMAT_STR_1, now)
      : parse(back.date, FORMAT_STR_2, now);
    const info = isDeparture ? departure : back;

    return {
      startPosition: isDeparture ? "출국" : "귀국",
      date: format(isDeparture ? departureDate : backDate, "yyyy-MM-dd (E)", {
        locale: ko,
      }),
      airLineLogo: getAirLineLogo(info.airLine),
      airLineName: info.airLine,
      startLocation: info.startLocation,
      startTime: info.startTime,
      endLocation: info.endLocation,
      endTime: info.endTime,
    };
  });

  return (
    <li className={cn("Ticket")}>
      <button
        type="button"
        onClick={() => {
          window.open(landingUrl || scrapTargetInfo[scrapTarget].url);
        }}
      >
        <ul className={cn("info")}>
          {infos.map(
            (
              {
                startPosition,
                airLineLogo,
                airLineName,
                date,
                startLocation,
                startTime,
                endLocation,
                endTime,
              },
              idx
            ) => (
              <li key={idx} className={cn("detail")}>
                <div className={cn("start-position")}>
                  <span>{startPosition}</span>
                </div>

                <div className={cn("detail-factors")}>
                  <div className={cn("air-line")}>
                    <Image
                      className={cn("logo")}
                      src={airLineLogo}
                      alt={airLineName}
                      width={28}
                      height={28}
                    />
                    <div className={cn("name")}>{airLineName}</div>
                  </div>

                  <div className={cn("date")}>
                    <span className={cn("label")}>{date}</span>
                  </div>

                  <div className={cn("location")}>
                    <div className={cn("item")}>
                      <div className={cn("loca")}>{startLocation}</div>
                      <div className={cn("time")}>{startTime}</div>
                    </div>

                    <ArrowRight
                      className={cn("arrow-icon")}
                      size={13}
                      strokeWidth={2}
                      color="#636363"
                    />

                    <div className={cn("item")}>
                      <div className={cn("loca")}>{endLocation}</div>
                      <div className={cn("time")}>{endTime}</div>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>

        <div className={cn("bottom")}>
          <div className={cn("target", { [scrapTarget]: true })}>
            {targetToKorean[scrapTarget]}
          </div>

          <div className={cn("price")}>
            <span className={cn("member")}>{member}</span>
            <strong>{price.toLocaleString()}원</strong>
          </div>
        </div>
      </button>
    </li>
  );
}

export default Ticket;
