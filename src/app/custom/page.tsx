import React, { Suspense } from "react";
import CustomCareClient from "./CustomCareClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CustomCareClient />
    </Suspense>
  );
}