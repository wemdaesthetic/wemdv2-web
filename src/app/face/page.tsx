"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const ACCENT = "#B71919";

type Program = {
  slug: string;
  titleKo: string;
  titleEn: string;
  durationMin: number;
  priceOnce: number;
  priceTen: number;
  steps: string[];
  introTitle: string;
  introBody: string;
  concern: string[];
  solve: string[];
};

function formatKRWSimple(n: number) {
  const s = String(n);
  let out = "";
  let cnt = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    out = s[i] + out;
    cnt++;
    if (cnt % 3 === 0 && i !== 0) out = "," + out;
  }
  return `${out}원`;
}

export default function FaceCarePage() {
  const router = useRouter();
  const sp = useSearchParams();

  const programs: Program[] = useMemo(
    () => [
      {
        slug: "facial-lifting",
        titleKo: "얼굴 리프팅 관리",
        titleEn: "Facial Lifting Treatment",
        durationMin: 50,
        priceOnce: 100000,
        priceTen: 900000,
        steps: ["클렌징", "어깨 목 관리(데콜테)", "두피 관리", "탄력 관리", "팩", "마무리"],
        introTitle: "탄력과 라인을 동시에 끌어올리는 리프팅 케어",
        introBody:
          "피부 컨디션과 탄력을 정교하게 끌어올려, 얼굴의 전체적인 인상을 또렷하게 정돈합니다. 관리 후 즉각적인 밀도감과 탄탄한 마무리를 느낄 수 있어요.",
        concern: ["탄력이 떨어진 느낌", "얼굴 라인이 무너짐", "피부가 처져 보임"],
        solve: ["탄탄한 탄력감", "정돈된 페이스 라인", "생기 있는 피부 컨디션"],
      },
      {
        slug: "facial-contouring",
        titleKo: "얼굴 V라인 관리",
        titleEn: "Facial Contouring Treatment",
        durationMin: 50,
        priceOnce: 120000,
        priceTen: 1080000,
        steps: ["클렌징", "어깨 목 관리(데콜테)", "두피 관리", "골막 관리", "탄력 관리", "팩", "마무리"],
        introTitle: "골격 흐름을 고려해 더 또렷한 V라인으로",
        introBody:
          "골막 케어를 포함해 라인의 흐름을 정교하게 잡아, 무너진 윤곽을 보다 ‘정리된’ 인상으로 완성합니다.",
        concern: ["턱선이 흐릿함", "부기/뭉침이 잦음", "얼굴이 넓어 보임"],
        solve: ["선명한 턱선", "가벼운 인상", "정돈된 윤곽 밸런스"],
      },
      {
        slug: "face-slimming",
        titleKo: "작은 얼굴 관리",
        titleEn: "Face Slimming Treatment",
        durationMin: 60,
        priceOnce: 130000,
        priceTen: 1170000,
        steps: ["클렌징", "어깨 목 관리(데콜테)", "두피 관리", "탄력 관리", "골선 관리", "팩", "마무리"],
        introTitle: "작아 보이는 핵심은 ‘라인 + 밀도’",
        introBody:
          "얼굴을 더 작고 또렷하게 보이게 만드는 포인트는 라인과 탄력 밸런스입니다. 골선 케어까지 포함해 전반적인 ‘작아 보이는’ 흐름을 설계합니다.",
        concern: ["얼굴이 커 보임", "광대/턱 주변 뭉침", "사진에서 넓어 보임"],
        solve: ["정돈된 라인", "밀도 있는 탄력", "가벼운 페이스 컨디션"],
      },
      {
        slug: "facial-balance",
        titleKo: "얼굴 균형 관리",
        titleEn: "Facial Balance Treatment",
        durationMin: 100,
        priceOnce: 180000,
        priceTen: 1620000,
        steps: [
          "클렌징",
          "골반 관리",
          "어깨 목 관리(데콜테)",
          "두피 관리",
          "탄력 관리",
          "골선 관리",
          "비대칭 관리",
          "팩",
          "마무리",
        ],
        introTitle: "바디 밸런스부터 얼굴 비대칭까지 ‘전체’로 맞추는 케어",
        introBody:
          "얼굴은 자세/골반/목·어깨 흐름과 맞물립니다. 바디 밸런스를 포함해 전체적인 비대칭과 흐름을 함께 정돈합니다.",
        concern: ["비대칭이 신경 쓰임", "자세/목·어깨 뭉침", "전체 밸런스가 무너진 느낌"],
        solve: ["균형감 있는 인상", "편안한 긴장 완화", "정돈된 전체 흐름"],
      },
    ],
    []
  );

  const BOOKING =
    "https://map.naver.com/p/entry/place/1063607602?placePath=/ticket?entry=plt&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601231203&locale=ko&svcName=map_pcv5&searchType=place&lng=127.1360654&lat=37.5287128&c=15.00,0,0,0,dh";

  const [active, setActive] = useState(0);

  useEffect(() => {
    const p = sp.get("p");
    if (!p) return;
    const idx = programs.findIndex((x) => x.slug === p);
    if (idx >= 0) setActive(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const current = programs[active];

  const goProgram = (slug: string) => {
    const idx = programs.findIndex((x) => x.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      router.replace(`/face?p=${slug}`);
    }
  };

  const [selectValue, setSelectValue] = useState<string>("");
  useEffect(() => setSelectValue(""), [active]);

  // ✅ 섹션 타이틀 스타일 통일(관리 가격 안내 기준)
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="text-[12px] tracking-[0.30em] text-zinc-400">{children}</div>
  );
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] font-semibold tracking-tight text-zinc-900">{children}</div>
  );

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>

      {/* MOBILE fixed top bar (그대로) */}
      <div
        className="md:hidden fixed left-0 right-0 top-0 z-[2000] h-[86px] px-4 flex items-center"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="absolute inset-0 bg-white/82 backdrop-blur border-b border-black/5" />

        <button
          type="button"
          onClick={() => router.back()}
          className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/5 shadow-[0_12px_30px_rgba(15,23,42,0.10)] active:scale-[0.98]"
          aria-label="뒤로가기"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative z-10 mx-auto">
          <img src="/logo-main.png" alt="WeMD Aesthetic" className="h-12 w-auto object-contain" draggable={false} />
        </div>

        <button
          type="button"
          onClick={() => router.push("/#menu")}
          className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/5 shadow-[0_12px_30px_rgba(15,23,42,0.10)] active:scale-[0.98]"
          aria-label="메뉴"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <main className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden md:pt-[78px] pt-[86px]">
          <div className="relative">
            <img
              src="/programs/face-hero.jpg"
              alt="Face Care Hero"
              className="h-[240px] w-full object-cover md:h-[320px]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-6 md:pb-9">
                <div className="w-full">
                  <div className="text-[12px] tracking-[0.30em] text-white/80">PROGRAM</div>
                  <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-white md:text-[44px]">
                    {current.titleKo}
                  </h1>
                  <div className="mt-2 text-[18px] font-semibold tracking-tight md:text-[26px] text-white/80 md:text-[18px]">{current.titleEn}</div>
                </div>
              </div>
            </div>
          </div>

          {/* dropdown */}
          <div className="mx-auto max-w-6xl px-4">
            <div className="mt-5">
              <label className="sr-only" htmlFor="programSelect">
                다른 시술 선택
              </label>

              <div className="relative">
                <select
                  id="programSelect"
                  value={selectValue}
                  onChange={(e) => {
                    const slug = e.target.value;
                    if (!slug) return;
                    goProgram(slug);
                  }}
                  className="
                    w-full appearance-none rounded-2xl bg-white
                    px-5 py-4 pr-12
                    text-[15px] font-semibold text-zinc-900
                    ring-1 ring-black/10
                    shadow-[0_14px_40px_rgba(15,23,42,0.08)]
                    outline-none
                  "
                >
                  <option value="" disabled>
                    다른 시술 선택 (현재: {current.titleKo})
                  </option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.titleKo}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: `0 0 0 2px ${ACCENT} inset` }} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
  {/* ✅ 섹션 구분선 + 섹션 간격 통일 */}
  <div className="divide-y divide-zinc-100/80">
    {/* ===================== PRICE ===================== */}
    <div className="pt-0 pb-8 md:pb-14">
      <div className="mt-2">
        <SectionLabel>PRICE</SectionLabel>
        <SectionTitle>관리 가격 안내</SectionTitle>

        <div
          className="
            mt-5 -mx-4 flex gap-4 overflow-x-auto
            px-10 pb-14
            snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
            bg-transparent

            md:mx-0 md:px-0 md:pb-0
            md:overflow-visible
            md:flex md:justify-center md:gap-10
          "
          style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
        >
          <PriceCardTicket
            title="1회 이용"
            price={current.priceOnce}
            durationMin={current.durationMin}
            originalPrice={null}
          />
          <PriceCardTicket
            title="10회 이용"
            price={current.priceTen}
            durationMin={current.durationMin}
            originalPrice={current.priceOnce * 10}
          />
        </div>

        <style jsx global>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>

    {/* ===================== INTRO ===================== */}
    <div className="py-8 md:py-14">
      <SectionLabel>INTRO</SectionLabel>
      <SectionTitle>{current.introTitle}</SectionTitle>

      <div className="md:hidden mt-4 rounded-3xl bg-white p-7 ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
        <p className="text-[14px] leading-relaxed text-zinc-600">{current.introBody}</p>
      </div>

      <div className="hidden md:block mt-4 max-w-3xl text-[16px] leading-relaxed text-zinc-600">
        {current.introBody}
      </div>
    </div>

    {/* ===================== EFFECT ===================== */}
    <div className="py-8 md:py-14">
      <SectionLabel>EFFECT</SectionLabel>
      <SectionTitle>관리 효과</SectionTitle>

      <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
        <EffectBox title="고민되시나요?" items={current.concern} tone="soft" />
        <EffectBox title="해결해드려요!" items={current.solve} tone="accent" />
      </div>
    </div>

    {/* ===================== COMPOSITION ===================== */}
    <div className="py-8 md:py-14">
      <div id="composition">
        <SectionLabel>COMPOSITION</SectionLabel>
        <SectionTitle>프로그램 구성</SectionTitle>

        <div className="mt-5 grid gap-3">
          {current.steps.map((s, i) => (
            <div
              key={`${current.slug}-${i}`}
              className="
                flex items-center gap-4 rounded-2xl bg-white px-5 py-4
                ring-1 ring-black/5
                shadow-[0_14px_50px_rgba(15,23,42,0.06)]
              "
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-[13px] font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[15px] font-semibold text-zinc-900">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ===================== RESERVATION ===================== */}
    <div className="py-8 md:py-14">
      <div className="rounded-3xl p-7 md:p-10 text-white relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18), transparent 55%)",
          }}
        />
        <div className="relative">
          <div className="text-[12px] tracking-[0.30em] text-white/85">RESERVATION</div>
          <div className="mt-2 text-[18px] font-semibold tracking-tight text-white md:text-[20px]">
            지금, {current.titleKo} 예약하기
          </div>
          <div className="mt-2 text-[13px] text-white/90">네이버 예약 페이지로 바로 이동합니다.</div>

          <div className="mt-6">
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99]"
            >
              예약하기
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <div className="bg-[#1A1A1A]">
          <Footer />
        </div>
      </main>
    </>
  );
}

