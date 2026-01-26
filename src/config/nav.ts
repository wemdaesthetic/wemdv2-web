export const BOOKING_URL =
  "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

export type NavLink = { label: string; href: string };
export type NavSection = { title?: string; links: NavLink[] };
export type NavMega = {
  type: "mega";
  label: string;
  sections: NavSection[];
  promo?: { href: string };
};
export type NavItem =
  | { type: "link"; label: string; href: string }
  | NavMega;

export const NAV_ITEMS: NavItem[] = [
  // ✅ 원페이지(섹션 이동)
  { type: "link", label: "WeMD 에스테틱", href: "#brand" },

  // ✅ 2뎁스(메가메뉴)
  {
    type: "mega",
    label: "얼굴 관리",
    sections: [
      {
        title: "FACE CARE",
        links: [
          { label: "얼굴 리프팅 관리", href: "/face" },
          { label: "얼굴 V라인 관리", href: "/face#vline" },
          { label: "작은 얼굴 관리", href: "/face#slimming" },
          { label: "얼굴 균형 관리", href: "/face#balance" },
        ],
      },
    ],
    promo: { href: "/face" },
  },

  {
    type: "mega",
    label: "바디 관리",
    sections: [
      {
        title: "BODY CARE",
        links: [
          { label: "상체 관리", href: "/body#upper" },
          { label: "하체 관리", href: "/body#lower" },
          { label: "S라인 관리", href: "/body#sline" },
        ],
      },
    ],
    promo: { href: "/body" },
  },

  {
    type: "mega",
    label: "맞춤 케어",
    sections: [
      {
        title: "CUSTOM CARE",
        links: [
          { label: "웨딩 관리 Standard", href: "/custom#wedding-standard" },
          { label: "웨딩 관리 Special", href: "/custom#wedding-special" },
          { label: "라운드 숄더 관리", href: "/custom#round-shoulder" },
          { label: "애플 힙 관리", href: "/custom#apple-hip" },
          { label: "런닝 후 관리", href: "/custom#runner" },
          { label: "골프 관리", href: "/custom#golf" },
        ],
      },
    ],
    promo: { href: "/custom" },
  },

  // ✅ 원페이지(섹션 이동)
  { type: "link", label: "지점 안내", href: "#branches" },
  { type: "link", label: "가맹 문의", href: "#contact" },
];