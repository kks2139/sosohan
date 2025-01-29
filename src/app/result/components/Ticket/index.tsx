"use client";

import classNames from "classnames/bind";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { ArrowRight } from "react-feather";

import ImgJinAir from "@/assets/img/logo_jinair.png";
import { ScrapingResultData } from "@/queries/useScrapingQuery";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);
const FORMAT_STR = "yyyy.MM.dd";

interface Prop {
  departureAndBackInfo: ScrapingResultData;
}

function Ticket({ departureAndBackInfo }: Prop) {
  const now = new Date();
  const { departure, back, price } = departureAndBackInfo;
  const departureDate = parse(departure.date, FORMAT_STR, now);
  const backDate = parse(back.date, FORMAT_STR, now);

  const infos = [
    {
      title: "출국",
      date: format(departureDate, "yyyy-MM-dd (E)", {
        locale: ko,
      }),
      airLineLogo: ImgJinAir,
      airLineName: departure.airLine,
      startLocation: departure.startLocation,
      startTime: departure.startTime,
      endLocation: departure.endLocation,
      endTime: departure.endTime,
    },
    {
      title: "귀국",
      date: format(backDate, "yyyy-MM-dd (E)", { locale: ko }),
      airLineLogo: ImgJinAir,
      airLineName: back.airLine,
      startLocation: back.startLocation,
      startTime: back.startTime,
      endLocation: back.endLocation,
      endTime: back.endTime,
    },
  ];

  return (
    <li className={cn("Ticket")}>
      <button>
        <ul className={cn("info")}>
          {infos.map(
            (
              {
                title,
                airLineLogo,
                date,
                startLocation,
                startTime,
                endLocation,
                endTime,
              },
              idx
            ) => (
              <li key={idx} className={cn("detail")}>
                <div className={cn("title")}>
                  <Image
                    className={cn("logo")}
                    src={airLineLogo}
                    alt=""
                    width={25}
                    height={25}
                  />
                  <h5>{title}</h5>
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
              </li>
            )
          )}
        </ul>

        <div className={cn("price")}>
          <p>{price.toLocaleString()}원</p>
        </div>
      </button>
    </li>
  );
}

export default Ticket;
