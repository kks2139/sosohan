"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "react-feather";

import Button from "@/components/Button";

import styles from "./not-found.module.scss";

const cn = classNames.bind(styles);

function NotFound() {
  const router = useRouter();

  return (
    <div className={cn("NotFound")}>
      <p>
        <h1>잘못된 주소에요!</h1>
        <AlertTriangle size={23} />
      </p>
      <Button sizeType="regular" onClick={() => router.replace("/")}>
        홈 가기
      </Button>
    </div>
  );
}

export default NotFound;
