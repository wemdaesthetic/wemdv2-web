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

export const DRAWER_INFO_LINKS = {
  reviews: { label: "고객후기", href: "/#reviews" },
  brand: { label: "브랜드 스토리", href: "/#brand" },
  branches: { label: "지점 안내", href: "/#branches" },
  franchise: { label: "가맹 문의", href: "/#franchise" },
} as const;