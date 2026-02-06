"use client";

import React, { useMemo } from "react";
import ProgramPage, {
  type ProgramBase,
  type ProgramPageConfig,
} from "@/components/program/ProgramPage";

export default function FaceCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
      {
        slug: "facial-lifting",
        titleKo: "얼굴 리프팅 관리",
        titleEn: "Facial Lifting Treatment",
        durationMin: 50,
        priceOnce: 100000,
        priceTen: 900000,
        steps: [
          "클렌징",
          "탄력 집중 관리",
          "윤곽 라인 관리",
          "마스크/팩",
          "마무리",
        ],
        introTitle: "리프팅감과 탄력을 또렷하게 잡아주는 페이스 케어",
        introBody:
          "피부 컨디션에 맞춰 탄력과 라인 흐름을 집중적으로 케어해 보다 또렷한 인상을 돕습니다.",
      },
      {
        slug: "facial-contouring",
        titleKo: "얼굴 V라인 관리",
        titleEn: "Facial Contouring Treatment",
        durationMin: 50,
        priceOnce: 100000,
        priceTen: 900000,
        steps: [
          "클렌징",
          "라인 밸런스 관리",
          "V라인 집중 관리",
          "마스크/팩",
          "마무리",
        ],
        introTitle: "라인을 정돈해 V라인 인상을 돕는 컨투어링 케어",
        introBody:
          "얼굴 라인을 부드럽게 정리하고 컨디션에 맞춰 밸런스를 잡아 깔끔한 인상을 만들어드립니다.",
      },
      {
        slug: "face-slimming",
        titleKo: "작은 얼굴 관리",
        titleEn: "Face Slimming Treatment",
        durationMin: 50,
        priceOnce: 100000,
        priceTen: 900000,
        steps: [
          "클렌징",
          "부기/순환 케어",
          "라인 정돈 관리",
          "마스크/팩",
          "마무리",
        ],
        introTitle: "붓기·순환을 정리해 더 가벼운 얼굴 인상으로",
        introBody:
          "붓기와 컨디션을 가볍게 정돈하고 얼굴 실루엣이 또렷해 보이도록 돕습니다.",
      },
      {
        slug: "facial-balance",
        titleKo: "얼굴 균형 관리",
        titleEn: "Facial Balance Treatment",
        durationMin: 50,
        priceOnce: 100000,
        priceTen: 900000,
        steps: [
          "클렌징",
          "밸런스 체크",
          "좌우 균형 케어",
          "마스크/팩",
          "마무리",
        ],
        introTitle: "밸런스를 정돈해 편안한 인상으로",
        introBody:
          "컨디션에 따라 얼굴 균형 흐름을 정리해 보다 안정감 있는 인상을 돕습니다.",
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const config: ProgramPageConfig = {
    basePath: "/face",
    heroImageSrc: "/programs/face-hero.jpg",
    // 아직 전용 이미지가 없으면 hero 재사용해도 OK (깨짐 방지)
    infoImageSrc: "/programs/face-hero.jpg",
    bookingUrl: BOOKING,
    programs,
  };

  return <ProgramPage config={config} />;
}