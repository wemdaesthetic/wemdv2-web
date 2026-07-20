"use client";

import React, { useMemo } from "react";
import ProgramPage, {
  type ProgramBase,
  type ProgramPageConfig,
} from "@/components/program/ProgramPage";

export default function CustomCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
      {
        slug: "apple-hip",
        titleKo: "애플 힙 관리",
        titleEn: "Apple Hip & Pelvis Care",

        heroImgSrc: "/programs/custom/apple-hip-hero.png",
        infoImgSrc: "/programs/custom/apple-hip-info.png",

        durationMin: 60,
        priceOnce: 120000,
        priceTen: 100000,

        steps: [
          "하체 밸런스 관리",
          "골반 집중 관리",
          "등 기립근 관리",
          "마무리(힙 크림 관리)",
        ],

        introTitle: "WeMD 애플 힙(골반관리)",

        introBody:
          "골반을 바로 잡아 허리·힙·다리 라인을 고르게 정리하고, 하체 전체의 밸런스와 탄탄한 힙 라인을 만들어드립니다.",

        recommendedTargets: [
          "골반이 틀어지고 벌어져 힙이 처진 분",
          "하체가 쉽게 붓는 분",
          "균형 잡힌 하체 라인과 힙 라인을 원하시는 분",
          "애플 힙이나 탄탄한 힙업을 원하시는 분",
          "전신 균형과 하체 밸런스를 함께 원하시는 분",
        ],
      },

      {
        slug: "runner-recovery",
        titleKo: "러닝 후 관리",
        titleEn: "Running Recovery Care",

        heroImgSrc: "/programs/custom/runner-recovery-hero.png",
        infoImgSrc: "/programs/custom/runner-recovery-info.png",

        durationMin: 120,
        priceOnce: 200000,
        priceTen: 180000,

        steps: [
          "클렌징",
          "등 크림",
          "애플 힙 관리",
          "종아리 관리",
          "어깨·목 관리(데콜테)",
          "두피",
          "탄력 관리",
          "마무리",
        ],

        introTitle: "WeMD 러닝 후 관리",

        introBody:
          "런닝 후 얼굴 라인과 전신 밸런스가 무너지는 원인을 고려하여 얼굴과 바디를 동시에 관리해드리는 프리미엄 프로그램입니다.",

        recommendedTargets: [
          "런닝 후 얼굴 탄력과 전신 관리를 함께 받고 싶으신 분",
          "런닝·조깅·PT 후 얼굴 탄력이 고민이신 분",
          "상체 긴장과 하체 순환 저하로 회복이 느린 분",
          "하체 부종과 종아리·허벅지 뻣뻣함을 느끼시는 분",
          "운동 직후 빠른 컨디션 회복을 원하시는 분",
        ],
      },

      {
        slug: "golf",
        titleKo: "골프 관리",
        titleEn: "Golf Care",

        heroImgSrc: "/programs/custom/golf-hero.png",
        infoImgSrc: "/programs/custom/golf-info.png",

        durationMin: 60,
        priceOnce: 120000,
        priceTen: 100000,

        steps: [
          "애플 힙 관리",
          "등 크림 관리",
          "어깨·목(데콜테)",
        ],

        introTitle: "WeMD 골프 관리",

        introBody:
          "라운딩 전·후 사용이 많은 상체, 어깨, 등 라인의 긴장감을 부드럽게 가다듬어 플레이로 흐트러진 신체 밸런스를 자연스럽게 회복해드립니다.",

        recommendedTargets: [
          "골프 후 틀어진 바디 라인을 정리하고 싶은 분",
          "라운딩 전·후 상체의 긴장과 피로를 풀고 싶은 분",
          "장시간 플레이로 어깨·등·골반이 뻐근한 분",
          "스윙 시 사용하는 특정 부위의 긴장이 부담인 분",
          "라운딩 일정에 맞춘 프리미엄 케어를 원하시는 분",
          "필드 일정 전 최상의 컨디션을 만들고 싶은 분",
        ],
      },
    ],
    []
  );

  const config: ProgramPageConfig = {
    basePath: "/custom",

    heroImageSrc: "/programs/custom/apple-hip-hero.png",
    infoImageSrc: "/programs/custom/apple-hip-info.png",

    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL!,

    programs,
  };

  return <ProgramPage config={config} />;
}