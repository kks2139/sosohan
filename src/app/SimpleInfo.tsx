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

const cn = classNames.bind(styles);

function SimpleInfo() {
  const router = useRouter();
  const { departureArea, departureDate, arrivalArea, arrivalDate, members } =
    tourStore();

  const today = format(new Date(), "M.d(eee)", { locale: ko });

  const routeToArea = (type: "departure" | "arrival") => {
    router.push(`/search/area?type=${type}`);
  };

  return (
    <section className={cn("SimpleInfo")}>
      <div className={cn("wrapper")}>
        <div className={cn("location")}>
          <div>
            <button type="button" onClick={() => routeToArea("departure")}>
              <span className={cn("code")}>{departureArea}</span>
              <span>{areaCodeToKorean[departureArea]}</span>
            </button>
          </div>
          <div>
            <button type="button" onClick={() => routeToArea("arrival")}>
              <span className={cn("code")}>{arrivalArea || "도착"}</span>
              <span>
                {arrivalArea ? areaCodeToKorean[arrivalArea] : "선택하기"}
              </span>
            </button>
          </div>
        </div>
        <div className={cn("date")}>
          <button type="button">{departureDate || today}</button>
          <button type="button">{arrivalDate || today}</button>
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
        <button type="button">
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
