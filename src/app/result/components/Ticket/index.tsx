"use client";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Image from "next/image";
import ImgJinAir from "@/assets/img/logo_jinair.png";
import ImgArrowRight from "@/assets/img/arrow_right.png";

const cn = classNames.bind(styles);

function Ticket() {
  // TODO: 데이터 매핑

  return (
    <div className={cn("Ticket")}>
      <div className={cn("info")}>
        <Image
          className={cn("logo")}
          src={ImgJinAir}
          alt=""
          width={40}
          height={40}
        />
        <div className={cn("detail")}>
          <p className={cn("period")}>24.09.11 ~ 24.09.15 [5일]</p>
          <p className={cn("air-line")}>진에어 | 하나투어</p>
        </div>
        <Image
          className={cn("arrow")}
          src={ImgArrowRight}
          alt=""
          width={10}
          height={10}
        />
      </div>

      <div className={cn("price")}>
        <p>289,000원</p>
      </div>
    </div>
  );
}

export default Ticket;
