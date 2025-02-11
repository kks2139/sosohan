"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { ChevronsUp } from "react-feather";

import Button from "@/components/Button";
import DotLoading from "@/components/DotLoading";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useModeTourQuery } from "@/queries/useModeTourQuery";
import { useScrapingQueries } from "@/queries/useScrapingQueries";
import { viewStore } from "@/store/view";

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
  const { getIsDarkMode } = viewStore();

  const topRef = useRef<HTMLDivElement>(null);
  const wayPointRef = useRef<HTMLDivElement>(null);

  const [isShowToTop, setIsShowToTop] = useState(false);

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

  useIntersectionObserver({
    rootElement: topRef.current,
    targetElement: wayPointRef.current,
    onIntersection: () => setIsShowToTop(false),
    onOutOfView: () => setIsShowToTop(true),
  });

  return (
    <div
      className={cn("Page", { "is-dark-mode": getIsDarkMode() })}
      ref={topRef}
    >
      <div className={cn("way-point")} ref={wayPointRef}></div>

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

      {canShowResults && (
        <Button
          className={cn("to-top", { show: isShowToTop })}
          onClick={() => {
            topRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ChevronsUp size={22} />
        </Button>
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
