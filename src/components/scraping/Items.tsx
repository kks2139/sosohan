"use client";

import classNames from "classnames/bind";
import styles from "./Items.module.scss";
import { useRef, useState } from "react";

const cn = classNames.bind(styles);

interface Props {
  data: string[][];
}

function Items({ data }: Props) {
  const isOverflow = data.length > 3;

  const [isExpand, setIsExpand] = useState(!isOverflow);
  const containerRef = useRef<HTMLUListElement>(null);

  return (
    <ul className={cn("Items", { expand: isExpand })} ref={containerRef}>
      {data.map((infos, i) => (
        <li key={i} className={cn("item")}>
          {infos.map((info, k) => (
            <p key={k}>
              {k === 0 ? (
                <span>
                  {i + 1}. {info}
                </span>
              ) : (
                <span>{` - ${info}`}</span>
              )}
            </p>
          ))}
        </li>
      ))}

      <button
        className={cn("more", { expand: isExpand })}
        onClick={() => {
          if (isExpand) {
            containerRef.current?.scrollTo(0, 0);
          }

          setIsExpand(!isExpand);
        }}
      >
        {isExpand ? "접기" : "더 보기"}
      </button>
    </ul>
  );
}

export default Items;
