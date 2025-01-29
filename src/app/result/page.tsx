"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";

import { useScrapingQuery } from "@/queries/useScrapingQuery";

import ResultHeader from "./components/ResultHeader";
import TicketList from "./components/TicketList";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

function Page() {
  const params = useSearchParams();
  const startCode = params.get("start_code");
  const endCode = params.get("end_code");
  const { data, isLoading: isScrapingLoading } = useScrapingQuery();

  const results =
    data?.filter(({ departure: { startLocation, endLocation } }) => {
      return (
        startLocation.includes(startCode || "") &&
        (endCode === "empty" ? true : endLocation.includes(endCode || ""))
      );
    }) || [];

  return (
    <div className={cn("Page")}>
      <ResultHeader />

      {isScrapingLoading ? (
        <div>로딩중..</div>
      ) : (
        <section className={cn("ticket-list")}>
          <TicketList results={results} />
        </section>
      )}
    </div>
  );
}

export default Page;
