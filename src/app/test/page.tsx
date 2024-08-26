// "use client";

import Scraping from "@/components/scraping";
import { Suspense } from "react";

function Loading() {
  return <span>로딩중...</span>;
}

async function Test() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Scraping />
      </Suspense>
    </div>
  );
}

export default Test;
