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
import { ScrapTarget } from "@/utils/constant";

const cn = classNames.bind(styles);

interface Tab {
  target: ScrapTarget;
  label: string;
  count: number;
  loading?: boolean;
}

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
  const [selectedTabs, setSelectedTabs] = useState<ScrapTarget[]>([
    "HANA_TOUR",
    "MODE_TOUR",
    "ONLINE_TOUR",
  ]);

  const isSortedByLowPrice = sortType === "LOW_PRICE";

  const sortedResults = results
    .filter(({ scrapTarget }) => selectedTabs.includes(scrapTarget))
    .toSorted((a, b) => {
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

  const hanaCount = results.filter(
    ({ scrapTarget }) => scrapTarget === "HANA_TOUR"
  ).length;
  const modeCount = results.filter(
    ({ scrapTarget }) => scrapTarget === "MODE_TOUR"
  ).length;
  const onLineCount = results.filter(
    ({ scrapTarget }) => scrapTarget === "ONLINE_TOUR"
  ).length;

  const hasResults = sortedResults.length > 0;
  const tabs: Tab[] = [
    {
      target: "HANA_TOUR",
      label: "하나투어",
      count: hanaCount,
      loading: isHanaLoading,
    },
    {
      target: "MODE_TOUR",
      label: "모두두투어",
      count: modeCount,
      loading: isModeLoading,
    },
    {
      target: "ONLINE_TOUR",
      label: "온라인투어",
      count: onLineCount,
      loading: isOnlineLoading,
    },
  ];

  const selectTab = (tab: ScrapTarget) => {
    const hasTab = selectedTabs.includes(tab);

    setSelectedTabs(
      hasTab ? selectedTabs.filter((t) => t !== tab) : [...selectedTabs, tab]
    );
  };

  return (
    <div className={cn("TicketList")}>
      <section className={cn("top-info")}>
        <div className={cn("count")}>
          {tabs.map(({ target, label, count, loading }) => (
            <button
              key={target}
              type="button"
              className={cn(target, {
                loading,
                active: selectedTabs.includes(target),
              })}
              onClick={() => {
                selectTab(target);
              }}
            >
              <div className={cn("label")}>{label}</div>
              <div className={cn("num")}>{count}</div>
            </button>
          ))}
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
            <span>텅텅</span>
          </div>
          <Button
            className={cn("go-back")}
            onClick={() => {
              router.replace("/");
            }}
          >
            다른 조건 검색하기
          </Button>
        </section>
      )}
    </div>
  );
}

export default TicketList;
