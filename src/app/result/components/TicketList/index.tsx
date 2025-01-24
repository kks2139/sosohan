"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import ImgInfo from "@/assets/img/info_2.png";

import Ticket from "../Ticket";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function TicketList() {
  return (
    <div className={cn("TicketList")}>
      <div className={cn("sort")}>
        <button className={cn("button")} type="button">
          <Image src={ImgInfo} alt="" width={14} height={14} />
          <span>가격순</span>
        </button>
      </div>

      {/* TODO: 스크래핑 호출, 결과목록 노출 */}
      <ul className={cn("list-container")}>
        {new Array(10).fill(0).map((_, i) => (
          <li key={i}>
            <Ticket />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
