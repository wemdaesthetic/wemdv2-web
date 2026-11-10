import { Suspense } from "react";
import type { Metadata } from "next";
import FaceCareClient from "./FaceCareClient";

const PROGRAM_META: Record<string, { title: string; description: string }> = {
  "face-slimming": {
    title: "작은 얼굴 관리 | 위엠디 에스테틱 둔촌동",
    description:
      "강동구 둔촌동 위엠디 에스테틱의 작은 얼굴 관리. 클렌징, 어깨·목, 두피, 탄력 관리, 골선 관리, 팩까지 80분 코스입니다.",
  },
};

export function generateMetadata({
  searchParams,
}: {
  searchParams: { p?: string };
}): Metadata {
  const p = searchParams?.p;
  const m = p ? PROGRAM_META[p] : undefined;
  if (m) {
    return { ...m, alternates: { canonical: `/face?p=${p}` } };
  }
  return {
    title: "얼굴 관리 | 위엠디 에스테틱",
    description:
      "위엠디 에스테틱 얼굴 관리 프로그램. 얼굴 리프팅, V라인, 작은 얼굴, 얼굴 균형, 웨딩 관리를 안내합니다.",
    alternates: { canonical: "/face" },
  };
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FaceCareClient />
    </Suspense>
  );
}
