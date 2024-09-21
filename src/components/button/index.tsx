import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "default" | "chip";
  size?: "large" | "regular";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  floating?: boolean;
  id?: string;
}

function Button({
  children,
  onClick,
  type = "default",
  size = "regular",
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
        [type]: true,
        [size]: true,
        "full-width": fullWidth,
        loading,
        floating,
      })}
      type="button"
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
