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
        slug: "wedding-standard",
        titleKo: "웨딩 관리 Standard",
        titleEn: "Wedding Preparation Treatment",
        durationMin: 90,
        priceOnce: 180000,
        priceTen: 1620000,
        steps: [
          "클렌징",
          "등 관리",
          "팔 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "탄력 관리",
          "골선 관리",
          "팩",
          "마무리",
        ],
        introTitle: "예식 전, 상체 라인과 페이스 컨디션을 한 번에 정돈",
        introBody:
          "클렌징부터 등·팔 라인, 목·어깨(데콜테)와 두피 흐름까지 연결해 케어합니다. 탄력/골선 관리와 팩 마무리로 또렷한 인상과 깔끔한 실루엣을 돕습니다.",
      },
      {
        slug: "wedding-special",
        titleKo: "웨딩 관리 Special",
        titleEn: "Wedding Preparation Treatment",
        durationMin: 100,
        priceOnce: 240000,
        priceTen: 2160000,
        steps: [
          "클렌징",
          "등 골선 관리",
          "등 크림 관리",
          "팔 골선 관리",
          "팔 크림 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "얼굴 탄력 관리",
          "얼굴 골선 관리",
          "팩",
          "마무리",
        ],
        introTitle: "상체 라인 디테일 + 페이스 윤곽까지 선명하게",
        introBody:
          "등/팔 라인을 골선+크림으로 디테일하게 케어하고, 얼굴 탄력/골선 관리까지 포함해 예식/촬영에서 선명한 라인 연출을 돕습니다.",
      },
      {
        slug: "rounded-shoulder",
        titleKo: "라운드 숄더 관리",
        titleEn: "Rounded Shoulder Correction Treatment",
        durationMin: 60,
        priceOnce: 130000,
        priceTen: 1170000,
        steps: ["등 골선 관리", "등 크림 관리", "어깨 목 관리(데콜테)", "두피 관리"],
        introTitle: "말린 어깨·굽은 상체 흐름을 정돈하는 숄더 밸런스",
        introBody:
          "등/어깨 라인을 중심으로 골선과 크림 관리를 진행하고, 목·어깨(데콜테)와 두피 흐름까지 함께 케어해 상체 라인이 편안하게 정돈되도록 돕습니다.",
      },
      {
        slug: "apple-hip",
        titleKo: "애플 힙 관리",
        titleEn: "Hip Lifting & Shaping Treatment",
        durationMin: 60,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["하체 밸런스 관리", "골반 집중 관리", "등 기립근 관리", "마무리(힙 크림 관리)"],
        introTitle: "하체 밸런스와 골반 흐름을 잡아 힙 라인을 탄탄하게",
        introBody:
          "하체 밸런스와 골반 중심 케어로 흐름을 정돈하고, 등 기립근까지 함께 관리해 라인이 무너져 보이지 않도록 돕습니다.",
      },
      {
        slug: "runner-recovery",
        titleKo: "러닝 후 관리",
        titleEn: "Runner Recovery Treatment",
        durationMin: 120,
        priceOnce: 200000,
        priceTen: 1800000,
        steps: [
          "클렌징",
          "등 크림 관리",
          "애플 힙(골반) 관리",
          "종아리 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "탄력 관리",
          "마무리",
        ],
        introTitle: "러닝 후 피로 누적 부위를 집중 케어하는 리커버리",
        introBody:
          "러닝 후 뭉치기 쉬운 등·골반(힙)·종아리를 중심으로 케어하고, 목·어깨와 두피 흐름까지 연결해 전반적인 컨디션 회복을 돕습니다.",
      },
      {
        slug: "golf-recovery",
        titleKo: "골프 관리",
        titleEn: "Golf Recovery Treatment",
        durationMin: 60,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["복부 골선 관리", "복부 크림 관리", "복부 지방 분해 기기 관리"],
        introTitle: "복부 라인을 집중적으로 정돈하는 골프 리커버리",
        introBody:
          "복부 골선/크림 관리를 통해 라인 흐름을 정리하고, 컨디션에 맞춰 복부 지방 분해 기기 관리를 병행해 보다 깔끔한 인상을 돕습니다.",
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const config: ProgramPageConfig = {
    basePath: "/custom",
    heroImageSrc: "/programs/custom-hero.jpg",
    infoImageSrc: "/programs/custom-hero.jpg",
    bookingUrl: BOOKING,
    programs,
  };

  return <ProgramPage config={config} />;
}