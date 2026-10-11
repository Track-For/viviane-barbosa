import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function GlassCard({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("glass-panel", className)} {...props}>
      {children}
    </div>
  );
}
