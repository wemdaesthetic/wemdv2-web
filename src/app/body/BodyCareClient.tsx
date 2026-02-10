"use client";

import React, { useMemo } from "react";
import ProgramPage, {
  type ProgramBase,
  type ProgramPageConfig,
} from "@/components/program/ProgramPage";

export default function BodyCareClient() {
  const programs: ProgramBase[] = useMemo(
    () => [
      {
        slug: "body-upper",
        titleKo: "상체 관리",
        titleEn: "Upper Body Treatment",

        heroImgSrc: "/programs/body/body-upper-hero.png",
        infoImgSrc: "/programs/body/body-upper-info.png",

        durationMin: 50,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["등 크림 관리", "팔 크림 관리", "어깨·목 관리", "두피 관리", "마무리"],
        introTitle: "WeMD 상체 관리",
        introBody:
          "등, 어깨, 목, 팔을 섬세하게 케어하여 수술 없이도 상체 라인을 자연스럽게 정리하고 탄력 있고 균형 있는 라인을 만들어드립니다.",
        recommendedTargets: [
          "등 어깨 팔 라인이 고민이신 분",
          "상체에 굴곡이 많아 라인이 매끄럽지 않으신 분",
          "등·어깨 근육이 뭉쳐 긴장과 피로가 느껴지는 분",
          "상체가 잘 붓고 탄력 저하가 고민이신 분",
          "상체 피부 탄력을 자연스럽게 개선하고 싶은 분",
        ],
      },
      {
        slug: "body-lower",
        titleKo: "하체 관리",
        titleEn: "Lower Body Treatment",

        heroImgSrc: "/programs/body/body-lower-hero.png",
        infoImgSrc: "/programs/body/body-lower-info.png",

        durationMin: 50,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["하체 라인 관리", "하체 근막 관리", "지방 분해 기기 관리", "마무리"],
        introTitle: "WeMD 하체 관리",
        introBody:
          "하체 라인을 섬세하게 관리하여 수술 없이도 자연스럽고 아름다운 하체 라인을 연출하고 탄력을 만들어드립니다.",
        recommendedTargets: [
          "하체 라인과 탄력이 고민이신 분",
          "하체에 굴곡이 많거나 라인이 매끄럽지 않으신 분",
          "하체 근육이 뭉쳐 피로와 붓기가 잦으신 분",
          "하체 피부 탄력 저하가 고민이신 분",
          "오래 앉아 있거나 서 있는 생활로 순환이 잘 안 되는 분",
        ],
      },
      {
        slug: "body-sline",
        titleKo: "S라인 관리",
        titleEn: "S-Line Body Treatment",

        heroImgSrc: "/programs/body/body-sline-hero.png",
        infoImgSrc: "/programs/body/body-sline-info.png",

        durationMin: 100,
        priceOnce: 180000,
        priceTen: 1620000,
        steps: [
          "등 크림 관리",
          "팔 크림 관리",
          "어깨·목 관리",
          "두피 관리",
          "하체 라인/근막 관리",
          "지방 분해 기기 관리",
          "마무리",
        ],
        introTitle: "WeMD S라인 관리",
        introBody:
          "상체와 하체의 탄력과 라인을 함께 관리하여 수술 없이도 자연스러운 S라인을 연출하고 탄력을 개선해드립니다.",
        recommendedTargets: [
          "전신 관리를 받고 싶으신 분",
          "상체·하체 라인이 매끄럽지 않다고 느끼시는 분",
          "근육이 뭉쳐 피로와 붓기가 잦은 분",
          "피부 탄력 저하로 전신 실루엣이 고민이신 분",
          "순환 저하로 몸이 자주 무거운 분",
        ],
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt";

  const config: ProgramPageConfig = {
    basePath: "/body",

    // fallback (혹시 경로 틀려도 깨지지 않게)
    heroImageSrc: "/programs/body/body-upper-hero.png",
    infoImageSrc: "/programs/body/body-upper-info.png",

    bookingUrl: BOOKING,
    programs,
  };

  return <ProgramPage config={config} />;
}