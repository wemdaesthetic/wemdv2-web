
export type Program = {
  slug: string;
  titleKo: string;
  titleEn: string;
  durationMin: number;
  priceOnce: number;
  priceTen: number;
  steps: string[];
  introTitle: string;
  introBody: string;
  concern: string[];
  solve: string[];
};

export const BODY_PROGRAMS: Program[] = [
  {
    slug: "upper-body",
    titleKo: "상체 관리",
    titleEn: "Upper Body Contouring Treatment",
    durationMin: 50,
    priceOnce: 120000,
    priceTen: 1080000,
    steps: ["등 크림 관리", "팔 크림 관리", "어깨 목 관리(데콜테)", "두피 관리", "마무리"],
    introTitle: "상체 라인을 더 가볍고 매끈하게 정돈하는 컨투어링 케어",
    introBody:
      "등·팔 라인을 중심으로 컨디션을 정돈하고, 목·어깨와 두피 흐름까지 함께 케어해 전체적인 상체 실루엣이 깔끔해 보이도록 설계합니다.",
    concern: ["상체가 답답해 보임", "등/팔 라인 정리가 필요", "목·어깨 뭉침이 잦음"],
    solve: ["정돈된 상체 실루엣", "가벼운 컨디션", "부드러운 라인 연출"],
  },
  {
    slug: "lower-body",
    titleKo: "하체 관리",
    titleEn: "Lower Body Contouring Treatment",
    durationMin: 50,
    priceOnce: 120000,
    priceTen: 1080000,
    steps: ["하체 라인 관리", "하체 근막 관리", "지방 분해 관리", "마무리"],
    introTitle: "하체 라인과 컨디션을 동시에 잡는 하체 컨투어링",
    introBody:
      "하체 라인과 근막 흐름을 케어하고, 컨디션에 맞춰 지방 분해 관리를 더해 보다 가볍고 정돈된 인상을 만들어드립니다.",
    concern: ["하체 라인이 둔해 보임", "뭉침/긴장이 잦음", "전체적으로 무거운 느낌"],
    solve: ["정돈된 하체 라인", "가벼운 움직임", "밸런스 있는 실루엣"],
  },
  {
    slug: "s-line",
    titleKo: "S라인 관리",
    titleEn: "Body Contouring & Shaping Treatment",
    durationMin: 100,
    priceOnce: 180000,
    priceTen: 1620000,
    steps: [
      "등 크림 관리",
      "팔 크림 관리",
      "어깨 목 관리(데콜테)",
      "두피 관리",
      "하체 라인 관리 또는 하체 근막 관리",
      "지방 분해 관리(포함)",
      "마무리",
    ],
    introTitle: "상·하체 흐름을 한 번에, 전체 실루엣을 설계하는 쉐이핑 케어",
    introBody:
      "상체와 하체를 함께 케어해 전체적인 바디 라인을 균형 있게 정돈합니다. 지방 분해 관리를 포함해 보다 선명한 라인 연출을 돕습니다.",
    concern: ["전체 라인 정리가 필요", "상·하체 밸런스가 아쉬움", "중요한 일정 전 컨디션 관리"],
    solve: ["균형 잡힌 S라인", "선명한 실루엣", "가벼운 바디 컨디션"],
  },
];