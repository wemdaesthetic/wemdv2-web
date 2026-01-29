import { Suspense } from "react";
import BodyCareClient from "./BodyCareClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BodyCareClient />
    </Suspense>
  );
}