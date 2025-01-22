"use client";

import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import Input from "@/components/Input";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { AirportData, airportStore } from "@/store/airport";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);
const DEFAULT_MAX_ROW = 30;

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
  const [maxRow, setMaxRow] = useState(DEFAULT_MAX_ROW);
  const [focusedRow, setFocusedRow] = useState<number>();
  const [focusedRowTop, setFocusedRowTop] = useState<number>();

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

  const resetFocusedRow = useCallback(() => {
    if (inputType !== "select") {
      return;
    }

    setFocusedRow(undefined);
    setFocusedRowTop(undefined);
  }, [inputType]);

  const selectAirport = (selected: AirportData) => {
    setInputValue(selected.한글공항);
    setSelectedAirportCode(selected["공항코드1(IATA)"]);
  };

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
      setMaxRow(DEFAULT_MAX_ROW);
    }
  }, [isShowSelectBox]);

  useEffect(() => {
    if (!isFocused) {
      resetFocusedRow();
    }
  }, [isFocused, resetFocusedRow]);

  useEffect(() => {
    if (!selectBoxElement || focusedRowTop === undefined) {
      return;
    }

    const viewTop = selectBoxElement.scrollTop;
    const viewBottom =
      selectBoxElement.scrollTop + selectBoxElement.clientHeight;
    const rowTop = focusedRowTop;
    const rowBottom = focusedRowTop + 40;
    const isRowOut = viewTop > rowBottom || viewBottom < rowTop;

    // 방향키로 행 이동시, 스크롤 따라 움직이도록 처리
    if (isRowOut) {
      selectBoxElement.scrollTo(0, rowTop);

      return;
    }

    if (rowTop < viewTop) {
      selectBoxElement.scrollBy(0, -41);
    }

    if (rowBottom > viewBottom) {
      selectBoxElement.scrollBy(0, 41);
    }
  }, [focusedRow, focusedRowTop, selectBoxElement]);

  return (
    <div ref={rootRef} className={cn("FormInput", { error: isError })}>
      <Input
        {...rest}
        name={name}
        disabled={isShowLoading}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          resetFocusedRow();
          setTimeout(() => setIsFocused(false));
        }}
        onChange={(e) => {
          setIsFocused(true);
          setInputValue(e.target.value.trim());
          setSelectedAirportCode("");
        }}
        onKeyDown={(e) => {
          if (inputType !== "select") {
            return;
          }

          const noFocusedRow = focusedRow === undefined;

          switch (e.key) {
            case "ArrowUp":
              if (noFocusedRow) return;

              setFocusedRow(Math.max(0, focusedRow - 1));

              break;
            case "ArrowDown":
              setFocusedRow(
                noFocusedRow ? 0 : Math.min(maxRow - 1, focusedRow + 1)
              );

              break;
            case "Enter":
              if (noFocusedRow) return;

              selectAirport(filteredAirports[focusedRow]);
              setIsFocused(false);
              resetFocusedRow();

              break;
            case "Escape":
              setIsFocused(false);
              resetFocusedRow();
              break;
          }
        }}
        value={inputValue}
      />

      {!!inputValue && isFocused && (
        <button
          className={cn("clear")}
          type="button"
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
              return (
                <li
                  ref={(node) => {
                    if (idx === focusedRow && node) {
                      setFocusedRowTop(node.offsetTop);
                    }
                  }}
                  key={airport["공항코드1(IATA)"]}
                  className={cn({
                    darker: idx % 2 === 0,
                    "is-selecting": focusedRow === idx,
                  })}
                >
                  <button
                    type="button"
                    onClick={() => {
                      selectAirport(airport);
                    }}
                    onMouseEnter={() => {
                      resetFocusedRow();
                    }}
                  >
                    <span>{airport.한글공항}</span>
                    <span className={cn("code")}>
                      {`(${airport["공항코드1(IATA)"]})`}
                    </span>
                    <span className={cn("sub")}>{airport.한글국가명}</span>
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
