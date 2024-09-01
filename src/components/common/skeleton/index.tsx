import styles from "@/components/common/skeleton/index.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  width?: number;
  height?: number;
}

function Skeleton({ width, height = 30 }: Props) {
  return (
    <div
      data-skeleton
      className={cn("Skeleton")}
      style={{ width: width ? `${width}px` : "auto", height: `${height}px` }}
    ></div>
  );
}

export default Skeleton;
