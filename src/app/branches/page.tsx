import Link from "next/link";
import { BRANCHES } from "@/config/branches";

export const metadata = {
  title: "지점 안내 | WeMD Aesthetic",
};

export default function BranchesPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-28">
        {/* 타이틀(브랜드 섹션 톤) */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="text-[40px] font-semibold tracking-tight text-zinc-900 md:text-[52px]">
            지점 안내
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 md:text-[16px]">
            위엠디에스테틱의 지점 정보를 확인하세요.
          </p>
        </div>

        {/* 카드 리스트 */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((b) => (
            <Link
              key={b.slug}
              href={`/branches/${b.slug}`}
              className="
                group rounded-3xl bg-white p-8
                shadow-[0_18px_70px_rgba(15,23,42,0.10)]
                transition-transform duration-200 hover:-translate-y-[2px]
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[18px] font-semibold tracking-tight text-zinc-900">
                    {b.name}
                  </div>
                  <div className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                    {b.short}
                  </div>
                </div>

                <span
                  className="
                    shrink-0 rounded-full border border-zinc-200 px-3 py-1
                    text-[12px] font-medium text-zinc-700
                    transition group-hover:border-zinc-300
                  "
                >
                  상세 →
                </span>
              </div>

              <div className="mt-6 text-[13px] leading-relaxed text-zinc-600">
                <div className="text-zinc-500">주소</div>
                <div className="mt-1 text-zinc-800">{b.address}</div>
              </div>

              {(b.phone || b.hours) && (
                <div className="mt-5 grid gap-2 text-[13px] text-zinc-600">
                  {b.phone && (
                    <div>
                      <span className="text-zinc-500">전화</span>{" "}
                      <span className="text-zinc-800">{b.phone}</span>
                    </div>
                  )}
                  {b.hours && (
                    <div>
                      <span className="text-zinc-500">운영</span>{" "}
                      <span className="text-zinc-800">{b.hours}</span>
                    </div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}