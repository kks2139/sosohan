import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { apiOrigin, ScrapTarget } from "@/utils/constant";

const cn = classNames.bind(styles);

interface ResData {
  departure: Record<string, string>;
  back: Record<string, string>;
  price: string;
  member: string;
}

interface Props {
  target: ScrapTarget;
}

async function Scraping({ target }: Props) {
  const res = await fetch(`${apiOrigin}/api/scrap/contents?target=${target}`);

  if (res.status !== 200) {
    return <p>스크래핑 에러..</p>;
  }

  const json = await res.json();
  const result = json.result as ResData[];

  if (!result?.length) {
    return <p className={cn("no-result")}>결과없음..</p>;
  }

  return (
    <ul>
      {result.map(({ departure, back, price, member }, idx) => (
        <li key={idx}>{`${departure}_${back}_${price}_${member}`}</li>
      ))}
    </ul>
  );
}

export default Scraping;
