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
  const { data } = useScrapingQuery();

  console.log(startCode, endCode, data);

  const results =
    data?.filter(({ departure: { startLocation, endLocation } }) => {
      return (
        startLocation.includes(startCode || "") &&
        endLocation.includes(endCode || "")
      );
    }) || [];

  return (
    <div className={cn("Page")}>
      <ResultHeader />
      <TicketList results={results} />
    </div>
  );
}

export default Page;
