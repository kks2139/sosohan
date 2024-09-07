"use client";

import { apiOrigin } from "@/utils/constant";
import { useEffect, useState } from "react";

function Temp() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      await fetch(`${apiOrigin}/api/scrap?target=${"HANA_TOUR"}`);

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <div>로딩중..................</div>;
  }

  return <h1>API 테스트</h1>;
}

export default Temp;
