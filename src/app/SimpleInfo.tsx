"use client";

import classNames from "classnames/bind";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import FormButton from "@/components/Form/FormButton";
import FormInput from "@/components/Form/FormInput";
import { airportStore } from "@/store/airport";
import { handleSubmit } from "@/utils/action";

import styles from "./SimpleInfo.module.scss";

const cn = classNames.bind(styles);

function SimpleInfo() {
  const { fetchAirport, isLoading: isAirportLoading } = airportStore();
  const [state, action] = useFormState(handleSubmit, null);

  console.log(state);

  useEffect(() => {
    fetchAirport();
  }, [fetchAirport]);

  return (
    <section className={cn("SimpleInfo")}>
      <form className={cn("form")} action={action}>
        <FormInput
          inputType="select"
          name="departure"
          placeholder="출발 공항"
          isLoading={isAirportLoading}
        />
        <FormInput
          inputType="select"
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
