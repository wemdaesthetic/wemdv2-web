// FILE: src/components/drawer/drawerData.ts

export type DrawerSection = "face" | "body" | "custom" | null;

export const DRAWER_ROUTES = {
  face: {
    items: [
      { title: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { title: "얼굴 V라인 관리", href: "/face?p=facial-contouring" },
      { title: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { title: "얼굴 균형 관리", href: "/face?p=facial-balance" },
    ],
  },
  body: {
    items: [
      { title: "상체 관리", href: "/body?p=upper-body" },
      { title: "하체 관리", href: "/body?p=lower-body" },
      { title: "S라인 관리", href: "/body?p=s-line" },
    ],
  },
  custom: {
    items: [
      { title: "웨딩 관리 Standard", href: "/custom?p=wedding-standard" },
      { title: "웨딩 관리 Special", href: "/custom?p=wedding-special" },
      { title: "라운드 숄더 관리", href: "/custom?p=rounded-shoulder" },
      { title: "애플 힙 관리", href: "/custom?p=apple-hip" },
      { title: "러닝 후 관리", href: "/custom?p=runner-recovery" },
      { title: "골프 관리", href: "/custom?p=golf-recovery" },
    ],
  },
} as const;

/**
 * ✅ INFO 링크도 여기서 한 번에 관리
 * - 지점 안내를 "/#branches"로 둘지, "/branches/dunchon"으로 둘지 여기서만 바꾸면 됨
 */
export const DRAWER_INFO_LINKS = {
  reviews: { label: "고객후기", href: "/#reviews" },
  brand: { label: "브랜드 스토리", href: "/#brand" },

  // 👇 너가 MobileDrawer에서 쓰던 동선 유지(지점 페이지로 이동)
  branches: { label: "지점 안내", href: "/branches/dunchon" },

  // 👇 가맹 문의는 섹션 앵커 유지
  franchise: { label: "가맹 문의", href: "/#franchise" },
} as const;