"use client";

import classNames from "classnames/bind";
import styles from "./Airports.module.scss";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStore";
import { AirportData } from "@/store/airport";

const cn = classNames.bind(styles);

interface Props {
  searchFor?: string;
  airports: AirportData[];
  nationName: string;
}

function Airports({ searchFor, airports, nationName }: Props) {
  const router = useRouter();
  const {
    tourStore: { setDepartureArea, setArrivalArea },
  } = useStore();

  return (
    <div className={cn("Airports")}>
      <p className={cn("title")}>{nationName}</p>
      <ul className={cn("airports-container")}>
        {airports.map((data) => {
          const code = data["공항코드1(IATA)"];

          return (
            <li key={code} className={cn("item")}>
              <button
                type="button"
                onClick={() => {
                  if (searchFor === "departure") {
                    setDepartureArea(code);
                  } else {
                    setArrivalArea(code);
                  }

                  router.replace("/");
                }}
              >
                {data["한글공항"]}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Airports;
