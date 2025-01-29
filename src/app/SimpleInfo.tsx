"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
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
  startCode: z.string({
    required_error: "출발 공항은 필수 입력이에요",
  }),
});

function SimpleInfo() {
  const router = useRouter();
  useScrapingQuery();
  const { isLoading: isAirportLoading } = useAirportQuery();
  const { selectedStartAirport, selectedEndAirport, setSelectedAirport } =
    airportStore();
  const [error, setError] = useState<{
    startCode?: string[];
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
          errorMessages={error?.startCode}
          defaultAirportCode={selectedStartAirport?.["공항코드1(IATA)"]}
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
          defaultAirportCode={selectedEndAirport?.["공항코드1(IATA)"]}
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
            const startAirportCode = selectedStartAirport?.["공항코드1(IATA)"];
            const endAirportCode =
              selectedEndAirport?.["공항코드1(IATA)"] || "empty";

            const validation = formInputSchema.safeParse({
              startCode: startAirportCode,
            });

            if (!validation.success) {
              const { startCode } = validation.error.flatten().fieldErrors;

              setError({
                startCode,
              });

              return;
            }

            router.push(
              `/result?start_code=${startAirportCode}&end_code=${endAirportCode}`
            );
          }}
        >
          검색하기
        </FormButton>
      </form>
    </section>
  );
}

export default SimpleInfo;
