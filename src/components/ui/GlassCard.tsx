// FILE: src/components/ui/GlassCard.tsx
"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { glassBase } from "@/lib/glass";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article";
};

export default function GlassCard({ as = "div", className, ...rest }: Props) {
  const Comp: any = as;
  return <Comp className={glassBase(cn("rounded-3xl", className))} {...rest} />;
}