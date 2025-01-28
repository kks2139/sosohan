"use client";

import classNames from "classnames/bind";
import { differenceInCalendarDays, format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

import ImgArrowRight from "@/assets/img/arrow_right.png";
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

  const startLabel = format(departureDate, "yyyy-MM-dd (E)", {
    locale: ko,
  });
  const endLabel = format(backDate, "yyyy-MM-dd (E)", { locale: ko });
  const periodDays = differenceInCalendarDays(backDate, departureDate);

  return (
    <div className={cn("Ticket")}>
      <div className={cn("info")}>
        <Image
          className={cn("logo")}
          src={ImgJinAir}
          alt=""
          width={40}
          height={40}
        />
        <div className={cn("detail")}>
          <p className={cn("period")}>
            <span className={cn("date")}>{startLabel}</span>
            {" ~ "}
            <span className={cn("date")}>{endLabel}</span>
            <span className={cn("days")}>{`[${periodDays}]일`}</span>
          </p>
          <p
            className={cn("air-line")}
          >{`${departure.airLine} | ${back.airLine}`}</p>
        </div>
        <Image
          className={cn("arrow")}
          src={ImgArrowRight}
          alt=""
          width={10}
          height={10}
        />
      </div>

      <div className={cn("price")}>
        <p>{price.toLocaleString()}원</p>
      </div>
    </div>
  );
}

export default Ticket;
