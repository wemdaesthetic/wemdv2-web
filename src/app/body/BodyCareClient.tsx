"use client";

import React, { useMemo } from "react";
import ProgramPage, { type ProgramBase, type ProgramPageConfig } from "@/components/program/ProgramPage";

export default function BodyCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
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
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const config: ProgramPageConfig = {
    basePath: "/body",
    heroImageSrc: "/programs/body-hero.jpg",
    // 일단 없으면 hero 재사용 (깨지지 않게)
    infoImageSrc: "/programs/body-hero.jpg",
    bookingUrl: BOOKING,
    programs,
  };

  return <ProgramPage config={config} />;
}