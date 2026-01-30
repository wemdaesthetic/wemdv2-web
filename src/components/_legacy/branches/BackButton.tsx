"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  fallbackHref = "/#branches",
}: {
  fallbackHref?: string;
}) {
  const router = useRouter();

  const onBack = () => {
    // 히스토리가 있으면 back, 없으면 fallback
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={onBack}
      className="
        inline-flex items-center gap-2
        rounded-full border border-zinc-200 bg-white
        px-4 py-2 text-[14px] font-semibold text-zinc-900
        shadow-[0_10px_30px_rgba(15,23,42,0.06)]
        transition hover:-translate-y-[1px] hover:bg-zinc-50
        active:translate-y-0
      "
      aria-label="이전으로"
    >
      <span aria-hidden className="text-[16px] leading-none">
        ←
      </span>
      <span>뒤로</span>
    </button>
  );
}