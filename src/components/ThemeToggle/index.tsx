"use client";

import classNames from "classnames/bind";
import { Moon, Sun } from "react-feather";

import { viewStore } from "@/store/view";
import { DARK_MODE_CLASS, storageKey } from "@/utils/constant";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  size?: number;
}

function ThemeToggle({ size = 30 }: Props) {
  const { setTheme, theme } = viewStore();

  return (
    <button
      style={{
        width: `${size + 25}px`,
        height: `${size}px`,
      }}
      className={cn("ThemeToggle")}
      type="button"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
          localStorage.removeItem(storageKey.IS_DARK_MODE);
          document.body.classList.remove(DARK_MODE_CLASS);
        } else {
          setTheme("dark");
          localStorage.setItem(storageKey.IS_DARK_MODE, "true");
          document.body.classList.add(DARK_MODE_CLASS);
        }
      }}
    >
      <div className={cn("wrapper", { dark: theme === "dark" })}>
        <Sun className={cn("sun")} size={"calc(100% - 8px)"} />
        <Moon className={cn("moon")} size={"calc(100% - 8px)"} />
      </div>
    </button>
  );
}

export default ThemeToggle;
