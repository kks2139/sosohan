"use client";

import Button from "@/components/button";
import { apiOrigin } from "@/utils/constant";
import { useState } from "react";

function Temp() {
  const [isLoading_1, setIsLoading_1] = useState(false);
  const [isLoading_2, setIsLoading_2] = useState(false);

  const request = async (type: "contents" | "areas") => {
    switch (type) {
      case "contents":
        setIsLoading_1(true);
        await fetch(`${apiOrigin}/api/scrap/contents?target=${"HANA_TOUR"}`);
        setIsLoading_1(false);
        break;
      case "areas":
        setIsLoading_2(true);
        await fetch(`${apiOrigin}/api/scrap/areas`);
        setIsLoading_2(false);
        break;
    }
  };

  return (
    <div>
      <h1>API 테스트</h1>

      <Button
        onClick={() => request("contents")}
        loading={isLoading_1}
        size="large"
      >
        GET 하나투어 컨텐츠
      </Button>

      <Button onClick={async () => request("areas")} loading={isLoading_2}>
        지역 목록
      </Button>
    </div>
  );
}

export default Temp;
