import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function DotLoading() {
  return (
    <div className={cn("DotLoading")}>
      <div />
      <div />
      <div />
    </div>
  );
}

export default DotLoading;
