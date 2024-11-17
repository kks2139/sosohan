"use client";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import SearchBar from "../(components)/SearchBar";
import Airports from "../(components)/Airports";
import { useState } from "react";
import IconInfo from "@/assets/img/info.png";
import Image from "next/image";
import { airportStore } from "@/store/airport";

const cn = classNames.bind(styles);

interface Props {
  searchParams?: { search_for: string };
}

function Page({ searchParams }: Props) {
  const searchFor = searchParams?.search_for || "";

  const { airportsGroupedByNation } = airportStore();
  const [searchText, setSearchText] = useState<string>();

  // TODO: test
  console.log(searchText);

  return (
    <div className={cn("Page")}>
      <h1 className={cn("title")}>
        {searchFor === "departure" ? "어디서" : "어디로"} 가시나요?
      </h1>
      <div className={cn("search-container")}>
        <SearchBar
          onSearch={(value) => {
            setSearchText(value);
          }}
        />
      </div>

      <ul>
        {airportsGroupedByNation().length > 0 ? (
          airportsGroupedByNation().map(({ nationName, airports }) => (
            <li key={nationName} className={cn("airports")}>
              <Airports
                searchFor={searchFor}
                nationName={nationName}
                airports={airports}
              />
            </li>
          ))
        ) : (
          <div className={cn("empty-airports")}>
            <Image src={IconInfo} alt="" width={25} height={25} />
            <p>검색결과가 없어요</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Page;
