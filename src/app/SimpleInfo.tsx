"use client";

import classNames from "classnames/bind";
import { useState } from "react";
import { z } from "zod";

import AirportInput from "@/components/Form/AirportInput";
import FormButton from "@/components/Form/FormButton";
import { useAirportQuery } from "@/queries/useAirportQuery";
import { useScrapingQuery } from "@/queries/useScrapingQuery";
import { airportStore } from "@/store/airport";

import styles from "./SimpleInfo.module.scss";

const cn = classNames.bind(styles);

const formInputSchema = z.object({
  startAirport: z.string({
    required_error: "출발 공항을 선택해 주세요",
  }),
  endAirport: z.string({
    required_error: "도착 공항을 선택해 주세요",
  }),
});

function SimpleInfo() {
  useScrapingQuery();
  const { isLoading: isAirportLoading } = useAirportQuery();
  const { selectedStartAirport, selectedEndAirport, setSelectedAirport } =
    airportStore();
  const [error, setError] = useState<{
    startAirport?: string[];
    endAirport?: string[];
  }>();

  const resetAirportError = (type: "start" | "end") => {
    setError({ ...error, [`${type}Airport`]: undefined });
  };

  return (
    <section className={cn("SimpleInfo")}>
      <form className={cn("form")}>
        <AirportInput
          placeholder="출발 공항"
          isLoading={isAirportLoading}
          errorMessages={error?.startAirport}
          onChange={() => {
            setSelectedAirport("start", undefined);
            resetAirportError("start");
          }}
          onAirportSelected={(selected) => {
            setSelectedAirport("start", selected);
            resetAirportError("start");
          }}
        />
        <AirportInput
          placeholder="도착 공항"
          isLoading={isAirportLoading}
          errorMessages={error?.endAirport}
          onChange={() => {
            setSelectedAirport("end", undefined);
            resetAirportError("end");
          }}
          onAirportSelected={(selected) => {
            setSelectedAirport("end", selected);
            resetAirportError("end");
          }}
        />
        <FormButton
          isLoading={isAirportLoading}
          onClick={() => {
            const result = formInputSchema.safeParse({
              startAirport: selectedStartAirport?.["공항코드1(IATA)"],
              endAirport: selectedEndAirport?.["공항코드1(IATA)"],
            });

            if (!result.success) {
              const { startAirport, endAirport } =
                result.error.flatten().fieldErrors;

              setError({
                startAirport,
                endAirport,
              });

              return;
            }

            // TODO: 입력값으로 검색
            console.log("에러없음");
          }}
        >
          최저가 검색하기
        </FormButton>
      </form>
    </section>
  );
}

export default SimpleInfo;
