"use client";

import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";

const variants: Record<Variant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  quiet: "button-quiet",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  showArrow?: boolean;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  showArrow = false,
  ...props
}: ButtonLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>();

  return (
    <a ref={ref} className={cn("button-base", variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} /> : null}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>();

  return (
    <button ref={ref} className={cn("button-base", variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
