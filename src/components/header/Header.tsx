"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKING_URL, NAV_ITEMS, type NavItem, type NavMega } from "@/config/nav";
import { cn } from "@/lib/cn";

/* ---------- utils ---------- */
function isMega(item: NavItem): item is NavMega {
  return item.type === "mega";
}

function getItem(label: string) {
  return NAV_ITEMS.find((it) => it.label === label);
}

function displayLabel(label: string) {
  if (label === "얼굴 관리") return "얼굴관리";
  if (label === "바디 관리") return "바디관리";
  if (label === "맞춤 케어") return "맞춤케어";
  return label;
}

/* ---------- Header ---------- */
export default function Header() {
  const [activeMega, setActiveMega] = useState<string | null>(null);

  // ✅ hero 없는 페이지 대비: 기본 false
  const [onHero, setOnHero] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  // nav items
  const face = getItem("얼굴 관리");
  const body = getItem("바디 관리");
  const custom = getItem("맞춤 케어");
  const branches = getItem("지점 소개");
  const franchise = getItem("입점 문의");

  const activeItem = useMemo(() => {
    if (!activeMega) return null;
    const found = NAV_ITEMS.find((it) => isMega(it) && it.label === activeMega);
    return found && isMega(found) ? found : null;
  }, [activeMega]);

  /* ---------- HERO 감지 ---------- */
  useEffect(() => {
    const hero = document.getElementById("hero");

    // ✅ hero 없으면: 무조건 흰 헤더 모드
    if (!hero) {
      setOnHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ---------- 외부 클릭 닫기 ---------- */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!activeMega) return;
      if (!headerRef.current?.contains(e.target as Node)) setActiveMega(null);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [activeMega]);

  /* ---------- ESC 닫기 ---------- */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMega(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------- 헤더 색 판정 ---------- */
  const headerIsWhite = !onHero || Boolean(activeMega);

  const topText = headerIsWhite ? "text-zinc-900" : "text-white";
  const topTextHover = headerIsWhite ? "hover:text-zinc-950" : "hover:text-white";
  const dividerColor = headerIsWhite ? "bg-zinc-300" : "bg-white/40";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        headerIsWhite ? "bg-white" : "bg-transparent",
        headerIsWhite ? "border-b border-zinc-200" : "border-b border-transparent"
      )}
      // ✅ 이거 없으면 “열렸는데 안 닫힘”/“이벤트 꼬임” 발생
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-[78px] items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo-main.png" alt="WeMD" width={74} height={74} priority />
            </Link>

            {/* 원페이지 브랜드 */}
            <a
              href="#brand"
              className={cn(
                "ml-20 text-[16px] font-semibold transition-colors",
                topText,
                topTextHover
              )}
            >
              WeMD 에스테틱
            </a>

            <Divider className="mx-7" colorClass={dividerColor} />

            {/* MEGA */}
            <nav className="hidden items-center gap-8 md:flex">
              <MegaTopButton
                item={face}
                open={activeMega === face?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
              <MegaTopButton
                item={body}
                open={activeMega === body?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
              <MegaTopButton
                item={custom}
                open={activeMega === custom?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
              />
            </nav>

            <Divider className="ml-7 hidden md:inline-block" colorClass={dividerColor} />

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "ml-7 hidden text-[16px] font-medium transition-colors md:inline-block",
                topText,
                topTextHover
              )}
            >
              예약하기
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-7">
            <div className="hidden items-center gap-7 md:flex">
              {branches?.type === "link" && (
                <a
                  href={branches.href}
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  {branches.label}
                </a>
              )}
              {franchise?.type === "link" && (
                <a
                  href={franchise.href}
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  {franchise.label}
                </a>
              )}
            </div>

            <Link href="/" className="hidden md:block">
              <Image src="/logo-sub.svg" alt="WeMD Aesthetic" width={92} height={92} priority />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Mega Menu (이게 빠지면 당연히 “안열림”) */}
      <MegaMenuTossWhite item={activeItem} onClose={() => setActiveMega(null)} />
    </header>
  );
}

/* ---------- Pieces ---------- */

function Divider({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) {
  return <span className={cn("inline-block h-5 w-px", colorClass, className)} aria-hidden />;
}

function MegaTopButton({
  item,
  open,
  headerIsWhite,
  onOpen,
}: {
  item?: NavItem;
  open: boolean;
  headerIsWhite: boolean;
  onOpen: (v: string | null) => void;
}) {
  if (!item || !isMega(item)) return null;

  const color = headerIsWhite
    ? open
      ? "text-[#B90E0A]"
      : "text-zinc-900 hover:text-[#B90E0A]"
    : open
    ? "text-white"
    : "text-white/90 hover:text-white";

  return (
    <button
      type="button"
      className={cn("h-[68px] text-[18px] font-semibold transition-colors", color)}
      onMouseEnter={() => onOpen(item.label)}
      onFocus={() => onOpen(item.label)}
    >
      {displayLabel(item.label)}
    </button>
  );
}

/**
 * ✅ 토스 스타일(화이트 버전) 메가메뉴:
 * - 왼쪽에 섹션 타이틀/설명
 * - 오른쪽에 섹션별 링크 컬럼
 * - "의미없는 회색 박스" 제거
 */
function MegaMenuTossWhite({
  item,
  onClose,
}: {
  item: NavMega | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT: title */}
          <div className="col-span-12 md:col-span-3">
            <div className="text-[12px] tracking-[0.22em] text-zinc-500">
              {item.label.toUpperCase()}
            </div>
            <div className="mt-3 text-[28px] font-semibold text-zinc-900">
              {displayLabel(item.label)}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-zinc-600">
              프로그램 상세는 다음 페이지에서 확인할 수 있어요.
            </p>

            <div className="mt-7">
              <Link
                href={item.sections?.[0]?.links?.[0]?.href ?? "/"}
                className="inline-flex h-[40px] items-center justify-center rounded-full border border-zinc-200 px-5 text-[13px] font-medium text-zinc-900 hover:bg-zinc-50"
                onClick={onClose}
              >
                대표 프로그램 보기
              </Link>
            </div>
          </div>

          {/* RIGHT: sections */}
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
              {item.sections.map((sec) => (
                <div key={sec.title}>
                  <div className="text-[12px] tracking-[0.18em] text-zinc-500">
                    {sec.title}
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {sec.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-[15px] font-medium text-zinc-900 hover:text-[#B90E0A]"
                        onClick={onClose}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* bottom helper */}
            <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6">
              <span className="text-[12px] text-zinc-500">WeMD Program Navigation</span>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] font-medium text-zinc-900 hover:text-[#B90E0A]"
              >
                예약하기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}