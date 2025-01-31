import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  width?: number | string;
  height?: number;
}

function Skeleton({ width, height = 15 }: Props) {
  return (
    <div
      data-skeleton
      className={cn("Skeleton")}
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}px`
            : width
          : "auto",
        height: `${height}px`,
      }}
    ></div>
  );
}

export default Skeleton;
