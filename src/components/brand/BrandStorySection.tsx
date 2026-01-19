import { cn } from "@/lib/cn";

const VALUES = [
  { title: "Human", desc: "모든 중심에는 사람이 있습니다." },
  {
    title: "Technology",
    desc: "세계적 에스테틱 명인들의 노하우를 결합하며, K-Beauty에 새로운 기준을 제시합니다.",
  },
  {
    title: "Culture",
    desc: "글로벌 뷰티・웰니스 문화를 개척하고 가치를 실현합니다.",
  },
  {
    title: "Harmony",
    desc: "내면과 외면, 아름다움과 감성이 균형을 이루는 토탈 케어를 제공합니다.",
  },
  {
    title: "Rest",
    desc: "현대인의 일상 속에서 여유와 평온을 제공합니다.",
  },
];

export default function BrandStorySection() {
  return (
    <section id="brand" className="scroll-mt-[96px] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] tracking-[0.22em] text-zinc-500">BRAND STORY</div>

            <h2 className="mt-3 text-[40px] leading-[1.1]">
              <span className="font-semibold text-[#B90E0A]">We</span>
              <span className="text-zinc-400"> </span>
              <span className="font-semibold text-[#B90E0A]">M</span>
              <span className="text-zinc-400">ake</span>
              <br />
              <span className="text-zinc-400">a </span>
              <span className="font-semibold text-[#B90E0A]">D</span>
              <span className="text-zinc-400">ifference.</span>
            </h2>

            <p className="mt-6 text-[16px] leading-relaxed text-zinc-600">
              사람을 중심에 두고 기술과 문화로 확장하며
              <br />
              조화와 쉼으로 완성하는 토탈 에스테틱 경험을 제공합니다.
            </p>

            {/* IMAGE SLOT */}
            <div className="mt-10">
              <div className="group relative h-[260px] w-full max-w-[460px] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="pointer-events-none absolute inset-0 bg-[#FAFAFA]" aria-hidden="true" />

                {/* SVG 1 */}
                <img
                  src="/brand/brand-hero-1.svg"
                  alt="WeMD Brand Visual"
                  className="absolute inset-0 z-30 m-auto w-auto max-h-[220px] opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
                />

                {/* SVG 2 */}
                <img
                  src="/brand/brand-hero-2.svg"
                  alt="WeMD Brand Visual Hover"
                  className="absolute inset-0 z-30 m-auto w-auto max-h-[220px] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />

                {/* grid overlay (보이게) */}
                <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),
                          linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)]
                      bg-[size:22px_22px]
                      opacity-55
                    "
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.05)_100%)]" />
                </div>
              </div>
            </div>

            <div className="mt-10 h-px w-full bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent" />

            <div className="mt-8 text-[13px] leading-relaxed text-zinc-500">
              Human · Technology · Culture · Harmony · Rest
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-7">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-5 w-px bg-[#B90E0A]" />
                <div className="text-[14px] font-semibold text-zinc-900">Core Values</div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {VALUES.map((v, idx) => (
                  <div
                    key={v.title}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-[0.25]">
                      <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    </div>

                    <div className="relative flex items-start justify-between">
                      <div>
                        <div className="text-[11px] tracking-[0.18em] text-zinc-500">0{idx + 1}</div>
                        <div className="mt-2 text-[16px] font-semibold text-zinc-900">{v.title}</div>
                      </div>
                      <div className="mt-1 h-6 w-px bg-zinc-200 transition group-hover:bg-[#B90E0A]" />
                    </div>

                    <p className="relative mt-4 text-[13px] leading-relaxed text-zinc-600">{v.desc}</p>

                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#B90E0A]/0 blur-2xl transition group-hover:bg-[#B90E0A]/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}