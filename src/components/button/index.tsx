import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "default" | "chip";
  size?: "large" | "regular";
  fullWidth?: boolean;
}

function Button({
  children,
  onClick,
  type = "default",
  size = "regular",
  fullWidth,
}: Props) {
  return (
    <button
      className={cn("Button", {
        [type]: true,
        [size]: true,
        "full-width": fullWidth,
      })}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
