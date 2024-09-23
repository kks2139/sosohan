"use client";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import ImgAirPlane from "@/assets/img/air_plain_2.png";
import ImgSLoad from "@/assets/img/s_load_2.png";
import Image from "next/image";
import { memberTypeToKorean, tourStore } from "@/store/tour";
import { areaCodeToKorean } from "@/utils/constant";
import { format } from "date-fns";

const cn = classNames.bind(styles);

function ResultHeader() {
  const now = new Date();
  const {
    departureArea,
    arrivalArea = "ICN",
    departureDate = now.toString(),
    arrivalDate = now.toString(),
    members,
  } = tourStore();

  return (
    <section className={cn("ResultHeader")}>
      <div className={cn("title")}>
        <h1>
          가능한 <span>항공권</span>을<br />
          모두 찾았어요!
        </h1>
        <div className={cn("images")}>
          <Image src={ImgAirPlane} alt="" width={60} height={60} />
          <Image src={ImgSLoad} alt="" width={41} height={41} />
        </div>
      </div>

      <p className={cn("tour-info")}>
        {`${areaCodeToKorean[departureArea]} > ${
          areaCodeToKorean[arrivalArea]
        } | ${format(departureDate, "M.d")} ~ ${format(
          arrivalDate,
          "M.d"
        )} | ${members
          .filter(({ count }) => !!count)
          .map(({ type, count }) => `${memberTypeToKorean[type]} ${count}`)
          .join(". ")}`}
      </p>
    </section>
  );
}

export default ResultHeader;
