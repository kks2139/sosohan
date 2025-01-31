"use client";

import classNames from "classnames/bind";
import { differenceInMinutes, parse } from "date-fns";
import { useState } from "react";
import { Sliders } from "react-feather";

import { ScrapingResultData } from "@/queries/useScrapingQuery";

import Ticket from "../Ticket";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  results: ScrapingResultData[];
}

function TicketList({ results }: Props) {
  const [sortType, setSortType] = useState<"LOW_PRICE" | "EARLY_START">(
    "LOW_PRICE"
  );

  const isSortedByLowPrice = sortType === "LOW_PRICE";
  const sortedResults = results.toSorted((a, b) => {
    if (isSortedByLowPrice) {
      return a.price - b.price;
    }

    const start_a = parse(
      `${a.departure.date} ${a.departure.startTime}`,
      "yyyy.MM.dd HH:mm",
      new Date()
    );
    const start_b = parse(
      `${b.departure.date} ${b.departure.startTime}`,
      "yyyy.MM.dd HH:mm",
      new Date()
    );

    return differenceInMinutes(start_a, start_b);
  });

  return (
    <div className={cn("TicketList")}>
      <div className={cn("sort")}>
        <button
          className={cn("button")}
          type="button"
          onClick={() => {
            setSortType(isSortedByLowPrice ? "EARLY_START" : "LOW_PRICE");
          }}
        >
          <span className={cn("label")}>
            {isSortedByLowPrice ? "낮은 가격순" : "빠른 출발순"}
          </span>
          <Sliders size={20} />
        </button>
      </div>

      <ul>
        {sortedResults?.map((data) => (
          <Ticket
            key={`${data.departure.date}${data.departure.startTime}${data.departure.endTime}${data.departure.airLine}${data.departure.startLocation}`}
            departureAndBackInfo={data}
          />
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
