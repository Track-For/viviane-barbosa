import { Instagram, Mail, MessageCircle } from "lucide-react";
import type { CSSProperties, ComponentType } from "react";

import { profileLinks } from "@/data/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type SocialLink = {
  label: string;
  href: string | null;
  highlight: string;
  icon: ComponentType<{ "aria-hidden": true; size: number; strokeWidth: number }>;
};

function configured(value: string) {
  return Boolean(value && !value.startsWith("["));
}

function instagramUrl(value: string) {
  if (!configured(value)) {
    return null;
  }

  return value.startsWith("http") ? value : `https://instagram.com/${value.replace(/^@/, "")}`;
}

function emailUrl(value: string) {
  return configured(value) ? `mailto:${value}` : null;
}

export function SocialHighlightCards() {
  const socials: SocialLink[] = [
    {
      label: "Conversar pelo WhatsApp",
      href: buildWhatsAppUrl(profileLinks.whatsapp, "Olá, gostaria de informações sobre o atendimento."),
      highlight: "var(--accent)",
      icon: MessageCircle,
    },
    {
      label: "Acompanhar no Instagram",
      href: instagramUrl(profileLinks.instagram),
      highlight: "color-mix(in srgb, var(--accent), var(--surface-strong) 28%)",
      icon: Instagram,
    },
    {
      label: "Enviar um e-mail",
      href: emailUrl(profileLinks.email),
      highlight: "color-mix(in srgb, var(--accent-strong), var(--ink) 12%)",
      icon: Mail,
    },
  ];

  return (
    <nav className="social-highlight-cards" aria-label="Canais de contato">
      {socials.map((social) => {
        const Icon = social.icon;
        const available = Boolean(social.href);

        return (
          <a
            className="social-highlight-card"
            href={social.href ?? "/#contato"}
            key={social.label}
            target={available && !social.href?.startsWith("mailto:") ? "_blank" : undefined}
            rel={available && !social.href?.startsWith("mailto:") ? "noreferrer" : undefined}
            title={available ? social.label : `${social.label} após configurar o contato`}
            aria-label={available ? social.label : `${social.label}. Contato ainda não configurado.`}
            style={{ "--social-highlight": social.highlight } as CSSProperties}
          >
            <span className="social-highlight-card__glow" aria-hidden="true" />
            <span className="social-highlight-card__beam" aria-hidden="true" />
            <span className="social-highlight-card__icon">
              <Icon aria-hidden={true} size={19} strokeWidth={1.55} />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
