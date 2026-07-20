"use client";

import React, { useMemo } from "react";
import ProgramPage, {
  ProgramBase,
  ProgramPageConfig,
} from "@/components/program/ProgramPage";

export default function FaceCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
      {
        slug: "facial-lifting",
        titleKo: "얼굴 리프팅 관리",
        titleEn: "Facial Lifting Treatment",

        heroImgSrc: "/programs/face/facial-lifting-hero.png",
        infoImgSrc: "/programs/face/facial-lifting-info.png",

        durationMin: 60,
        priceOnce: 110000,
        priceTen: 90000,

        steps: [
          "클렌징",
          "어깨·목 (데콜테)",
          "두피",
          "탄력관리",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 얼굴 리프팅 관리",

        introBody:
          "수술 없이 자연스러운 리프팅 전문가의 섬세한 테크닉으로 고객님의 세련되고 정제된 인상을 만들어 드립니다.",

        recommendedTargets: [
          "얼굴 탄력을 개선하고 싶으신 분",
          "화장이 들떠서 고민이신 분",
          "탄력 있는 얼굴을 경험하고 싶으신 분",
          "중요한 일정 전 첫인상을 자연스럽게 연출하고 싶으신 분",
          "피로와 스트레스로 얼굴톤이 칙칙해 보이시는 분",
        ],
      },

      {
        slug: "face-vline",
        titleKo: "얼굴 V라인 관리",
        titleEn: "Face V-Line Treatment",

        heroImgSrc: "/programs/face/ellazo-face-hero.png",
        infoImgSrc: "/programs/face/ellazo-face-info.png",

        durationMin: 70,
        priceOnce: 130000,
        priceTen: 110000,

        steps: [
          "클렌징",
          "데콜테",
          "두피",
          "페이스 라인 관리",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 얼굴 V라인 관리",

        introBody:
          "얼굴 윤곽과 밸런스를 고려한 WeMD만의 테크닉으로 더욱 또렷하고 자연스러운 V라인을 완성하는 프리미엄 프로그램입니다.",

        recommendedTargets: [
          "얼굴 라인을 부드럽게 만들고 싶으신 분",
          "또렷한 V라인을 원하시는 분",
          "붓기로 얼굴이 커 보이시는 분",
          "사진 촬영 전 얼굴 라인을 정리하고 싶은 분",
          "자연스럽게 작은 얼굴 효과를 원하시는 분",
        ],
      },

      {
        slug: "face-slimming",
        titleKo: "작은 얼굴 관리",
        titleEn: "Face Slimming Treatment",

        heroImgSrc: "/programs/face/face-slimming-hero.png",
        infoImgSrc: "/programs/face/face-slimming-info.png",

        durationMin: 80,
        priceOnce: 150000,
        priceTen: 120000,

        steps: [
          "클렌징",
          "어깨·목",
          "두피",
          "탄력 관리",
          "골선 관리",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 작은 얼굴 관리",

        introBody:
          "WeMD만의 독창적인 골선 테라피로 수술 없이 자연스럽게 얼굴형을 다듬어 동안 이미지와 다운사이징 효과를 연출합니다.",

        recommendedTargets: [
          "얼굴 축소를 원하시는 분",
          "사각턱이나 광대가 고민이신 분",
          "수술 없이 부드러운 얼굴형을 원하시는 분",
          "긴 얼굴이나 팔자 주름이 고민이신 분",
          "카메라 앞에서 자신 있고 싶으신 분",
        ],
      },

      {
        slug: "face-balance",
        titleKo: "얼굴 균형 관리",
        titleEn: "Facial Balance Treatment",

        heroImgSrc: "/programs/face/face-balance-hero.png",
        infoImgSrc: "/programs/face/face-balance-info.png",

        durationMin: 120,
        priceOnce: 200000,
        priceTen: 180000,

        steps: [
          "클렌징",
          "골선 테라피",
          "비대칭 밸런스 관리",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 얼굴 균형 관리",

        introBody:
          "얼굴과 골반의 황금비율까지 고려한 골선 테라피로 전체적인 얼굴과 체형의 균형을 조화롭게 완성합니다.",

        recommendedTargets: [
          "얼굴 비대칭이 고민이신 분",
          "턱·광대·눈 위치가 비대칭이신 분",
          "얼굴축소와 비대칭 관리를 함께 받고 싶은 분",
          "사진에서 비대칭이 심해 보이시는 분",
        ],
      },

      {
        slug: "wedding",
        titleKo: "웨딩 관리",
        titleEn: "Wedding Care",

        heroImgSrc: "/programs/face/wedding-hero.png",
        infoImgSrc: "/programs/face/wedding-info.png",

        durationMin: 110,
        priceOnce: 200000,
        priceTen: 180000,

        steps: [
          "클렌징",
          "데콜테",
          "얼굴 리프팅",
          "골선 관리",
          "탄력 관리",
          "두피",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 웨딩 관리",

        introBody:
          "결혼식과 촬영을 앞둔 고객을 위한 프리미엄 프로그램으로 얼굴 라인과 탄력, 전체적인 인상을 가장 아름답게 완성해드립니다.",

        recommendedTargets: [
          "결혼식 및 웨딩촬영을 앞두신 분",
          "드레스와 어울리는 얼굴 라인을 만들고 싶은 분",
          "예식 전 탄력과 붓기 개선을 원하는 분",
          "인생 사진을 준비하시는 분",
          "중요한 행사를 앞두고 최상의 컨디션을 만들고 싶은 분",
        ],
      },
    ],
    []
  );

  const config: ProgramPageConfig = {
    basePath: "/face",

    heroImageSrc: "/programs/face/facial-lifting-hero.png",
    infoImageSrc: "/programs/face/facial-lifting-info.png",

    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL!,

    programs,
  };

  return <ProgramPage config={config} />;
}