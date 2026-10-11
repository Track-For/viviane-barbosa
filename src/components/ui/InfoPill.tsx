import type { ReactNode } from "react";

export function InfoPill({ children }: { children: ReactNode }) {
  return <span className="info-pill">{children}</span>;
}
