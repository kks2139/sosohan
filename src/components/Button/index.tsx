import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  sizeType?: "large" | "regular";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  floating?: boolean;
}

function Button({
  children,
  sizeType = "regular",
  fullWidth,
  loading,
  disabled,
  floating,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      className={cn("Button", {
        [sizeType]: true,
        "full-width": fullWidth,
        loading,
        floating,
      })}
      type={type}
      disabled={disabled || loading}
      {...rest}
    >
      <div className={cn("dots")}>
        <div />
        <div />
        <div />
      </div>
      <div className={cn("contents")}>{children}</div>
    </button>
  );
}

export default Button;
