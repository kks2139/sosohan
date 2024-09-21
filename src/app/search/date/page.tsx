"use client";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { tourStore } from "@/store/tour";
import { useState } from "react";
import Button from "@/components/button";

const cn = classNames.bind(styles);

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDeparture = searchParams.get("date_for") === "departure";
  const { setDepartureDate, setArrivalDate } = tourStore();

  const [inputDate, setInputDate] = useState<Date>();

  return (
    <div className={cn("Page")}>
      <h1 className={cn("title")}>
        {isDeparture ? "가는" : "오는"} 날은 언제인가요?
      </h1>

      <div>
        {/* TODO: 달력 스타일 */}
        <Calendar
          onChange={(value) => {
            setInputDate(value as Date);
          }}
        />
      </div>

      <div className={cn("button-container")}>
        <Button
          fullWidth
          floating
          size="large"
          disabled={!inputDate}
          onClick={() => {
            if (!inputDate) {
              return;
            }

            const date = inputDate?.toString();

            if (isDeparture) {
              setDepartureDate(date);
            } else {
              setArrivalDate(date);
            }

            router.replace("/");
          }}
        >
          선택
        </Button>
      </div>
    </div>
  );
}

export default Page;
