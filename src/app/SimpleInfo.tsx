"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import AirportInput from "@/components/Form/AirportInput";
import FormButton from "@/components/Form/FormButton";
import { useAirportQuery } from "@/queries/useAirportQuery";
import { useScrapingQuery } from "@/queries/useScrapingQuery";
import { airportStore, InputAirportType } from "@/store/airport";

import styles from "./SimpleInfo.module.scss";

const cn = classNames.bind(styles);

const formInputSchema = z.object({
  startCode: z.string({
    required_error: "출발 공항을 선택해주세요",
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

  const resetAirportError = (type: InputAirportType) => {
    setError({ ...error, [`${type}Code`]: undefined });
  };

  const clear = (type: InputAirportType) => {
    setSelectedAirport(type, undefined);
    resetAirportError(type);
  };

  return (
    <section className={cn("SimpleInfo")}>
      <form className={cn("form")}>
        <h4 className={cn("title")}>출국 정보를 입력해주세요</h4>
        <AirportInput
          placeholder="출발 공항"
          isLoading={isAirportLoading}
          errorMessages={error?.startCode}
          defaultAirportCode={selectedStartAirport?.["공항코드1(IATA)"]}
          onClear={() => clear("start")}
          onChange={() => clear("start")}
          onAirportSelected={(selected) => {
            setSelectedAirport("start", selected);
            resetAirportError("start");
          }}
        />
        <AirportInput
          placeholder="도착 공항"
          isLoading={isAirportLoading}
          defaultAirportCode={selectedEndAirport?.["공항코드1(IATA)"]}
          onClear={() => clear("end")}
          onChange={() => clear("end")}
          onAirportSelected={(selected) => {
            setSelectedAirport("end", selected);
            resetAirportError("end");
          }}
        />
        <FormButton
          onClick={() => {
            const startAirportCode = selectedStartAirport?.["공항코드1(IATA)"];
            const endAirportCode = selectedEndAirport?.["공항코드1(IATA)"];

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
              `/result?start_code=${startAirportCode}${
                endAirportCode ? `&end_code=${endAirportCode}` : ""
              } `
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
