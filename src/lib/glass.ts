// FILE: src/lib/glass.ts
import { cn } from "@/lib/cn";

/**
 * "홈/햄버거 버튼" 기준의 맑고 투명한 글라스 프리셋
 * - 탁하지 않게: white/55 ~ 65
 * - ring: white/30 정도
 * - shadow: 과하지 않게(아예 빼거나 매우 은은하게)
 */
export function glassBase(className?: string) {
  return cn(
    "bg-white/60 backdrop-blur-xl",
    "ring-1 ring-white/30",
    "shadow-[0_18px_60px_rgba(15,23,42,0.18)]",
    className
  );
}

/** 더 가벼운(더 투명) 글라스 */
export function glassLight(className?: string) {
  return cn(
    "bg-white/45 backdrop-blur-xl",
    "ring-1 ring-white/25",
    "shadow-[0_18px_50px_rgba(15,23,42,0.14)]",
    className
  );
}

/** 거의 그림자 없는 글라스(원하면 이걸로 통일 가능) */
export function glassNoShadow(className?: string) {
  return cn("bg-white/55 backdrop-blur-xl", "ring-1 ring-white/30", className);
}