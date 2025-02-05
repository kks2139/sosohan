"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styles from "./WithClient.module.scss";
import classNames from "classnames/bind";
import { HelpCircle, Home, Share2 } from "react-feather";

const cn = classNames.bind(styles);

const queryClient = new QueryClient();

function WithClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <nav className={cn("top-menu-bar")}>
        <div className={cn("title")}>
          <button type="button">
            <h1>타이틀임둥</h1>
          </button>
        </div>

        <div className={cn("info")}>
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
