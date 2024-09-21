"use client";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import SearchBar from "../components/SearchBar";
import Areas from "../components/Areas";
import { areaCodeToKorean, nationAreaMap, nations } from "@/utils/constant";
import { useState } from "react";
import IconInfo from "@/assets/img/info.png";
import Image from "next/image";

const cn = classNames.bind(styles);

interface Props {
  searchParams?: { area_for: string };
}

function Page({ searchParams }: Props) {
  const [searchArea, setSearchArea] = useState<string>();

  const areaFor = searchParams?.area_for || "";
  const filteredNations = nations.filter(
    (nat) =>
      !searchArea ||
      nationAreaMap[nat].some((areaCode) =>
        areaCodeToKorean[areaCode].includes(searchArea)
      )
  );
  const nationsForShow = [
    ...(searchArea ? [] : [undefined]),
    ...filteredNations,
  ];

  return (
    <div className={cn("Page")}>
      <h1 className={cn("title")}>
        {areaFor === "departure" ? "어디서" : "어디로"} 가시나요?
      </h1>
      <div className={cn("search-container")}>
        <SearchBar
          onSearch={(area) => {
            setSearchArea(area);
          }}
        />
      </div>

      <ul>
        {nationsForShow.length > 0 ? (
          nationsForShow.map((nat, i) => (
            <li key={`${nat}_${i}`} className={cn("areas")}>
              <Areas nation={nat} areaFor={areaFor} areaFilter={searchArea} />
            </li>
          ))
        ) : (
          <div className={cn("empty-areas")}>
            <Image src={IconInfo} alt="" width={25} height={25} />
            <p>검색결과가 없어요</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Page;
