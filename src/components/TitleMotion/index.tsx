"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);
const KEY_WORDS = ["공동구매", "땡처리"];

function TitleMotion() {
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = showCount + 1;

      setShowCount(next >= KEY_WORDS.length ? 0 : next);
    }, 4_000);

    return () => {
      clearInterval(timer);
    };
  }, [showCount]);

  return (
    <h1 className={cn("TitleMotion")}>
      <div className={cn("motion")}>
        <AnimatePresence>
          {KEY_WORDS.filter((_, idx) => idx === showCount).map((word) => (
            <motion.div
              key={word}
              className={cn("keyword")}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.4, ease: [0.385, 0.01, 0.505, 1.65] }}
            >
              {word}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      항공권을 <strong>한눈에</strong>
    </h1>
  );
}

export default TitleMotion;
