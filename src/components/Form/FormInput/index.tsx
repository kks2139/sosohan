"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { AirportData, airportStore } from "@/store/airport";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);
const MAX_ROW = 30;

type AirportDataKey = keyof AirportData;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isLoading?: boolean;
  inputType?: "default" | "select";
}

function FormInput({ name, inputType = "default", isLoading, ...rest }: Props) {
  const { airportInfo: { data: airports } = {} } = airportStore();
  const { pending } = useFormStatus();
  const [isError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedAirportCode, setSelectedAirportCode] = useState<string>("");
  const [selectBoxElement, setSelectBoxElement] = useState<Element | null>(
    null
  );
  const [maxRow, setMaxRow] = useState(MAX_ROW);

  const rootRef = useRef<HTMLDivElement>(null);
  const selectBottomRef = useRef<HTMLDivElement>(null);

  const isShowLoading = pending || isLoading;
  const filteredAirports =
    airports?.filter((a) => {
      const fields: AirportDataKey[] = [
        "공항코드1(IATA)",
        "한글공항",
        "한글국가명",
      ];

      return fields.some((field) =>
        a[field]
          ?.toLowerCase()
          .includes((selectedAirportCode || inputValue).toLowerCase())
      );
    }) || [];
  const isShowSelectBox =
    inputType === "select" &&
    isFocused &&
    !!inputValue &&
    filteredAirports.length > 0 &&
    !isShowLoading;

  useIntersectionObserver({
    rootElement: selectBoxElement,
    targetElement: selectBottomRef.current,
    onIntersection: () => {
      setMaxRow((prev) => Math.min(filteredAirports.length, prev + 30));
    },
  });

  useEffect(() => {
    // AnimatePresence로 인해, 초기에 하위 요소가 없을경우
    // ref가 계속 null 인채로 바뀌지 않아서 직접 세팅
    if (isShowSelectBox) {
      setTimeout(() =>
        setSelectBoxElement(
          rootRef.current?.querySelector("#SelectBox") || null
        )
      );
    } else {
      setSelectBoxElement(null);
    }
  }, [isShowSelectBox]);

  useEffect(() => {
    if (!isShowSelectBox) {
      setMaxRow(MAX_ROW);
    }
  }, [isShowSelectBox]);

  return (
    <div ref={rootRef} className={cn("FormInput", { error: isError })}>
      <input
        {...rest}
        name={name}
        disabled={isShowLoading}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false))}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSelectedAirportCode("");
        }}
        value={inputValue}
      />

      {!!inputValue && isFocused && (
        <button
          className={cn("clear")}
          onMouseDown={() => {
            setInputValue("");
            setSelectedAirportCode("");
          }}
        >
          <span>X</span>
        </button>
      )}

      <AnimatePresence>
        {isShowSelectBox && (
          <motion.ul
            id="SelectBox"
            className={cn("select-box")}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
          >
            {filteredAirports.slice(0, maxRow).map((airport, idx) => {
              const text = `${airport.한글국가명} - ${airport.한글공항} (${airport["공항코드1(IATA)"]})`;

              return (
                <li
                  key={airport["공항코드1(IATA)"]}
                  className={cn({ darker: idx % 2 === 0 })}
                >
                  <button
                    onClick={() => {
                      console.log(text);

                      setInputValue(text);
                      setSelectedAirportCode(airport["공항코드1(IATA)"]);
                    }}
                  >
                    {text}
                  </button>
                </li>
              );
            })}
            <div className={cn("bottom")} ref={selectBottomRef}></div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FormInput;
