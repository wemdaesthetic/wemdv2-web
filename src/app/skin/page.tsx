import { Suspense } from "react";
import SkinCareClient from "./SkinCareClient";

export const metadata = {
  title: "스킨 솔루션 관리 | 위엠디 에스테틱",
  description:
    "위엠디 에스테틱 스킨 솔루션 관리. 수분 채움, 트러블 케어, 광채 채움, 앰플 부스팅을 안내합니다.",
  alternates: { canonical: "/skin" },
};

export default function SkinPage() {
  return (
    <Suspense fallback={null}>
      <SkinCareClient />
    </Suspense>
  );
}