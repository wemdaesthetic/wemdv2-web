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
priceOnce: 100000,
priceTen: 70000,

steps: [
  "클렌징",
  "데콜테",
  "물방울 관리",
  "맞춤 팩",
],

introTitle: "WeMD 수분 채움",

introBody:
  "건조하고 수분이 부족한 피부에 깊은 보습을 공급하여 촉촉하고 건강한 피부 컨디션을 만들어주는 수분 집중 관리 프로그램입니다.",

recommendedTargets: [
  "속건조가 심한 피부",
  "세안 후 당김이 심한 피부",
  "수분 부족형 지성 피부",
],
      },

      {
        slug: "trouble",
        titleKo: "트러블 케어",
        titleEn: "Trouble Care",

        heroImgSrc: "/programs/skin/trouble-hero.png",
        infoImgSrc: "/programs/skin/trouble-info.png",

        durationMin: 70,
priceOnce: 130000,
priceTen: 110000,

steps: [
  "클렌징",
  "딥 클렌징",
  "데콜테",
  "얼굴 수기 관리",
  "AC 케어",
  "피부 맞춤 앰플",
  "맞춤 팩",
],

introTitle: "WeMD 트러블 케어",

introBody:
  "과다한 피지와 묵은 각질, 노폐물을 관리하여 깨끗하고 건강한 피부로 가꾸는 집중 트러블 관리 프로그램입니다.",

recommendedTargets: [
  "여드름과 좁쌀이 자주 올라오는 피부",
  "피지 분비가 많은 지성·복합성 피부",
],
      },

      {
        slug: "glow",
        titleKo: "광채 채움",
        titleEn: "Glow Care",

        heroImgSrc: "/programs/skin/glow-hero.png",
        infoImgSrc: "/programs/skin/glow-info.png",

        durationMin: 70,
priceOnce: 150000,
priceTen: 120000,

steps: [
  "클렌징",
  "딥 클렌징",
  "데콜테",
  "얼굴 수기 관리",
  "물방울 관리",
  "맞춤 팩",
],

introTitle: "WeMD 광채 채움",

introBody:
  "묵은 각질을 정리하고 피부 순환과 영양을 공급하여 맑고 생기 있는 피부 톤으로 가꾸는 광채 케어 프로그램입니다.",

recommendedTargets: [
  "피부가 칙칙해 보이는 분",
  "중요한 일정 전 피부 컨디션을 끌어올리고 싶은 분",
  "피부결이 거칠고 메이크업이 잘 받지 않는 분",
  "생기 있는 피부를 원하는 분",
],
      },

      {
        slug: "ampoule",
        titleKo: "앰플 부스팅",
        titleEn: "Ampoule Boosting",

        heroImgSrc: "/programs/skin/ampoule-hero.png",
        infoImgSrc: "/programs/skin/ampoule-info.png",

        durationMin: 80,
priceOnce: 200000,
priceTen: 170000,

steps: [
  "클렌징",
  "데콜테",
  "MTS 앰플 침투",
  "맞춤 팩",
],

introTitle: "WeMD 앰플 부스팅",

introBody:
  "MTS를 이용해 유효 성분을 피부 깊숙이 전달하여 피부 재생과 탄력 개선을 돕는 프리미엄 집중 관리 프로그램입니다.",

recommendedTargets: [
  "잔주름이 고민인 피부",
  "피부 회복이 필요한 피부",
  "집중적인 안티에이징 관리를 원하는 분",
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