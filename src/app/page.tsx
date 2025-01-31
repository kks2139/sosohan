import classNames from "classnames/bind";
import Image from "next/image";

import ImgAirPlane from "@/assets/img/air_plane.png";
import ImgOnline from "@/assets/img/online_logo.png";
import ImgSLoad from "@/assets/img/s_load.png";
import ToastMessages from "@/components/ToastMessages";

import styles from "./page.module.scss";
import SimpleInfo from "./SimpleInfo";

const cn = classNames.bind(styles);

function Page() {
  console.log(ImgOnline);
  return (
    <div className={cn("Page")}>
      <section className={cn("intro")}>
        {/* <div className={cn("logos")}>
          <Image src={ImgHana} alt="" width={55} height={55} />
          <Image src={ImgMode} alt="" width={75} height={55} />
          <Image src={ImgOnline} alt="" width={50} height={50} />
        </div> */}
        <h1 className={cn("title")}>
          공동구매항공권 <span>한눈에</span>
        </h1>
        <div className={cn("key-visual")}>
          <Image src={ImgSLoad} alt="" width={90} height={90} />
          <Image
            className={cn("plane")}
            src={ImgAirPlane}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </section>

      <section className={cn("form")}>
        <SimpleInfo />
      </section>

      <ToastMessages />
    </div>
  );
}

export default Page;
