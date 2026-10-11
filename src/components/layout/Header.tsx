"use client";

import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const navigation = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Atendimento", href: "/#atendimento" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Dúvidas", href: "/#duvidas" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner glass-panel">
        <Link className="wordmark" href="/#inicio" aria-label="Ir ao início">
          <span>{profile.displayName}</span>
          <small>{profile.profession}</small>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#contato" className="header-cta" showArrow>
          Agendar conversa
        </ButtonLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span className={`menu-glyph${open ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav glass-panel" aria-label="Navegação móvel">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/#contato" onClick={() => setOpen(false)}>
            Agendar conversa
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
