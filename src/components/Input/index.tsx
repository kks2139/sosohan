import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessages?: string[];
}

function Input({ label, errorMessages, ...rest }: Props) {
  return (
    <div className={cn("Input")}>
      {label && <span className={cn("label")}>label</span>}
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
