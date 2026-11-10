import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/config/nav";
import { BRANCHES } from "@/config/branches";

const BASE = "https://www.wemdibs.com";

// 메뉴(nav.ts)에 있는 페이지 주소를 그대로 모으고, 주소가 확정된 지점만 넣는다
export default function sitemap(): MetadataRoute.Sitemap {
  // 대표 주소(canonical)가 자기 자신인 주소만 넣는다.
  // /face?p=… 중 작은 얼굴 관리만 자기 제목 · 설명 · 대표 주소가 있다 (face/page.tsx 참고)
  const paths = new Set<string>(["/", "/branches", "/face?p=face-slimming"]);

  for (const item of NAV_ITEMS) {
    if (item.type === "link") {
      if (item.href.startsWith("/")) paths.add(item.href);
    } else {
      for (const sec of item.sections) {
        for (const l of sec.links) if (l.href.startsWith("/")) paths.add(l.href);
      }
      if (item.promo?.href?.startsWith("/")) paths.add(item.promo.href);
    }
  }
  for (const b of BRANCHES) {
    if (b.address && b.address !== "준비중") paths.add(`/branches/${b.slug}`);
  }

  const now = new Date();
  return Array.from(paths)
    .filter((p) => !p.includes("?") || p === "/face?p=face-slimming").map((p) => ({ url: BASE + p, lastModified: now }));
}
