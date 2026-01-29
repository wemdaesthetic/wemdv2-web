import { Suspense } from "react";
import FaceCareClient from "./FaceCareClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FaceCareClient />
    </Suspense>
  );
}