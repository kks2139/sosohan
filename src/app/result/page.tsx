"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import DotLoading from "@/components/DotLoading";
import { useModeTourQuery } from "@/queries/useModeTourQuery";
import { useScrapingQueries } from "@/queries/useScrapingQueries";

import ResultHeader from "./components/ResultHeader";
import TicketList from "./components/TicketList";
import ListSkeleton from "./components/TicketList/ListSkeleton";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

function ResultContent() {
  const params = useSearchParams();
  const startCode = params.get("start_code");
  const endCode = params.get("end_code");
  const {
    hanaTour: { data: hanaData = [], isLoading: isHanaLoading },
    onlineTour: { data: onlineData = [], isLoading: isOnlineLoading },
  } = useScrapingQueries();
  const { data: modeData = [], isLoading: isModeLoading } = useModeTourQuery();

  const results =
    [...hanaData, ...modeData, ...onlineData]?.filter(
      ({ departure: { startLocation, endLocation } }) => {
        return (
          startLocation.includes(startCode || "") &&
          (endCode ? endLocation.includes(endCode || "") : true)
        );
      }
    ) || [];
  const hasResults = results.length > 0;

  // 결과가 하나 이상 있거나, 모두 로딩상태가 아닌경우 결과목록 노출
  const canShowResults =
    hasResults || (!isHanaLoading && !isModeLoading && !isOnlineLoading);

  return (
    <div className={cn("Page")}>
      <ResultHeader
        startCode={startCode}
        endCode={endCode}
        hasResults={hasResults}
      />

      {canShowResults ? (
        <section className={cn("ticket-list")}>
          <TicketList results={results} />
        </section>
      ) : (
        <ListSkeleton />
      )}
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<DotLoading />}>
      <ResultContent />
    </Suspense>
  );
}

export default Page;
