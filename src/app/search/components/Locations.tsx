"use client";

import classNames from "classnames/bind";
import styles from "./Locations.module.scss";
import {
  AreaCode,
  areaCodeToKorean,
  nationAreaMap,
  nationToKorea,
  NationType,
} from "@/utils/constant";

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
  onClick?: (code: AreaCode) => void;
}

function Locations({ nation, onClick }: Props) {
  const title = nation ? nationToKorea[nation] : "주요 여행지";
  const areas = nation ? nationAreaMap[nation] : POPULAR_AREAS;

  return (
    <div className={cn("Locations")}>
      <p className={cn("title")}>{title}</p>
      <ul className={cn("area-container")}>
        {areas.map((code) => (
          <li key={code} className={cn("item")}>
            <button
              type="button"
              onClick={() => {
                // TODO: 선택 처리

                onClick?.(code);
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

export default Locations;
