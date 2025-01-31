"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ImgAirPlane from "@/assets/img/air_plain_2.png";
import ImgSLoad from "@/assets/img/s_load_2.png";
import { useAirportQuery } from "@/queries/useAirportQuery";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  startCode?: string | null;
  endCode?: string | null;
}

function ResultHeader({ startCode, endCode }: Props) {
  const router = useRouter();
  const { data } = useAirportQuery();

  const startAirportName = data?.find(
    (a) => a["공항코드1(IATA)"] === startCode
  )?.한글공항;
  const endAirportName = data?.find(
    (a) => a["공항코드1(IATA)"] === endCode
  )?.한글공항;

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

      <div className={cn("search-info")}>
        {startAirportName && (
          <span>
            <span className={cn("label")}>출국 {">"} </span>
            <span>{`${startAirportName}`}</span>
            <span className={cn("code")}>{`(${startCode})`}</span>
          </span>
        )}
        {endAirportName && (
          <span>
            <span className={cn("label")}>귀국 {">"} </span>
            <span>{`${endAirportName}`}</span>
            <span className={cn("code")}>{`(${endCode})`}</span>
          </span>
        )}
        <button
          className={cn("go-back")}
          type="button"
          onClick={() => {
            router.replace("/");
          }}
        >
          검색조건 다시 입력
        </button>
      </div>
    </section>
  );
}

export default ResultHeader;
