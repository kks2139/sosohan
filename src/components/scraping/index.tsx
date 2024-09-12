import Items from "./Items";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { apiOrigin, ScrapTarget } from "@/utils/constant";

const cn = classNames.bind(styles);

interface Props {
  target: ScrapTarget;
}

async function Scraping({ target }: Props) {
  const res = await fetch(`${apiOrigin}/api/scrap?target=${target}`);

  if (res.status !== 200) {
    return <p>스크래핑 에러..</p>;
  }

  const json = await res.json();
  const result = json.result;

  return (
    <>
      {result.length > 0 && result[0].length > 0 ? (
        <Items data={result} />
      ) : (
        <p className={cn("no-result")}>결과없음..</p>
      )}
    </>
  );
}

export default Scraping;
