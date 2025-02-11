"use client";

import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

import { viewStore } from "@/store/view";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessages?: string[];
}

function Input({ label, errorMessages, ...rest }: Props) {
  const { getIsDarkMode } = viewStore();

  return (
    <div className={cn("Input", { "is-dark-mode": getIsDarkMode() })}>
      {label ? <span className={cn("label")}>{label}</span> : null}
      <input className={cn({ error: !!errorMessages })} {...rest} />
      {!!errorMessages && (
        <div className={cn("error-tooltip")}>
          {errorMessages?.map((msg) => (
            <span key={msg}>{msg}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Input;
