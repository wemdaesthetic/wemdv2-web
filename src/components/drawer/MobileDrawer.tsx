// FILE: src/components/drawer/MobileDrawer.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const ACCENT = "#B71919";

type DrawerSection = "face" | "body" | "custom" | null;

type Props = {
  open: boolean;
  onClose: () => void;

  bookingUrl: string;
  consultTelHref: string;

  /** home: 메인페이지 / manage: 관리페이지(프로그램 상세) */
  variant?: "home" | "manage";

  /** home variant에서 고객후기 메뉴를 보일지 */
  showReviewsLink?: boolean;
};

export default function MobileDrawer({
  open,
  onClose,
  bookingUrl,
  consultTelHref,
  variant = "manage",
  showReviewsLink = false,
}: Props) {
  // ✅ 훅들은 open 여부와 상관없이 항상 실행되어야 함

  const faceItems = useMemo(
    () => [
      { title: "얼굴 리프팅 관리", href: "/face?p=facial-lifting" },
      { title: "얼굴 V라인 관리", href: "/face?p=facial-contouring" },
      { title: "작은 얼굴 관리", href: "/face?p=face-slimming" },
      { title: "얼굴 균형 관리", href: "/face?p=facial-balance" },
    ],
    []
  );

  const bodyItems = useMemo(
    () => [
      { title: "상체 관리", href: "/body?p=upper-body" },
      { title: "하체 관리", href: "/body?p=lower-body" },
      { title: "S라인 관리", href: "/body?p=s-line" },
    ],
    []
  );

  const customItems = useMemo(
    () => [
      { title: "웨딩 관리 Standard", href: "/custom?p=wedding-standard" },
      { title: "웨딩 관리 Special", href: "/custom?p=wedding-special" },
      { title: "라운드 숄더 관리", href: "/custom?p=rounded-shoulder" },
      { title: "애플 힙 관리", href: "/custom?p=apple-hip" },
      { title: "러닝 후 관리", href: "/custom?p=runner-recovery" },
      { title: "골프 관리", href: "/custom?p=golf-recovery" },
    ],
    []
  );

  // ✅ 단일 오픈 아코디언
  const [openSection, setOpenSection] = useState<DrawerSection>(null);
  const toggleSection = (k: Exclude<DrawerSection, null>) => {
    setOpenSection((prev) => (prev === k ? null : k));
  };

  // ✅ 드로어 열릴 때: manage는 현재 페이지가 바디/얼굴/맞춤인지 알 수 없으니 "null 유지" or 원하는 기본값
  // 바디 페이지에서 기본으로 body 열리게 하고 싶으면, 호출하는 쪽에서 prop으로 내려도 되지만
  // 지금은 안전하게 "null" → 사용자가 눌러서 여는 방식으로 통일
  useEffect(() => {
    if (!open) return;
    // open될 때는 기본 닫힘 상태로 시작 (원하면 "body"로 바꿔도 됨)
    setOpenSection(null);
  }, [open]);

  // ✅ open일 때만 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // ✅ INFO 링크: home/manage에 따라 구성
  const infoLinks = useMemo(() => {
    const base = [
      { label: "지점 안내", href: "/branches/dunchon" },
      { label: "가맹 문의", href: "/#franchise" },
    ];

    // home에서는 "고객후기"를 메뉴 최상단 링크로 쓰고 싶다 했으니
    // showReviewsLink=true면 INFO 위에 따로 섹션으로 넣는 게 더 자연스러움.
    // 여기서는 INFO에는 넣지 않고, 별도 렌더로 처리.
    return base;
  }, []);

  // ✅ 여기서부터 early return (훅 다 호출된 뒤)
  if (!open) return null;

  const showBrandLinkInDrawer = variant === "home"; // 홈에서만 BRAND 섹션을 유지할지 여부
  // 요청사항: "WeMD 에스테틱 메뉴 없애고 고객후기로 변경" → home에서 BRAND 링크를 고객후기로 바꿈
  const brandLinkLabel = "고객후기";
  const brandLinkHref = "/#reviews";

  return (
    <div className="md:hidden">
      {/* dim */}
      <div className="fixed inset-0 z-[2999] bg-black/35" onClick={onClose} aria-hidden />

      {/* panel */}
      <aside
        className="
          fixed right-0 top-0 z-[3000] h-dvh w-[86vw] max-w-[360px]
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
            onClick={onClose}
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

        {/* list */}
        <div className="mt-4 px-5 pb-6 overflow-y-auto">
          {/* ✅ HOME에서만 상단 링크(고객후기) */}
          {showBrandLinkInDrawer ? (
            <>
              <DrawerLink href={brandLinkHref} onClick={onClose}>
                {brandLinkLabel}
              </DrawerLink>
              <div className="mt-5 h-px w-full bg-zinc-100" />
            </>
          ) : null}

          <div className="mb-2 text-[12px] font-semibold tracking-[0.18em] text-zinc-400">TREATMENT</div>

          <DrawerAccordion title="얼굴 관리" open={openSection === "face"} onToggle={() => toggleSection("face")} />
          {openSection === "face" ? (
            <div className="ml-2 mt-1 space-y-1">
              {faceItems.map((it) => (
                <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                  {it.title}
                </DrawerSubLink>
              ))}
            </div>
          ) : null}

          <div className="mt-2" />
          <DrawerAccordion title="바디 관리" open={openSection === "body"} onToggle={() => toggleSection("body")} />
          {openSection === "body" ? (
            <div className="ml-2 mt-1 space-y-1">
              {bodyItems.map((it) => (
                <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                  {it.title}
                </DrawerSubLink>
              ))}
            </div>
          ) : null}

          <div className="mt-2" />
          <DrawerAccordion title="맞춤 케어" open={openSection === "custom"} onToggle={() => toggleSection("custom")} />
          {openSection === "custom" ? (
            <div className="ml-2 mt-1 space-y-1">
              {customItems.map((it) => (
                <DrawerSubLink key={it.href} href={it.href} onClick={onClose}>
                  {it.title}
                </DrawerSubLink>
              ))}
            </div>
          ) : null}

          <div className="my-5 h-px w-full bg-zinc-100" />

          <div className="mb-2 text-[12px] font-semibold tracking-[0.18em] text-zinc-400">INFO</div>
          <div className="space-y-1">
            {infoLinks.map((l) => (
              <DrawerLink key={l.href} href={l.href} onClick={onClose}>
                {l.label}
              </DrawerLink>
            ))}
          </div>
        </div>

        {/* bottom CTA */}
        <div className="mt-auto px-5 pb-6">
          <div className="grid grid-cols-1 gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[50px] items-center justify-center rounded-2xl text-[15px] font-semibold text-white active:scale-[0.99]"
              style={{ backgroundColor: ACCENT }}
            >
              예약하기
            </a>

            <a
              href={consultTelHref}
              className="inline-flex h-[50px] items-center justify-center rounded-2xl border border-zinc-200 bg-white text-[15px] font-semibold text-zinc-900 active:scale-[0.99]"
            >
              전화상담
            </a>
          </div>

          <div className="mt-4 text-center text-[12px] text-zinc-400">WeMD Aesthetic</div>
        </div>
      </aside>
    </div>
  );
}

/* ---------- Drawer UI ---------- */

function DrawerLink({
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
      className="flex items-center justify-between rounded-2xl px-4 py-3 text-[16px] font-semibold text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100"
    >
      <span>{children}</span>
      <span className="text-zinc-300" aria-hidden>
        →
      </span>
    </Link>
  );
}

function DrawerAccordion({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-[16px] font-semibold text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100"
    >
      <span>{title}</span>
      <span className="text-zinc-400" aria-hidden>
        {open ? "−" : "+"}
      </span>
    </button>
  );
}

function DrawerSubLink({
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
      className="flex items-center justify-between rounded-2xl px-4 py-2 text-[14px] font-semibold text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100"
    >
      <span>{children}</span>
      <span className="text-zinc-300" aria-hidden>
        →
      </span>
    </Link>
  );
}