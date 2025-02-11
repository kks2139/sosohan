"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import ImgPlane from "@/assets/img/home/airplane-1.png";
import ImgCloud from "@/assets/img/home/cloud-1.png";
import TitleMotion from "@/components/TitleMotion";
import ToastMessages from "@/components/ToastMessages";
import { viewStore } from "@/store/view";

import styles from "./page.module.scss";
import SimpleInfo from "./SimpleInfo";

const cn = classNames.bind(styles);

function Page() {
  const { getIsDarkMode } = viewStore();

  return (
    <div className={cn("Page")}>
      <section className={cn("intro")}>
        <TitleMotion />
        <div className={cn("key-visual", { "is-dark-mode": getIsDarkMode() })}>
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <Image
                key={idx}
                className={cn("cloud", { [`size-${idx}`]: true })}
                src={ImgCloud}
                alt=""
                width={100}
                height={100}
              />
            ))}
          <Image
            className={cn("plane")}
            src={ImgPlane}
            alt=""
            width={100}
            height={100}
          />
        </div>
      </section>

      <section className={cn("form")}>
        <SimpleInfo />
      </section>

      <ToastMessages />
    </div>
  );
}

export default Page;
