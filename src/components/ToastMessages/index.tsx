"use client";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { toastStore } from "@/store/ui";
import { useEffect } from "react";

const cn = classNames.bind(styles);

interface ToastProps {
  message: string;
  duration: number;
  index: number;
  onDurationEnd: () => void;
}

function Toast({ message, duration, index, onDurationEnd }: ToastProps) {
  useEffect(() => {
    setTimeout(() => onDurationEnd(), duration);
  }, [duration, onDurationEnd]);

  return (
    <li
      className={cn("Toast")}
      style={{
        bottom: `${40 + index * 55}px`,
        zIndex: 9999 + index,
        opacity: 1 - index / 5,
      }}
    >
      {message}
    </li>
  );
}

function ToastMessages() {
  const { toasts, removeToastMessage } = toastStore();
  const hasToast = toasts.length > 0;

  if (!hasToast) {
    return null;
  }

  return (
    <ul className={cn("ToastMessages")}>
      {toasts.map(({ id, ...info }, index) => (
        <Toast
          key={id}
          {...info}
          index={index}
          onDurationEnd={() => {
            removeToastMessage(id);
          }}
        />
      ))}
    </ul>
  );
}

export default ToastMessages;
