"use client";

import classNames from "classnames/bind";
import styles from "./Areas.module.scss";
import {
  AreaCode,
  areaCodeToKorean,
  nationAreaMap,
  nationToKorea,
  NationType,
} from "@/utils/constant";
import { tourStore } from "@/store/tour";
import { useRouter, useSearchParams } from "next/navigation";

const cn = classNames.bind(styles);
const POPULAR_AREAS: AreaCode[] = [
  "KIX",
  "FUK",
  "NRT",
  "OKA",
  "BKK",
  "TPE",
  "DAD",
  "HKG",
];

interface Props {
  nation?: NationType;
}

function Areas({ nation }: Props) {
  const router = useRouter();
  const { setDepartureArea, setArrivalArea } = tourStore();
  const params = useSearchParams();
  const isDeparture = params.get("type") === "departure";

  const title = nation ? nationToKorea[nation] : "주요 여행지";
  const areas = nation ? nationAreaMap[nation] : POPULAR_AREAS;

  return (
    <div className={cn("Areas")}>
      <p className={cn("title")}>{title}</p>
      <ul className={cn("area-container")}>
        {areas.map((code) => (
          <li key={code} className={cn("item")}>
            <button
              type="button"
              onClick={() => {
                if (isDeparture) {
                  setDepartureArea(code);
                } else {
                  setArrivalArea(code);
                }

                router.push("/");
              }}
            >
              {areaCodeToKorean[code]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Areas;
