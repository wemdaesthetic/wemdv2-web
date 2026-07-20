export const BOOKING_URL =
  "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  title?: string;
  links: NavLink[];
};

export type NavMega = {
  type: "mega";
  label: string;
  sections: NavSection[];
  promo?: {
    href: string;
  };
};

export type NavItem =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | NavMega;

export const NAV_ITEMS: NavItem[] = [
  {
    type: "link",
    label: "WeMD 에스테틱",
    href: "#brand",
  },

  {
    type: "mega",
    label: "얼굴 관리",
    sections: [
      {
        title: "FACE CARE",
        links: [
          {
            label: "얼굴 리프팅 관리",
            href: "/face?p=facial-lifting",
          },
          {
            label: "얼굴 V라인 관리",
            href: "/face?p=ellazo-face",
          },
          {
            label: "작은 얼굴 관리",
            href: "/face?p=face-slimming",
          },
          {
            label: "얼굴 균형 관리",
            href: "/face?p=face-balance",
          },
          {
            label: "웨딩 관리",
            href: "/face?p=wedding",
          },
        ],
      },
    ],
    promo: {
      href: "/face",
    },
  },

  {
    type: "mega",
    label: "바디 관리",
    sections: [
      {
        title: "BODY CARE",
        links: [
          {
            label: "상체 관리",
            href: "/body?p=body-upper",
          },
          {
            label: "하체 관리",
            href: "/body?p=body-lower",
          },
          {
            label: "S라인 관리",
            href: "/body?p=body-sline",
          },
          {
            label: "라운드 숄더 관리",
            href: "/body?p=round-shoulder",
          },
        ],
      },
    ],
    promo: {
      href: "/body",
    },
  },

  {
    type: "mega",
    label: "집중 관리",
    sections: [
      {
        title: "FOCUSED CARE",
        links: [
          {
            label: "애플 힙 관리",
            href: "/custom?p=apple-hip",
          },
          {
            label: "러닝 후 관리",
            href: "/custom?p=runner-recovery",
          },
          {
            label: "골프 관리",
            href: "/custom?p=golf",
          },
        ],
      },
    ],
    promo: {
      href: "/custom",
    },
  },

  {
    type: "mega",
    label: "스킨 솔루션 관리",
    sections: [
      {
        title: "SKIN CARE SOLUTION",
        links: [
          {
            label: "수분 채움",
            href: "/skin?p=hydration-fill",
          },
          {
            label: "트러블 케어",
            href: "/skin?p=trouble-care",
          },
          {
            label: "광채 채움",
            href: "/skin?p=glow-fill",
          },
          {
            label: "앰플 부스팅",
            href: "/skin?p=ampoule-boosting",
          },
        ],
      },
    ],
    promo: {
      href: "/skin",
    },
  },

  {
    type: "link",
    label: "지점 안내",
    href: "#branches",
  },

  {
    type: "link",
    label: "가맹 문의",
    href: "#contact",
  },
];