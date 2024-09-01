import { Scrap, Target } from "@/utils/scraping";
import Items from "./Items";

import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  target: Target;
}

async function Scraping({ target }: Props) {
  const scrap = new Scrap(target);
  const { result, isError } = await scrap.getData();

  if (isError) {
    // TODO: 모든 페이지 스크래핑 에러인경우 처리
    // throw new Error("SCRAPING_ERROR");
  }

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
