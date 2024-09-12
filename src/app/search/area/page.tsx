import classNames from "classnames/bind";
import styles from "./page.module.scss";
import SearchBar from "../components/SearchBar";
import Areas from "../components/Areas";
import { nations } from "@/utils/constant";

const cn = classNames.bind(styles);

function Page() {
  return (
    <div className={cn("Page")}>
      <h1 className={cn("title")}>어디로 가시나요?</h1>
      <div className={cn("search-container")}>
        <SearchBar />
      </div>

      <ul>
        {[undefined, ...nations].map((nat, i) => (
          <li key={`${nat}_${i}`} className={cn("area-item")}>
            <Areas nation={nat} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
