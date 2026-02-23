
import { cn } from "@/lib/cn";


export function glassBase(className?: string) {
  return cn(
    "bg-white/60 backdrop-blur-xl",
    "ring-1 ring-white/30",
    "shadow-[0_18px_60px_rgba(15,23,42,0.18)]",
    className
  );
}


export function glassLight(className?: string) {
  return cn(
    "bg-white/45 backdrop-blur-xl",
    "ring-1 ring-white/25",
    "shadow-[0_18px_50px_rgba(15,23,42,0.14)]",
    className
  );
}


export function glassNoShadow(className?: string) {
  return cn("bg-white/55 backdrop-blur-xl", "ring-1 ring-white/30", className);
}