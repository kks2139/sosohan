"use client";

import classNames from "classnames/bind";
import { useEffect } from "react";

import AirportInput from "@/components/Form/AirportInput";
import FormButton from "@/components/Form/FormButton";
import { useScrapingQuery } from "@/queries/useScrapingQuery";
import { airportStore } from "@/store/airport";

import styles from "./SimpleInfo.module.scss";

const cn = classNames.bind(styles);

function SimpleInfo() {
  const { fetchAirport, isLoading: isAirportLoading } = airportStore();
  const { isLoading, data, error } = useScrapingQuery();

  console.log(isLoading, data, error);

  useEffect(() => {
    fetchAirport();
  }, [fetchAirport]);

  return (
    <section className={cn("SimpleInfo")}>
      <form className={cn("form")}>
        <AirportInput
          name="departure"
          placeholder="출발 공항"
          isLoading={isAirportLoading}
        />
        <AirportInput
          name="arrival"
          placeholder="도착 공항"
          isLoading={isAirportLoading}
        />
        <FormButton isLoading={isAirportLoading}>최저가 검색하기</FormButton>
      </form>
    </section>
  );
}

export default SimpleInfo;
