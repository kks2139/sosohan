"use client";

import classNames from "classnames/bind";
import { differenceInMinutes, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { File, Sliders } from "react-feather";

import Button from "@/components/Button";
import { ScrapingResultData } from "@/queries/useScrapingQueries";

import Ticket from "../Ticket";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  results: ScrapingResultData[];
}

function TicketList({ results }: Props) {
  const router = useRouter();
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

  const hasResults = sortedResults.length > 0;
  const hanaCount = sortedResults.filter(
    ({ scrapTarget }) => scrapTarget === "HANA_TOUR"
  ).length;
  const modeCount = sortedResults.filter(
    ({ scrapTarget }) => scrapTarget === "MODE_TOUR"
  ).length;

  return (
    <div className={cn("TicketList")}>
      {hasResults && (
        <section className={cn("top-info")}>
          <div className={cn("count")}>
            <span className={cn("total")}>
              결과 {`(${sortedResults.length})`}
            </span>
            <span className={cn("hana")}>하나투어 {hanaCount}</span>
            <span className={cn("mode")}>모두투어 {modeCount}</span>
          </div>
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
        </section>
      )}

      {hasResults ? (
        <ul>
          {sortedResults?.map((data) => (
            <Ticket
              key={`${data.departure.date}${data.departure.startTime}${data.departure.endTime}${data.departure.airLine}${data.departure.startLocation}`}
              departureAndBackInfo={data}
            />
          ))}
        </ul>
      ) : (
        <section className={cn("no-result")}>
          <div className={cn("title")}>
            <File size={40} />
            <span>텅텅..</span>
          </div>
          <Button
            className={cn("go-back")}
            onClick={() => {
              router.replace("/");
            }}
          >
            검색조건 입력하기
          </Button>
        </section>
      )}
    </div>
  );
}

export default TicketList;
