import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: Props) {
  return <input className={cn("Input")} {...rest} />;
}

export default Input;
