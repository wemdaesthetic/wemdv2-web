import type { Metadata } from "next";
import { BRANCHES } from "@/config/branches";

// 지점별 제목 · 설명 (주소 · 전화는 config/branches.ts 의 값을 그대로 사용)
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = BRANCHES.find((x) => x.slug === params.slug);
  if (!b) return { title: "지점 안내 | 위엠디 에스테틱", robots: { index: false } };

  // 주소가 아직 '준비중'인 지점은 검색에 나오지 않게 한다
  if (!b.address || b.address === "준비중") {
    return {
      title: `${b.name} (준비중) | 위엠디 에스테틱`,
      description: `${b.name}은 오픈을 준비하고 있습니다.`,
      robots: { index: false, follow: true },
    };
  }

  if (b.slug === "dunchon") {
    return {
      title: "둔촌동 작은얼굴관리 | 위엠디 에스테틱 둔촌본점",
      description:
        "강동구 둔촌동에서 얼굴, 데콜테, 두피까지 풀어 주는 작은얼굴관리. 양재대로 1371 둔촌빌딩 307호. 전화 " +
        (b.phone ?? ""),
      alternates: { canonical: `/branches/${b.slug}` },
    };
  }
  return {
    title: `${b.name} | 위엠디 에스테틱`,
    description: `${b.address}${b.phone ? ` 전화 ${b.phone}` : ""}`,
    alternates: { canonical: `/branches/${b.slug}` },
  };
}

export default function BranchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
