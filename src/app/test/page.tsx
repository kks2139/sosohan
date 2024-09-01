// "use client";

import Scraping from "@/components/scraping";
import { Suspense } from "react";
import SkeletonLoading from "./(common)/SkeletonLoading";
import { Target, targetToKorean } from "@/utils/scraping";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

const TARGETS: Target[] = ["HANA_TOUR", "MODE_TOUR", "ONLINE_TOUR"];

function Test() {
  return (
    <div>
      {TARGETS.map((target) => (
        <section key={target}>
          <h2 className={cn("title")}>{targetToKorean[target]}</h2>
          <Suspense fallback={<SkeletonLoading />}>
            <Scraping target={target} />
          </Suspense>
        </section>
      ))}
    </div>
  );
}

export default Test;
