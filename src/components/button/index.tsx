import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "large" | "regular";
  type?: HTMLButtonElement["type"];
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  floating?: boolean;
  id?: string;
}

function Button({
  children,
  onClick,
  size = "regular",
  type = "button",
  fullWidth,
  loading,
  disabled,
  floating,
  id,
}: Props) {
  return (
    <button
      id={id}
      className={cn("Button", {
        [size]: true,
        "full-width": fullWidth,
        loading,
        floating,
      })}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
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
