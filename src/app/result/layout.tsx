import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검색결과",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}
