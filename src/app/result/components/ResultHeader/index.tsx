"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, FileText, Meh, Repeat } from "react-feather";

import Skeleton from "@/components/Skeleton";
import { useAirportQuery } from "@/queries/useAirportQuery";
import { useModeTourQuery } from "@/queries/useModeTourQuery";
import { useScrapingQueries } from "@/queries/useScrapingQueries";
import { viewStore } from "@/store/view";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  startCode?: string | null;
  endCode?: string | null;
  hasResults?: boolean;
}

function ResultHeader({ startCode, endCode, hasResults }: Props) {
  const router = useRouter();
  const { data } = useAirportQuery();
  const {
    hanaTour: { isLoading: isHanaLoading },
    onlineTour: { isLoading: isOnlineLoading },
  } = useScrapingQueries();
  const { isLoading: isModeLoading } = useModeTourQuery();
  const { getIsDarkMode } = viewStore();

  const isScrapingLoading = isHanaLoading || isModeLoading || isOnlineLoading;
  const canShowResults =
    hasResults || (!isHanaLoading && !isModeLoading && !isOnlineLoading);

  const startAirportName = data?.find(
    (a) => a["공항코드1(IATA)"] === startCode
  )?.한글공항;
  const endAirportName = data?.find(
    (a) => a["공항코드1(IATA)"] === endCode
  )?.한글공항;

  return (
    <section
      className={cn("ResultHeader", { "is-dark-mode": getIsDarkMode() })}
    >
      <div className={cn("title")}>
        <h1>
          {isScrapingLoading ? (
            <span>
              <strong>항공권</strong>을 찾고있어요
              <br />
              조금만 기다려주세요
            </span>
          ) : !hasResults ? (
            <span>
              조건에 맞는
              <br /> <strong>항공권</strong>이 없어요
            </span>
          ) : (
            <span>
              가능한 <strong>항공권</strong>을<br />
              모두 찾았어요!
            </span>
          )}
        </h1>

        <AnimatePresence>
          <div className={cn("motion-icon")}>
            {isScrapingLoading ? (
              Array(3)
                .fill(0)
                .map((_, idx) => (
                  <FileText
                    key={idx}
                    className={cn("file")}
                    size={45}
                    strokeWidth={2}
                  />
                ))
            ) : (
              <motion.div
                className={cn("motion-div")}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 8 }}
                transition={{ duration: 0.5 }}
              >
                {hasResults ? (
                  <Check className={cn("check")} size={50} strokeWidth={2} />
                ) : (
                  <Meh className={cn("meh")} size={50} strokeWidth={2} />
                )}
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      <div className={cn("search-info")}>
        {canShowResults ? (
          <>
            <div className={cn("condition")}>
              <span>{`${startAirportName}`}</span>
              <span className={cn("code")}>{`(${startCode})`}</span>

              <Repeat size={20} strokeWidth={1} />

              <span>{`${endAirportName || "선택안함"}`}</span>
              {endCode && <span className={cn("code")}>{`(${endCode})`}</span>}
            </div>

            {hasResults && (
              <button
                className={cn("go-back")}
                type="button"
                onClick={() => {
                  router.replace("/");
                }}
              >
                검색조건 다시 입력
              </button>
            )}
          </>
        ) : (
          <div className={cn("skeletons")}>
            <Skeleton width={200} />
            <Skeleton width={120} />
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultHeader;
