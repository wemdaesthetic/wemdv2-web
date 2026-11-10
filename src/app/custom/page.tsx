import React, { Suspense } from "react";
import CustomCareClient from "./CustomCareClient";

export const metadata = {
  title: "집중 관리 | 위엠디 에스테틱",
  description:
    "위엠디 에스테틱 집중 관리 프로그램. 애플 힙 관리, 러닝 후 관리, 골프 관리를 안내합니다.",
  alternates: { canonical: "/custom" },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CustomCareClient />
    </Suspense>
  );
}