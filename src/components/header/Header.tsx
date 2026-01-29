"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_URL, NAV_ITEMS, type NavItem, type NavMega } from "@/config/nav";
import { cn } from "@/lib/cn";

/* ---------- ROUTE MAP (요청사항 고정) ---------- */
const ROUTES = {
  face: {
    default: "/face?p=facial-lifting",
    items: [
      { label: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { label: "얼굴 V라인 관리", href: "/face?p=facial-contouring" },
      { label: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { label: "얼굴 균형 관리", href: "/face?p=facial-balance" },
    ],
  },
  body: {
    default: "/body?p=upper-body",
    items: [
      { label: "상체 관리", href: "/body?p=upper-body" },
      { label: "하체 관리", href: "/body?p=lower-body" },
      { label: "S라인 관리", href: "/body?p=s-line" },
    ],
  },
  custom: {
    default: "/custom?p=wedding-standard",
    items: [
      { label: "웨딩 관리 Standard", href: "/custom?p=wedding-standard" },
      { label: "웨딩 관리 Special", href: "/custom?p=wedding-special" },
      { label: "라운드 숄더 관리", href: "/custom?p=rounded-shoulder" },
      { label: "애플 힙 관리", href: "/custom?p=apple-hip" },
      { label: "러닝 후 관리", href: "/custom?p=runner-recovery" },
      { label: "골프 관리", href: "/custom?p=golf-recovery" },
    ],
  },
};

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
  const router = useRouter();

  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [onHero, setOnHero] = useState(true);
  const headerRef = useRef<HTMLElement | null>(null);

  // ✅ 모바일 드로어
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  // nav items
  const face = getItem("얼굴 관리");
  const body = getItem("바디 관리");
  const custom = getItem("맞춤 케어");

  // ✅ PC 오른쪽 링크(기존 유지)
  const branches = getItem("지점 소개");

  // ✅ 모바일 드로어용 링크 (가맹 문의)
  const franchise = getItem("가맹 문의") || getItem("입점 문의"); // 혹시 라벨이 기존에 이거였을 수도
  const franchiseHref =
    (franchise && franchise.type === "link" ? franchise.href : null) || "/franchise";

  const activeItem = useMemo(() => {
    if (!activeMega) return null;
    const found = NAV_ITEMS.find((it) => isMega(it) && it.label === activeMega);
    return found && isMega(found) ? found : null;
  }, [activeMega]);

  /* ---------- HERO 감지 ---------- */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ---------- 외부 클릭 닫기 (PC Mega) ---------- */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!activeMega) return;
      if (!headerRef.current?.contains(e.target as Node)) setActiveMega(null);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [activeMega]);

  /* ---------- ESC 닫기 (Mega + Mobile) ---------- */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------- 모바일 드로어 열리면 스크롤 잠금 ---------- */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* ---------- 헤더 색 판정 ---------- */
  const headerIsWhite = true; // ✅ PC는 항상 흰색

  const topText = headerIsWhite ? "text-zinc-900" : "text-white";
  const topTextHover = headerIsWhite ? "hover:text-zinc-950" : "hover:text-white";
  const dividerColor = headerIsWhite ? "bg-zinc-300" : "bg-white/40";

  // ✅ 전화상담 번호(원하는 번호로 변경)
  const CONSULT_TEL = "02-6959-8989";
  const consultTelHref = `tel:${CONSULT_TEL.replaceAll("-", "").replaceAll(" ", "")}`;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-colors duration-300",
        headerIsWhite ? "bg-white" : "bg-transparent",
        headerIsWhite ? "border-b border-zinc-200" : "border-b border-transparent"
      )}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* ================= MOBILE HEADER (md 미만 전용) ================= */}
        <div className="relative flex h-[64px] items-center md:hidden">
          {/* 가운데 서브로고만 크게 */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo-sub.svg"
              alt="WeMD Aesthetic"
              width={180}
              height={180}
              priority
              className="h-[56px] w-auto"
            />
          </div>

          {/* 햄버거: 우측 */}
          <button
            type="button"
            aria-label="메뉴 열기"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full"
            onClick={openMobile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn("h-6 w-6", topText)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* ================= PC HEADER (md 이상 전용) ================= */}
        <div className="hidden h-[78px] items-center justify-between md:flex">
          {/* LEFT */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo-main.png" alt="WeMD" width={74} height={74} priority />
            </Link>

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

            <nav className="hidden items-center gap-8 md:flex">
              <MegaTopButton
                item={face}
                open={activeMega === face?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
                onClickDefault={() => router.push(ROUTES.face.default)}
              />
              <MegaTopButton
                item={body}
                open={activeMega === body?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
                onClickDefault={() => router.push(ROUTES.body.default)}
              />
              <MegaTopButton
                item={custom}
                open={activeMega === custom?.label}
                headerIsWhite={headerIsWhite}
                onOpen={setActiveMega}
                onClickDefault={() => router.push(ROUTES.custom.default)}
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
              {branches && (
                <Link
                  href="/branches/dunchon"
                  className={cn("text-[14px] font-medium transition-colors", topText, topTextHover)}
                >
                  지점안내
                  <span className="ml-1 align-middle text-[14px]" aria-hidden>
                    ↗
                  </span>
                </Link>
              )}
            </div>

            <Link href="/" className="flex items-center">
              <Image src="/logo-sub.svg" alt="WeMD Aesthetic" width={92} height={92} priority />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Toss-like Mega Menu (WHITE) */}
      <MegaMenuTossLike item={activeItem} />

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen ? (
        <div className="md:hidden">
          {/* dim */}
          <div className="fixed inset-0 z-[999] bg-black/35" onClick={closeMobile} aria-hidden />

          {/* panel */}
          <aside
            className="
              fixed right-0 top-0 z-[1000] h-dvh w-[86vw] max-w-[360px]
              bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)]
              flex flex-col
            "
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            {/* top */}
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">MENU</div>
              <button
                type="button"
                onClick={closeMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-50"
                aria-label="메뉴 닫기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-zinc-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* menu list */}
            <div className="px-5 pb-6 pt-4">
              <MobileLink href="#brand" onClick={closeMobile}>
                WeMD 에스테틱
              </MobileLink>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              {/* ✅ 여기: 기본 진입 slug로 이동 */}
              <div className="mt-5 space-y-1">
                <MobileLink href={ROUTES.face.default} onClick={closeMobile}>
                  얼굴 관리
                </MobileLink>
                <MobileLink href={ROUTES.body.default} onClick={closeMobile}>
                  바디 관리
                </MobileLink>
                <MobileLink href={ROUTES.custom.default} onClick={closeMobile}>
                  맞춤 케어
                </MobileLink>
              </div>

              <div className="mt-5 h-px w-full bg-zinc-100" />

              <div className="mt-5 space-y-1">
                <MobileLink href="/branches/dunchon" onClick={closeMobile}>
                  지점 안내
                </MobileLink>
                <MobileLink href={franchiseHref} onClick={closeMobile}>
                  가맹 문의
                </MobileLink>
              </div>
            </div>

            {/* bottom CTA */}
            <div className="mt-auto px-5 pb-6">
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex h-[50px] items-center justify-center rounded-2xl
                    bg-zinc-900 text-[15px] font-semibold text-white
                    active:scale-[0.99]
                  "
                >
                  예약하기
                </a>
                <a
                  href={consultTelHref}
                  className="
                    inline-flex h-[50px] items-center justify-center rounded-2xl
                    border border-zinc-200 bg-white text-[15px] font-semibold text-zinc-900
                    active:scale-[0.99]
                  "
                >
                  전화상담
                </a>
              </div>

              <div className="mt-4 text-center text-[12px] text-zinc-400">WeMD Aesthetic</div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}

/* ---------- Components ---------- */

function Divider({ className, colorClass }: { className?: string; colorClass?: string }) {
  return <span className={cn("inline-block h-5 w-px", colorClass, className)} aria-hidden />;
}

function MegaTopButton({
  item,
  open,
  headerIsWhite,
  onOpen,
  onClickDefault,
}: {
  item?: NavItem;
  open: boolean;
  headerIsWhite: boolean;
  onOpen: (v: string | null) => void;
  onClickDefault: () => void;
}) {
  if (!item || !isMega(item)) return null;

  const base = "h-[68px] text-[18px] font-semibold transition-colors";

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
      className={cn(base, color)}
      onMouseEnter={() => onOpen(item.label)}
      onClick={onClickDefault} // ✅ 클릭하면 기본 프로그램으로 이동
    >
      {displayLabel(item.label)}
    </button>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex items-center justify-between rounded-2xl px-4 py-3
        text-[16px] font-semibold text-zinc-900
        hover:bg-zinc-50 active:bg-zinc-100
      "
    >
      <span>{children}</span>
      <span className="text-zinc-300" aria-hidden>
        →
      </span>
    </Link>
  );
}

/* ---------- Toss-like Mega Menu (WHITE) ---------- */
function MegaMenuTossLike({ item }: { item: NavMega | null }) {
  if (!item) return null;

  const meta = getMegaMeta(item.label);

  // ✅ 메가메뉴 링크를 "slug 기준"으로 덮어쓰기
  const normalized = normalizeMegaItem(item);

  return (
    <div
      className="
        relative z-50
        border-t border-zinc-200 bg-white
        shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]
      "
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[28px] font-semibold tracking-tight text-zinc-900">{meta.title}</div>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">{meta.desc}</p>

            <div className="mt-6">
              <Link
                href={meta.allHref}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-800 hover:text-[#B90E0A]"
              >
                전체 보기 <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <div
              className={cn(
                "grid gap-x-10 gap-y-10",
                normalized.sections.length <= 3
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : normalized.sections.length === 4
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-5"
              )}
            >
              {normalized.sections.map((section) => (
                <div key={section.title} className="min-w-0">
                  <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                    {section.title || "MENU"}
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    {section.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="
                          group inline-flex min-w-0 items-center justify-between
                          text-[15px] font-semibold text-zinc-900
                          hover:text-[#B90E0A]
                        "
                      >
                        <span className="truncate">{l.label}</span>
                        <span
                          className="
                            ml-3 shrink-0 text-zinc-300
                            transition group-hover:translate-x-[2px] group-hover:text-[#B90E0A]/50
                          "
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 h-px w-full bg-zinc-200" />

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="text-[13px] text-zinc-600">프로그램 상세는 각 페이지에서 확인할 수 있어요.</div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex h-[44px] items-center justify-center rounded-full
                  bg-[#B90E0A] px-6 text-[14px] font-semibold text-white
                  hover:bg-[#a40c09]
                "
              >
                예약하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mega meta ---------- */
function getMegaMeta(label: string): { title: string; desc: string; allHref: string } {
  if (label === "얼굴 관리") {
    return {
      title: "얼굴관리",
      desc: "라인과 밸런스를 정교하게 다듬는 페이스 프로그램을 한 번에 확인하세요.",
      allHref: ROUTES.face.default, // ✅ 전체보기 -> 기본 슬러그
    };
  }
  if (label === "바디 관리") {
    return {
      title: "바디관리",
      desc: "컨디션과 순환을 기반으로, 바디 라인을 깔끔하게 설계합니다.",
      allHref: ROUTES.body.default, // ✅
    };
  }
  if (label === "맞춤 케어") {
    return {
      title: "맞춤케어",
      desc: "목적 기반 조합으로 개인에게 맞춘 집중 케어를 제공합니다.",
      allHref: ROUTES.custom.default, // ✅
    };
  }
  return {
    title: displayLabel(label),
    desc: "WeMD 프로그램을 확인하세요.",
    allHref: "/",
  };
}

/* ---------- NAV_ITEMS가 /face 같은 href를 가지고 있어도 여기서 강제로 slug링크로 교체 ---------- */
function normalizeMegaItem(item: NavMega): NavMega {
  if (item.label === "얼굴 관리") {
    return {
      ...item,
      sections: [
        {
          title: item.sections?.[0]?.title || "FACE",
          links: ROUTES.face.items,
        },
      ],
    };
  }
  if (item.label === "바디 관리") {
    return {
      ...item,
      sections: [
        {
          title: item.sections?.[0]?.title || "BODY",
          links: ROUTES.body.items,
        },
      ],
    };
  }
  if (item.label === "맞춤 케어") {
    return {
      ...item,
      sections: [
        {
          title: item.sections?.[0]?.title || "CUSTOM",
          links: ROUTES.custom.items,
        },
      ],
    };
  }
  return item;
}