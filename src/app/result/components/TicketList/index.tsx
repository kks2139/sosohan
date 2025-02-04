"use client";

import classNames from "classnames/bind";
import { differenceInMinutes, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { File, Sliders } from "react-feather";

import Button from "@/components/Button";
import { useModeTourQuery } from "@/queries/useModeTourQuery";
import {
  ScrapingResultData,
  useScrapingQueries,
} from "@/queries/useScrapingQueries";

import Ticket from "../Ticket";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  results: ScrapingResultData[];
}

function TicketList({ results }: Props) {
  const router = useRouter();
  const {
    hanaTour: { isLoading: isHanaLoading },
    onlineTour: { isLoading: isOnlineLoading },
  } = useScrapingQueries();
  const { isLoading: isModeLoading } = useModeTourQuery();
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
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const start_b = parse(
      `${b.departure.date} ${b.departure.startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );

    return differenceInMinutes(start_a, start_b);
  });

  const hanaCount = sortedResults.filter(
    ({ scrapTarget }) => scrapTarget === "HANA_TOUR"
  ).length;
  const modeCount = sortedResults.filter(
    ({ scrapTarget }) => scrapTarget === "MODE_TOUR"
  ).length;
  const onLineCount = sortedResults.filter(
    ({ scrapTarget }) => scrapTarget === "ONLINE_TOUR"
  ).length;

  const hasResults = sortedResults.length > 0;

  return (
    <div className={cn("TicketList")}>
      <section className={cn("top-info")}>
        <dl className={cn("count")}>
          <dt className={cn("total")}>
            <div className={cn("label")}>결과</div>
            <div>{`(${sortedResults.length})`}</div>
          </dt>
          <dt className={cn("hana", { loading: isHanaLoading })}>
            <div className={cn("label")}>하나</div>
            <div className={cn("num")}>{hanaCount}</div>
          </dt>
          <dt className={cn("mode", { loading: isModeLoading })}>
            <div className={cn("label")}>모두</div>
            <div className={cn("num")}>{modeCount}</div>
          </dt>
          <dt className={cn("online", { loading: isOnlineLoading })}>
            <div className={cn("label")}>온라인</div>
            <div className={cn("num")}>{onLineCount}</div>
          </dt>
        </dl>
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

      {hasResults ? (
        <ul>
          {sortedResults?.map((data) => (
            <Ticket key={data.seqId} departureAndBackInfo={data} />
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