/* -------------------- UI Pieces -------------------- */

function ClockMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22a10 10 0 110-20 10 10 0 010 20z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceCardTicket({
  title,
  price,
  durationMin,
  originalPrice,
}: {
  title: string;
  price: number;
  durationMin: number;
  originalPrice: number | null;
}) {
  const hasDiscount = originalPrice != null && originalPrice > price;

  return (
    <div
      className="
        snap-start shrink-0
        w-[66%] min-w-[220px]
        md:w-[380px]
      "
    >
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
        <div className="px-6 py-5 text-center text-[18px] font-semibold text-white" style={{ backgroundColor: ACCENT }}>
          {title}
        </div>

        <div className="px-6 py-8 text-center">
          {hasDiscount ? (
            <div className="text-[14px] text-zinc-400 line-through">{formatKRWSimple(originalPrice!)}</div>
          ) : (
            <div className="text-[14px] text-transparent">.</div>
          )}

          <div className="mt-2 text-[26px] font-semibold tracking-tight" style={{ color: ACCENT }}>
            {formatKRWSimple(price)}
          </div>

          <div className="mt-7 h-px w-full bg-zinc-200" />

          <div className="mt-6 text-[16px] font-semibold text-zinc-700">
            <span className="inline-flex items-center gap-2">
              <span className="text-zinc-600">
                <ClockMini />
              </span>
              관리시간 <span className="text-zinc-900">{durationMin}분</span>
            </span>
          </div>

          <div className="mt-2 text-[14px] font-semibold text-zinc-600">VAT포함</div>
        </div>
      </div>
    </div>
  );
}

function EffectBox({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "soft" | "accent";
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={[
        "rounded-3xl p-6 ring-1 ring-black/5",
        isAccent ? "text-white" : "bg-white",
        isAccent ? "" : "shadow-[0_18px_70px_rgba(15,23,42,0.08)]",
      ].join(" ")}
      style={
        isAccent
          ? {
              backgroundColor: ACCENT,
              boxShadow: "0 18px 70px rgba(183,25,25,0.18)",
            }
          : undefined
      }
    >
      <div className="text-[14px] font-semibold">{title}</div>

      <ul className="mt-4 space-y-2">
        {items.map((t, i) => (
          <li
            key={i}
            className={[
              "flex items-start gap-2 text-[13px] leading-relaxed",
              isAccent ? "text-white/90" : "text-zinc-600",
            ].join(" ")}
          >
            <span
              className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: isAccent ? "rgba(255,255,255,0.85)" : "rgb(161 161 170)" }}
              aria-hidden
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}