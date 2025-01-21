"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import ImgAirPlane from "@/assets/img/air_plain_2.png";
import ImgSLoad from "@/assets/img/s_load_2.png";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function ResultHeader() {
  return (
    <section className={cn("ResultHeader")}>
      <div className={cn("title")}>
        s
        <h1>
          가능한 <span>항공권</span>을<br />
          모두 찾았어요!
        </h1>
        <div className={cn("images")}>
          <Image src={ImgAirPlane} alt="" width={60} height={60} />
          <Image src={ImgSLoad} alt="" width={41} height={41} />
        </div>
      </div>

      {/* <p className={cn("tour-info")}>
        {`${areaCodeToKorean[departureArea]} > ${
          areaCodeToKorean[arrivalArea]
        } | ${format(departureDate, "M.d")} ~ ${format(
          arrivalDate,
          "M.d"
        )} | ${members
          .filter(({ count }) => !!count)
          .map(({ type, count }) => `${memberTypeToKorean[type]} ${count}`)
          .join(". ")}`}
      </p> */}
    </section>
  );
}

export default ResultHeader;
