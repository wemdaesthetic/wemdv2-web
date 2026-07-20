import { Suspense } from "react";
import SkinCareClient from "./SkinCareClient";

export const metadata = {
  title: "스킨 솔루션 관리 | WeMD 에스테틱",
  description: "WeMD 에스테틱 스킨 솔루션 관리",
};

export default function SkinPage() {
  return (
    <Suspense fallback={null}>
      <SkinCareClient />
    </Suspense>
  );
}