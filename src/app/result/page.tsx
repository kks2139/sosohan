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
  } = useScrapingQueries();
  const { data: modeData = [], isLoading: isModeLoading } = useModeTourQuery();

  const isScrapingLoading = isHanaLoading || isModeLoading;
  const results =
    [...hanaData, ...modeData]?.filter(
      ({ departure: { startLocation, endLocation } }) => {
        return (
          startLocation.includes(startCode || "") &&
          (endCode ? endLocation.includes(endCode || "") : true)
        );
      }
    ) || [];

  return (
    <div className={cn("Page")}>
      <ResultHeader
        startCode={startCode}
        endCode={endCode}
        hasResults={results.length > 0}
      />

      {isScrapingLoading ? (
        <ListSkeleton />
      ) : (
        <section className={cn("ticket-list")}>
          <TicketList results={results} />
        </section>
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
