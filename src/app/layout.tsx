import "./global.scss";

import classNames from "classnames/bind";
import type { Metadata } from "next";

import WithClient from "./(with-client)/WithClient";
import styles from "./layout.module.scss";

const cn = classNames.bind(styles);

export const metadata: Metadata = {
  title: {
    template: "%s | 비행모아",
    default: "비행모아",
  },
  description: "공동구매 땡처리 항공권 모아보기",
  icons: {
    icon: "/favicon.ico", // 기본 파비콘
    shortcut: "/favicon-16x16.png", // 작은 아이콘
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main id="main" className={cn("content")}>
          <WithClient>{children}</WithClient>
        </main>
      </body>
    </html>
  );
}
