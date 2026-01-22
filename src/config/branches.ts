// src/config/branches.ts

export type BranchDirector = {
  name: string;            // "신 예 나"
  title?: string;          // "대표원장"
  photo?: string;          // "/branches/dunchon/director.jpg"
  quote?: string;          // "정성을 다하겠습니다."
};

export type Branch = {
  slug: string;
  name: string;
  short?: string;
  address?: string;
  phone?: string;
  hours?: string;
  mapUrl?: string;

  // ✅ 추가 필드
  photos?: string[];
  director?: BranchDirector;
  mapEmbedUrl?: string; // iframe용 embed URL (있으면 최우선 사용)
};

export const BRANCHES: Branch[] = [
  {
    slug: "dunchon",
    name: "위엠디에스테틱 본점",
    short: "본사 직영점, 둔촌동역 1분",
    address: "서울특별시 강동구 양재대로 1371, 둔촌빌딩 307호",
    phone: "02-6959-8989",
    hours: "매일 10:00 - 22:00 (휴무: 일요일 정기휴무)",
    mapUrl: "https://naver.me/Gal4wfkv",

    photos: [
      "/branches/dunchon/01.jpg",
      "/branches/dunchon/02.jpg",
      "/branches/dunchon/03.jpg",
      "/branches/dunchon/04.jpg",
    ],

    director: {
      name: "신 예 나",
      title: "대표원장",
      photo: "/branches/dunchon/director.jpg",
      quote: "난 최고야.",
    },

    // ✅ 가능하면 이 값 넣는 게 제일 깔끔해(네이버/구글 embed 주소)
    // mapEmbedUrl: "https://www.google.com/maps?q=...&output=embed",
  },

  {
    slug: "jamsil",
    name: "위엠디에스테틱 잠실점",
    short: "잠실역 도보 5분, 프리미엄 샵",
    address: "준비중",
  },

  {
    slug: "yongsan",
    name: "위엠디에스테틱 한남점",
    short: "한강진역 도보 8분, 프리미엄 샵",
    address: "준비중",
  },
];