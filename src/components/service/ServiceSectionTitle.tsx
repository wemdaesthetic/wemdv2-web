"use client";

import React from "react";

export default function ServiceSectionTitle({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center" : "text-left";

  return (
    <div className={alignCls}>
      {eyebrow ? (
        <div className="text-[12px] tracking-[0.22em] text-zinc-400">{eyebrow}</div>
      ) : null}

      <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-zinc-900 md:mt-3 md:text-[52px]">
        {title}
      </h2>

      {desc ? (
        <p className="mt-2 text-[14px] leading-relaxed text-zinc-600 md:mt-4 md:text-[16px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}