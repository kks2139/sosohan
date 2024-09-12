"use client";

import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";
import ImgMagnifyingGlass from "@/assets/img/magnifying-glass.png";
import Image from "next/image";
import { useState } from "react";

const cn = classNames.bind(styles);

interface Props {
  value?: string;
  onSearch?: (value: string) => void;
}

function SearchBar({ value, onSearch }: Props) {
  const [inputValue, setInputValue] = useState(value || "");

  return (
    <div className={cn("SearchBar")}>
      <input
        value={inputValue}
        maxLength={50}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSearch?.(inputValue);
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value.trim());
        }}
      />

      <button type="button" onClick={() => onSearch?.(inputValue)}>
        <Image src={ImgMagnifyingGlass} width={30} height={30} alt="" />
      </button>
    </div>
  );
}

export default SearchBar;
