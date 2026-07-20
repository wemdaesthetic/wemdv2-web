"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BOOKING_URL,
  NAV_ITEMS,
  type NavItem,
  type NavMega,
} from "@/config/nav";
import { cn } from "@/lib/cn";
import MembershipModal from "@/components/membership/MembershipModal";

const ROUTES = {
  face: {
    default: "/face?p=facial-lifting",
    items: [
      {
        label: "얼굴 리프팅 관리",
        href: "/face?p=facial-lifting",
      },
      {
        label: "얼굴 V라인 관리",
        href: "/face?p=ellazo-face",
      },
      {
        label: "작은 얼굴 관리",
        href: "/face?p=face-slimming",
      },
      {
        label: "얼굴 균형 관리",
        href: "/face?p=face-balance",
      },
      {
        label: "웨딩 관리",
        href: "/face?p=wedding",
      },
    ],
  },

  body: {
    default: "/body?p=body-upper",
    items: [
      {
        label: "상체 관리",
        href: "/body?p=body-upper",
      },
      {
        label: "하체 관리",
        href: "/body?p=body-lower",
      },
      {
        label: "S라인 관리",
        href: "/body?p=body-sline",
      },
      {
        label: "라운드 숄더 관리",
        href: "/body?p=round-shoulder",
      },
    ],
  },

  custom: {
    default: "/custom?p=apple-hip",
    items: [
      {
        label: "애플 힙 관리",
        href: "/custom?p=apple-hip",
      },
      {
        label: "러닝 후 관리",
        href: "/custom?p=runner-recovery",
      },
      {
        label: "골프 관리",
        href: "/custom?p=golf",
      },
    ],
  },

  skin: {
    default: "/skin?p=hydration-fill",
    items: [
      {
        label: "수분 채움",
        href: "/skin?p=hydration-fill",
      },
      {
        label: "트러블 케어",
        href: "/skin?p=trouble-care",
      },
      {
        label: "광채 채움",
        href: "/skin?p=glow-fill",
      },
      {
        label: "앰플 부스팅",
        href: "/skin?p=ampoule-boosting",
      },
    ],
  },
};

function isMega(item: NavItem): item is NavMega {
  return item.type === "mega";
}

function getItem(label: string) {
  return NAV_ITEMS.find((item) => item.label === label);
}

function displayLabel(label: string) {
  if (label === "얼굴 관리") return "얼굴관리";
  if (label === "바디 관리") return "바디관리";
  if (label === "맞춤 케어") return "집중관리";
  if (label === "집중 관리") return "집중관리";
  if (label === "스킨 솔루션 관리") return "스킨 솔루션";

  return label;
}

export default function Header() {
  const router = useRouter();

  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [membershipOpen, setMembershipOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  const face = getItem("얼굴 관리");
  const body = getItem("바디 관리");
  const custom =
    getItem("집중 관리") ??
    getItem("맞춤 케어");
    const skin = getItem("스킨 솔루션 관리");

  const activeItem = useMemo(() => {
    if (!activeMega) return null;

    const found = NAV_ITEMS.find(
      (item) => isMega(item) && item.label === activeMega
    );

    return found && isMega(found) ? found : null;
  }, [activeMega]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!activeMega) return;

      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMega(null);
      }
    }

    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [activeMega]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMega(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const headerIsWhite = true;

  const topText = headerIsWhite
    ? "text-zinc-900"
    : "text-white";

  const topTextHover = headerIsWhite
    ? "hover:text-zinc-950"
    : "hover:text-white";

  const dividerColor = headerIsWhite
    ? "bg-zinc-300"
    : "bg-white/40";

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-colors duration-300",
          headerIsWhite ? "bg-white" : "bg-transparent",
          headerIsWhite
            ? "border-b border-zinc-200"
            : "border-b border-transparent"
        )}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="hidden h-[78px] items-center justify-between md:flex">
            <div className="flex min-w-0 items-center">
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label="WeMD 홈으로 이동"
              >
                <Image
                  src="/logo-main.png"
                  alt="WeMD"
                  width={74}
                  height={74}
                  priority
                />
              </Link>

              <a
                href="/#brand"
                className={cn(
                  "ml-12 shrink-0 whitespace-nowrap text-[15px] font-semibold transition-colors lg:ml-16 lg:text-[16px]",
                  topText,
                  topTextHover
                )}
              >
                WeMD 에스테틱
              </a>

              <Divider
                className="mx-5 shrink-0 lg:mx-6"
                colorClass={dividerColor}
              />

              <nav className="hidden min-w-0 items-center gap-5 md:flex lg:gap-7">
                <MegaTopButton
                  item={face}
                  open={activeMega === face?.label}
                  headerIsWhite={headerIsWhite}
                  onOpen={setActiveMega}
                  onClickDefault={() =>
                    router.push(ROUTES.face.default)
                  }
                />

                <MegaTopButton
                  item={body}
                  open={activeMega === body?.label}
                  headerIsWhite={headerIsWhite}
                  onOpen={setActiveMega}
                  onClickDefault={() =>
                    router.push(ROUTES.body.default)
                  }
                />

                <MegaTopButton
                  item={custom}
                  open={activeMega === custom?.label}
                  headerIsWhite={headerIsWhite}
                  onOpen={setActiveMega}
                  onClickDefault={() =>
                    router.push(ROUTES.custom.default)
                  }
                />

                <MegaTopButton
                  item={skin}
                  open={activeMega === skin?.label}
                  headerIsWhite={headerIsWhite}
                  onOpen={setActiveMega}
                  onClickDefault={() =>
                    router.push(ROUTES.skin.default)
                  }
                />
              </nav>

              <Divider
                className="ml-5 hidden shrink-0 md:inline-block lg:ml-6"
                colorClass={dividerColor}
              />

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "ml-5 hidden shrink-0 whitespace-nowrap text-[15px] font-medium transition-colors md:inline-block lg:ml-6 lg:text-[16px]",
                  topText,
                  topTextHover
                )}
              >
                예약하기
              </a>
            </div>

            <div className="ml-6 flex shrink-0 items-center gap-5 lg:gap-7">
              <button
                type="button"
                onClick={() => setMembershipOpen(true)}
                className={cn(
                  "whitespace-nowrap text-[14px] font-semibold transition-colors",
                  topText,
                  topTextHover
                )}
              >
                회원권
              </button>

              <a
                href="/#branches"
                className={cn(
                  "whitespace-nowrap text-[14px] font-semibold transition-colors",
                  topText,
                  topTextHover
                )}
              >
                지점안내
              </a>

              <a
                href="/#franchise"
                className={cn(
                  "whitespace-nowrap text-[14px] font-semibold transition-colors",
                  topText,
                  topTextHover
                )}
              >
                가맹문의
              </a>
            </div>
          </div>
        </div>

        <MegaMenuTossLike item={activeItem} />
      </header>

      <MembershipModal
        open={membershipOpen}
        onClose={() => setMembershipOpen(false)}
        bookingUrl={BOOKING_URL}
      />
    </>
  );
}

