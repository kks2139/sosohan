"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import ImgAirPlane from "@/assets/img/air_plane.png";
import ImgHana from "@/assets/img/hana_logo.png";
import ImgMode from "@/assets/img/mode_logo.png";
import ImgOnline from "@/assets/img/online_logo.png";
import ImgSLoad from "@/assets/img/s_load.png";
import Button from "@/components/Button";

import styles from "./page.module.scss";
import SimpleInfo from "./SimpleInfo";

const cn = classNames.bind(styles);

function Page() {
  return (
    <div className={cn("Page")}>
      <section className={cn("intro")}>
        <div className={cn("logos")}>
          <Image src={ImgHana} alt="" width={55} height={55} />
          <Image src={ImgMode} alt="" width={75} height={55} />
          <Image src={ImgOnline} alt="" width={50} height={50} />
        </div>
        <h1 className={cn("title")}>
          공동구매항공권 <span>한눈에</span>
        </h1>
        <h2 className={cn("sub-title")}>
          최대 <span>80%</span>까지 할인 받아요
        </h2>
        <div className={cn("key-visual")}>
          <Image src={ImgSLoad} alt="" width={90} height={90} />
          <Image
            className={cn("plane")}
            src={ImgAirPlane}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </section>

      <Button>TEST</Button>

      <SimpleInfo />
    </div>
  );
}

export default Page;
