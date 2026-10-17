import type { ReactNode } from "react";

export type SocialHighlightLink = {
  label: string;
  href: string | null;
  highlight: string;
  icon: ReactNode;
};

// Adapted from Microkit: https://microkit.co/components/social-highlight-cards
export function SocialHighlightCards({ socials }: { socials: SocialHighlightLink[] }) {
  return (
    <nav className="social-highlight-cards" aria-label="Canais de contato">
      {socials.map((social) => (
        <a
          className="social-highlight-card group relative isolate grid size-16 place-items-center overflow-hidden rounded-md border border-white/[.09] bg-[light-dark(#ffffff,#16171d)] text-current no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.035),0_1px_0_rgba(255,255,255,.08)] transition-[border-color,background-color] duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[light-dark(#f0f2f5,#181920)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_10px_24px_rgba(0,0,0,.28),0_0_22px_color-mix(in_srgb,currentColor_12%,transparent)] focus-visible:bg-[light-dark(#f0f2f5,#181920)] focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_10px_24px_rgba(0,0,0,.28),0_0_22px_color-mix(in_srgb,currentColor_12%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:duration-[.01ms] max-[420px]:size-14"
          href={social.href ?? "/#contato"}
          key={social.label}
          target={social.href && !social.href.startsWith("mailto:") ? "_blank" : undefined}
          rel="noreferrer"
          title={social.label}
          aria-label={social.href ? social.label : `${social.label}. Contato ainda n\u00e3o configurado.`}
          style={{ color: social.highlight }}
        >
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_78%_92%_at_50%_-4%,color-mix(in_srgb,currentColor_38%,transparent)_0%,color-mix(in_srgb,currentColor_16%,transparent)_38%,transparent_76%)] opacity-20 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
          <span className="pointer-events-none absolute left-2 right-2 top-1 h-1 scale-x-[.96] rounded-full bg-current opacity-30 transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100 motion-reduce:duration-[.01ms]" aria-hidden="true" />
          <span className="grid size-[30px] scale-[.96] place-items-center text-[var(--muted)] opacity-[.82] transition-[color,opacity,transform] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] [&_svg]:size-full group-hover:scale-100 group-hover:text-inherit group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:text-inherit group-focus-visible:opacity-100 motion-reduce:duration-[.01ms] max-[420px]:size-[27px]">{social.icon}</span>
        </a>
      ))}
    </nav>
  );
}
