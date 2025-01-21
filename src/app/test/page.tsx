import classNames from "classnames/bind";
import { Suspense } from "react";

import Scraping from "@/components/Scraping";
import { ScrapTarget, targetToKorean } from "@/utils/constant";

import SkeletonLoading from "./(common)/SkeletonLoading";
import styles from "./page.module.scss";

const cn = classNames.bind(styles);

const TARGETS: ScrapTarget[] = ["HANA_TOUR"];

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
