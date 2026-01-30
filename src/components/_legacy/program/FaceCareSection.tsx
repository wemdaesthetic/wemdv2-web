"use client";

import React, { useMemo, useState } from "react";
import { BOOKING_URL } from "@/config/nav";
import { cn } from "@/lib/cn";

type Program = {
  id: string;
  category: "face" | "body" | "custom";
  titleKo: string;
  titleEn: string;
  aiLine1: string;
  aiLine2: string;
  priceOnce: number; // 1회
  priceTen: number; // 10회
  minutes: number;
  flow: string; // " · " 로 구분된 한 줄
};

const PROGRAMS: Program[] = [
  // FACE
  {
    id: "face-lifting",
    category: "face",
    titleKo: "얼굴 리프팅 관리",
    titleEn: "Facial Lifting Treatment",
    aiLine1: "처음 WeMD를 경험하는 고객에게",
    aiLine2: "가장 많이 선택되는 얼굴 프로그램",
    priceOnce: 100000,
    priceTen: 900000,
    minutes: 50,
    flow: "클렌징 · 어깨·목 관리 · 두피 관리 · 팩 · 마무리",
  },
  {
    id: "face-contouring",
    category: "face",
    titleKo: "얼굴 V라인 관리",
    titleEn: "Facial Contouring Treatment",
    aiLine1: "윤곽 정리가 필요한 순간을 위해",
    aiLine2: "설계된 집중 관리 프로그램",
    priceOnce: 120000,
    priceTen: 1080000,
    minutes: 50,
    flow: "클렌징 · 어깨·목 관리 · 두피 관리 · 골막 관리 · 탄력 관리 · 팩 · 마무리",
  },
  {
    id: "face-slimming",
    category: "face",
    titleKo: "작은 얼굴 관리",
    titleEn: "Face Slimming Treatment",
    aiLine1: "얼굴 라인 중심의 섬세한 관리가",
    aiLine2: "필요한 고객에게 추천되는 프로그램",
    priceOnce: 130000,
    priceTen: 1170000,
    minutes: 60,
    flow: "클렌징 · 어깨·목 관리 · 두피 관리 · 탄력 관리 · 골선 관리 · 팩 · 마무리",
  },
  {
    id: "face-balance",
    category: "face",
    titleKo: "얼굴 균형 관리",
    titleEn: "Facial Balance Treatment",
    aiLine1: "비대칭과 근육 패턴까지 고려한",
    aiLine2: "WeMD의 고난이도 얼굴 관리 프로그램",
    priceOnce: 180000,
    priceTen: 1620000,
    minutes: 100,
    flow: "클렌징 · 골반 관리 · 어깨·목 관리 · 두피 관리 · 탄력 관리 · 골선 관리 · 비대칭 관리 · 팩 · 마무리",
  },

  // BODY
  {
    id: "body-upper",
    category: "body",
    titleKo: "상체 관리",
    titleEn: "Upper Body Treatment",
    aiLine1: "상체의 긴장과 순환 흐름을",
    aiLine2: "중심으로 설계된 기본 바디 관리",
    priceOnce: 120000,
    priceTen: 1080000,
    minutes: 50,
    flow: "등 크림 관리 · 팔 크림 관리 · 어깨·목 관리 · 두피 관리 · 마무리",
  },
  {
    id: "body-lower",
    category: "body",
    titleKo: "하체 관리",
    titleEn: "Lower Body Treatment",
    aiLine1: "라인과 순환에 집중한",
    aiLine2: "하체 중심 관리 프로그램",
    priceOnce: 120000,
    priceTen: 1080000,
    minutes: 50,
    flow: "하체 라인 관리 · 하체 근막 관리 · 지방 분해 관리 · 마무리",
  },
  {
    id: "body-sline",
    category: "body",
    titleKo: "S라인 관리",
    titleEn: "S-Line Body Treatment",
    aiLine1: "상·하체를 연결해 설계한",
    aiLine2: "WeMD 시그니처 바디 관리",
    priceOnce: 180000,
    priceTen: 1620000,
    minutes: 100,
    flow: "등 크림 관리 · 팔 크림 관리 · 어깨·목 관리 · 두피 관리 · 하체 라인 관리 or 하체 근막 관리 · 지방 분해 관리 · 마무리",
  },

  // CUSTOM
  {
    id: "custom-wedding-standard",
    category: "custom",
    titleKo: "웨딩 관리 Standard",
    titleEn: "Wedding Preparation – Standard",
    aiLine1: "웨딩 전 기본적인 전체 밸런스를",
    aiLine2: "고려해 설계된 맞춤 케어",
    priceOnce: 180000,
    priceTen: 1620000,
    minutes: 90,
    flow: "클렌징 · 등 관리 · 팔 관리 · 어깨·목 관리(데콜테) · 두피 관리 · 탄력 관리 · 골선 관리 · 팩 · 마무리",
  },
  {
    id: "custom-wedding-special",
    category: "custom",
    titleKo: "웨딩 관리 Special",
    titleEn: "Wedding Preparation – Special",
    aiLine1: "보다 정교한 설계가 필요한",
    aiLine2: "웨딩 집중 프로그램",
    priceOnce: 240000,
    priceTen: 2160000,
    minutes: 100,
    flow: "클렌징 · 등 골선 관리 · 등 크림 관리 · 팔 골선 관리 · 팔 크림 관리 · 어깨·목 관리(데콜테) · 두피 관리 · 얼굴 탄력 관리 · 얼굴 골선 관리 · 팩 · 마무리",
  },
  {
    id: "custom-round-shoulder",
    category: "custom",
    titleKo: "라운드 숄더 관리",
    titleEn: "Wedding Preparation Treatment",
    aiLine1: "어깨 라인과 자세 균형에",
    aiLine2: "집중한 맞춤 관리",
    priceOnce: 130000,
    priceTen: 1170000,
    minutes: 60,
    flow: "등 골선 관리 · 등 크림 관리 · 어깨·목 관리(데콜테) · 두피 관리",
  },
  {
    id: "custom-apple-hip",
    category: "custom",
    titleKo: "애플 힙 관리",
    titleEn: "Hip Lifting & Shaping Treatment",
    aiLine1: "힙 라인과 골반 균형에",
    aiLine2: "초점을 맞춘 집중 관리",
    priceOnce: 120000,
    priceTen: 1080000,
    minutes: 60,
    flow: "하체 밸런스 관리 · 골반 집중 관리 · 등 기립근 관리 · 마무리(힙 크림 관리)",
  },
  {
    id: "custom-runner-recovery",
    category: "custom",
    titleKo: "러닝 후 관리",
    titleEn: "Runner Recovery Treatment",
    aiLine1: "러닝 후 회복 흐름에 맞춰",
    aiLine2: "설계된 고강도 관리",
    priceOnce: 200000,
    priceTen: 1800000,
    minutes: 120,
    flow: "클렌징 · 등 크림 관리 · 애플 힙(골반) 관리 · 종아리 관리 · 어깨·목 관리(데콜테) · 두피 관리 · 탄력 관리 · 마무리",
  },
  {
    id: "custom-golf-recovery",
    category: "custom",
    titleKo: "골프 관리",
    titleEn: "Golf Recovery Treatment",
    aiLine1: "골프 활동 이후의",
    aiLine2: "코어와 복부를 중심으로 한 관리",
    priceOnce: 120000,
    priceTen: 1080000,
    minutes: 60,
    flow: "복부 골선 관리 · 복부 크림 관리 · 복부 지방 분해 기기 관리",
  },
];

