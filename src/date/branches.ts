export type Branch = {
  slug: string;
  name: string;
  short?: string;
  address?: string;
  phone?: string;
  hours?: string;
  mapUrl?: string;
};

export const DEFAULT_BRANCH_SLUG = "dunchon";

export const BRANCHES: Branch[] = [
  {
    slug: "dunchon",
    name: "위엠디에스테틱 본점",
    short: "본사 직영점, 둔촌동역 1분",
    address: "서울특별시 강동구 양재대로 1371, 둔촌빌딩 307호",
    phone: "02-6959-8989",
    hours: "매일 10:00 - 22:00 (휴무: 일요일 정기휴무)",
    mapUrl: "https://naver.me/Gal4wfkv",
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