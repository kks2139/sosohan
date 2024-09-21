"use client";

import classNames from "classnames/bind";
import styles from "./SimpleInfo.module.scss";
import Image from "next/image";
import ImgAirPlane from "@/assets/img/air_plane.png";
import { useRouter } from "next/navigation";
import { memberTypeToKorean, tourStore } from "@/store/tour";
import { areaCodeToKorean } from "@/utils/constant";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type SearchFor = "departure" | "arrival";

const cn = classNames.bind(styles);

function formatDate(date?: string) {
  return format(date || new Date(), "M.d(eee)", { locale: ko });
}

function SimpleInfo() {
  const router = useRouter();
  const { departureArea, departureDate, arrivalArea, arrivalDate, members } =
    tourStore();

  const toSearchArea = (searchFor: SearchFor) => {
    router.push(`/search/area?area_for=${searchFor}`);
  };

  const toSearchDate = (searchFor: SearchFor) => {
    router.push(`/search/date?date_for=${searchFor}`);
  };

  const toMember = () => {
    router.push(`/search/member`);
  };

  return (
    <section className={cn("SimpleInfo")}>
      <div className={cn("wrapper")}>
        <div className={cn("location")}>
          <div>
            <button type="button" onClick={() => toSearchArea("departure")}>
              <span className={cn("code")}>{departureArea}</span>
              <span>{areaCodeToKorean[departureArea]}</span>
            </button>
          </div>
          <div>
            <button type="button" onClick={() => toSearchArea("arrival")}>
              <span className={cn("code")}>{arrivalArea || "도착"}</span>
              <span>
                {arrivalArea ? areaCodeToKorean[arrivalArea] : "선택하기"}
              </span>
            </button>
          </div>
        </div>
        <div className={cn("date")}>
          <button type="button" onClick={() => toSearchDate("departure")}>
            {formatDate(departureDate)}
          </button>
          <button type="button" onClick={() => toSearchDate("arrival")}>
            {formatDate(arrivalDate)}
          </button>
        </div>
        <Image
          className={cn("plane")}
          src={ImgAirPlane}
          alt=""
          width={30}
          height={30}
        />
      </div>

      <div className={cn("member")}>
        <button type="button" onClick={toMember}>
          {!members.length
            ? "인원 수"
            : members
                .map(
                  ({ type, count }) => `${memberTypeToKorean[type]} ${count}`
                )
                .join(" / ")}
        </button>
      </div>
    </section>
  );
}

export default SimpleInfo;
