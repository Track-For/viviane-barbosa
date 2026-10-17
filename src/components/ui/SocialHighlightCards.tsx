import { Instagram, Mail, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";

import { SocialHighlightCards as HighlightCards } from "@/components/microkit/social-highlight-cards";

import { profileLinks } from "@/data/profile";
import { getConfiguredValue, getInstagramUrl } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type SocialLink = {
  label: string;
  href: string | null;
  highlight: string;
  icon: ComponentType<{ "aria-hidden": true; size: number; strokeWidth: number }>;
};

function emailUrl(value: string) {
  const configured = getConfiguredValue(value);
  return configured ? `mailto:${configured}` : null;
}

export function SocialHighlightCards() {
  const socials: SocialLink[] = [
    {
      label: "Conversar pelo WhatsApp",
      href: buildWhatsAppUrl(profileLinks.whatsapp, "Olá, gostaria de informações sobre o atendimento."),
      highlight: "#23845b",
      icon: MessageCircle,
    },
    {
      label: "Acompanhar no Instagram",
      href: getInstagramUrl(profileLinks.instagram),
      highlight: "#c44068",
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
    <HighlightCards
      socials={socials.map(({ icon: Icon, ...social }) => ({
        ...social,
        icon: <Icon aria-hidden={true} size={24} strokeWidth={1.55} />,
      }))}
    />
  );
}
