"use client";

import classNames from "classnames/bind";

import { viewStore } from "@/store/view";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  width?: number | string;
  height?: number;
}

function Skeleton({ width, height = 15 }: Props) {
  const { getIsDarkMode } = viewStore();

  return (
    <div
      data-skeleton
      className={cn("Skeleton", { "is-dark-mode": getIsDarkMode() })}
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}px`
            : width
          : "auto",
        height: `${height}px`,
      }}
    ></div>
  );
}

export default Skeleton;
