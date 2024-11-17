"use client";

import Button from "@/components/button";
import { apiOrigin } from "@/utils/constant";
import { useState } from "react";

function Temp() {
  const [isLoading_1, setIsLoading_1] = useState(false);
  const [isLoading_2, setIsLoading_2] = useState(false);
  const [isLoading_3, setIsLoading_3] = useState(false);

  const request = async (type: "contents" | "areas" | "airport") => {
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
      case "airport":
        setIsLoading_3(true);
        await fetch(`${apiOrigin}/api/airport`);
        setIsLoading_3(false);
        break;
    }
  };

  return (
    <div>
      <h1>API 테스트</h1>

      <Button onClick={() => request("contents")} loading={isLoading_1}>
        GET 하나투어 컨텐츠
      </Button>

      <Button onClick={async () => request("areas")} loading={isLoading_2}>
        지역 목록
      </Button>

      <Button onClick={async () => request("airport")} loading={isLoading_3}>
        세계공항 정보
      </Button>
    </div>
  );
}

export default Temp;
