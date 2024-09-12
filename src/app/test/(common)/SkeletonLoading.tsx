import Skeleton from "@/components/skeleton";
import styles from "./SkeletonLoading.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  times?: number;
}

function SkeletonLoading({ times = 1 }: Props) {
  return (
    <>
      {Array(times)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className={cn("SkeletonLoading")}>
            <Skeleton width={200} height={25} />
            <Skeleton width={350} height={20} />
            <Skeleton width={350} height={20} />
            <Skeleton width={350} height={20} />
          </div>
        ))}
    </>
  );
}

export default SkeletonLoading;
