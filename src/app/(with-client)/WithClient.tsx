"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { HelpCircle, Share2 } from "react-feather";

import ThemeToggle from "@/components/ThemeToggle";
import { viewStore } from "@/store/view";
import { DARK_MODE_CLASS, storageKey } from "@/utils/constant";

import styles from "./WithClient.module.scss";

const cn = classNames.bind(styles);

const queryClient = new QueryClient();

function WithClient({ children }: { children: React.ReactNode }) {
  const { setTheme } = viewStore();

  useEffect(() => {
    const isDarkMode = localStorage.getItem(storageKey.IS_DARK_MODE) === "true";

    if (isDarkMode) {
      setTheme("dark");
      localStorage.setItem(storageKey.IS_DARK_MODE, "true");
      document.body.classList.add(DARK_MODE_CLASS);
    }
  }, [setTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <nav className={cn("top-menu-bar")}>
        <div className={cn("title")}>
          <button type="button">
            <h1>타이틀</h1>
          </button>
        </div>

        <div className={cn("info")}>
          <ThemeToggle size={28} />
          <button type="button">
            <HelpCircle size={25} />
          </button>
          <button type="button">
            <Share2 size={25} />
          </button>
        </div>
      </nav>
      {children}
    </QueryClientProvider>
  );
}

export default WithClient;
