import classNames from "classnames/bind";

import Skeleton from "@/components/Skeleton";

import styles from "./ListSkeleton.module.scss";

const cn = classNames.bind(styles);

function ListSkeleton() {
  return (
    <ul className={cn("ListSkeleton")}>
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <li key={idx} className={cn("skeleton-container")}>
            <div className={cn("rows")}>
              <Skeleton width="30%" />
              <Skeleton width="80%" />
              <Skeleton width="80%" />
              <Skeleton width="50%" />
            </div>
            <div className={cn("rows")}>
              <Skeleton width="30%" />
              <Skeleton width="80%" />
              <Skeleton width="80%" />
              <Skeleton width="50%" />
            </div>
          </li>
        ))}
    </ul>
  );
}

export default ListSkeleton;
