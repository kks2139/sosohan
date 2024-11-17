"use client";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Button from "@/components/button";
import { useStore } from "@/hooks/useStore";

const cn = classNames.bind(styles);

interface Props {
  searchParams?: { search_for: string };
}

function Page({ searchParams }: Props) {
  const router = useRouter();
  const isDeparture = searchParams?.search_for === "departure";
  const {
    tourStore: { setDepartureDate, setArrivalDate },
  } = useStore();

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
