"use client";

import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function TitleMotion() {
  return (
    <h1 className={cn("TitleMotion")}>
      <span>공</span>
      <span>동</span>
      <span>구</span>
      <span>매</span> 항공권을 <strong>한눈에</strong>
    </h1>
  );
}

export default TitleMotion;
