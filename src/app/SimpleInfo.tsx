"use client";

import classNames from "classnames/bind";
import styles from "./SimpleInfo.module.scss";
import Image from "next/image";
import ImgAirPlane from "@/assets/img/air_plane.png";
import { useRouter } from "next/navigation";

const cn = classNames.bind(styles);

function SimpleInfo() {
  const router = useRouter();

  const toSearchAirLine = () => {
    router.push("/search/air-line");
  };

  return (
    <section className={cn("SimpleInfo")}>
      <div className={cn("wrapper")}>
        <div className={cn("location")}>
          <div>
            <button type="button" onClick={toSearchAirLine}>
              <span className={cn("code")}>ICN</span>
              <span>인천</span>
            </button>
          </div>
          <div>
            <button type="button" onClick={toSearchAirLine}>
              <span className={cn("code")}>DAN</span>
              <span>다낭</span>
            </button>
          </div>
        </div>
        <div className={cn("date")}>
          <button type="button">9.5{"(목)"}</button>
          <button type="button">10.4{"(금)"}</button>
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
        <button type="button">성인 1</button>
      </div>
    </section>
  );
}

export default SimpleInfo;
