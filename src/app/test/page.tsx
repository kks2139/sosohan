"use client";

import { useEffect, useState } from "react";

function Test() {
  const [test, setTest] = useState(false);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return <div>TEST {test}</div>;
}

export default Test;
