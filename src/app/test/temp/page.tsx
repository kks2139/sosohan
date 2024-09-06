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
    return <div>로딩중......</div>;
  }

  return <div>api 테스트입니다.</div>;
}

export default Temp;
