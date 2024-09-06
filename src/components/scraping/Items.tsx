"use client";

import classNames from "classnames/bind";
import styles from "./Items.module.scss";
import { useRef } from "react";

const cn = classNames.bind(styles);

interface Props {
  data: string[][];
}

function Items({ data }: Props) {
  const containerRef = useRef<HTMLUListElement>(null);

  return (
    <ul className={cn("Items")} ref={containerRef}>
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
    </ul>
  );
}

export default Items;
