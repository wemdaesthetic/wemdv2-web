"use client";

import React from "react";
import ServiceSectionTitle from "./ServiceSectionTitle";

export default function ServiceHero({
  label,
  title,
  desc,
  image,
}: {
  label: string;
  title: string;
  desc: string;
  image: string; // 모바일/PC 공통 hero 이미지 (video 안 씀)
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* 은은한 radial bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(185,14,10,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-[110px] md:pb-16">
        {/* PC는 기존 헤더(78px) 있다고 가정하고, 스크롤마진/여백만 */}
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <ServiceSectionTitle eyebrow={label} title={title} desc={desc} align="left" />
          </div>

          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)] ring-1 ring-black/5">
              <div className="relative h-[240px] w-full md:h-[360px]">
                <img
                  src={image}
                  alt={`${title} 히어로`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>

            <div className="mt-3 text-[12px] text-zinc-400">
              * 모바일에서는 영상 대신 이미지로 표시됩니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}