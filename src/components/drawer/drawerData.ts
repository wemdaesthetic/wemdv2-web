export type DrawerSection =
  | "face"
  | "body"
  | "custom"
  | "skin"
  | null;

export const DRAWER_ROUTES = {
  face: {
    items: [
      { title: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { title: "얼굴 V라인 관리", href: "/face?p=ellazo-face" },
      { title: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { title: "얼굴 균형 관리", href: "/face?p=face-balance" },
      { title: "웨딩 관리", href: "/face?p=wedding" },
    ],
  },

  body: {
    items: [
      { title: "상체 관리", href: "/body?p=body-upper" },
      { title: "하체 관리", href: "/body?p=body-lower" },
      { title: "S라인 관리", href: "/body?p=body-sline" },
      { title: "라운드 숄더 관리", href: "/body?p=round-shoulder" },
    ],
  },

  custom: {
    items: [
      { title: "애플 힙 관리", href: "/custom?p=apple-hip" },
      { title: "러닝 후 관리", href: "/custom?p=runner-recovery" },
      { title: "골프 관리", href: "/custom?p=golf" },
    ],
  },

  skin: {
    items: [
      { title: "수분 채움", href: "/skin?p=hydration-fill" },
      { title: "트러블 케어", href: "/skin?p=trouble-care" },
      { title: "광채 채움", href: "/skin?p=glow-fill" },
      { title: "앰플 부스팅", href: "/skin?p=ampoule-boosting" },
    ],
  },
} as const;

/**
 * INFO 링크도 여기서 한 번에 관리
 */
export const DRAWER_INFO_LINKS = {
  reviews: { label: "고객후기", href: "/#reviews" },
  brand: { label: "브랜드 스토리", href: "/#brand" },
  branches: { label: "지점 안내", href: "/branches/dunchon" },
  franchise: { label: "가맹 문의", href: "/#franchise" },
} as const;