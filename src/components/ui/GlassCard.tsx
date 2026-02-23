// FILE: src/components/ui/GlassCard.tsx
"use client";

import React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: false;
};

export default function GlassCard({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]",
        className
      )}
      {...props}
    />
  );
}