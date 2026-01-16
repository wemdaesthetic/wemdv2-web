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
    <section id="brand" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="grid grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] tracking-[0.22em] text-zinc-500">
              BRAND STORY
            </div>

            {/* TITLE */}
            <h2 className="mt-3 text-[40px] leading-[1.1]">
              <span className="font-semibold text-[#B90E0A]">W</span>
              <span className="text-zinc-400">e </span>

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
              <div className="group relative h-[260px] w-full max-w-[460px] overflow-hidden rounded-2xl border border-zinc-200 bg-white md:h-[320px]">

                {/* GRID BACKGROUND */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-zinc-50" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:18px_18px]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(185,14,10,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(185,14,10,0.12)_1px,transparent_1px)] bg-[size:96px_96px] opacity-60" />
                </div>

                {/* SVG 1 */}
                <img
                  src="/brand/brand-hero-1.svg"
                  alt="WeMD Brand Visual"
                  className="absolute inset-0 h-full w-full object-contain p-8 opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
                />

                {/* SVG 2 */}
                <img
                  src="/brand/brand-hero-2.svg"
                  alt="WeMD Brand Visual Hover"
                  className="absolute inset-0 h-full w-full object-contain p-8 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-7">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-5 w-px bg-[#B90E0A]" />
                <div className="text-[14px] font-semibold text-zinc-900">
                  Core Values
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {VALUES.map((v, idx) => (
                  <ValueCard
                    key={v.title}
                    index={idx + 1}
                    title={v.title}
                    desc={v.desc}
                    className={idx === 4 ? "sm:col-span-2" : ""}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ValueCard({
  index,
  title,
  desc,
  className,
}: {
  index: number;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5",
        "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* GRID HOVER */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="relative">
        <div className="text-[11px] tracking-[0.18em] text-zinc-400">
          0{index}
        </div>
        <div className="mt-2 text-[16px] font-semibold text-[#B90E0A]">
          {title}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-zinc-600">
          {desc}
        </p>
      </div>
    </div>
  );
}