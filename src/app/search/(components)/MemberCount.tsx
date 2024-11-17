"use client";

import classNames from "classnames/bind";
import styles from "./MemberCount.module.scss";
import { MemberType, memberTypeToKorean } from "@/store/tour";
import Button from "@/components/button";
import { useState } from "react";

const cn = classNames.bind(styles);

interface Props {
  memberType: MemberType;
  onCount: (count: number) => void;
}

function MemberCount({ memberType, onCount }: Props) {
  const [count, setCount] = useState(0);

  const onClick = (type: "up" | "down") => {
    if (type === "down" && count === 0) {
      return;
    }

    const value = type === "up" ? count + 1 : count - 1;

    setCount(value);
    onCount(value);
  };

  return (
    <div className={cn("MemberCount")}>
      <div className={cn("description")}>
        <p className={cn("title")}>{memberTypeToKorean[memberType]}</p>
        <p className={cn("sub-title")}>
          {memberType === "ADULT"
            ? "만 12세 이상"
            : memberType === "CHILD"
            ? "만 2세 ~ 만 11세"
            : "만 2세 미만"}
        </p>
      </div>

      <div className={cn("count")}>
        <Button type="chip" onClick={() => onClick("up")}>
          +
        </Button>
        <span className={cn("number")}>{count}</span>
        <Button type="chip" onClick={() => onClick("down")}>
          -
        </Button>
      </div>
    </div>
  );
}

export default MemberCount;
