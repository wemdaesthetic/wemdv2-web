export type NavItemLink = { label: string; href: string };

export type NavMegaSection = {
  title: string;
  links: NavItemLink[];
};

export type NavMega = {
  type: "mega";
  label: string;
  href?: string;
  sections: NavMegaSection[];
  promo?: {
    title: string;
    description?: string;
    imageSrc?: string;
    href: string;
  };
};

export type NavSimple = {
  type: "link";
  label: string;
  href: string;
};

export type NavItem = NavMega | NavSimple;

export const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "WeMD 에스테틱", href: "/" },

  {
    type: "mega",
    label: "얼굴 관리",
    sections: [
      {
        title: "FACE CARE",
        links: [
          { label: "얼굴 리프팅 관리", href: "/face/lifting" },
          { label: "작은 얼굴 관리", href: "/face/small" },
          { label: "얼굴 V라인 관리", href: "/face/vline" },
          { label: "얼굴 균형 관리", href: "/face/balance" },
        ],
      },
    ],
    promo: {
      title: "이벤트",
      description: "이번 달 프로그램 보기",
      imageSrc: "/images/promo-face.jpg",
      href: "/event",
    },
  },

  {
    type: "mega",
    label: "바디 관리",
    sections: [
      {
        title: "BODY CARE",
        links: [
          { label: "상체 관리", href: "/body/upper" },
          { label: "하체 관리", href: "/body/lower" },
          { label: "S라인 관리", href: "/body/sline" },
        ],
      },
    ],
    promo: {
      title: "이벤트",
      description: "이번 달 프로그램 보기",
      imageSrc: "/images/promo-body.jpg",
      href: "/event",
    },
  },

  {
    type: "mega",
    label: "맞춤 케어",
    sections: [
      {
        title: "CUSTOM CARE",
        links: [
          { label: "웨딩 Standard 관리", href: "/custom/wedding-standard" },
          { label: "웨딩 Special 관리", href: "/custom/wedding-special" },
          { label: "라운드 숄더 관리", href: "/custom/round-shoulder" },
          { label: "애플 힙 관리", href: "/custom/apple-hip" },
          { label: "러닝 후 관리", href: "/custom/after-running" },
          { label: "골프 관리", href: "/custom/golf" },
        ],
      },
    ],
    promo: {
      title: "이벤트",
      description: "이번 달 프로그램 보기",
      imageSrc: "/images/promo-custom.jpg",
      href: "/event",
    },
  },

  { type: "link", label: "지점 소개", href: "/branches" },
  { type: "link", label: "입점 문의", href: "/franchise" },
];

export const BOOKING_URL =
  process.env.NEXT_PUBLIC_NAVER_BOOKING_URL || "https://booking.naver.com/";