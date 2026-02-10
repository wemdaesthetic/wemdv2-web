// FILE: src/components/drawer/drawerData.ts

export type DrawerSection = "face" | "body" | "custom" | null;

export const DRAWER_ROUTES = {
  face: {
    items: [
      { title: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { title: "엘라조 페이스 관리", href: "/face?p=ellazo-face" }, // (기존 얼굴 V라인 관리)
      { title: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { title: "얼굴 밸런스 관리", href: "/face?p=face-balance" }, // (기존 얼굴 균형 관리)
    ],
  },
  body: {
    items: [
      { title: "상체 관리", href: "/body?p=body-upper" },
      { title: "하체 관리", href: "/body?p=body-lower" },
      { title: "S라인 관리", href: "/body?p=body-sline" },
    ],
  },
  custom: {
    items: [
      { title: "웨딩 관리", href: "/custom?p=wedding" }, // Standard -> 웨딩 관리
      // ❌ 웨딩 관리 Special 제거
      { title: "라운드 숄더 관리", href: "/custom?p=round-shoulder" },
      { title: "애플 힙(골반관리)", href: "/custom?p=apple-hip" },
      { title: "러닝 후 관리", href: "/custom?p=runner-recovery" },
      { title: "골프 관리", href: "/custom?p=golf" },
    ],
  },
} as const;

/**
 * ✅ INFO 링크도 여기서 한 번에 관리
 */
export const DRAWER_INFO_LINKS = {
  reviews: { label: "고객후기", href: "/#reviews" },
  brand: { label: "브랜드 스토리", href: "/#brand" },

  branches: { label: "지점 안내", href: "/branches/dunchon" },

  franchise: { label: "가맹 문의", href: "/#franchise" },
} as const;