function Divider({
  className,
  colorClass,
}: {
  className?: string;
  colorClass?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-px",
        colorClass,
        className
      )}
      aria-hidden
    />
  );
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
  onOpen: (value: string | null) => void;
  onClickDefault: () => void;
}) {
  if (!item || !isMega(item)) return null;

  const base =
    "h-[68px] whitespace-nowrap text-[15px] font-semibold transition-colors lg:text-[17px]";

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
      onFocus={() => onOpen(item.label)}
      onClick={onClickDefault}
    >
      {displayLabel(item.label)}
    </button>
  );
}

function MegaMenuTossLike({
  item,
}: {
  item: NavMega | null;
}) {
  if (!item) return null;

  const meta = getMegaMeta(item.label);
  const normalized = normalizeMegaItem(item);

  return (
    <div className="relative z-50 border-t border-zinc-200 bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[28px] font-semibold tracking-tight text-zinc-900">
              {meta.title}
            </div>

            <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
              {meta.desc}
            </p>

            <div className="mt-6">
              <Link
                href={meta.allHref}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-800 hover:text-[#B90E0A]"
              >
                전체 보기
                <span aria-hidden>→</span>
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
                <div
                  key={`${item.label}-${section.title}`}
                  className="min-w-0"
                >
                  <div className="text-[12px] font-semibold tracking-[0.22em] text-zinc-400">
                    {section.title || "MENU"}
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group inline-flex min-w-0 items-center justify-between text-[15px] font-semibold text-zinc-900 hover:text-[#B90E0A]"
                      >
                        <span className="truncate">
                          {link.label}
                        </span>

                        <span
                          className="ml-3 shrink-0 text-zinc-300 transition group-hover:translate-x-[2px] group-hover:text-[#B90E0A]/50"
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
              <div className="text-[13px] text-zinc-600">
                프로그램 상세는 각 페이지에서 확인할 수 있어요.
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#B90E0A] px-6 text-[14px] font-semibold text-white hover:bg-[#a40c09]"
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

function getMegaMeta(
  label: string
): {
  title: string;
  desc: string;
  allHref: string;
} {
  if (label === "얼굴 관리") {
    return {
      title: "얼굴관리",
      desc:
        "라인과 밸런스를 정교하게 다듬는 페이스 프로그램을 한 번에 확인하세요.",
      allHref: ROUTES.face.default,
    };
  }

  if (label === "스킨 솔루션 관리") {
    return {
      title: "스킨 솔루션 관리",
      desc:
        "피부 상태와 고민에 맞춰 수분, 진정, 광채와 앰플 관리를 제공합니다.",
      allHref: ROUTES.skin.default,
    };
  }

  if (label === "바디 관리") {
    return {
      title: "바디관리",
      desc:
        "컨디션과 순환을 기반으로 바디 라인을 깔끔하게 설계합니다.",
      allHref: ROUTES.body.default,
    };
  }

  if (
    label === "맞춤 케어" ||
    label === "집중 관리"
  ) {
    return {
      title: "집중관리",
      desc:
        "목적과 신체 컨디션에 맞춰 필요한 부위를 집중적으로 관리합니다.",
      allHref: ROUTES.custom.default,
    };
  }

  return {
    title: displayLabel(label),
    desc: "WeMD 프로그램을 확인하세요.",
    allHref: "/",
  };
}

function normalizeMegaItem(item: NavMega): NavMega {
  if (item.label === "얼굴 관리") {
    return {
      ...item,
      sections: [
        {
          title:
            item.sections?.[0]?.title ||
            "FACE",
          links: ROUTES.face.items,
        },
      ],
    };
  }

  if (item.label === "스킨 솔루션 관리") {
    return {
      ...item,
      sections: [
        {
          title:
            item.sections?.[0]?.title ||
            "SKIN CARE SOLUTION",
          links: ROUTES.skin.items,
        },
      ],
    };
  }

  if (item.label === "바디 관리") {
    return {
      ...item,
      sections: [
        {
          title:
            item.sections?.[0]?.title ||
            "BODY",
          links: ROUTES.body.items,
        },
      ],
    };
  }

  if (
    item.label === "맞춤 케어" ||
    item.label === "집중 관리"
  ) {
    return {
      ...item,
      sections: [
        {
          title:
            item.sections?.[0]?.title ||
            "FOCUSED CARE",
          links: ROUTES.custom.items,
        },
      ],
    };
  }

  return item;
}