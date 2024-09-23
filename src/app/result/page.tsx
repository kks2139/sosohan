import classNames from "classnames/bind";

import styles from "./page.module.scss";
import ResultHeader from "./components/ResultHeader";
import TicketList from "./components/TicketList";

const cn = classNames.bind(styles);

function Page() {
  return (
    <div className={cn("Page")}>
      <ResultHeader />

      <div className={cn("result-container")}>
        <TicketList />
      </div>
    </div>
  );
}

export default Page;
