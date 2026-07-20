"use client";

import React, { useMemo } from "react";
import ProgramPage, {
  ProgramBase,
  ProgramPageConfig,
} from "@/components/program/ProgramPage";

export default function SkinCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
      {
        slug: "moisture",
        titleKo: "수분 채움",
        titleEn: "Moisture Care",

        heroImgSrc: "/programs/skin/moisture-hero.png",
        infoImgSrc: "/programs/skin/moisture-info.png",

        durationMin: 60,
        priceOnce: 90000,
        priceTen: 70000,

        steps: [
          "클렌징",
          "각질 케어",
          "수분 공급",
          "진정 관리",
          "수분 팩",
          "마무리",
        ],

        introTitle: "WeMD 수분 채움",

        introBody:
          "건조하고 푸석한 피부에 깊은 보습과 수분을 공급하여 촉촉하고 건강한 피부 컨디션을 만들어드립니다.",

        recommendedTargets: [
          "피부가 건조하신 분",
          "메이크업이 잘 뜨는 분",
          "속건조가 심하신 분",
          "촉촉한 피부를 유지하고 싶으신 분",
        ],
      },

      {
        slug: "trouble",
        titleKo: "트러블 케어",
        titleEn: "Trouble Care",

        heroImgSrc: "/programs/skin/trouble-hero.png",
        infoImgSrc: "/programs/skin/trouble-info.png",

        durationMin: 70,
        priceOnce: 100000,
        priceTen: 80000,

        steps: [
          "클렌징",
          "딥 클렌징",
          "트러블 관리",
          "진정",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 트러블 케어",

        introBody:
          "예민하고 민감한 피부를 진정시키고 깨끗한 피부 환경을 만들어 건강한 피부 밸런스를 유지합니다.",

        recommendedTargets: [
          "트러블이 반복되시는 분",
          "민감성 피부이신 분",
          "피부 진정이 필요하신 분",
          "피지 분비가 많으신 분",
        ],
      },

      {
        slug: "glow",
        titleKo: "광채 채움",
        titleEn: "Glow Care",

        heroImgSrc: "/programs/skin/glow-hero.png",
        infoImgSrc: "/programs/skin/glow-info.png",

        durationMin: 70,
        priceOnce: 110000,
        priceTen: 90000,

        steps: [
          "클렌징",
          "브라이트닝",
          "광채 관리",
          "앰플",
          "팩",
          "마무리",
        ],

        introTitle: "WeMD 광채 채움",

        introBody:
          "칙칙한 피부 톤을 맑고 투명하게 개선하여 자연스럽고 건강한 광채를 선사합니다.",

        recommendedTargets: [
          "피부톤이 칙칙하신 분",
          "맑은 피부를 원하시는 분",
          "피부결 개선을 원하시는 분",
          "광채 피부를 원하시는 분",
        ],
      },

      {
        slug: "ampoule",
        titleKo: "앰플 부스팅",
        titleEn: "Ampoule Boosting",

        heroImgSrc: "/programs/skin/ampoule-hero.png",
        infoImgSrc: "/programs/skin/ampoule-info.png",

        durationMin: 80,
        priceOnce: 130000,
        priceTen: 110000,

        steps: [
          "클렌징",
          "피부 정돈",
          "앰플 흡수",
          "집중 케어",
          "모델링 팩",
          "마무리",
        ],

        introTitle: "WeMD 앰플 부스팅",

        introBody:
          "고농축 앰플을 피부 깊숙이 흡수시켜 탄력과 보습, 피부 컨디션을 동시에 끌어올리는 프리미엄 관리입니다.",

        recommendedTargets: [
          "탄력이 떨어진 피부",
          "집중 영양이 필요하신 분",
          "피부 컨디션을 빠르게 회복하고 싶은 분",
          "중요한 일정 전 관리가 필요하신 분",
        ],
      },
    ],
    []
  );

  const config: ProgramPageConfig = {
    basePath: "/skin",

    heroImageSrc: "/programs/skin/moisture-hero.png",
    infoImageSrc: "/programs/skin/moisture-info.png",

    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL!,

    programs,
  };

  return <ProgramPage config={config} />;
}