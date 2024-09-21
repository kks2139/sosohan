"use client";

import classNames from "classnames/bind";
import styles from "./Areas.module.scss";
import {
  AreaCode,
  areaCodeToKorean,
  AreaFor,
  nationAreaMap,
  nationToKorea,
  NationType,
} from "@/utils/constant";
import { tourStore } from "@/store/tour";
import { useRouter } from "next/navigation";

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
  areaFor?: AreaFor;
  areaFilter?: string;
}

function Areas({ nation, areaFor, areaFilter }: Props) {
  const router = useRouter();
  const { setDepartureArea, setArrivalArea } = tourStore();

  const title = nation ? nationToKorea[nation] : "주요 여행지";
  const areas = nation ? nationAreaMap[nation] : POPULAR_AREAS;
  const filteredAreas = areas.filter(
    (code) => !areaFilter || areaCodeToKorean[code].includes(areaFilter)
  );

  return (
    <div className={cn("Areas")}>
      <p className={cn("title")}>{title}</p>
      <ul className={cn("area-container")}>
        {filteredAreas.map((code) => (
          <li key={code} className={cn("item")}>
            <button
              type="button"
              onClick={() => {
                if (areaFor === "departure") {
                  setDepartureArea(code);
                } else {
                  setArrivalArea(code);
                }

                router.replace("/");
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
