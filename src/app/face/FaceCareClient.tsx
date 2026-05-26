"use client";

import React, { useMemo } from "react";
import ProgramPage, { ProgramBase, ProgramPageConfig } from "@/components/program/ProgramPage";

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
        steps: ["클렌징", "어깨·목 (데콜테)", "두피", "탄력관리", "팩", "마무리"],
        introTitle: "WeMD 얼굴 리프팅 관리",
        introBody:
          "수술없이 자연스러운 리프팅 전문가의 섬세한 테크닉으로 고객님의 세련되고 정제된 인상을 만들어 드립니다.",
        recommendedTargets: [
          "얼굴 탄력을 개선하고 싶으신 분",
          "화장이 들떠서 고민이신 분",
          "탄력 있는 얼굴을 경험하고 싶으신 분",
          "중요한 일정 전 첫인상을 자연스럽게 연출하고 싶으신 분",
          "피로와 스트레스로 얼굴톤이 칙칙해 보이시는 분",
        ],
      },
      {
        slug: "ellazo-face",
        titleKo: "얼굴 V라인 관리",
        titleEn: "Elastic · Line · Sculpted Image Care",
        heroImgSrc: "/programs/face/ellazo-face-hero.png",
        infoImgSrc: "/programs/face/ellazo-face-info.png",
        durationMin: 70,
        priceOnce: 130000,
        priceTen: 110000,
        steps: ["클렌징", "데콜테", "두피", "페이스 라인 관리", "팩", "마무리"],
        introTitle: "WeMD 엘라조 페이스 관리",
        introBody:
          "강한 자극이나 압에 의존하지 않고 얼굴의 움직임과 리듬에 집중해 페이스 라인을 세련되게 완성하는 WeMD만의 프리미엄 프로그램입니다.",
        recommendedTargets: [
          "얼굴 라인을 부드럽게 만들고 싶으신 분",
          "얼굴 인상을 세련되게 관리하고 싶으신 분",
          "페이스 라인을 중요하게 생각하시는 분",
          "일상 속 긴장과 피로로 얼굴이 잘 붓는 분",
          "중요한 일정 전 과하지 않은 인상을 원하시는 분",
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
        steps: ["클렌징", "어깨·목", "두피", "탄력 관리", "골선 관리", "팩", "마무리"],
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
        priceTen: 170000,
        steps: ["클렌징", "골선 테라피", "비대칭 밸런스 관리", "팩", "마무리"],
        introTitle: "WeMD 얼굴 밸런스 관리",
        introBody:
          "얼굴과 골반의 황금비율까지 고려한 골선 테라피로 전체적인 얼굴과 체형의 균형을 조화롭게 완성합니다.",
        recommendedTargets: [
          "얼굴 비대칭이 고민이신 분",
          "턱·광대·눈 위치가 비대칭이신 분",
          "얼굴축소와 비대칭 관리를 함께 받고 싶은 분",
          "사진에서 비대칭이 심해 보이시는 분",
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