type Tab = { key: "face" | "body" | "custom"; label: string; sub: string };

const TABS: Tab[] = [
  { key: "face", label: "얼굴관리", sub: "Facial Care" },
  { key: "body", label: "바디관리", sub: "Body Care" },
  { key: "custom", label: "맞춤케어", sub: "Custom Care" },
];

function formatKRW(n: number) {
  // ₩1,234,567
  return "₩" + n.toLocaleString("ko-KR");
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function ProgramSection() {
  const [tab, setTab] = useState<Tab["key"]>("face");

  const items = useMemo(() => PROGRAMS.filter((p) => p.category === tab), [tab]);

  return (
    <section id="program" className="scroll-mt-[96px] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        {/* 헤더 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[12px] tracking-[0.22em] text-zinc-500">PROGRAM</div>
            <h2 className="mt-3 text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[46px]">
              WeMD Programs
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
              한 번에 이해되는 가격, 한 줄로 정리된 케어 플로우. <br className="hidden md:block" />
              프로그램 선택을 더 간단하게 만들었습니다.
            </p>
          </div>

          {/* 탭 */}
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
            {TABS.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "group rounded-xl px-4 py-3 text-left transition",
                    active ? "bg-zinc-900 text-white" : "hover:bg-zinc-50"
                  )}
                >
                  <div className="text-[14px] font-semibold leading-none">{t.label}</div>
                  <div className={cn("mt-1 text-[11px] leading-none", active ? "text-white/70" : "text-zinc-500")}>
                    {t.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 카드 그리드 */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </div>

        {/* 예약 버튼: 섹션 하단 1개만 */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#B90E0A] px-8 text-[15px] font-semibold text-white transition hover:opacity-95"
          >
            네이버 예약하기
          </a>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ p }: { p: Program }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-[2px] hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
      {/* 상단: 타이틀 + AI 라인 */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-[20px] font-semibold tracking-tight text-zinc-900">{p.titleKo}</h3>
          <div className="mt-1 text-[12px] tracking-[0.18em] text-zinc-500">{p.titleEn}</div>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <div className="text-[12px] text-zinc-700">{p.aiLine1}</div>
            <div className="text-[12px] text-zinc-700">{p.aiLine2}</div>
          </div>
        </div>

        {/* 시간 */}
        <div className="shrink-0 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-right">
          <div className="text-[11px] tracking-[0.18em] text-zinc-500">TIME</div>
          <div className="mt-1 flex items-center justify-end gap-2 text-[14px] font-semibold text-zinc-900">
            <ClockIcon className="text-zinc-500" />
            {p.minutes}min
          </div>
        </div>
      </div>

      {/* 가격: 크고 명확 */}
      <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] tracking-[0.18em] text-zinc-500">PRICE</div>
            <div className="mt-3 flex items-baseline gap-4">
              <div className="text-[13px] text-zinc-500">1회</div>
              <div className="text-[24px] font-semibold text-zinc-900">{formatKRW(p.priceOnce)}</div>
            </div>
            <div className="mt-2 flex items-baseline gap-4">
              <div className="text-[13px] text-zinc-500">10회</div>
              <div className="text-[24px] font-semibold text-zinc-900">{formatKRW(p.priceTen)}</div>
            </div>
          </div>

          <div className="hidden text-right text-[11px] leading-relaxed text-zinc-500 md:block">
            VAT/옵션은
            <br />
            예약 시 안내됩니다.
          </div>
        </div>
      </div>

      {/* 케어 플로우: 한 줄로 */}
      <div className="mt-6">
        <div className="text-[11px] tracking-[0.18em] text-zinc-500">CARE FLOW</div>
        <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[13px] leading-relaxed text-zinc-700">
          {p.flow}
        </div>
      </div>

      {/* 은은한 포커스 */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#B90E0A]/0 blur-3xl transition group-hover:bg-[#B90E0A]/10" />
    </div>
  );
}